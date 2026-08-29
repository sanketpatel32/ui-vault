export default function Preview() {
  return (
    <div className="relative flex h-60 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 p-6 text-center shadow-xl">
      <div className="absolute inset-0 bg-linear-to-tr from-accent/40 via-emerald-500/30 to-pink-500/30 opacity-60 blur-3xl" />
      <div className="relative z-10 space-y-2">
        <h3 className="text-2xl font-bold tracking-tight text-white">Aurora Background</h3>
        <p className="text-xs text-zinc-300">Shimmering northern lights atmospheric backdrop</p>
      </div>
    </div>
  );
}
