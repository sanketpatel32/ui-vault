import { AnimatedShinyText } from "./animated-shiny-text";

export default function Preview() {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full border border-border bg-panel px-4 py-1.5 shadow-xs">
        <AnimatedShinyText className="text-xs font-semibold">
          ✨ Introducing Magic UI Components
        </AnimatedShinyText>
      </div>
    </div>
  );
}
