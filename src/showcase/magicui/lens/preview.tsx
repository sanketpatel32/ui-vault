import { Lens } from "./lens";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Lens isStatic position={{ x: 140, y: 60 }} zoomFactor={2}>
        <div className="w-72 rounded-xl border border-border bg-panel p-6 text-sm leading-relaxed text-muted-fg">
          Hover the lens over this card — it magnifies whatever sits underneath it.
        </div>
      </Lens>
    </div>
  );
}
