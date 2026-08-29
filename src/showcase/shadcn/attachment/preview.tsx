import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="rounded-xl border border-border bg-panel p-4 shadow-xs text-center space-y-2">
        <h4 className="text-sm font-semibold text-fg capitalize">attachment</h4>
        <p className="text-xs text-muted-fg">shadcn/ui canonical component implementation.</p>
        <Button size="sm" variant="outline">
          Interact
        </Button>
      </div>
    </div>
  );
}
