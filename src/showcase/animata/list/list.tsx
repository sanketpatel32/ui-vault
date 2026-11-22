// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/skeleton/list.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
export default function List() {
  return (
    <div className="flex min-h-52 w-52 flex-col gap-3 rounded-md border bg-background p-3 shadow-xl transition-shadow hover:shadow-sm dark:border-zinc-700">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`item-${i}`} className="flex w-full items-center justify-between gap-2">
          <div className="h-2 w-2 rounded-md bg-muted" />
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <div className="h-2 flex-1 rounded-md bg-muted" />
        </div>
      ))}

      <div className="mt-auto flex w-full justify-end gap-2">
        <button type="button" aria-label="Confirm" className="w-2/5 rounded-sm bg-green-500 p-2">
          <span className="block h-1.5 rounded-sm bg-muted" />
        </button>

        <button type="button" aria-label="Dismiss" className="w-1/5 rounded-sm bg-muted p-2">
          <span className="block h-1.5 rounded-sm bg-gray-300" />
        </button>
      </div>
    </div>
  );
}
