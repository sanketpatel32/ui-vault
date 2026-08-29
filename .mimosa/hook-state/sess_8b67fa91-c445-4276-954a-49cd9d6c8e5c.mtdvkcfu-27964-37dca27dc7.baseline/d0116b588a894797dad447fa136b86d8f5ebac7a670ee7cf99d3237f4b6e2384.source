// Real NumberFlow package (MIT): https://number-flow.barvian.me/docs/grouping
import { useState } from "react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";

export default function Preview() {
  const [up, setUp] = useState(true);

  return (
    <div className="flex flex-col items-center gap-6">
      <NumberFlowGroup>
        <div className="flex items-baseline justify-center gap-3">
          <NumberFlow
            value={up ? 48 : 39}
            format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
            className="font-mono text-5xl font-semibold tabular-nums"
          />
          <NumberFlow
            value={up ? 0.23 : -0.11}
            format={{
              style: "percent",
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
              signDisplay: "always",
            }}
            className={`font-mono text-2xl font-semibold tabular-nums ${up ? "text-emerald-400" : "text-rose-400"}`}
          />
        </div>
      </NumberFlowGroup>
      <button
        type="button"
        onClick={() => setUp((u) => !u)}
        className="cursor-pointer rounded-lg border border-border px-4 py-1.5 text-sm text-muted-fg transition-colors hover:border-accent/40 hover:text-accent"
      >
        Toggle trend
      </button>
      <p className="text-sm text-muted-fg">Price and percentage tick together as one group</p>
    </div>
  );
}
