import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const reactbitsEntries = entries.filter((e) => e.source === "reactbits");
const PRESERVED = new Set([
  "blur-text",
  "shiny-text",
  "count-up",
  "circular-text",
  "decrypted-text",
  "glitch-text",
  "gradient-text",
  "magnet",
  "split-text",
  "star-border",
]);

export function fixReactBits() {
  console.log(`Fixing ReactBits directories...`);

  for (const entry of reactbitsEntries) {
    const slug = entry.id.replace("reactbits-", "");
    if (PRESERVED.has(slug)) continue;

    const dir = path.join(SHOWCASE_DIR, "reactbits", slug);
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f !== "preview.tsx" && f !== "index.tsx") {
        fs.rmSync(path.join(dir, f), { recursive: true, force: true });
      }
    }
  }

  console.log("ReactBits cleaned ✓");
}

if (process.argv[1]?.endsWith("fix-reactbits.mts")) {
  fixReactBits();
}
