// The app bundles only the EntrySummary projection — `install` and `sourceUrl`
// live in public/registry/<source>.json, fetched by detail pages via
// loadSourceEntries() in src/lib/registry.ts. The full registry merger used by
// scripts lives in ./all (kept out of the app bundle on purpose).
export { entries } from "./entries.generated";
export { sources } from "./sources";
export { categories, GROUP_LABELS } from "./categories";
export type {
  Source,
  Category,
  UIEntry,
  EntrySummary,
  SourceId,
  License,
  PreviewMode,
  CategoryGroup,
} from "./types";
