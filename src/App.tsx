import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { CommandPalette } from "@/components/command-palette";
import { Home } from "@/pages/home";
import { Browse } from "@/pages/browse";
import { CategoryPage } from "@/pages/category";
import { SourcePage } from "@/pages/source";
import { ComponentDetail } from "@/pages/component-detail";
import { Favorites } from "@/pages/favorites";
import { NotFound } from "@/pages/not-found";

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
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
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="lg:pl-64">
        <Topbar
          onOpenMenu={() => setMobileNavOpen(true)}
          onOpenPalette={() => setPaletteOpen(true)}
        />
        <main key={location.pathname} className="animate-rise mx-auto max-w-6xl px-4 py-8 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/c/:slug" element={<CategoryPage />} />
            <Route path="/source/:id" element={<SourcePage />} />
            <Route path="/component/:id" element={<ComponentDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
