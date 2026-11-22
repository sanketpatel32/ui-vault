import { describe, expect, test } from "vite-plus/test";
import { searchEntries } from "./search";

describe("searchEntries", () => {
  test("blank query returns nothing", () => {
    expect(searchEntries("")).toEqual([]);
    expect(searchEntries("   ")).toEqual([]);
  });

  test("finds an entry by exact name", () => {
    const results = searchEntries("SplitText");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("reactbits-split-text");
  });

  test("matches on source name", () => {
    const results = searchEntries("magicui");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((e) => e.source === "magicui")).toBe(true);
  });

  test("respects the limit", () => {
    expect(searchEntries("button", 5).length).toBeLessThanOrEqual(5);
  });

  test("single character uses prefix matching", () => {
    const results = searchEntries("b");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((e) => e.name.toLowerCase().startsWith("b"))).toBe(true);
  });
});
