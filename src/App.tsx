import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { CommandPalette } from "@/components/command-palette";
import { Home } from "@/pages/home";
import { RouteFallback } from "@/components/route-fallback";
import { pageName, pageTitle } from "@/lib/page-title";

const Browse = lazy(() => import("@/pages/browse").then((m) => ({ default: m.Browse })));
const CategoryPage = lazy(() =>
  import("@/pages/category").then((m) => ({ default: m.CategoryPage })),
);
const SourcePage = lazy(() => import("@/pages/source").then((m) => ({ default: m.SourcePage })));
const ComponentDetail = lazy(() =>
  import("@/pages/component-detail").then((m) => ({ default: m.ComponentDetail })),
);
const Favorites = lazy(() => import("@/pages/favorites").then((m) => ({ default: m.Favorites })));
const NotFound = lazy(() => import("@/pages/not-found").then((m) => ({ default: m.NotFound })));

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const lastPathname = useRef<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileNavOpen(false);
    document.title = pageTitle(location.pathname);
    const isNavigation =
      lastPathname.current !== null && lastPathname.current !== location.pathname;
    lastPathname.current = location.pathname;
    if (!isNavigation) return;
    // clear first so repeated identical messages (e.g. two "Accordion" pages) are re-announced
    setAnnouncement("");
    const id = window.setTimeout(
      () => setAnnouncement(`Navigated to ${pageName(location.pathname)}`),
      100,
    );
    return () => window.clearTimeout(id);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-panel focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-fg focus:shadow-lg focus:ring-1 focus:ring-ring focus:outline-none"
      >
        Skip to content
      </a>
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="lg:pl-64">
        <Topbar
          onOpenMenu={() => setMobileNavOpen(true)}
          onOpenPalette={() => setPaletteOpen(true)}
        />
        <main
          id="main"
          tabIndex={-1}
          className="mx-auto max-w-6xl px-4 py-8 focus:outline-none lg:px-8"
        >
          <div key={location.pathname} className="animate-rise">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/c/:slug" element={<CategoryPage />} />
                <Route path="/source/:id" element={<SourcePage />} />
                <Route path="/component/:id" element={<ComponentDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
