import { useState } from "react";

export default function Preview() {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
        const y = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
        setRot({ x, y });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 1000 }}
      className="p-4"
    >
      <div
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="w-80 rounded-2xl border border-border bg-panel p-6 shadow-2xl space-y-4"
      >
        <h4 className="text-lg font-bold text-fg">Aceternity 3D Card</h4>
        <p className="text-xs text-muted-fg leading-relaxed">
          Hover over this card to experience realistic multi-plane 3D perspective shifts.
        </p>
        <div className="h-32 w-full rounded-xl bg-linear-to-br from-accent/30 via-pink-500/20 to-cyan-400/20 flex items-center justify-center border border-accent/20">
          <span className="font-mono text-xs font-semibold text-accent">Interactive 3D Plane</span>
        </div>
      </div>
    </div>
  );
}
