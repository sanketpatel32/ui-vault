// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/graphs/ring-chart.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import DonutChart from "@/showcase/animata/donut-chart/donut-chart";
import { cn } from "@/showcase/_shared/animata/lib/utils";

type RingItem = {
  progress: number;
  className?: string;
  trackClassName: string;
  progressClassName: string;
};

interface RingChartProps {
  /**
   * Size of the smallest ring
   * @default 96
   */
  size?: number;

  /**
   * Gap between rings
   * @default 4
   */
  gap?: number;

  /**
   * Width of the ring
   * @default 20
   */
  width?: number;

  /**
   * Additional class name of the container
   */
  className?: string;

  rings: RingItem[];
}

const sampleRings: RingItem[] = [
  {
    progress: 10,
    trackClassName: "text-rose-600/10",
    progressClassName: "text-rose-600",
  },
  {
    progress: 60,
    trackClassName: "text-lime-500/20",
    progressClassName: "text-lime-500",
  },
  {
    progress: 40,
    trackClassName: "text-teal-400/30",
    progressClassName: "text-teal-400",
  },
];

const calculateRingSize = ({
  size = 96,
  width = 20,
  gap = 4,
  index,
  total,
}: Pick<RingChartProps, "gap" | "size" | "width"> & {
  index: number;
  total: number;
}) => {
  const position = total - index;
  // Size of the smallest ring + ring width on 2 side + gap on 2 side
  // offset by the position.
  return size + position * width * 2 + gap * position * 2;
};

export default function RingChart({
  size = 96,
  gap = 4,
  width = 20,
  className,
  rings = sampleRings,
}: RingChartProps) {
  const totalWidth = calculateRingSize({
    size,
    width,
    gap,
    index: 0,
    total: rings.length,
  });

  return (
    <div
      className={cn("relative flex items-center justify-center rounded-3xl bg-zinc-950", className)}
      style={{
        minWidth: totalWidth + gap * rings.length * 4,
        minHeight: totalWidth + gap * rings.length * 4,
      }}
    >
      {rings.map((ring, index) => {
        const ringSize = calculateRingSize({
          size,
          width,
          gap,
          index,
          total: rings.length,
        });
        return (
          <DonutChart
            key={`ring_${index}`}
            size={ringSize}
            {...ring}
            progressWidth={width}
            circleWidth={width}
            className={cn("absolute", ring.className)}
          />
        );
      })}
    </div>
  );
}
