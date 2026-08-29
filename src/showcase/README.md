# Showcase — vendored live previews

Frozen snapshots of MIT/free components, re-implemented or copied so they render live
inside UI Vault. **Do not "improve" these** — fix problems by re-copying from upstream.

| previewKey                     | Origin                                             | License         | Copied     | Notes                                              |
| ------------------------------ | -------------------------------------------------- | --------------- | ---------- | -------------------------------------------------- |
| `reactbits-blur-text`          | https://reactbits.dev/text-animations/blur-text    | MIT             | 2026-08-29 | Faithful re-implementation (motion stagger + blur) |
| `reactbits-shiny-text`         | https://reactbits.dev/text-animations/shiny-text   | MIT             | 2026-08-29 | CSS-only sweep, keyframes in src/index.css         |
| `reactbits-count-up`           | https://reactbits.dev/animations/count-up          | MIT             | 2026-08-29 | Re-implementation using motion `animate()`         |
| `motionprimitives-text-effect` | https://motion-primitives.com/docs/text-effect     | MIT             | 2026-08-29 | Per-letter blur/slide reveal, replayable           |
| `motionprimitives-glow-effect` | https://motion-primitives.com/docs/glow-effect     | MIT             | 2026-08-29 | Pointer-tracked radial glow                        |
| `fancy-letter-swap`            | https://fancycomponents.dev/docs/letter-swap       | MIT             | 2026-08-29 | Hover scramble-settle, re-implemented              |
| `fancy-typewriter`             | https://fancycomponents.dev/docs/typewriter        | MIT             | 2026-08-29 | Type/delete loop with blinking caret               |
| `aceternity-moving-border`     | https://ui.aceternity.com/components/moving-border | MIT (free tier) | 2026-08-29 | Rotating conic-gradient border via CSS `@property` |
| `numberflow-numberflow`        | https://number-flow.barvian.me                     | MIT             | 2026-08-29 | Real `@number-flow/react` package                  |
| `numberflow-group`             | https://number-flow.barvian.me/docs/grouping       | MIT             | 2026-08-29 | Real `@number-flow/react` package                  |

Rules (see ../AGENTS.md):

- Only vendor from sources marked ✅ vendorable (MIT / open-source free tiers).
- Each preview is self-contained: default-exported, no props, no cross-folder imports.
- Previews must respect reduced motion where the effect allows it.
- Record every addition in this file.
