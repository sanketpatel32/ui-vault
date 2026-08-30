// Bulk runtime audit: crawl each preview.tsx import graph through the Vite dev
// server. Any module that fails to transform (unresolved import, syntax error)
// returns non-200 — that preview is hard-broken at runtime.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SHOWCASE = join(ROOT, "src", "showcase");
const BASE = "http://localhost:5174";

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (name === "preview.tsx") yield p;
  }
}

const previews = [...walk(SHOWCASE)];
const importRe = /(?:from|import)\s*["']([^"']+)["']/g;

const fetched = new Map(); // url -> { status, error }
async function fetchModule(url) {
  if (fetched.has(url)) return fetched.get(url);
  let result;
  try {
    const res = await fetch(BASE + url);
    const body = await res.text();
    if (res.ok) {
      const next = [];
      let m;
      while ((m = importRe.exec(body))) {
        const spec = m[1];
        if (spec.startsWith("/src/")) next.push(spec);
      }
      result = { status: res.status, next };
    } else {
      const fail =
        body.match(/Failed to resolve import [^<\n"]+["'][^"']+"/)?.[0] ??
        body.match(/\[vite\][^<\n]+/)?.[0] ??
        body
          .split("\n")
          .find((l) => /error|resolve/i.test(l))
          ?.slice(0, 160) ??
        `HTTP ${res.status}`;
      result = { status: res.status, error: fail.slice(0, 200) };
    }
  } catch (e) {
    result = { status: 0, error: String(e).slice(0, 200) };
  }
  fetched.set(url, result);
  return result;
}

async function crawl(startUrl) {
  const queue = [startUrl];
  const seen = new Set();
  while (queue.length) {
    const url = queue.pop();
    if (seen.has(url)) continue;
    seen.add(url);
    const r = await fetchModule(url);
    if (r.status !== 200) return { url, ...r };
    queue.push(...(r.next ?? []));
  }
  return null;
}

const results = [];
let done = 0;
const CONC = 8;
const workers = Array.from({ length: CONC }, async () => {
  while (previews.length) {
    const p = previews.shift();
    const url = "/" + relative(ROOT, p).replaceAll("\\", "/");
    const failure = await crawl(url);
    results.push({ preview: url, ...(failure ? { broken: true, ...failure } : {}) });
    done++;
    if (done % 100 === 0) console.error(`progress ${done}`);
  }
});
await Promise.all(workers);

results.sort((a, b) => a.preview.localeCompare(b.preview));
writeFileSync("audit-results.json", JSON.stringify(results, null, 2));
const broken = results.filter((r) => r.broken);
const bySrc = {};
for (const b of broken) {
  const s = b.preview.split("/")[2];
  bySrc[s] = (bySrc[s] ?? 0) + 1;
}
console.log(`total previews: ${results.length}, hard-broken: ${broken.length}`);
console.log(JSON.stringify(bySrc, null, 2));
