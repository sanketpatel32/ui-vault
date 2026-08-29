import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { categoryBySlug, entriesByCategory } from "@/lib/registry";
import { EntryCard } from "@/components/entry-card";
import { EmptyState } from "@/components/empty-state";

export function CategoryPage() {
  const { slug = "" } = useParams();
  const category = categoryBySlug.get(slug);

  if (!category) {
    return (
      <EmptyState title="Unknown category" description={`No category named “${slug}” exists.`} />
    );
  }

  const items = entriesByCategory(slug);

  return (
    <div className="space-y-5">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-xs text-muted-fg transition-colors hover:text-accent"
      >
        <ArrowLeft size={12} /> All components
      </Link>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-fg/70 uppercase">
          {category.group}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{category.name}</h1>
        <p className="mt-1.5 max-w-xl text-sm text-muted-fg">{category.description}</p>
        <p className="mt-1 text-sm text-muted-fg/70">{items.length} entries</p>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nothing here yet"
          description="This category is reserved but has no entries."
        />
      )}
    </div>
  );
}
