import { describe, expect, test } from "vite-plus/test";
import { categories } from "@/data/categories";
import { entries } from "@/data";
import { sources } from "@/data/sources";
import { showcaseLoaders } from "@/showcase";
import {
  categoryBySlug,
  entriesByCategory,
  entriesBySource,
  entryById,
  featuredEntries,
  relatedEntries,
  sourceById,
  stats,
} from "./registry";

describe("registry selectors", () => {
  test("every entry id resolves in entryById", () => {
    expect(entryById.size).toBe(entries.length);
    expect(entryById.get(entries[0].id)?.id).toBe(entries[0].id);
  });

  test("every source/category of every entry is registered", () => {
    for (const e of entries) {
      expect(sourceById.has(e.source), `${e.id} source`).toBe(true);
      expect(categoryBySlug.has(e.category), `${e.id} category`).toBe(true);
    }
  });

  test("entriesByCategory covers every category-defined entry", () => {
    for (const c of categories) {
      const list = entriesByCategory(c.slug);
      expect(list.every((e) => e.category === c.slug)).toBe(true);
    }
  });

  test("entriesBySource only returns that source", () => {
    for (const s of sources.slice(0, 5)) {
      const list = entriesBySource(s.id);
      expect(list.length).toBeGreaterThan(0);
      expect(list.every((e) => e.source === s.id)).toBe(true);
    }
  });

  test("every previewKey resolves to a lazy loader", () => {
    const missing = entries.filter((e) => e.previewKey && !showcaseLoaders[e.previewKey]);
    expect(missing.map((e) => e.id)).toEqual([]);
  });

  test("stats() counts are consistent", () => {
    const s = stats();
    expect(s.entries).toBe(entries.length);
    expect(s.sources).toBe(sources.length);
    expect(s.categories).toBe(categories.length);
    expect(s.livePreviews).toBe(entries.filter((e) => e.previewKey).length);
  });
});

describe("related/featured", () => {
  test("related entries share the category and exclude the entry itself", () => {
    const withSiblings = entries.find((e) => entriesByCategory(e.category).length > 2);
    expect(withSiblings).toBeDefined();
    const related = relatedEntries(withSiblings!);
    expect(related).not.toContainEqual(expect.objectContaining({ id: withSiblings!.id }));
    expect(related.every((e) => e.category === withSiblings!.category)).toBe(true);
  });

  test("featured entries all carry the featured flag", () => {
    expect(featuredEntries().every((e) => e.featured)).toBe(true);
  });
});
