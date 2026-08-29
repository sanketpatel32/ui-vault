import { AnimatedBeam } from "./animated-beam";
import { useRef } from "react";
import { User, Server } from "lucide-react";

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-36 w-72 items-center justify-between overflow-hidden rounded-xl border border-border bg-panel p-6"
    >
      <div ref={fromRef} className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
        <User size={16} />
      </div>
      <div ref={toRef} className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
        <Server size={16} />
      </div>
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    </div>
  );
}
