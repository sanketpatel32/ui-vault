// Minimal client-side stand-in for `next/navigation` used by vendored demos. The real
// package's dev build reads `process.env`, which does not exist in a Vite SPA.
import { useMemo } from "react";

const noop = () => {};

export function useRouter() {
  return useMemo(
    () => ({
      push: (href: string) => window.location.assign(href),
      replace: (href: string) => window.location.replace(href),
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      refresh: noop,
      prefetch: noop,
    }),
    [],
  );
}

export function usePathname() {
  return window.location.pathname;
}

export function useSearchParams() {
  return new URLSearchParams(window.location.search);
}

export function useParams<T extends Record<string, string | string[]>>() {
  return {} as T;
}
