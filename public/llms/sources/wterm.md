# wterm
> A terminal emulator for the web.
- URL: https://wterm.dev
- License: Free — live-previewable
- Stack: react, typescript, css, wasm
- Install: `npm install @wterm/dom @wterm/react`
- Notes: Apache-2.0 (github.com/vercel-labs/wterm). React 18/19; own CSS (import "@wterm/react/css"), not Tailwind. Vue (@wterm/vue), Svelte (@wterm/svelte) and vanilla (@wterm/dom) bindings; @wterm/ghostty swaps in libghostty for fuller VT support. Needs a PTY/WebSocket backend for a real shell.
- Cataloged in UI Vault: 1 entries
## Entries
- **Terminal** https://wterm.dev/get-started — Web terminal emulator that renders rows as real DOM text — native selection, copy/paste, browser find and screen readers work. Zig VT parser compiled to a ~49 KB embedded WASM core; wire onData to a PTY/WebSocket backend and term.write() its output. Swap in @wterm/ghostty for fuller VT support; ships its own CSS (`import "@wterm/react/css"`), not Tailwind. [Free, live-previewable, category: data-display]