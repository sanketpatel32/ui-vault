import { useCallback, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const listeners = new Set<() => void>();
let current: Theme = read();

function read(): Theme {
  try {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  } catch {
    return "dark";
  }
}

function notify() {
  listeners.forEach((l) => l());
}

export function toggleTheme() {
  current = current === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark", current === "dark");
  try {
    localStorage.setItem("ui-vault:theme", current);
  } catch {
    // ignore
  }
  notify();
}

export function useTheme(): Theme {
  const subscribe = useCallback((listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);
  const getSnapshot = useCallback(() => current, []);
  return useSyncExternalStore(subscribe, getSnapshot);
}
