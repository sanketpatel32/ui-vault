import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("grid grid-cols-3 gap-4 max-w-md text-center")}>
      <div className="rounded-xl border border-border bg-panel p-4">
        <div className="text-xl font-bold text-fg">10k+</div>
        <div className="text-[10px] text-muted-fg">Developers</div>
      </div>
      <div className="rounded-xl border border-border bg-panel p-4">
        <div className="text-xl font-bold text-fg">99.9%</div>
        <div className="text-[10px] text-muted-fg">Uptime</div>
      </div>
      <div className="rounded-xl border border-border bg-panel p-4">
        <div className="text-xl font-bold text-fg">50+</div>
        <div className="text-[10px] text-muted-fg">Components</div>
      </div>
    </div>
  );
}
