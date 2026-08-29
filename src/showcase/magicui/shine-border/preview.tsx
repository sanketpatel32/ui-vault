import { ShineBorder } from "./shine-border";

export default function Preview() {
  return (
    <ShineBorder
      className="relative flex h-36 w-64 flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-panel p-4 text-center"
      color="#A07CFE"
    >
      <span className="text-sm font-semibold text-fg">Shine Border</span>
    </ShineBorder>
  );
}
