import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div
      className={cn(
        "relative flex h-40 w-72 items-center justify-center rounded-2xl border border-border bg-panel p-6 shadow-sm overflow-hidden",
      )}
    >
      <div className="moving-border-track absolute inset-[-100%]" aria-hidden />
      <div className="relative rounded-xl bg-panel px-6 py-4 text-center z-10">
        <p className="text-sm font-semibold text-fg">Border Trail</p>
        <p className="text-xs text-muted-fg">Animated streak along container perimeter</p>
      </div>
    </div>
  );
}
