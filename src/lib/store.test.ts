import { beforeEach, describe, expect, test } from "vite-plus/test";

class LocalStorageStub {
  private data = new Map<string, string>();
  getItem(key: string) {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, String(value));
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
  clear() {
    this.data.clear();
  }
}

const storage = new LocalStorageStub();
Object.defineProperty(globalThis, "localStorage", {
  value: storage,
  configurable: true,
});

const { createLocalStore } = await import("./store");
const { favorites, recents } = await import("./store");

beforeEach(() => {
  storage.clear();
});

describe("createLocalStore", () => {
  test("toggle adds then removes an id", () => {
    const s = createLocalStore("test:toggle");
    s.toggle("a");
    expect(s.getSnapshot()).toEqual(["a"]);
    s.toggle("a");
    expect(s.getSnapshot()).toEqual([]);
  });

  test("toggle persists to localStorage", () => {
    const s = createLocalStore("test:persist");
    s.toggle("x");
    expect(JSON.parse(storage.getItem("test:persist") ?? "[]")).toEqual(["x"]);
  });

  test("push prepends, dedupes, and caps", () => {
    const s = createLocalStore("test:push", { cap: 3 });
    s.push("a");
    s.push("b");
    s.push("a");
    expect(s.getSnapshot()).toEqual(["a", "b"]);
    s.push("c");
    s.push("d");
    expect(s.getSnapshot()).toEqual(["d", "c", "a"]);
  });

  test("isValid prunes unknown ids stored by an older version", () => {
    storage.setItem("test:valid", JSON.stringify(["keep", "drop", 7]));
    const s = createLocalStore("test:valid", { isValid: (id) => id === "keep" });
    expect(s.getSnapshot()).toEqual(["keep"]);
    expect(JSON.parse(storage.getItem("test:valid") ?? "[]")).toEqual(["keep"]);
  });

  test("corrupt JSON falls back to empty", () => {
    storage.setItem("test:corrupt", "{not json");
    const s = createLocalStore("test:corrupt");
    expect(s.getSnapshot()).toEqual([]);
  });

  test("subscribers are notified on change", () => {
    const s = createLocalStore("test:sub");
    let calls = 0;
    const unsub = s.subscribe(() => calls++);
    s.toggle("a");
    expect(calls).toBe(1);
    unsub();
    s.toggle("b");
    expect(calls).toBe(1);
  });
});

describe("registry-backed stores", () => {
  test("favorites/recents expose has()", () => {
    expect(favorites.has("definitely-not-an-entry")).toBe(false);
    expect(recents.has("definitely-not-an-entry")).toBe(false);
  });
});
