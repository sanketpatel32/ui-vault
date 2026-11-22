import { CopyButton } from "@/components/copy-button";
import { highlightShell, type ShellTokenKind } from "@/lib/highlight-shell";
import { cn } from "@/lib/utils";

const tokenClass: Record<ShellTokenKind, string | undefined> = {
  command: "text-sky-300",
  keyword: "text-violet-300",
  package: "text-amber-200",
  version: "text-amber-200/60",
  url: "text-emerald-300",
  flag: "text-zinc-400",
  text: undefined,
  space: undefined,
};

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-black/60",
        className,
      )}
    >
      <pre className="overflow-x-auto p-3.5 pr-12 font-mono text-[13px] leading-relaxed text-zinc-200">
        <code>
          {highlightShell(code).map((token, i) =>
            tokenClass[token.kind] ? (
              <span key={i} className={tokenClass[token.kind]}>
                {token.text}
              </span>
            ) : (
              token.text
            ),
          )}
        </code>
      </pre>
      <CopyButton text={code} className="absolute top-2 right-2 hover:bg-white/10" />
    </div>
  );
}
