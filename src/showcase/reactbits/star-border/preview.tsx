import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("flex flex-col items-center gap-4")}>
      <div className="relative overflow-hidden rounded-xl p-[1.5px]">
        <div className="moving-border-track absolute inset-[-100%]" aria-hidden />
        <div className="relative rounded-[10px] bg-panel px-8 py-3.5 shadow-sm">
          <span className="text-sm font-semibold text-fg">Star Border Glow</span>
        </div>
      </div>
      <p className="text-xs text-muted-fg">Traveling streak along component perimeter</p>
    </div>
  );
}
