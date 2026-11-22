import { NeonGradientCard } from "./neon-gradient-card";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <NeonGradientCard neonColors={{ firstColor: "#00f1a1", secondColor: "#3b82f6" }}>
        <span className="px-6 py-4 text-sm font-semibold text-fg">Neon border</span>
      </NeonGradientCard>
    </div>
  );
}
