import { Search, X } from "lucide-react";
import { sourcesWithCounts, topTags } from "@/lib/registry";
import { Input, Select } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Filters {
  q: string;
  src: string;
  lic: string;
  type: string;
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
  const tags = topTags(14);
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const dirty = filters.q || filters.src || filters.lic || filters.type || filters.tag;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1">
          <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-fg" />
          <Input
            value={filters.q}
            onChange={(e) => set({ q: e.target.value })}
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
          <option value="mit">MIT</option>
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid</option>
        </Select>
        <Select
          value={filters.type}
          onChange={(e) => set({ type: e.target.value })}
          aria-label="Filter by type"
        >
          <option value="">Live + link-out</option>
          <option value="live">Live preview</option>
          <option value="linkout">Link-out</option>
        </Select>
        {dirty && (
          <button
            type="button"
            onClick={() => onChange({ q: "", src: "", lic: "", type: "", tag: "" })}
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
            onClick={() => set({ tag: filters.tag === tag ? "" : tag })}
            className={cn(
              "cursor-pointer rounded-full border px-2.5 py-1 text-[11px] transition-colors",
              filters.tag === tag
                ? "border-accent bg-accent text-accent-fg"
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
