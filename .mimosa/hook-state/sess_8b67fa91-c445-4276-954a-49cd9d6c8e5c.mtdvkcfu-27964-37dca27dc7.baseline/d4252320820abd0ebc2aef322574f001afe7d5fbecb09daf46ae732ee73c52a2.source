import {
  categories,
  entries,
  GROUP_LABELS,
  sources,
  type Category,
  type CategoryGroup,
  type Source,
  type UIEntry,
} from "@/data";

export const sourceById = new Map<string, Source>(sources.map((s) => [s.id, s]));
export const categoryBySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));
export const entryById = new Map<string, UIEntry>(entries.map((e) => [e.id, e]));

export function entriesByCategory(slug: string): UIEntry[] {
  return entries.filter((e) => e.category === slug);
}

export function entriesBySource(id: string): UIEntry[] {
  return entries.filter((e) => e.source === id);
}

export function categoryCount(slug: string): number {
  let n = 0;
  for (const e of entries) if (e.category === slug) n++;
  return n;
}

export interface CategoryGroupView {
  group: CategoryGroup;
  label: string;
  items: (Category & { count: number })[];
}

export function groupedCategories(): CategoryGroupView[] {
  const groups: CategoryGroupView[] = [];
  for (const cat of categories) {
    let g = groups.find((x) => x.group === cat.group);
    if (!g) {
      g = { group: cat.group, label: GROUP_LABELS[cat.group], items: [] };
      groups.push(g);
    }
    g.items.push({ ...cat, count: categoryCount(cat.slug) });
  }
  return groups;
}

export function sourcesWithCounts(): (Source & { count: number })[] {
  return sources.map((s) => ({
    ...s,
    count: entries.filter((e) => e.source === s.id).length,
  }));
}

export function featuredEntries(): UIEntry[] {
  return entries.filter((e) => e.featured);
}

export function relatedEntries(entry: UIEntry, limit = 6): UIEntry[] {
  const scored = entries
    .filter((e) => e.id !== entry.id)
    .map((e) => {
      let score = 0;
      if (e.category === entry.category) score += 3;
      score += e.tags.filter((t) => entry.tags.includes(t)).length;
      if (e.source === entry.source) score += 0.5;
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.e);
}

export function topTags(limit = 18): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of entries) for (const t of e.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function stats() {
  return {
    entries: entries.length,
    sources: sources.length,
    categories: categories.length,
    livePreviews: entries.filter((e) => e.previewKey).length,
    vendorable: sources.filter((s) => s.previewMode === "live").length,
  };
}
