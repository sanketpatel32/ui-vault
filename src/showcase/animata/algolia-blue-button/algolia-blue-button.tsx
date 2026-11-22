// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/algolia-blue-button.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import "./algolia-blue-button.css";

export default function AlgoliaBlueButton() {
  return (
    <button
      type="button"
      className="algolia-blue-btn relative box-border inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-0 bg-linear-to-r from-sky-500 to-blue-600 px-4 font-mono leading-none text-white no-underline transition-transform duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-0.5"
    >
      Algolia Blue
    </button>
  );
}
