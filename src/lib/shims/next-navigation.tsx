// Minimal next/navigation stand-in for vendored Next.js demos (SPA, no RSC).
export function useRouter() {
  return {
    push: (href: string) => window.location.assign(href),
    replace: (href: string) => window.location.replace(href),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => {},
    prefetch: () => {},
  };
}

export function usePathname() {
  return window.location.pathname;
}

export function useSearchParams() {
  return new URLSearchParams(window.location.search);
}
