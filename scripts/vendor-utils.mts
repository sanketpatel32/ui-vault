import * as fs from "node:fs";
import * as path from "node:path";

const CACHE_DIR = path.resolve(".vendored-cache");
const SHOWCASE_DIR = path.resolve("src/showcase");

fs.mkdirSync(CACHE_DIR, { recursive: true });
fs.mkdirSync(SHOWCASE_DIR, { recursive: true });

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

async function fetchCachedJson(url: string, cacheSubpath: string): Promise<any> {
  const cachePath = path.join(CACHE_DIR, cacheSubpath);
  if (fs.existsSync(cachePath)) {
    try {
      return JSON.parse(fs.readFileSync(cachePath, "utf8"));
    } catch {}
  }
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  const data = await res.json();
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), "utf8");
  return data;
}

async function fetchCachedText(url: string, cacheSubpath: string): Promise<string> {
  const cachePath = path.join(CACHE_DIR, cacheSubpath);
  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, "utf8");
  }
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  const data = await res.text();
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, data, "utf8");
  return data;
}

export { fetchCachedJson, fetchCachedText, CACHE_DIR, SHOWCASE_DIR };
