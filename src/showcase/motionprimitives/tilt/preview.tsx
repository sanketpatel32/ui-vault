import { useState } from "react";

export default function Preview() {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        setRot({ x, y });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 800 }}
      className="flex items-center justify-center p-4"
    >
      <div
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        className="flex h-44 w-72 flex-col justify-between rounded-2xl border border-border bg-panel p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-accent">3D TILT</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <p className="text-sm font-semibold text-fg">Hover pointer across this card</p>
        <p className="text-[11px] text-muted-fg">Smooth gyro perspective response</p>
      </div>
    </div>
  );
}
