import { useState } from "react";
import { Slider } from "./slider";

export default function Preview() {
  const [volume, setVolume] = useState(65);
  const [range, setRange] = useState<number[]>([25, 75]);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-8 p-6">
        <div className="w-full max-w-xs">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-medium text-fg">Volume</span>
            <span className="text-sm text-muted-fg tabular-nums">{volume}%</span>
          </div>
          <Slider
            aria-label="Volume"
            max={100}
            min={0}
            value={volume}
            onValueChange={(value) => setVolume(typeof value === "number" ? value : value[0])}
          />
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-medium text-fg">Storage range</span>
            <span className="text-sm text-muted-fg tabular-nums">
              {range[0]}–{range[1]} GB
            </span>
          </div>
          <Slider
            aria-label="Storage range"
            max={100}
            min={0}
            value={range}
            onValueChange={(value) => setRange(typeof value === "number" ? [value] : [...value])}
          />
        </div>
      </div>
    </div>
  );
}
