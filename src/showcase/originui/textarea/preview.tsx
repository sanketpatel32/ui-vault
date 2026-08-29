import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="rounded-xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm space-y-2">
      <h4 className="text-sm font-semibold text-fg capitalize">textarea Family</h4>
      <p className="text-xs text-muted-fg leading-relaxed">
        Origin UI curated high-density component variant collection.
      </p>
      <Button size="sm" variant="outline">Inspect Variants</Button>
    </div>
  );
}
