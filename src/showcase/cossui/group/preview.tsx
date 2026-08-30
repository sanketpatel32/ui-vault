import { useState } from "react";
import { ChevronDown, Copy, ClipboardPaste, Printer, Share2 } from "lucide-react";
import { Group, GroupSeparator } from "./group";

const actionClass =
  "relative inline-flex h-9 cursor-pointer select-none items-center gap-2 rounded-lg border border-border bg-panel px-3.5 text-sm font-medium text-fg shadow-xs outline-none transition-colors hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50";

export default function Preview() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-6 p-6">
        <Group aria-label="Document actions">
          <button
            type="button"
            data-slot="button"
            className={actionClass}
            onClick={() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1500);
            }}
          >
            <Copy className="size-4 opacity-70" />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button type="button" data-slot="button" className={actionClass}>
            <ClipboardPaste className="size-4 opacity-70" />
            Paste
          </button>
          <button type="button" data-slot="button" className={actionClass}>
            <Printer className="size-4 opacity-70" />
            Print
          </button>
          <GroupSeparator />
          <button type="button" data-slot="button" className={actionClass} aria-label="Share">
            <Share2 className="size-4 opacity-70" />
          </button>
          <button
            type="button"
            data-slot="button"
            className={actionClass}
            aria-label="More actions"
          >
            <ChevronDown className="size-4 opacity-70" />
          </button>
        </Group>
        <p className="text-xs text-muted-fg">
          Adjacent children merge into one pill — the separator splits the group.
        </p>
      </div>
    </div>
  );
}
