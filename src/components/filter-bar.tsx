import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { licensesWithCounts, sourcesWithCounts, topTags } from "@/lib/registry";
import { LICENSE_LABEL } from "@/lib/license";
import { Input, Select } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Filters {
  q: string;
  src: string;
  lic: string;
  tag: string;
}

export function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
}) {
  const sources = sourcesWithCounts();
  const licenses = licensesWithCounts();
  const tags = topTags(14);
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const dirty = filters.q || filters.src || filters.lic || filters.tag;

  // Debounce the search box — writing `q` to the URL on every keystroke re-runs
  // the fuse scan and re-renders the whole grid per character.
  const [q, setQ] = useState(filters.q);
  const filtersRef = useRef(filters);
  const [prevFiltersQ, setPrevFiltersQ] = useState(filters.q);
  useEffect(() => {
    filtersRef.current = filters;
  });
  if (filters.q !== prevFiltersQ) {
    // External change (chip removal, clear-all, URL nav) — resync during render.
    setPrevFiltersQ(filters.q);
    setQ(filters.q);
  }
  useEffect(() => {
    if (q === filtersRef.current.q) return;
    const t = setTimeout(() => onChange({ ...filtersRef.current, q }), 200);
    return () => clearTimeout(t);
  }, [q, onChange]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1">
          <Search
            size={14}
            aria-hidden="true"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-fg"
          />
          <Input
            type="search"
            aria-label="Search components by name, description, or tag"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, description, tags…"
            className="pl-8.5"
          />
        </div>
        <Select
          value={filters.src}
          onChange={(e) => set({ src: e.target.value })}
          aria-label="Filter by source"
        >
          <option value="">All sources</option>
          {sources.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.count})
            </option>
          ))}
        </Select>
        <Select
          value={filters.lic}
          onChange={(e) => set({ lic: e.target.value })}
          aria-label="Filter by license"
        >
          <option value="">Any license</option>
          {licenses.map((l) => (
            <option key={l.license} value={l.license}>
              {LICENSE_LABEL[l.license]} ({l.count})
            </option>
          ))}
        </Select>
        {dirty && (
          <button
            type="button"
            onClick={() => onChange({ q: "", src: "", lic: "", tag: "" })}
            className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-2.5 text-xs text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            aria-pressed={filters.tag === tag}
            aria-label={`Filter by tag ${tag} (${count})`}
            onClick={() => set({ tag: filters.tag === tag ? "" : tag })}
            className={cn(
              "cursor-pointer rounded-full border px-2.5 py-1 text-[11px] transition-colors",
              filters.tag === tag
                ? "border-accent bg-accent-solid text-accent-fg"
                : "border-border text-muted-fg hover:border-accent/40 hover:text-fg",
            )}
          >
            {tag} <span className="opacity-60">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
