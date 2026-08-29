import { RetroGrid } from "./retro-grid";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-3xl font-bold leading-none tracking-tighter text-fg">
        Retro Grid
      </span>
      <RetroGrid />
    </div>
  );
}
