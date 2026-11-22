import { describe, expect, test } from "vite-plus/test";
import { entries } from "@/data";
import { searchEntries } from "@/lib/search";
import { browseResults, SEARCH_RESULT_LIMIT, type BrowseFilters } from "@/lib/browse";

const filters = (patch: Partial<BrowseFilters> = {}): BrowseFilters => ({
  q: "",
  src: "",
  lic: "",
  tag: "",
  cat: "",
  sort: "default",
  ...patch,
});

describe("browseResults search relevance", () => {
  test("keeps fuse relevance order when searching with the default sort", () => {
    const q = "split text";
    const ranked = searchEntries(q, SEARCH_RESULT_LIMIT).map((e) => e.id);
    // The top fuse hit must not be buried behind registry-ordered weaker hits.
    expect(ranked.length).toBeGreaterThan(1);
    const top = ranked[0];

    const result = browseResults(filters({ q }));
    const ids = result.map((e) => e.id);

    expect(ids[0]).toBe(top);
    expect(ids).toEqual(ranked);
  });

  test("does not render every weak fuzzy hit for a broad query", () => {
    const q = "split text";
    const ranked = searchEntries(q, SEARCH_RESULT_LIMIT).map((e) => e.id);
    const result = browseResults(filters({ q }));
    // A search result set follows the search limit, not the whole registry.
    expect(result.length).toBeLessThanOrEqual(ranked.length);
  });

  test("explicit sort still overrides relevance", () => {
    const q = "split text";
    const result = browseResults(filters({ q, sort: "name" }));
    const names = result.map((e) => e.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test("applies other filters on top of search results", () => {
    const q = "split text";
    const result = browseResults(filters({ q, src: "reactbits" }));
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((e) => e.source === "reactbits")).toBe(true);
  });

  test("no query preserves curated registry order", () => {
    const result = browseResults(filters());
    expect(result.map((e) => e.id)).toEqual(entries.map((e) => e.id));
  });
});
