# Streamdown
> A drop-in replacement for react-markdown, designed for AI-powered streaming.
- URL: https://streamdown.ai
- License: Free — live-previewable
- Stack: react, typescript, tailwind, shadcn
- Install: `npm install streamdown`
- Notes: Apache-2.0 (github.com/vercel/streamdown; the GitHub API reports NOASSERTION but the LICENSE file is Apache-2.0). React 18/19. Styling is Tailwind classes + shadcn CSS variables — add @source "../node_modules/streamdown/dist/*.js" (and one per installed @streamdown/* plugin) to your Tailwind CSS. The remend Markdown-healing parser ships alongside and is not cataloged as UI.
- Cataloged in UI Vault: 5 entries
## Entries
- **Streamdown** https://streamdown.ai/docs — Drop-in react-markdown replacement built for streaming AI output — parses incomplete/unterminated Markdown gracefully (via remend), GFM tables and task lists, hardened rendering, memoized updates. Powers AI Elements Message/Response. Add `@source "../node_modules/streamdown/dist/*.js"` to your Tailwind CSS. [Free, live-previewable, category: chat]
- **Code Plugin** https://streamdown.ai/docs/plugins/code — @streamdown/code — Shiki syntax highlighting for fenced code blocks inside streamed Markdown, with copy/download controls. Needs its own Tailwind `@source` line. [Free, live-previewable, category: chat]
- **Math Plugin** https://streamdown.ai/docs/plugins/math — @streamdown/math — KaTeX rendering for inline and block LaTeX equations in streamed Markdown. [Free, live-previewable, category: chat]
- **Mermaid Plugin** https://streamdown.ai/docs/plugins/mermaid — @streamdown/mermaid — renders ```mermaid code blocks as diagrams (flowcharts, sequence diagrams) in streamed Markdown. [Free, live-previewable, category: chat]
- **CJK Plugin** https://streamdown.ai/docs/plugins/cjk — @streamdown/cjk — correct emphasis/line-break handling for Chinese, Japanese and Korean text in streamed Markdown. [Free, live-previewable, category: chat]