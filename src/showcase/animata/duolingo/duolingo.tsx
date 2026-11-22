// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/duolingo.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
export default function Duolingo() {
  return (
    <button
      type="button"
      className="box-border inline-block h-11 cursor-pointer touch-manipulation whitespace-nowrap rounded-lg border-b-4 border-solid border-transparent bg-sky-600 px-4 py-3 text-center text-sm font-bold uppercase leading-5 tracking-wider text-white outline-hidden transition-all duration-200 hover:brightness-110 active:border-b-0 active:border-t-4 active:bg-none disabled:cursor-auto"
    >
      Duolingo
      <span className="absolute inset-0 -z-10 rounded-lg border-b-4 border-solid border-transparent bg-sky-500" />
    </button>
  );
}
