export type SourceId =
  | "reactbits"
  | "motionprimitives"
  | "fancy"
  | "numberflow"
  | "watermelon"
  | "aceternity";

export type License = "mit" | "free" | "freemium" | "paid";
export type PreviewMode = "live" | "linkout";
export type CategoryGroup = "components" | "blocks" | "templates";

export interface Source {
  id: SourceId;
  name: string;
  url: string;
  tagline: string;
  description: string;
  license: License;
  /** 'live' = free code we may vendor into src/showcase; 'linkout' = metadata + deep link only */
  previewMode: PreviewMode;
  stack: string[];
  /** default install command shown on the source page */
  install?: string;
  installLabel?: string;
  notes?: string;
  /** UI accent color for source badges */
  color: string;
}

export interface Category {
  slug: string;
  name: string;
  group: CategoryGroup;
  description: string;
}

export interface UIEntry {
  /** <sourceid>-<kebab-name>, globally unique */
  id: string;
  name: string;
  description: string;
  source: SourceId;
  /** deep link to the component on the source site */
  sourceUrl: string;
  /** the source's own category, verbatim */
  sourceCategory: string;
  /** exactly one primary category slug from categories.ts */
  category: string;
  tags: string[];
  license: License;
  previewMode: PreviewMode;
  /** per-component install/copy command */
  install?: string;
  /** lazy-import key into src/showcase — live previews only */
  previewKey?: string;
  featured?: boolean;
}
