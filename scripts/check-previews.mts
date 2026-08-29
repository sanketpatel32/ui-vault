import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";

const SHOWCASE_DIR = path.resolve("src/showcase");

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

const EXCEPTIONS = new Set([
  "launchui-fade",
  "launchui-glass",
  "launchui-glow",
  "fancy-letter-swap",
  "fancy-typewriter",
  "shadcn-chart",
  "shadcn-spinner",
]);

export function checkAllPreviews(): { total: number; passed: number; failed: string[] } {
  const failed: string[] = [];

  for (const entry of entries) {
    const slug = entry.id.replace(new RegExp(`^${entry.source}-`), "");
    const previewFile = path.join(SHOWCASE_DIR, entry.source, slug, "preview.tsx");

    if (!fs.existsSync(previewFile)) {
      failed.push(`${entry.id} (missing preview.tsx)`);
      continue;
    }

    const content = fs.readFileSync(previewFile, "utf8");

    // Check for stub marker
    if (content.includes("uppercase tracking-wider") || content.includes("previewKey")) {
      failed.push(`${entry.id} (contains stub marker)`);
      continue;
    }

    // Check for import statement
    if (!/import\s+/.test(content)) {
      failed.push(`${entry.id} (no import statement)`);
      continue;
    }

    // Check for local component import from own folder for registry sources
    if (REGISTRY_SOURCES.has(entry.source) && !EXCEPTIONS.has(entry.id)) {
      if (!/from\s+["']\.\//.test(content) && !/import\s+["']\.\//.test(content)) {
        failed.push(`${entry.id} (must import from local folder "./<component>")`);
        continue;
      }
    }
  }

  return {
    total: entries.length,
    passed: entries.length - failed.length,
    failed,
  };
}

if (
  process.argv[1]?.endsWith("check-previews.mts") ||
  process.argv[1]?.endsWith("check-previews.ts")
) {
  const res = checkAllPreviews();
  console.log(`Previews check: ${res.passed}/${res.total} valid real previews`);
  if (res.failed.length > 0) {
    console.error(`Found ${res.failed.length} stub/invalid previews:`);
    console.error(res.failed.slice(0, 20).join("\n"));
    if (res.failed.length > 20) {
      console.error(`... and ${res.failed.length - 20} more`);
    }
    process.exit(1);
  } else {
    console.log("All previews passed verification! ✓");
  }
}
