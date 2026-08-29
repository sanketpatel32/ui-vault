import { AnimatedGradientText } from "./animated-gradient-text";

export default function Preview() {
  return (
    <div className="flex items-center justify-center">
      <AnimatedGradientText>
        🎉 <hr className="mx-2 h-4 w-px bg-border" />
        <span className="text-xs font-medium">Gradient Text Banner</span>
      </AnimatedGradientText>
    </div>
  );
}
