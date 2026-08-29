import { useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Preview() {
  const [count, setCount] = useState(482);

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="font-mono text-5xl font-bold tracking-tight text-accent">
        <NumberFlow value={count} />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCount((c) => c + 15)}
          className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
        >
          +15
        </button>
        <button
          onClick={() => setCount((c) => Math.max(0, c - 20))}
          className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
        >
          -20
        </button>
      </div>
    </div>
  );
}
