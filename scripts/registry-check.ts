// Validates the registry in src/data. Run: npm run registry:check
import { categories, entries, sources } from "../src/data/index";
import { showcaseLoaders } from "../src/showcase/index";
import { checkAllPreviews } from "./check-previews.mts";

const errors: string[] = [];
const warnings: string[] = [];

const sourceIds = new Set(sources.map((s) => s.id));
const categorySlugs = new Set(categories.map((c) => c.slug));
const vendorableSources = new Set(sources.filter((s) => s.previewMode === "live").map((s) => s.id));

// unique ids
const seen = new Set<string>();
for (const e of entries) {
  if (seen.has(e.id)) errors.push(`duplicate entry id: ${e.id}`);
  seen.add(e.id);

  if (!sourceIds.has(e.source)) errors.push(`${e.id}: unknown source "${e.source}"`);
  if (!categorySlugs.has(e.category)) errors.push(`${e.id}: unknown category "${e.category}"`);

  // licensing guard: only vendorable sources may ship live previews / install commands
  if (e.previewKey && !vendorableSources.has(e.source)) {
    errors.push(
      `${e.id}: previewKey set for non-vendorable source "${e.source}" — remove it (link-out only)`,
    );
  }
  if (e.previewMode === "linkout" && e.license === "mit") {
    warnings.push(`${e.id}: link-out entry marked MIT — double-check the source policy`);
  }

  // id prefix convention
  if (!e.id.startsWith(`${e.source}-`))
    warnings.push(`${e.id}: id does not start with source prefix "${e.source}-"`);
}

// previewKeys resolve to showcase loaders, and no orphan loaders
const loaderKeys = new Set(Object.keys(showcaseLoaders));
for (const e of entries) {
  if (e.previewKey && !loaderKeys.has(e.previewKey)) {
    errors.push(`${e.id}: previewKey "${e.previewKey}" has no loader in src/showcase/index.ts`);
  }
}
for (const key of loaderKeys) {
  if (!entries.some((e) => e.previewKey === key)) warnings.push(`orphan showcase loader: ${key}`);
}

// empty categories
for (const c of categories) {
  if (!entries.some((e) => e.category === c.slug))
    warnings.push(`category "${c.slug}" has no entries`);
}

// summary
const bySource = sources.map((s) => ({
  source: s.name,
  count: entries.filter((e) => e.source === s.id).length,
}));
console.table(bySource);
console.log(
  `total: ${entries.length} entries · ${entries.filter((e) => e.previewKey).length} live previews · ${categories.length} categories`,
);

// preview stub and validity check
const previewCheck = checkAllPreviews();
if (previewCheck.failed.length > 0) {
  for (const f of previewCheck.failed) {
    errors.push(`preview check failed: ${f}`);
  }
}

if (warnings.length) {
  console.warn(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.warn(`  ⚠ ${w}`);
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const err of errors) console.error(`  ✗ ${err}`);
  process.exit(1);
}
console.log("\nregistry check passed ✓");
