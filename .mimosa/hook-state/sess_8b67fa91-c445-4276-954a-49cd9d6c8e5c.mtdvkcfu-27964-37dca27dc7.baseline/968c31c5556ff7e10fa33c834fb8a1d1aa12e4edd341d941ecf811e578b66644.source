import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-black/60",
        className,
      )}
    >
      <pre className="overflow-x-auto p-3.5 pr-12 font-mono text-[13px] leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} className="absolute top-2 right-2 hover:bg-white/10" />
    </div>
  );
}
