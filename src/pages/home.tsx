import { Link } from "react-router-dom";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { type UIEntry } from "@/data";
import {
  featuredEntries,
  groupedCategories,
  sourcesWithCounts,
  stats,
  entryById,
} from "@/lib/registry";
import { recents, useStore } from "@/lib/store";
import { useCountUp } from "@/lib/use-count-up";
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

function Stat({ value, label }: { value: number; label: string }) {
  const n = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-3.5">
      <span className="text-2xl font-semibold tracking-tight text-fg tabular-nums">{n}</span>
      <span className="text-[11px] font-medium tracking-wide text-muted-fg/80 uppercase">
        {label}
      </span>
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
      <section className="relative overflow-hidden rounded-2xl border border-border bg-panel px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden className="vault-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="vault-glow pointer-events-none absolute inset-0" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/70 px-3 py-1 text-xs text-muted-fg backdrop-blur-sm">
            <Sparkles size={12} className="text-accent" />
            {s.entries} components · {s.sources} sources · {s.categories} categories
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-fg sm:text-[3.25rem] sm:leading-[1.08]">
            Every UI component you love, <span className="text-gradient">in one vault.</span>
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
          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-border rounded-xl border border-border bg-bg/70 backdrop-blur-sm">
            <Stat value={s.entries} label="Components" />
            <Stat value={s.livePreviews} label="Live previews" />
            <Stat value={s.sources} label="Sources" />
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
                    className="group flex items-center gap-2 rounded-lg border border-border bg-panel px-3 py-1.5 text-[13px] text-fg transition-all hover:-translate-y-px hover:border-accent/40 hover:text-accent hover:shadow-sm hover:shadow-accent/10"
                  >
                    {cat.name}
                    <span className="rounded bg-muted px-1 py-0.5 text-[10.5px] tabular-nums text-muted-fg/80 transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                      {cat.count}
                    </span>
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
              className="group flex items-center justify-between rounded-lg border border-border bg-panel px-3.5 py-3 transition-all hover:-translate-y-px hover:border-accent/40 hover:shadow-sm hover:shadow-accent/10"
            >
              <div className="min-w-0">
                <SourceBadge source={src.id} className="text-xs" />
                <p className="mt-0.5 truncate text-xs text-muted-fg/80">{src.tagline}</p>
              </div>
              <span className="ml-3 shrink-0 text-xs tabular-nums text-muted-fg/70 transition-colors group-hover:text-accent">
                {src.count}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
