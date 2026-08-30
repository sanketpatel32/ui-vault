import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { UIEntry } from "@/data";
import { categoryBySlug } from "@/lib/registry";
import { SourceBadge } from "@/components/source-badge";
import { LicenseBadge, PreviewBadge } from "@/components/license-badge";
import { StarButton } from "@/components/star-button";

export function EntryCard({ entry }: { entry: UIEntry }) {
  const category = categoryBySlug.get(entry.category);
  return (
    <Link
      to={`/component/${entry.id}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-panel p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <SourceBadge source={entry.source} />
          <LicenseBadge license={entry.license} />
          <PreviewBadge entry={entry} />
        </div>
        <StarButton id={entry.id} className="-mt-1 -mr-1" />
      </div>

      <div>
        <h3 className="font-semibold leading-tight text-fg transition-colors group-hover:text-accent">
          {entry.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-fg">{entry.description}</p>
      </div>

      {category && (
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[11px] text-muted-fg">
            {category.name}
          </span>
          <ArrowUpRight
            size={14}
            className="text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        </div>
      )}
    </Link>
  );
}
