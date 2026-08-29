import { Ripple } from "./ripple";

export default function Preview() {
  return (
    <div className="relative flex h-52 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel">
      <p className="z-10 whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter text-fg">
        Ripple
      </p>
      <Ripple />
    </div>
  );
}
