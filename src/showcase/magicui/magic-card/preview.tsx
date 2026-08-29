import { MagicCard } from "./magic-card";

export default function Preview() {
  return (
    <MagicCard className="cursor-pointer flex-col items-center justify-center p-8 text-center shadow-2xl w-72">
      <p className="text-base font-semibold text-fg">Magic Card</p>
      <p className="text-xs text-muted-fg mt-1">Interactive spotlight reflection border</p>
    </MagicCard>
  );
}
