// One-shot: normalize cult cross-references to sibling entry folders.
// - adds index.ts barrels to every src/showcase/cultui/<entry> folder
// - rewrites @/showcase/_shared/cultui/<entry> -> ../<entry> (keeps ui/ subpool absolute)
// - removes _shared/cultui/* except ui/
// Run: npx tsx scripts/fix-v06-cult-refs.mts
import { readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/showcase/cultui";
const folders = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const CULT_REGNAME: Record<string, string> = {
  "bg-animated-fractal-grid": "bg-animated-fractal-dot-grid",
  "hero-color-panels": "hero-color-panel",
};

// 1. barrels
for (const folder of folders) {
  const reg = CULT_REGNAME[folder] ?? folder;
  const dir = join(ROOT, folder);
  const files = readdirSync(dir).filter(
    (f) =>
      /\.(tsx|ts)$/.test(f) &&
      !f.endsWith(".d.ts") &&
      !["preview.tsx", "demo.tsx", "index.ts"].includes(f),
  );
  const main = files.find((f) => f.replace(/\.(tsx|ts)$/, "") === reg) ?? files[0];
  if (!main) {
    console.log(`NO-MAIN ${folder}`);
    continue;
  }
  const stem = main.replace(/\.(tsx|ts)$/, "");
  const src = readFileSync(join(dir, main), "utf8");
  const hasDefault = /^export default/m.test(src);
  writeFileSync(
    join(dir, "index.ts"),
    [
      `export * from "./${stem}";`,
      ...(hasDefault ? [`export { default } from "./${stem}";`] : []),
    ].join("\n"),
  );
}
console.log(`barrels: ${folders.length}`);

// 2. repoint references (entry folders only; ui/ subpool stays absolute)
const entrySet = new Set(folders);
let touched = 0;
for (const folder of folders) {
  const dir = join(ROOT, folder);
  for (const f of readdirSync(dir)) {
    if (!/\.(tsx|ts)$/.test(f) || f.endsWith(".d.ts")) continue;
    const p = join(dir, f);
    const src = readFileSync(p, "utf8");
    const next = src.replace(/@\/showcase\/_shared\/cultui\/([\w-]+)/g, (m, x: string) =>
      x === "ui" ? m : `../${x}`,
    );
    if (next !== src) {
      writeFileSync(p, next);
      touched++;
    }
  }
}
console.log(`repointed files: ${touched}`);

// 3. prune duplicated shared copies (keep the ui/ subpool)
const sharedDir = "src/showcase/_shared/cultui";
if (existsSync(sharedDir)) {
  for (const d of readdirSync(sharedDir, { withFileTypes: true })) {
    const name = d.name;
    if (name === "ui") continue;
    if (entrySet.has(name)) rmSync(join(sharedDir, name), { recursive: true, force: true });
  }
}
console.log("pruned duplicate shared copies");
