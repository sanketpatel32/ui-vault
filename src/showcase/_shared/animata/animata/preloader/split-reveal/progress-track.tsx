// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/progress-track.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { cn } from "@/showcase/_shared/animata/lib/utils";

export function SplitRevealProgressTrack({
  progress,
  foregroundColor,
  className,
}: {
  progress: number;
  foregroundColor: string;
  className?: string;
}) {
  return (
    <div
      className={cn("h-px w-full", className)}
      style={{ backgroundColor: `color-mix(in srgb, ${foregroundColor} 8%, transparent)` }}
    >
      <div
        className="h-px transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%`, backgroundColor: foregroundColor }}
      />
    </div>
  );
}
