import { Spinner, type SpinnerProps } from "./index";

// Demo adapted from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/spinner) — the variants showcase.

const variants: SpinnerProps["variant"][] = [
  "default",
  "throbber",
  "pinwheel",
  "circle-filled",
  "ellipsis",
  "ring",
  "bars",
  "infinite",
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="grid min-h-96 grid-cols-4 items-center justify-center gap-8 p-6">
        {variants.map((variant) => (
          <div className="flex flex-col items-center justify-center gap-4" key={variant}>
            <Spinner key={variant} variant={variant} />
            <span className="font-mono text-muted-foreground text-xs">{variant}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
