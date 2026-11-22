import { ProgressiveBlur } from "./progressive-blur";

export default function Preview() {
  return (
    <div className="relative flex h-56 w-full items-end justify-center overflow-hidden p-4">
      <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-60">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-md bg-accent-soft" />
        ))}
      </div>
      <ProgressiveBlur className="pointer-events-none absolute inset-x-0 bottom-0" />
    </div>
  );
}
