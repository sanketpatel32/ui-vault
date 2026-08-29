import { BorderBeam } from "./border-beam";

export default function Preview() {
  return (
    <div className="relative flex h-36 w-64 flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-panel p-4 text-center">
      <span className="text-sm font-semibold text-fg">Border Beam</span>
      <BorderBeam size={80} duration={8} delay={4} />
    </div>
  );
}
