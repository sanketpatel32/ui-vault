import { GlareHover } from "./glare-hover";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <GlareHover className="grid place-items-center rounded-xl border border-border bg-panel">
        <span className="px-8 py-6 text-sm font-medium text-fg">Glare sweep on hover</span>
      </GlareHover>
    </div>
  );
}
