import { AnimatedCircularProgressBar } from "./animated-circular-progress-bar";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <AnimatedCircularProgressBar
        value={72}
        gaugePrimaryColor="var(--accent)"
        gaugeSecondaryColor="var(--muted)"
      />
    </div>
  );
}
