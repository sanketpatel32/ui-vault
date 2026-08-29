export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-panel p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium text-accent uppercase tracking-wider">
            animata
          </span>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <h4 className="text-base font-semibold text-fg tracking-tight">Progress</h4>
        <p className="text-xs text-muted-fg leading-relaxed">
          A sample progress graph for widgets/presentation. This is not a full-fledged chart
          library. Just use for presentation or as an interactive part of the app.
        </p>
      </div>
    </div>
  );
}
