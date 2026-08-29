import { useState } from "react";

export default function Preview() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative flex h-56 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-8 shadow-xs"
    >
      <div
        style={{
          background: `radial-gradient(circle 120px at ${pos.x}% ${pos.y}%, rgba(139, 92, 246, 0.25), transparent 80%)`,
        }}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10 text-center">
        <h4 className="text-lg font-semibold text-fg">Interactive Spotlight</h4>
        <p className="mt-1 text-xs text-muted-fg">Hover and move pointer around this container</p>
      </div>
    </div>
  );
}
