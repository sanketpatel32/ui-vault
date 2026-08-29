import { Meteors } from "./meteors";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950 p-6 shadow-xl">
      <Meteors number={20} />
      <div className="relative z-10 text-center">
        <h4 className="text-xl font-bold tracking-tight text-white">Meteor Shower</h4>
        <p className="mt-1 text-xs text-zinc-400">Atmospheric falling star streaks</p>
      </div>
    </div>
  );
}
