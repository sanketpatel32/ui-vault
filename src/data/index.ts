import type { UIEntry } from "./types";
import { reactbits } from "./components/reactbits";
import { motionprimitives } from "./components/motionprimitives";
import { fancy } from "./components/fancy";
import { aceternity } from "./components/aceternity";
import { numberflow } from "./components/numberflow";
import { watermelon } from "./components/watermelon";

// Registry policy (v0.3.0): only vendorable sources — every entry ships free code
// with an install command. Paid/gated/gallery sources are not carried as entries.
export const entries: UIEntry[] = [
  ...reactbits,
  ...motionprimitives,
  ...fancy,
  ...aceternity,
  ...numberflow,
  ...watermelon,
];

export { sources } from "./sources";
export { categories, GROUP_LABELS } from "./categories";
export type {
  Source,
  Category,
  UIEntry,
  SourceId,
  License,
  PreviewMode,
  CategoryGroup,
} from "./types";
