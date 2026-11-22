import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink, Tag } from "lucide-react";
import type { UIEntry } from "@/data";
import {
  categoryBySlug,
  entryById,
  relatedEntries,
  sourceById,
  useFullEntry,
} from "@/lib/registry";
import { recents } from "@/lib/store";
import { SourceBadge } from "@/components/source-badge";
import { LicenseBadge, PreviewBadge } from "@/components/license-badge";
import { StarButton } from "@/components/star-button";
import { PreviewFrame } from "@/components/preview-frame";
import { CodeBlock } from "@/components/code-block";
import { EntryCard } from "@/components/entry-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

export function ComponentDetail() {
  const { id = "" } = useParams();
  const summary = entryById.get(id);
  // Full record (install command + deep link) loads from public/registry/<source>.json.
  const { entry: fullEntry, failed } = useFullEntry(summary);

  useEffect(() => {
    if (summary) recents.push(summary.id);
  }, [summary]);

  if (!summary) {
    return (
      <EmptyState title="Unknown component" description={`No component with id “${id}” exists.`} />
    );
  }

  const source = sourceById.get(summary.source);
  const category = categoryBySlug.get(summary.category);
  const related = relatedEntries(summary);
  // Until the per-source JSON arrives, fall back to the source's own URL for links.
  const entry: UIEntry = fullEntry ?? { ...summary, sourceUrl: source?.url ?? "" };

  return (
    <div className="space-y-8">
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-fg">
        <Link to="/browse" className="transition-colors hover:text-accent-text">
          Browse
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/c/${category.slug}`} className="transition-colors hover:text-accent-text">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-fg">{entry.name}</span>
      </nav>

      {/* header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{entry.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link to={`/source/${entry.source}`}>
              <SourceBadge source={entry.source} className="text-xs hover:text-accent-text" />
            </Link>
            <LicenseBadge license={entry.license} />
            <PreviewBadge entry={entry} />
            <span className="text-[11px] text-faint-fg">in “{entry.sourceCategory}” at source</span>
          </div>
        </div>
        <StarButton id={entry.id} className="h-10 w-10 rounded-lg hover:bg-muted" />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <PreviewFrame entry={entry} />

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-panel p-4">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-faint-fg uppercase">
              About
            </p>
            <p className="text-sm leading-relaxed text-muted-fg">{entry.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/browse?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-fg transition-colors hover:bg-accent-soft hover:text-accent-text"
                >
                  <Tag size={9} />
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {entry.install ? (
            <div className="rounded-xl border border-border bg-panel p-4">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-faint-fg uppercase">
                Install
              </p>
              <CodeBlock code={entry.install} />
            </div>
          ) : failed ? (
            <div className="rounded-xl border border-border bg-panel p-4">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-faint-fg uppercase">
                Install
              </p>
              <p className="text-xs text-muted-fg">
                Couldn&rsquo;t load the install command — refresh to retry.
              </p>
            </div>
          ) : null}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(entry.sourceUrl, "_blank")}
          >
            View at {source?.name} <ExternalLink size={13} />
          </Button>
        </aside>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Related</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
