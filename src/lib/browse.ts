import { entries, type EntrySummary } from "@/data";
import { searchEntries } from "@/lib/search";

export interface BrowseFilters {
  q: string;
  src: string;
  lic: string;
  tag: string;
  cat: string;
  sort: string;
}

export const SEARCH_RESULT_LIMIT = 24;

export function browseResults(filters: BrowseFilters): EntrySummary[] {
  const q = filters.q.trim();
  let list: EntrySummary[];

  if (q) {
    // A search starts from fuse's relevance-ranked results and keeps that order.
    // Re-filtering the registry via an id Set would discard the ranking and
    // render every weak match above the threshold (thousands for broad queries).
    let ranked = searchEntries(q, SEARCH_RESULT_LIMIT);
    if (filters.cat) ranked = ranked.filter((e) => e.category === filters.cat);
    if (filters.src) ranked = ranked.filter((e) => e.source === filters.src);
    if (filters.lic) ranked = ranked.filter((e) => e.license === filters.lic);
    if (filters.tag) ranked = ranked.filter((e) => e.tags.includes(filters.tag));
    list = ranked;
  } else {
    list = entries;
    if (filters.cat) list = list.filter((e) => e.category === filters.cat);
    if (filters.src) list = list.filter((e) => e.source === filters.src);
    if (filters.lic) list = list.filter((e) => e.license === filters.lic);
    if (filters.tag) list = list.filter((e) => e.tags.includes(filters.tag));
  }

  if (filters.sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (filters.sort === "source")
    list = [...list].sort(
      (a, b) => a.source.localeCompare(b.source) || a.name.localeCompare(b.name),
    );
  return list;
}
