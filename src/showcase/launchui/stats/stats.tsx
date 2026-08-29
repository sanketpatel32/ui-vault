import { cn } from "@/lib/utils";

export interface StatItemProps {
  value: string;
  label: string;
  className?: string;
}

export function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-panel p-3 text-center", className)}>
      <div className="text-lg font-bold text-fg">{value}</div>
      <div className="text-[10px] text-muted-fg mt-0.5">{label}</div>
    </div>
  );
}
