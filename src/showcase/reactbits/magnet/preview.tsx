import { useState } from "react";

export default function Preview() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex h-48 w-72 items-center justify-center rounded-2xl border border-dashed border-border bg-panel"
    >
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        }}
      >
        <button className="rounded-xl border border-border bg-accent text-accent-fg px-4 py-2 text-sm font-medium shadow-md">
          Magnetic Button
        </button>
      </div>
    </div>
  );
}
