import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Minus, Plus } from "lucide-react";

export default function Preview() {
  const [val, setVal] = useState(42);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-panel p-2 shadow-xs">
        <button
          onClick={() => setVal((v) => Math.max(0, v - 1))}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-muted text-fg transition-colors hover:bg-accent-soft hover:text-accent"
          aria-label="Decrease"
        >
          <Minus size={16} />
        </button>

        <div className="min-w-[70px] text-center font-mono text-3xl font-bold tracking-tight text-fg">
          <NumberFlow value={val} />
        </div>

        <button
          onClick={() => setVal((v) => v + 1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-muted text-fg transition-colors hover:bg-accent-soft hover:text-accent"
          aria-label="Increase"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className="text-xs text-muted-fg">Interactive stepper with animated digit transitions</p>
    </div>
  );
}
