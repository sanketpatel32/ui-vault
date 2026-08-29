import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("relative flex items-center justify-center p-8")}>
      <div className="absolute h-24 w-24 rounded-full bg-accent/40 blur-2xl" />
      <div className="relative z-10 rounded-xl border border-border bg-panel/90 px-6 py-3 text-xs font-semibold shadow-lg">
        Luminous Glow Effect
      </div>
    </div>
  );
}
