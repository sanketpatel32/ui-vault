import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronRight, Heart, LayoutGrid, House, Search, Vault, X } from "lucide-react";
import { groupedCategories, sourcesWithCounts, stats } from "@/lib/registry";
import { cn } from "@/lib/utils";

function SideLink({
  to,
  icon,
  label,
  count,
  dot,
  onNavigate,
}: {
  to: string;
  icon?: React.ReactNode;
  label: string;
  count?: number;
  dot?: string;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors",
          isActive
            ? "bg-accent-soft font-medium text-accent-text"
            : "text-muted-fg hover:bg-muted hover:text-fg",
        )
      }
    >
      {icon}
      {dot && <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dot }} />}
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span className="ml-auto text-[11px] tabular-nums text-faint-fg">{count}</span>
      )}
    </NavLink>
  );
}

const DESKTOP_QUERY = "(min-width: 64rem)";

function subscribeDesktop(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP_QUERY).matches);
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const groups = groupedCategories();
  const sources = sourcesWithCounts();
  const s = stats();
  const isDesktop = useIsDesktop();
  const [filter, setFilter] = useState("");
  const q = filter.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return null;
    return {
      categories: groups.flatMap((g) => g.items).filter((c) => c.name.toLowerCase().includes(q)),
      sources: sources.filter((src) => src.name.toLowerCase().includes(q)),
    };
  }, [q, groups, sources]);
  const drawerOpen = mobileOpen && !isDesktop;
  const asideRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!drawerOpen) return;
    const returnFocusTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !asideRef.current) return;
      const items = Array.from(asideRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const inside = asideRef.current.contains(current);
      if (e.shiftKey && (current === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (returnFocusTo?.isConnected) returnFocusTo.focus();
    };
  }, [drawerOpen]);

  return (
    <>
      {/* mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        ref={asideRef}
        inert={!mobileOpen && !isDesktop}
        role={drawerOpen ? "dialog" : undefined}
        aria-modal={drawerOpen ? true : undefined}
        aria-label={drawerOpen ? "Navigation menu" : undefined}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-bg transition-transform duration-200",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-sm shadow-accent/30">
              <Vault size={15} />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">UI Vault</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            className="cursor-pointer rounded-md p-1 text-muted-fg hover:bg-muted hover:text-fg lg:hidden"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          <div className="space-y-0.5">
            <SideLink to="/" icon={<House size={15} />} label="Home" onNavigate={onClose} />
            <SideLink
              to="/browse"
              icon={<LayoutGrid size={15} />}
              label="Browse all"
              onNavigate={onClose}
            />
            <SideLink
              to="/favorites"
              icon={<Heart size={15} />}
              label="Favorites"
              onNavigate={onClose}
            />
          </div>

          <div className="relative">
            <Search
              size={13}
              className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-faint-fg"
            />
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter categories & libraries…"
              aria-label="Filter categories and libraries"
              className="w-full rounded-lg border border-border bg-muted/40 py-1.5 pr-2.5 pl-8 text-[12.5px] text-fg placeholder:text-faint-fg focus:border-accent focus:outline-none"
            />
          </div>

          {filtered ? (
            <div className="space-y-0.5">
              {filtered.categories.length === 0 && filtered.sources.length === 0 && (
                <p className="px-2.5 py-1.5 text-[12px] text-faint-fg">No matches.</p>
              )}
              {filtered.sources.map((src) => (
                <SideLink
                  key={src.id}
                  to={`/source/${src.id}`}
                  label={src.name}
                  count={src.count}
                  dot={src.color}
                  onNavigate={onClose}
                />
              ))}
              {filtered.categories.map((cat) => (
                <SideLink
                  key={cat.slug}
                  to={`/c/${cat.slug}`}
                  label={cat.name}
                  count={cat.count}
                  onNavigate={onClose}
                />
              ))}
            </div>
          ) : (
            <>
              <div>
                <p className="mb-1 px-2.5 text-[10px] font-semibold tracking-[0.14em] text-faint-fg uppercase">
                  Libraries · {sources.length}
                </p>
                <div className="max-h-64 space-y-0.5 overflow-y-auto">
                  {sources.map((src) => (
                    <SideLink
                      key={src.id}
                      to={`/source/${src.id}`}
                      label={src.name}
                      count={src.count}
                      dot={src.color}
                      onNavigate={onClose}
                    />
                  ))}
                </div>
              </div>

              {groups.map((group) => (
                <details key={group.group} className="group/details" open>
                  <summary className="mb-1 flex cursor-pointer list-none items-center gap-1 px-2.5 text-[10px] font-semibold tracking-[0.14em] text-faint-fg uppercase select-none [&::-webkit-details-marker]:hidden">
                    <ChevronRight
                      size={10}
                      className="transition-transform group-open/details:rotate-90"
                    />
                    {group.label}
                  </summary>
                  <div className="space-y-0.5">
                    {group.items.map((cat) => (
                      <SideLink
                        key={cat.slug}
                        to={`/c/${cat.slug}`}
                        label={cat.name}
                        count={cat.count}
                        onNavigate={onClose}
                      />
                    ))}
                  </div>
                </details>
              ))}
            </>
          )}
        </nav>

        <div className="border-t border-border px-4 py-3 text-[11px] text-faint-fg">
          <a
            href={`${import.meta.env.BASE_URL}llms.txt`}
            className="transition-colors hover:text-accent-text"
            target="_blank"
            rel="noreferrer"
          >
            llms.txt
          </a>
          <span className="mx-1.5">·</span>
          <span>{s.entries} components · favorites stay in this browser</span>
        </div>
      </aside>
    </>
  );
}
