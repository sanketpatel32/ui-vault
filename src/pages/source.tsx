import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import type { SourceId } from "@/data";
import { entriesBySource, sourceById } from "@/lib/registry";
import { LicenseBadge } from "@/components/license-badge";
import { EntryCard } from "@/components/entry-card";
import { CodeBlock } from "@/components/code-block";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SourcePage() {
  const { id = "" } = useParams();
  const source = sourceById.get(id as SourceId);

  if (!source) {
    return <EmptyState title="Unknown source" description={`No source named “${id}” exists.`} />;
  }

  const items = entriesBySource(source.id);

  return (
    <div className="space-y-6">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-xs text-muted-fg transition-colors hover:text-accent"
      >
        <ArrowLeft size={12} /> All components
      </Link>

      <header className="rounded-2xl border border-border bg-panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: source.color }}
            >
              {source.name.slice(0, 1)}
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{source.name}</h1>
              <p className="mt-0.5 text-sm text-muted-fg">{source.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <LicenseBadge license={source.license} />
                {source.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.open(source.url, "_blank")}>
            Visit site <ExternalLink size={12} />
          </Button>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-fg">{source.description}</p>

        {source.install && (
          <div className="mt-4 max-w-xl">
            <p className="mb-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted-fg/70 uppercase">
              {source.installLabel ?? "Install"}
            </p>
            <CodeBlock code={source.install} />
          </div>
        )}

        {source.notes && (
          <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs leading-relaxed text-amber-200/90">
            <ShieldCheck size={14} className="mt-0.5 shrink-0" />
            {source.notes}
          </p>
        )}
      </header>

      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          {items.length} cataloged from {source.name}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
