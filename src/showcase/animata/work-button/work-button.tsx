// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/work-button.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
export default function WorkButton() {
  return (
    <button
      type="button"
      className="group/work relative overflow-hidden rounded-full bg-purple-950 px-14 py-4 text-lg transition-colors"
    >
      <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white/15 transition-transform duration-300 ease-out group-hover/work:translate-y-14"></span>
      <span className="font-semibold text-purple-200">Work with us</span>
    </button>
  );
}
