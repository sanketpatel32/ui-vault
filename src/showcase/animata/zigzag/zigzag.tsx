// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/zigzag.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { cn } from "@/showcase/_shared/animata/lib/utils";

interface ZigZagProps {
  /**
   * Color of the pattern
   */
  color?: string;

  /**
   * Size of the pattern in pixels
   */
  size?: number;

  /**
   * Content of the component
   */
  children?: React.ReactNode;

  /**
   * Additional classes
   */
  className?: string;
}

function Placeholder() {
  return (
    <div className="flex max-h-full min-h-64 min-w-72 max-w-full items-center justify-center">
      <div className="rounded bg-foreground text-background px-4 py-2">
        This has zigzag background
      </div>
    </div>
  );
}

export default function ZigZag({ color = "#cacaca", size = 10, children, className }: ZigZagProps) {
  return (
    <div className={cn("bg-background", className)}>
      <div
        key={`zigzag-${color}-${size}`}
        style={{
          background: `linear-gradient(135deg, ${color} 25%, transparent 25%) -${size}px 0,
        linear-gradient(225deg, ${color} 25%, transparent 25%) -${size}px 0,
        linear-gradient(315deg, ${color} 25%, transparent 25%),
        linear-gradient(45deg, ${color} 25%, transparent 25%)`,
          backgroundSize: `calc(2 * ${size}px) calc(2 * ${size}px)`,
        }}
      >
        {children ?? <Placeholder />}
      </div>
    </div>
  );
}
