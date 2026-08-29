import { useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Preview() {
  const [val, setVal] = useState(1280);

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="font-mono text-4xl font-bold tracking-tight text-fg">
        $<NumberFlow value={val} />
      </div>
      <button
        onClick={() => setVal(Math.floor(Math.random() * 9000) + 1000)}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
      >
        Randomize Value
      </button>
    </div>
  );
}
