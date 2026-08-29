import { Link } from "react-router-dom";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { entries, type UIEntry } from "@/data";
import {
  featuredEntries,
  groupedCategories,
  sourcesWithCounts,
  stats,
  entryById,
} from "@/lib/registry";
import { recents, useStore } from "@/lib/store";
import { EntryCard } from "@/components/entry-card";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "@/components/source-badge";

function Grid({ items }: { items: UIEntry[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((e) => (
        <EntryCard key={e.id} entry={e} />
      ))}
    </div>
  );
}

export function Home() {
  const s = stats();
  const featured = featuredEntries();
  const groups = groupedCategories();
  const sources = sourcesWithCounts();
  const recentIds = useStore(recents);
  const recent = recentIds.map((id) => entryById.get(id)).filter((e): e is UIEntry => !!e);

  return (
    <div className="space-y-14">
      {/* hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-panel px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)]"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <Sparkles size={12} /> {s.entries} components · {s.sources} sources
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Every UI component you love, in one vault.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-fg">
            A personal catalog of {s.entries} components from {s.sources} curated sources —
            categorized, searchable, and {s.livePreviews} of them preview live right here.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/browse">
              <Button>
                Start browsing <ArrowRight size={15} />
              </Button>
            </Link>
            <Link to="/c/text-animation">
              <Button variant="outline">Text effects</Button>
            </Link>
            <Link to="/c/hero">
              <Button variant="outline">Hero sections</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* recently viewed */}
      {recent.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-fg uppercase">
            <Clock size={13} /> Recently viewed
          </h2>
          <Grid items={recent.slice(0, 3)} />
        </section>
      )}

      {/* featured */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Featured picks</h2>
          <Link to="/browse" className="text-sm text-muted-fg transition-colors hover:text-accent">
            View all →
          </Link>
        </div>
        <Grid items={featured} />
      </section>

      {/* categories */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Browse by category</h2>
        <div className="space-y-5">
          {groups.map((g) => (
            <div key={g.group}>
              <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-fg/70 uppercase">
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/c/${cat.slug}`}
                    className="rounded-lg border border-border bg-panel px-3 py-1.5 text-[13px] text-fg transition-all hover:-translate-y-px hover:border-accent/40 hover:text-accent"
                  >
                    {cat.name}
                    <span className="ml-1.5 text-[11px] text-muted-fg/70">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* sources */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Sources</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((src) => (
            <Link
              key={src.id}
              to={`/source/${src.id}`}
              className="group flex items-center justify-between rounded-lg border border-border bg-panel px-3.5 py-3 transition-all hover:-translate-y-px hover:border-accent/40"
            >
              <div className="min-w-0">
                <SourceBadge source={src.id} className="text-xs" />
                <p className="mt-0.5 truncate text-xs text-muted-fg/80">{src.tagline}</p>
              </div>
              <span className="ml-3 shrink-0 text-xs tabular-nums text-muted-fg/70">
                {src.count}/{entries.filter((e) => e.source === src.id).length ? src.count : 0}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
