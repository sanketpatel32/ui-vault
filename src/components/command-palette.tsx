import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Flame } from "lucide-react";
import { searchEntries } from "@/lib/search";
import { featuredEntries } from "@/lib/registry";
import { SourceBadge } from "@/components/source-badge";
import { cn } from "@/lib/utils";

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const listboxId = useId();
  const optionId = (i: number) => `${listboxId}-option-${i}`;

  const results = useMemo(() => {
    if (query.trim()) return searchEntries(query, 12);
    return featuredEntries().slice(0, 8);
  }, [query]);

  // Reset transient state during render when the palette opens or the query changes.
  const [wasOpen, setWasOpen] = useState(open);
  const [prevQuery, setPrevQuery] = useState(query);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setActive(0);
    }
  } else if (query !== prevQuery) {
    setPrevQuery(query);
    setActive(0);
  }

  useEffect(() => {
    if (!open) return;
    const returnFocusTo = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      if (returnFocusTo?.isConnected) returnFocusTo.focus();
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[aria-selected="true"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "Tab") {
        // The input is the only tabbable element; keep focus inside the dialog.
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[active]) {
        void navigate(`/component/${results[active].id}`);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search components"
        className="animate-rise w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-panel shadow-2xl shadow-black/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search size={16} className="shrink-0 text-muted-fg" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? optionId(active) : undefined}
            aria-label="Search components, sources, tags"
            placeholder="Search components, sources, tags…"
            className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint-fg"
          />
        </div>

        <p role="status" className="sr-only">
          {results.length === 0
            ? "No results"
            : `${results.length} ${results.length === 1 ? "result" : "results"}`}
        </p>

        <div className="max-h-[46vh] overflow-y-auto p-2">
          {!query.trim() && (
            <p className="flex items-center gap-1.5 px-2 pb-1.5 text-[11px] font-medium text-faint-fg">
              <Flame size={11} /> Featured
            </p>
          )}
          {results.length === 0 && (
            <p className="px-2 py-8 text-center text-sm text-muted-fg">Nothing matches “{query}”</p>
          )}
          <div ref={listRef} id={listboxId} role="listbox" aria-label="Search results">
            {results.map((entry, i) => (
              <div
                key={entry.id}
                id={optionId(i)}
                role="option"
                aria-selected={i === active}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                  i === active ? "bg-accent-soft" : "hover:bg-muted",
                )}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  void navigate(`/component/${entry.id}`);
                  onClose();
                }}
              >
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      i === active ? "text-accent-text" : "text-fg",
                    )}
                  >
                    {entry.name}
                  </p>
                  <p className="truncate text-xs text-muted-fg">{entry.description}</p>
                </div>
                <SourceBadge source={entry.source} className="shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-faint-fg">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
