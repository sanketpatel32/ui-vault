import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { entries } from "@/data";
import { sourceById, categoryBySlug } from "@/lib/registry";
import { searchEntries } from "@/lib/search";
import { FilterBar, type Filters } from "@/components/filter-bar";
import { EntryGrid } from "@/components/entry-grid";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";

export function Browse() {
  const [params, setParams] = useSearchParams();

  const q = params.get("q") ?? "";
  const src = params.get("src") ?? "";
  const lic = params.get("lic") ?? "";
  const tag = params.get("tag") ?? "";
  const cat = params.get("cat") ?? "";
  const sort = params.get("sort") ?? "default";

  const filters: Filters = useMemo(() => ({ q, src, lic, tag }), [q, src, lic, tag]);

  const onChange = (next: Filters) => {
    const p = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (value) p.set(key, value);
      else p.delete(key);
    }
    setParams(p, { replace: true });
  };

  const setParam = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value) p.set(key, value);
    else p.delete(key);
    setParams(p, { replace: true });
  };

  const results = useMemo(() => {
    let list = entries;
    if (cat) list = list.filter((e) => e.category === cat);
    if (src) list = list.filter((e) => e.source === src);
    if (lic) list = list.filter((e) => e.license === lic);
    if (tag) list = list.filter((e) => e.tags.includes(tag));
    if (q.trim()) {
      const ranked = searchEntries(q, entries.length);
      if (sort === "default") {
        // Default sort during a search is the fuse relevance ranking itself.
        const allowed = new Set(list.map((e) => e.id));
        list = ranked.filter((e) => allowed.has(e.id));
      } else {
        const ids = new Set(ranked.map((e) => e.id));
        list = list.filter((e) => ids.has(e.id));
      }
    }
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "source")
      list = [...list].sort(
        (a, b) => a.source.localeCompare(b.source) || a.name.localeCompare(b.name),
      );
    return list;
  }, [cat, q, src, lic, tag, sort]);

  const activeFilters: { key: keyof Filters | "cat"; label: string }[] = [];
  if (cat) {
    const c = categoryBySlug.get(cat);
    activeFilters.push({ key: "cat", label: c ? c.name : cat });
  }
  if (filters.q) activeFilters.push({ key: "q", label: `“${filters.q}”` });
  if (filters.src) {
    const s = sourceById.get(filters.src);
    activeFilters.push({ key: "src", label: s ? s.name : filters.src });
  }
  if (filters.lic) activeFilters.push({ key: "lic", label: filters.lic.toUpperCase() });
  if (filters.tag) activeFilters.push({ key: "tag", label: `#${filters.tag}` });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Browse</h1>
          <p className="mt-1 text-sm text-muted-fg">
            <span className="font-medium text-fg tabular-nums">{results.length}</span> component
            {results.length === 1 ? "" : "s"}
            {cat && " in this category"} · filters are saved in the URL
          </p>
        </div>
        <Select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value === "default" ? "" : e.target.value)}
          aria-label="Sort results"
          className="w-40"
        >
          <option value="default">{q.trim() ? "Relevance" : "Curated order"}</option>
          <option value="name">Name A–Z</option>
          <option value="source">By source</option>
        </Select>
      </div>

      <FilterBar filters={filters} onChange={onChange} />

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() =>
                f.key === "cat" ? setParam("cat", "") : onChange({ ...filters, [f.key]: "" })
              }
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-text transition-colors hover:border-accent/60"
            >
              {f.label}
              <X size={11} className="opacity-70" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              const p = new URLSearchParams(params);
              p.delete("q");
              p.delete("src");
              p.delete("lic");
              p.delete("tag");
              p.delete("cat");
              setParams(p, { replace: true });
            }}
            className="ml-1 cursor-pointer px-1.5 text-[11px] text-faint-fg transition-colors hover:text-fg"
          >
            Clear all
          </button>
        </div>
      )}

      {results.length > 0 ? (
        <div className="animate-rise">
          <EntryGrid items={results} />
        </div>
      ) : (
        <EmptyState
          title="No components match"
          description="Try clearing a filter or two — or search for something broader."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange({ q: "", src: "", lic: "", tag: "" })}
            >
              Clear all filters
            </Button>
          }
        />
      )}
    </div>
  );
}
