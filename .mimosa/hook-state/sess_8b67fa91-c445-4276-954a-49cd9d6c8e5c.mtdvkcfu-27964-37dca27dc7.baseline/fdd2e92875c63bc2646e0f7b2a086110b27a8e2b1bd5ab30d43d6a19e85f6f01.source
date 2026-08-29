// Real NumberFlow package (MIT): https://number-flow.barvian.me
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Preview() {
  const [value, setValue] = useState(128);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => Math.max(0, v + Math.floor(Math.random() * 11) - 4));
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-6xl font-semibold tabular-nums">
        <NumberFlow value={value} />
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setValue((v) => Math.max(0, v - 25))}
          className="cursor-pointer rounded-lg border border-border px-4 py-1.5 text-sm text-muted-fg transition-colors hover:border-accent/40 hover:text-accent"
        >
          −25
        </button>
        <button
          type="button"
          onClick={() => setValue((v) => v + 25)}
          className="cursor-pointer rounded-lg border border-border px-4 py-1.5 text-sm text-muted-fg transition-colors hover:border-accent/40 hover:text-accent"
        >
          +25
        </button>
      </div>
      <p className="text-sm text-muted-fg">Digits spin, slide and cross-fade on change</p>
    </div>
  );
}
