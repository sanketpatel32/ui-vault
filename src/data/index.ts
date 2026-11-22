import type { UIEntry } from "./types";
import { reactbits } from "./components/reactbits";
import { motionprimitives } from "./components/motionprimitives";
import { fancy } from "./components/fancy";
import { aceternity } from "./components/aceternity";
import { numberflow } from "./components/numberflow";
import { watermelon } from "./components/watermelon";
import { shadcn } from "./components/shadcn";
import { shadcnOidc } from "./components/shadcn-oidc";
import { magicui } from "./components/magicui";
import { animata } from "./components/animata";
import { animateui } from "./components/animateui";
import { launchui } from "./components/launchui";
import { originui } from "./components/originui";
import { cossui } from "./components/cossui";
import { cultui } from "./components/cultui";
import { kiboui } from "./components/kiboui";
import { bklit } from "./components/bklit";
import { pdfcn } from "./components/pdfcn";
import { remocn } from "./components/remocn";
import { assistantui } from "./components/assistantui";

// Registry policy (v0.3.0): only vendorable sources — every entry ships free code
// with an install command. Paid/gated/gallery sources are not carried as entries.
export const entries: UIEntry[] = [
  ...reactbits,
  ...motionprimitives,
  ...fancy,
  ...aceternity,
  ...numberflow,
  ...watermelon,
  ...shadcn,
  ...shadcnOidc,
  ...magicui,
  ...animata,
  ...animateui,
  ...launchui,
  ...originui,
  ...cossui,
  ...cultui,
  ...kiboui,
  ...bklit,
  ...pdfcn,
  ...remocn,
  ...assistantui,
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
