import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";

const SHOWCASE_DIR = path.resolve("src/showcase");

const EXCEPTIONS = new Set([
  // Explicitly permitted exceptions by user prompt
  "launchui-fade",
  "launchui-glass",
  "launchui-glow",
  "fancy-letter-swap",
  "fancy-typewriter",
  "shadcn-chart",
  "shadcn-spinner",
  // Standalone reactbits/numberflow/aceternity preserved ones if applicable
  "numberflow-numberflow",
  "numberflow-group",
  "numberflow-countdown",
  "numberflow-input",
]);

export function findNonLocalImports() {
  const REGISTRY_SOURCES = new Set([
    "shadcn",
    "originui",
    "watermelon",
    "launchui",
    "animateui",
    "animata",
    "magicui",
    "fancy",
  ]);

  const nonLocal: string[] = [];

  for (const entry of entries) {
    if (!REGISTRY_SOURCES.has(entry.source)) continue;
    if (EXCEPTIONS.has(entry.id)) continue;

    const slug = entry.id.replace(new RegExp(`^${entry.source}-`), "");
    const previewFile = path.join(SHOWCASE_DIR, entry.source, slug, "preview.tsx");

    if (!fs.existsSync(previewFile)) {
      nonLocal.push(`${entry.id} (missing preview.tsx)`);
      continue;
    }

    const content = fs.readFileSync(previewFile, "utf8");
    // Check if it imports from "./" (e.g. from "./component", from "./index", etc.)
    if (!/from\s+["']\.\//.test(content) && !/import\s+["']\.\//.test(content)) {
      nonLocal.push(entry.id);
    }
  }

  return nonLocal;
}

const list = findNonLocalImports();
console.log(`Found ${list.length} preview files without from "./":`);
console.log(list.join("\n"));
