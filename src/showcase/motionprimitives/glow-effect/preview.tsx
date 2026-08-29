// Re-implemented from Motion Primitives "Glow Effect" (MIT):
// https://motion-primitives.com/docs/glow-effect
import { useRef, useState } from "react";

export default function Preview() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative w-full max-w-md overflow-hidden rounded-xl border border-border p-10 text-center"
      style={{
        background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)`,
      }}
    >
      <p className="font-medium text-fg">Hover across this card</p>
      <p className="mt-1.5 text-sm text-muted-fg">The glow follows your pointer</p>
    </div>
  );
}
