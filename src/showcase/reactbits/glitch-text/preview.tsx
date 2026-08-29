export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative font-mono text-4xl font-extrabold tracking-widest text-fg">
        <span className="relative z-10">CYBERPUNK</span>
        <span
          className="absolute inset-0 translate-x-[2px] text-red-500 opacity-70 mix-blend-screen"
          aria-hidden
        >
          CYBERPUNK
        </span>
        <span
          className="absolute inset-0 translate-x-[-2px] text-cyan-400 opacity-70 mix-blend-screen"
          aria-hidden
        >
          CYBERPUNK
        </span>
      </div>
      <p className="text-xs text-muted-fg font-sans">RGB chromatic aberration glitch effect</p>
    </div>
  );
}
