import { Particles } from "./particles";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <Particles className="absolute inset-0" quantity={60} ease={80} refresh />
      <div className="relative z-10 text-center">
        <h4 className="text-lg font-bold text-fg">Particles Effect</h4>
        <p className="mt-1 text-xs text-muted-fg">Dynamic floating background node network</p>
      </div>
    </div>
  );
}
