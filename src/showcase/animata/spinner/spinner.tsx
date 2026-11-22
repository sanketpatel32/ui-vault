// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/progress/spinner.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { cn } from "@/showcase/_shared/animata/lib/utils";

interface SpinnerProps {
  className?: string;
  outerSize?: string;
  childSize?: string;
}
export default function Spinner({ className, outerSize, childSize }: SpinnerProps) {
  return (
    <div
      className={cn(
        "m-2 h-8 w-8 animate-spin items-center justify-center rounded-full bg-linear-to-bl from-pink-500 to-blue-600 p-0.5",
        className,
        outerSize,
      )}
    >
      <div className={cn("h-6 w-6 rounded-full bg-white", childSize)} />
    </div>
  );
}
