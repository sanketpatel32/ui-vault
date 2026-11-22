// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/animated-gradient-text.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { cn } from "@/showcase/_shared/animata/lib/utils";

export default function AnimatedGradientText({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-size animate-bg-position bg-linear-to-r from-yellow-500 from-30% via-yellow-700 via-50% to-pink-500 to-80% bg-size-[200%_auto] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}
