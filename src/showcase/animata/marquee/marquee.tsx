// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/container/marquee.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { cn } from "@/showcase/_shared/animata/lib/utils";

import "./marquee.css";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Should the marquee scroll horizontally or vertically.
   * If set to `true`, the marquee will scroll vertically.
   *
   * @default false
   */
  vertical?: boolean;

  /**
   * The number of times to repeat the children. Set this value so that the repeated children overflow the container.
   * @default 5
   */
  repeat?: number;

  /**
   * Reverse the marquee direction.
   */
  reverse?: boolean;

  /**
   * Pause the marquee animation on hover.
   */
  pauseOnHover?: boolean;

  /**
   * Apply a gradient mask to the marquee.
   * @default true
   */
  applyMask?: boolean;
}

export default function Marquee({
  children,
  vertical = false,
  repeat = 5,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group/marquee relative flex h-full w-full p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)]",
        {
          "flex-col": vertical,
          "flex-row": !vertical,
        },
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={`item-${index}`}
          className={cn("flex shrink-0 [gap:var(--gap)]", {
            "marquee-pause-on-hover": pauseOnHover,
            "marquee-horizontal flex-row": !vertical,
            "marquee-vertical flex-col": vertical,
          })}
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {children}
        </div>
      ))}
      {applyMask && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95% dark:from-gray-800/50 dark:via-transparent dark:to-gray-800/50",
            {
              "bg-linear-to-b": vertical,
              "bg-linear-to-r": !vertical,
            },
          )}
        />
      )}
    </div>
  );
}
