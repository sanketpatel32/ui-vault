export default function Preview() {
  return (
    <div className="w-80 rounded-xl border border-border bg-panel p-2 shadow-xl">
      <div className="flex items-center gap-1.5 px-2 py-1 mb-2 border-b border-border/50">
        <div className="size-2 rounded-full bg-red-500/80" />
        <div className="size-2 rounded-full bg-yellow-500/80" />
        <div className="size-2 rounded-full bg-green-500/80" />
      </div>
      <div className="h-28 rounded-md bg-muted/40 flex items-center justify-center text-xs text-muted-fg">
        Browser Window Mockup
      </div>
    </div>
  );
}
