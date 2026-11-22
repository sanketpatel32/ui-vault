// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/progress-count.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { cn } from "@/showcase/_shared/animata/lib/utils";

export function SplitRevealProgressCount({
  loaded,
  total,
  foregroundColor,
  className,
}: {
  loaded: number;
  total: number;
  foregroundColor: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 text-center text-[11px] font-medium tabular-nums tracking-[0.12em]",
        className,
      )}
      style={{ color: `color-mix(in srgb, ${foregroundColor} 45%, transparent)` }}
    >
      {String(loaded).padStart(2, "0")}
      <span style={{ color: `color-mix(in srgb, ${foregroundColor} 20%, transparent)` }}> / </span>
      {String(total).padStart(2, "0")}
    </p>
  );
}
