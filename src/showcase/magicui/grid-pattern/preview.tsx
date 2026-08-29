import { GridPattern } from "./grid-pattern";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <p className="z-10 text-2xl font-bold tracking-tight text-fg">Grid Pattern</p>
      <GridPattern className="[mask-image:radial-gradient(150px_circle_at_center,white,transparent)]" />
    </div>
  );
}
