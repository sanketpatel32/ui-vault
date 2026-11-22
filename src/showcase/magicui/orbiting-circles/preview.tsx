import { OrbitingCircles } from "./orbiting-circles";
import { Bell, Star, Zap } from "lucide-react";

export default function Preview() {
  return (
    <div className="relative flex h-64 items-center justify-center p-4">
      <OrbitingCircles iconSize={36} radius={90}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-panel text-accent-text">
          <Bell size={16} />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-panel text-accent-text">
          <Star size={16} />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-panel text-accent-text">
          <Zap size={16} />
        </span>
      </OrbitingCircles>
    </div>
  );
}
