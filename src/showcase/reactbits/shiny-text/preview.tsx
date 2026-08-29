import { cn } from "@/lib/utils";
// Re-implemented from React Bits "ShinyText" (MIT): https://reactbits.dev/text-animations/shiny-text
// Keyframes live in src/index.css (.shiny-text)
export default function Preview() {
  return (
    <div className={cn("text-center")}>
      <p className="shiny-text text-4xl font-bold tracking-tight sm:text-5xl">Ship beautiful UI</p>
      <p className="mt-4 text-sm text-muted-fg">A light sweep travels across the text</p>
    </div>
  );
}
