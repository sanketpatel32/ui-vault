import { Link } from "react-router-dom";
import { Heart, Menu, Moon, Search, Sun } from "lucide-react";
import { toggleTheme, useTheme } from "@/lib/theme";
import { favorites, useStore } from "@/lib/store";

export function Topbar({
  onOpenMenu,
  onOpenPalette,
}: {
  onOpenMenu: () => void;
  onOpenPalette: () => void;
}) {
  const theme = useTheme();
  const favCount = useStore(favorites).length;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/80 bg-bg/75 px-4 backdrop-blur-xl lg:px-8">
      <button
        type="button"
        aria-label="Open menu"
        className="cursor-pointer rounded-lg p-2 text-muted-fg hover:bg-muted hover:text-fg lg:hidden"
        onClick={onOpenMenu}
      >
        <Menu size={18} />
      </button>

      <button
        type="button"
        onClick={onOpenPalette}
        className="flex h-9 max-w-md flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-fg/80 transition-all hover:border-accent/40 hover:bg-muted hover:text-fg hover:shadow-sm hover:shadow-accent/10"
      >
        <Search size={15} className="shrink-0" />
        <span className="flex-1 truncate text-left">Search components, sources, tags…</span>
        <kbd className="hidden shrink-0 rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-muted-fg/80 shadow-sm sm:block">
          Ctrl K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        {favCount > 0 && (
          <Link
            to="/favorites"
            aria-label={`Favorites (${favCount})`}
            className="relative rounded-lg p-2 text-muted-fg transition-colors hover:bg-muted hover:text-amber-400"
          >
            <Heart size={17} />
            <span className="absolute top-1 right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-accent px-0.5 text-[9px] font-semibold text-accent-fg tabular-nums">
              {favCount}
            </span>
          </Link>
        )}
        <button
          type="button"
          aria-label="Toggle theme"
          className="cursor-pointer rounded-lg p-2 text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
