import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("flex flex-col items-center justify-center p-4")}>
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-dashed border-accent/40 bg-accent-soft/30 animate-[spin_12s_linear_infinite]">
        <span className="font-mono text-[11px] font-bold tracking-widest text-accent">
          REACT • BITS • VAULT •
        </span>
      </div>
    </div>
  );
}
