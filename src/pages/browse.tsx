import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { entries } from "@/data";
import { searchEntries } from "@/lib/search";
import { FilterBar, type Filters } from "@/components/filter-bar";
import { EntryCard } from "@/components/entry-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

export function Browse() {
  const [params, setParams] = useSearchParams();

  const filters: Filters = {
    q: params.get("q") ?? "",
    src: params.get("src") ?? "",
    lic: params.get("lic") ?? "",
    type: params.get("type") ?? "",
    tag: params.get("tag") ?? "",
  };

  const cat = params.get("cat") ?? "";

  const onChange = (next: Filters) => {
    const p = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (value) p.set(key, value);
      else p.delete(key);
    }
    setParams(p, { replace: true });
  };

  const results = useMemo(() => {
    let list = entries;
    if (cat) list = list.filter((e) => e.category === cat);
    if (filters.src) list = list.filter((e) => e.source === filters.src);
    if (filters.lic) list = list.filter((e) => e.license === filters.lic);
    if (filters.type) list = list.filter((e) => e.previewMode === filters.type);
    if (filters.tag) list = list.filter((e) => e.tags.includes(filters.tag));
    if (filters.q.trim()) {
      const ids = new Set(searchEntries(filters.q, 200).map((e) => e.id));
      list = list.filter((e) => ids.has(e.id));
    }
    return list;
  }, [cat, filters]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Browse</h1>
        <p className="mt-1 text-sm text-muted-fg">
          {results.length} component{results.length === 1 ? "" : "s"}
          {cat && ` in this category`} · filters are saved in the URL
        </p>
      </div>

      <FilterBar filters={filters} onChange={onChange} />

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No components match"
          description="Try clearing a filter or two — or search for something broader."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange({ q: "", src: "", lic: "", type: "", tag: "" })}
            >
              Clear all filters
            </Button>
          }
        />
      )}
    </div>
  );
}
