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
        <h4 className="text-base font-semibold text-fg tracking-tight">Hover Interaction</h4>
        <p className="text-xs text-muted-fg leading-relaxed">
          This is a component which shows icon based on text hovered by user. By default it has
          alreay imported Twitter/x, Framer, Figma, Instagram, GitHub, LinkedIn, and it shows
          Square-Box icon by default it user tries to get other icons without importing. Importing
          steps are provided below.
        </p>
      </div>
    </div>
  );
}
