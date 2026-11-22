import { NumberTicker } from "./number-ticker";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <NumberTicker
        value={3157}
        className="text-5xl font-bold tracking-tight tabular-nums text-fg"
      />
    </div>
  );
}
