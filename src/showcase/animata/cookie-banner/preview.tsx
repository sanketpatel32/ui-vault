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
        <h4 className="text-base font-semibold text-fg tracking-tight">Cookie Banner</h4>
        <p className="text-xs text-muted-fg leading-relaxed">
          Consent-style skeleton with body copy lines and a full-width action bar.
        </p>
      </div>
    </div>
  );
}
