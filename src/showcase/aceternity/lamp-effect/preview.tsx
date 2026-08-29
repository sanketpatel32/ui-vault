import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div
      className={cn(
        "relative flex h-60 w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 px-6 text-center shadow-xl",
      )}
    >
      <div className="absolute top-0 h-28 w-48 bg-cyan-500/30 blur-2xl rounded-full" />
      <div className="relative z-10 space-y-2">
        <h3 className="bg-linear-to-b from-white to-zinc-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          Lamps Done Right
        </h3>
        <p className="text-xs text-zinc-400">Atmospheric top-down cone lighting</p>
      </div>
    </div>
  );
}
