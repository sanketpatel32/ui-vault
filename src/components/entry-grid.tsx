import { useEffect, useRef, useState } from "react";
import type { EntrySummary } from "@/data";
import { EntryCard } from "@/components/entry-card";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 60;

/**
 * Renders an entry list in growing pages instead of mounting every card at once —
 * the full registry is ~64k DOM nodes when unfiltered. More cards mount as the
 * sentinel scrolls into view.
 */
export function EntryGrid({ items, className }: { items: EntrySummary[]; className?: string }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    // New result set — reset the window during render, not in an effect.
    setPrevItems(items);
    setVisible(PAGE_SIZE);
  }

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || visible >= items.length) return;
    const io = new IntersectionObserver(
      (observed) => {
        if (observed.some((e) => e.isIntersecting)) {
          setVisible((v) => Math.min(v + PAGE_SIZE, items.length));
        }
      },
      { rootMargin: "800px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [items.length, visible]);

  return (
    <div>
      <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
        {items.slice(0, visible).map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      {visible < items.length && (
        <div ref={sentinelRef} className="py-6 text-center text-xs text-faint-fg">
          Showing {visible.toLocaleString()} of {items.length.toLocaleString()} — scroll for more
        </div>
      )}
    </div>
  );
}
