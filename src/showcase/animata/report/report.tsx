// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/skeleton/report.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { cn } from "@/showcase/_shared/animata/lib/utils";

export default function Report({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-52 w-52 flex-col gap-3 rounded-md border bg-background p-3 shadow-xl transition-shadow hover:shadow-sm dark:border-zinc-700",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b pb-3 dark:border-zinc-700">
        <span className="font-semibold text-foreground">Report</span>

        <span className="inline-block w-fit rounded-md bg-blue-600 px-2 py-1 text-center text-xs font-semibold text-white">
          CSV
        </span>
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <div className="h-2 w-full rounded-md bg-muted" key={`item-${i}`} />
      ))}
      <div className="h-2 w-1/2 rounded-md bg-muted" />
    </div>
  );
}
