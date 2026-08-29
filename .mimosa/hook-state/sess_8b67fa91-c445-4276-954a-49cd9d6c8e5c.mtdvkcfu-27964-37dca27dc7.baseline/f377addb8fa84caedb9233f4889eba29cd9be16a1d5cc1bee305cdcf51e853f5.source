import { Link } from "react-router-dom";
import type { UIEntry } from "@/data";
import { categoryBySlug } from "@/lib/registry";
import { SourceBadge } from "@/components/source-badge";
import { LicenseBadge, TypeBadge } from "@/components/license-badge";
import { StarButton } from "@/components/star-button";

export function EntryCard({ entry }: { entry: UIEntry }) {
  const category = categoryBySlug.get(entry.category);
  return (
    <Link
      to={`/component/${entry.id}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-panel p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <SourceBadge source={entry.source} />
          <LicenseBadge license={entry.license} />
          <TypeBadge mode={entry.previewMode} />
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
        <div className="mt-auto flex items-center justify-between pt-1 text-[11px] text-muted-fg/80">
          <span className="rounded-md bg-muted px-1.5 py-0.5">{category.name}</span>
          <span>{entry.sourceCategory}</span>
        </div>
      )}
    </Link>
  );
}
