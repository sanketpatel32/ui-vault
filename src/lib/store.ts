import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for personal state (favorites, recents).
 * No backend — this is the whole persistence layer.
 */
export function createLocalStore(key: string, cap?: number) {
  let value: string[] = load();
  const listeners = new Set<() => void>();

  function load(): string[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  function persist() {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — state stays in-memory
    }
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot(): string[] {
      return value;
    },
    has(id: string) {
      return value.includes(id);
    },
    toggle(id: string) {
      value = value.includes(id) ? value.filter((x) => x !== id) : [...value, id];
      persist();
      listeners.forEach((l) => l());
    },
    push(id: string) {
      if (value[0] === id) return;
      value = [id, ...value.filter((x) => x !== id)].slice(0, cap ?? 50);
      persist();
      listeners.forEach((l) => l());
    },
  };
}

export type LocalStore = ReturnType<typeof createLocalStore>;

export function useStore(store: LocalStore): string[] {
  return useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getSnapshot(),
  );
}

export const favorites = createLocalStore("ui-vault:favorites");
export const recents = createLocalStore("ui-vault:recents", 12);
