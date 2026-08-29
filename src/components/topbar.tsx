import { Menu, Moon, Search, Sun } from "lucide-react";
import { toggleTheme, useTheme } from "@/lib/theme";

export function Topbar({
  onOpenMenu,
  onOpenPalette,
}: {
  onOpenMenu: () => void;
  onOpenPalette: () => void;
}) {
  const theme = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-bg/80 px-4 backdrop-blur-md lg:px-8">
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
        className="flex h-9 flex-1 max-w-md cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-panel px-3 text-sm text-muted-fg/80 transition-colors hover:border-accent/40 hover:text-fg"
      >
        <Search size={15} />
        <span className="flex-1 text-left">Search components, sources, tags…</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:block">
          Ctrl K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
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
