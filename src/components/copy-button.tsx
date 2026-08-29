import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      className={cn(
        "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-muted-fg transition-colors",
        "hover:bg-muted hover:text-fg",
        className,
      )}
      onClick={async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          // clipboard unavailable — ignore
        }
      }}
    >
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
}
