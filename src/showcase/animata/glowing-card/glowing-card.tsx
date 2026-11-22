// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/card/glowing-card.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type React from "react";

import { cn } from "@/showcase/_shared/animata/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Starting gradient color.
   */
  fromColor?: string;
  /**
   * Middle gradient color.
   */
  viaColor?: string;
  /**
   * Ending gradient color.
   */
  toColor?: string;
}

export default function GlowingCard({
  fromColor = "#4158D0",
  viaColor = "#C850C0",
  toColor = "#FFCC70",
  className,
  ...props
}: GlowCardProps) {
  const gradient = `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`;

  return (
    <div
      className={cn(
        "rounded-3xl p-0.5 transition-[box-shadow,filter] duration-500 ease-in-out hover:shadow-glow hover:brightness-150",
        className,
      )}
      style={{ backgroundImage: gradient }}
      {...props}
    >
      <div className="relative w-56 overflow-hidden rounded-[calc(1.5rem-2px)]">
        <div
          aria-hidden
          className="blur-20 pointer-events-none absolute inset-0 rounded-[calc(1.5rem-2px)] transition-[filter] duration-500 ease-in-out"
          style={{ backgroundImage: gradient }}
        />
        <div className="relative flex h-64 flex-col gap-2 bg-blue-950 p-4">
          <div className="mb-2 text-xl font-bold text-gray-50">Glowing</div>

          <div className="flex-1 text-sm font-medium text-gray-100/80">
            A glowing card is a card that glows.
          </div>
        </div>
      </div>
    </div>
  );
}
