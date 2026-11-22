// https://wterm.dev — Apache-2.0 (github.com/vercel-labs/wterm). Cataloged 2026-11-22 at v0.6.0.
// One component; Vue/Svelte/vanilla bindings and the libghostty core (@wterm/ghostty) are noted on the source.
import type { UIEntry } from "../types";

export const wterm: UIEntry[] = [
  {
    id: "wterm-terminal",
    name: "Terminal",
    description:
      'Web terminal emulator that renders rows as real DOM text — native selection, copy/paste, browser find and screen readers work. Zig VT parser compiled to a ~49 KB embedded WASM core; wire onData to a PTY/WebSocket backend and term.write() its output. Swap in @wterm/ghostty for fuller VT support; ships its own CSS (`import "@wterm/react/css"`), not Tailwind.',
    source: "wterm",
    sourceUrl: "https://wterm.dev/get-started",
    sourceCategory: "Components",
    category: "data-display",
    tags: ["wterm", "terminal", "wasm", "shell"],
    license: "free",
    previewMode: "live",
    install: "npm install @wterm/dom @wterm/react",
  },
];
