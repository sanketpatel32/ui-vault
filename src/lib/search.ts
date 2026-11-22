import Fuse from "fuse.js";
import { entries, type EntrySummary } from "@/data";
import { sourceById } from "@/lib/registry";

// Extend entries with the source name so searches like "react bits" match by library.
type SearchItem = EntrySummary & { sourceName: string };
const items: SearchItem[] = entries.map((e) => ({
  ...e,
  sourceName: sourceById.get(e.source)?.name ?? "",
}));

const searchIndex = new Fuse(items, {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "description", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "sourceCategory", weight: 0.1 },
    { name: "sourceName", weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function searchEntries(query: string, limit = 24): EntrySummary[] {
  const q = query.trim();
  if (!q) return [];
  // Fuzzy matching on one character matches nearly everything; use a name-prefix match instead.
  if (q.length < 2) {
    const c = q.toLowerCase();
    return items.filter((e) => e.name.toLowerCase().startsWith(c)).slice(0, limit);
  }
  return searchIndex.search(q, { limit }).map((r) => r.item as EntrySummary);
}
