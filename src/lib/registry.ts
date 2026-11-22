import { useEffect, useState } from "react";
import {
  categories,
  entries,
  GROUP_LABELS,
  sources,
  type Category,
  type CategoryGroup,
  type EntrySummary,
  type License,
  type Source,
  type UIEntry,
} from "@/data";

export const sourceById = new Map<string, Source>(sources.map((s) => [s.id, s]));
export const categoryBySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));
export const entryById = new Map<string, EntrySummary>(entries.map((e) => [e.id, e]));

export function entriesByCategory(slug: string): EntrySummary[] {
  return entries.filter((e) => e.category === slug);
}

export function entriesBySource(id: string): EntrySummary[] {
  return entries.filter((e) => e.source === id);
}

// Full per-source records (install commands + source links) live in
// public/registry/<source>.json — fetched once per source, then cached.
const fullBySource = new Map<string, Promise<UIEntry[]>>();

export function loadSourceEntries(source: string): Promise<UIEntry[]> {
  let p = fullBySource.get(source);
  if (!p) {
    p = fetch(`${import.meta.env.BASE_URL}registry/${source}.json`)
      .then(async (r) => {
        const json = (r.headers.get("content-type") ?? "").includes("json");
        if (!r.ok || !json) {
          // Dev server mounts public/ at root, not under the deploy base.
          const fallback = await fetch(`/registry/${source}.json`);
          if (!fallback.ok) {
            throw new Error(`registry fetch failed for ${source}: ${fallback.status}`);
          }
          return fallback.json() as Promise<UIEntry[]>;
        }
        return r.json() as Promise<UIEntry[]>;
      })
      .catch((err) => {
        // Don't cache failures — a retry should refetch.
        fullBySource.delete(source);
        throw err;
      });
    fullBySource.set(source, p);
  }
  return p;
}

/** Resolves a summary to its full registry record (with install + sourceUrl). */
export function useFullEntry(summary: EntrySummary | undefined): UIEntry | undefined {
  const [full, setFull] = useState<{ id: string; entry: UIEntry } | null>(null);
  useEffect(() => {
    if (!summary) return;
    let alive = true;
    loadSourceEntries(summary.source)
      .then((list) => {
        const entry = list.find((e) => e.id === summary.id);
        if (alive && entry) setFull({ id: summary.id, entry });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [summary]);
  return full && full.id === summary?.id ? full.entry : undefined;
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

/** Licenses actually present in the registry, with entry counts (registry order of first use). */
export function licensesWithCounts(): { license: License; count: number }[] {
  const counts = new Map<License, number>();
  for (const e of entries) counts.set(e.license, (counts.get(e.license) ?? 0) + 1);
  return [...counts.entries()].map(([license, count]) => ({ license, count }));
}

export function featuredEntries(): EntrySummary[] {
  return entries.filter((e) => e.featured);
}

export function relatedEntries(entry: EntrySummary, limit = 6): EntrySummary[] {
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
