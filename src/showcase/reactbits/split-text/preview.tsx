import { useState } from "react";

export default function Preview() {
  const [key, setKey] = useState(0);
  const words = ["Build", "stunning", "interfaces", "faster", "with", "UI", "Vault"];

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div
        key={key}
        className="flex flex-wrap justify-center gap-2 text-3xl font-bold tracking-tight text-fg"
      >
        {words.map((w, i) => (
          <span
            key={w + i}
            style={{ animationDelay: `${i * 80}ms` }}
            className="inline-block animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
          >
            {w}
          </span>
        ))}
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
      >
        Replay SplitText
      </button>
    </div>
  );
}
