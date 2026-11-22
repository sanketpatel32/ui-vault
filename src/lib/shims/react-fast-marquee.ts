// react-fast-marquee ships CJS only (`exports.default = Marquee` + `__esModule`). The dev
// dep optimizer hands `import X from "react-fast-marquee"` the whole exports object, so
// unwrap `.default` here; vite.config.ts aliases the bare specifier to this file.
import * as mod from "react-fast-marquee/dist/index.js";

type MarqueeComponent = typeof import("react-fast-marquee").default;

const raw = mod as unknown as { default: MarqueeComponent | { default: MarqueeComponent } };
const Marquee: MarqueeComponent =
  "default" in raw.default ? raw.default.default : (raw.default as MarqueeComponent);

export default Marquee;
export type { MarqueeProps } from "react-fast-marquee";
