import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { UIEntry } from "@/data";
import { entryById } from "@/lib/registry";
import { favorites, useStore } from "@/lib/store";
import { EntryCard } from "@/components/entry-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

export function Favorites() {
  const ids = useStore(favorites);
  const items = ids.map((id) => entryById.get(id)).filter((e): e is UIEntry => !!e);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Heart size={20} className="text-amber-400" fill="currentColor" /> Favorites
        </h1>
        <p className="mt-1 text-sm text-muted-fg">
          {items.length} saved — stored locally in your browser, nowhere else.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No favorites yet"
          description="Star components as you browse and they’ll collect here for quick pickup."
          action={
            <Link to="/browse">
              <Button variant="outline" size="sm">
                Browse components
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
