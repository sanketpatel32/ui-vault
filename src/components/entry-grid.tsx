import { useEffect, useState } from "react";
import type { UIEntry } from "@/data";
import { EntryCard } from "@/components/entry-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 60;

/**
 * Grid of entry cards that renders incrementally — only the first PAGE_SIZE
 * cards mount up front, with a "Show more" button revealing the next page.
 * Rendering thousands of cards at once made every filter change repaint
 * the whole catalog. Pagination resets when `resetKey` changes.
 */
export function EntryGrid({
  items,
  resetKey,
  className,
}: {
  items: UIEntry[];
  /** Pagination resets only when this changes — not on every new array identity
   *  (e.g. removing a favorite must not collapse the list). */
  resetKey?: string;
  className?: string;
}) {
  const [shown, setShown] = useState(PAGE_SIZE);

  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [resetKey]);

  const visible = items.length > shown ? items.slice(0, shown) : items;
  const remaining = items.length - visible.length;

  return (
    <div className="space-y-4">
      <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
        {visible.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      {remaining > 0 && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" size="sm" onClick={() => setShown((n) => n + PAGE_SIZE)}>
            Show {Math.min(PAGE_SIZE, remaining)} more
            <span className="text-faint-fg">· {remaining} left</span>
          </Button>
        </div>
      )}
    </div>
  );
}
