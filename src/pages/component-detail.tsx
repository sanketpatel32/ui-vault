import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink, Tag } from "lucide-react";
import { categoryBySlug, entryById, relatedEntries, sourceById } from "@/lib/registry";
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
  const entry = entryById.get(id);

  useEffect(() => {
    if (entry) recents.push(entry.id);
  }, [entry]);

  if (!entry) {
    return (
      <EmptyState title="Unknown component" description={`No component with id “${id}” exists.`} />
    );
  }

  const source = sourceById.get(entry.source);
  const category = categoryBySlug.get(entry.category);
  const related = relatedEntries(entry);

  return (
    <div className="space-y-8">
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-fg">
        <Link to="/browse" className="transition-colors hover:text-accent">
          Browse
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/c/${category.slug}`} className="transition-colors hover:text-accent">
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
              <SourceBadge source={entry.source} className="text-xs hover:text-accent" />
            </Link>
            <LicenseBadge license={entry.license} />
            <PreviewBadge entry={entry} />
            <span className="text-[11px] text-muted-fg/70">
              in “{entry.sourceCategory}” at source
            </span>
          </div>
        </div>
        <StarButton id={entry.id} className="h-10 w-10 rounded-lg hover:bg-muted" />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <PreviewFrame entry={entry} />

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-panel p-4">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-fg/70 uppercase">
              About
            </p>
            <p className="text-sm leading-relaxed text-muted-fg">{entry.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/browse?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-fg transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  <Tag size={9} />
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {entry.install && (
            <div className="rounded-xl border border-border bg-panel p-4">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-fg/70 uppercase">
                Install
              </p>
              <CodeBlock code={entry.install} />
            </div>
          )}

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
