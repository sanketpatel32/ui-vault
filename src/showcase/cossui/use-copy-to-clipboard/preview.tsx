import { useState } from "react";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

export default function Preview() {
  const [value, setValue] = useState("npx shadcn@latest add @coss/use-copy-to-clipboard");
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 });

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full max-w-md rounded-lg border border-border bg-panel px-3 py-2 font-mono text-xs"
        aria-label="Text to copy"
      />
      <button
        type="button"
        onClick={() => copyToClipboard(value)}
        className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
      >
        {isCopied ? "Copied ✓" : "Copy to clipboard"}
      </button>
      <p className="text-xs text-muted-fg">isCopied resets after the 2s timeout.</p>
    </div>
  );
}
