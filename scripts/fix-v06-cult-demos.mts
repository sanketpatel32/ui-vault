// One-shot: vendor Cult UI's official -demo registry items as live previews.
// Demos are the authentic compositions from the docs pages (apps/www/public/r/<name>-demo.json).
// Writes <folder>/demo.tsx (rewritten imports) + <folder>/preview.tsx (thin wrapper).
// Run: npx tsx scripts/fix-v06-cult-demos.mts
import { existsSync, readFileSync, rmSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CULT_REPO = "https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/r";
const SHADCN = "https://ui.shadcn.com/r/styles/new-york-v4";

async function fetchJSON(url: string, name: string): Promise<any | null> {
  const cf = `.vcache/v06-${name}.json`;
  if (existsSync(cf)) return JSON.parse(readFileSync(cf, "utf8"));
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const text = await res.text();
      if (res.ok && text.trimStart().startsWith("{")) {
        const json = JSON.parse(text);
        writeFileSync(cf, JSON.stringify(json));
        return json;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  return null;
}

const depQueue: { pool: string; name: string }[] = [];
const queuedShared = new Set<string>();

function queueShared(pool: string, name: string) {
  const key = `${pool}/${name}`;
  if (!queuedShared.has(key)) {
    queuedShared.add(key);
    depQueue.push({ pool, name });
  }
}

function rewriteDemoImports(src: string, folder: string): string {
  let out = src.replace(/^['"]use client['"];?\r?\n/m, "");
  out = out.replace(/NodeJS\.Timeout/g, "ReturnType<typeof setTimeout>");
  // the demo lives beside the component: ../ui/<x> -> ./<x> (own folder for x === folder)
  out = out.replace(/\.\.\/ui\/([\w-]+)/g, (_m, x: string) =>
    x === folder ? `./${x}` : `../${x}`,
  );
  out = out.replaceAll("@/registry/default/lib/utils", "@/lib/utils");
  out = out.replace(/@\/registry\/[\w-]+\/ui\/([\w-]+)/g, (_m, x: string) => {
    queueShared("cultui", x);
    return `@/showcase/_shared/cultui/${x}`;
  });
  out = out.replace(/@\/components\/ui\/([\w-]+)/g, (_m, x: string) => {
    queueShared("cultui", `ui/${x}`);
    return `@/showcase/_shared/cultui/ui/${x}`;
  });
  return out;
}

function exportsFirstFile(item: any): { file: string; defaultExport: boolean } {
  let first = "";
  let hasDefault = false;
  for (const f of item.files ?? []) {
    const base = (f.path ?? "").split("/").pop()!;
    if (!/\.(tsx|ts)$/.test(base)) continue;
    const stem = base.replace(/\.(tsx|ts)$/, "");
    if (!first) first = stem;
    if (/^export default/m.test(f.content ?? "")) hasDefault = true;
  }
  return { file: first, defaultExport: hasDefault };
}

function writeSharedItem(item: any, dir: string, isShadcnContent: boolean) {
  mkdirSync(dir, { recursive: true });
  let first = "";
  let hasDefault = false;
  for (const f of item.files ?? []) {
    const base = (f.path ?? "").split("/").pop()!;
    if (!/\.(tsx|ts)$/.test(base)) continue;
    let content = (f.content ?? "").replace(/^['"]use client['"];?\r?\n/m, "");
    content = content.replace(/NodeJS\.Timeout/g, "ReturnType<typeof setTimeout>");
    content = content.replaceAll("@/registry/default/lib/utils", "@/lib/utils");
    content = content.replaceAll("@/registry/new-york-v4/lib/utils", "@/lib/utils");
    content = content.replace(/@\/registry\/[\w-]+\/ui\/([\w-]+)/g, (_m: string, x: string) => {
      queueShared("cultui", x);
      return `@/showcase/_shared/cultui/${x}`;
    });
    if (isShadcnContent) {
      content = content.replace(/@\/components\/ui\/([\w-]+)/g, (_m: string, x: string) => {
        queueShared("cultui", `ui/${x}`);
        return `@/showcase/_shared/cultui/ui/${x}`;
      });
    }
    writeFileSync(join(dir, base), content);
    const stem = base.replace(/\.(tsx|ts)$/, "");
    if (!first) first = stem;
    if (/^export default/m.test(content)) hasDefault = true;
  }
  if (first) {
    writeFileSync(
      join(dir, "index.ts"),
      [
        `export * from "./${first}";`,
        ...(hasDefault ? [`export { default } from "./${first}";`] : []),
      ].join("\n"),
    );
  }
}

const CULT_REGNAME: Record<string, string> = {
  "bg-animated-fractal-grid": "bg-animated-fractal-dot-grid",
  "hero-color-panels": "hero-color-panel",
};

async function main() {
  const folders = readdirSync("src/showcase/cultui", { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const report: string[] = [];
  let withDemo = 0;
  for (const folder of folders) {
    const reg = CULT_REGNAME[folder] ?? folder;
    const item = await fetchJSON(`${CULT_REPO}/${reg}-demo.json`, `demo-${reg}`);
    if (!item || !item.files?.length) {
      report.push(`NO-DEMO ${folder}`);
      continue;
    }
    const { file: demoFile, defaultExport } = exportsFirstFile(item);
    if (!demoFile || !defaultExport) {
      report.push(`NO-DEFAULT ${folder}`);
      continue;
    }
    const content = rewriteDemoImports(
      item.files.find(
        (f: any) =>
          (f.path ?? "").endsWith(`${demoFile}.tsx`) || (f.path ?? "").endsWith(`${demoFile}.ts`),
      ).content ?? "",
      folder,
    );
    writeFileSync(`src/showcase/cultui/${folder}/demo.tsx`, content);
    writeFileSync(
      `src/showcase/cultui/${folder}/preview.tsx`,
      `import Demo from "./demo";\n\nexport default function Preview() {\n  return (\n    <div className="w-full">\n      <Demo />\n    </div>\n  );\n}\n`,
    );
    withDemo++;
    report.push(`OK ${folder} <- ${reg}-demo`);
  }

  // shared deps pulled in by demo imports
  const sharedReport: string[] = [];
  while (depQueue.length) {
    const { pool, name } = depQueue.shift()!;
    const uiSubpool = name.startsWith("ui/");
    const bare = uiSubpool ? name.slice(3) : name;
    let item = uiSubpool
      ? null
      : await fetchJSON(`${CULT_REPO}/${name}.json`, `shared-${pool}-${name.replaceAll("/", "-")}`);
    if (!item)
      item = await fetchJSON(
        `${SHADCN}/${bare}.json`,
        `shared-${pool}-${name.replaceAll("/", "-")}`,
      );
    if (!item) {
      sharedReport.push(`MISS ${pool}/${name}`);
      continue;
    }
    writeSharedItem(item, `src/showcase/_shared/${pool}/${name}`, true);
    sharedReport.push(`OK ${pool}/${name}`);
  }

  console.log(`demos: ${withDemo}/${folders.length}`);
  console.log(report.filter((r) => !r.startsWith("OK")).join("\n") || "(all entries got demos)");
  if (sharedReport.length) console.log("shared:\n" + sharedReport.join("\n"));
}

main();
