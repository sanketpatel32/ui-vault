import { useSyncExternalStore } from "react";
import { entryById } from "@/lib/registry";

/**
 * Tiny localStorage-backed store for personal state (favorites, recents).
 * No backend — this is the whole persistence layer.
 * Ids rejected by `isValid` (e.g. entries removed from the registry) are pruned on load.
 */
export function createLocalStore(
  key: string,
  { cap, isValid }: { cap?: number; isValid?: (id: string) => boolean } = {},
) {
  const listeners = new Set<() => void>();
  let value: string[] = load();

  function load(): string[] {
    try {
      const raw = localStorage.getItem(key);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      const ids = parsed.filter((x): x is string => typeof x === "string");
      const valid = isValid ? ids.filter(isValid) : ids;
      if (valid.length !== parsed.length) persist(valid);
      return valid;
    } catch {
      return [];
    }
  }

  function persist(next: string[] = value) {
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // storage full or unavailable — state stays in-memory
    }
  }

  function notify() {
    listeners.forEach((l) => l());
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key !== key && e.key !== null) return;
      value = load();
      notify();
    });
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
      notify();
    },
    push(id: string) {
      if (value[0] === id) return;
      value = [id, ...value.filter((x) => x !== id)].slice(0, cap ?? 50);
      persist();
      notify();
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

const isKnownEntry = (id: string) => entryById.has(id);

export const favorites = createLocalStore("ui-vault:favorites", { isValid: isKnownEntry });
export const recents = createLocalStore("ui-vault:recents", { cap: 12, isValid: isKnownEntry });
