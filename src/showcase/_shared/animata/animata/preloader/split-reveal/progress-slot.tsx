// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/progress-slot.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { ComponentProps } from "react";

import { cn } from "@/showcase/_shared/animata/lib/utils";

export function SplitRevealProgressSlot({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
        className,
      )}
      data-split-reveal-progress=""
      {...props}
    >
      <div className="w-[min(18rem,70vw)]">{children}</div>
    </div>
  );
}
