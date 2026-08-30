import { NavLink, Link } from "react-router-dom";
import { ChevronRight, Heart, LayoutGrid, House, Vault, X } from "lucide-react";
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
            ? "bg-accent-soft font-medium text-accent"
            : "text-muted-fg hover:bg-muted hover:text-fg",
        )
      }
    >
      {icon}
      {dot && <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dot }} />}
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span className="ml-auto text-[11px] tabular-nums text-muted-fg/70">{count}</span>
      )}
    </NavLink>
  );
}

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const groups = groupedCategories();
  const sources = sourcesWithCounts();
  const s = stats();

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

          {groups.map((group) => (
            <div key={group.group}>
              <p className="mb-1 px-2.5 text-[10px] font-semibold tracking-[0.14em] text-muted-fg/60 uppercase">
                {group.label}
              </p>
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
            </div>
          ))}

          <div>
            <p className="mb-1 flex items-center gap-1 px-2.5 text-[10px] font-semibold tracking-[0.14em] text-muted-fg/60 uppercase">
              Sources <ChevronRight size={10} />
            </p>
            <div className="space-y-0.5">
              {sources.map((s) => (
                <SideLink
                  key={s.id}
                  to={`/source/${s.id}`}
                  label={s.name}
                  count={s.count}
                  dot={s.color}
                  onNavigate={onClose}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t border-border px-4 py-3 text-[11px] text-muted-fg/70">
          <a
            href={`${import.meta.env.BASE_URL}llms.txt`}
            className="transition-colors hover:text-accent"
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
