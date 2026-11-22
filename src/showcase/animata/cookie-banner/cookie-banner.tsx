// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/skeleton/cookie-banner.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
export default function CookieBanner() {
  return (
    <div className="flex min-h-52 w-52 flex-col gap-3 rounded-md border bg-background p-3 shadow-xl transition-shadow hover:shadow-sm dark:border-zinc-700">
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="h-2 w-1/2 rounded-md bg-muted-foreground/25" />
        <div className="h-2 w-3/4 rounded-md bg-muted" />
        <div className="h-2 w-3/5 rounded-md bg-muted" />
      </div>
      <button
        type="button"
        aria-label="Accept cookies"
        className="w-full rounded-sm bg-blue-400 p-2"
      >
        <span className="block h-1.5 rounded-sm bg-muted" />
      </button>
    </div>
  );
}
