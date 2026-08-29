import { FlickeringGrid } from "./flickering-grid";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#8b5cf6"
        maxOpacity={0.4}
        flickerChance={0.1}
      />
      <p className="z-10 text-2xl font-bold tracking-tight text-fg">Flickering Grid</p>
    </div>
  );
}
