// Central ambient module declarations for untyped vendored imports.
// - culori: the kiboui qr-code component imports oklch/formatHex; the
//   published package ships no types for its main entry.
// - react-image-crop CSS: side-effect import in the kiboui image-crop
//   component; Vite resolves the real stylesheet from node_modules.
// - *.css: co-located side-effect stylesheets in vendored animata components,
//   reached by the scripts project through src/showcase/index.ts (no vite/client types there).
declare module "culori" {
  export type Color = {
    mode?: string;
    l?: number;
    c?: number;
    h?: number;
  };

  export function oklch(color?: string | Color): Color | undefined;
  export function formatHex(color: Color | undefined): string;
}

declare module "react-image-crop/dist/ReactCrop.css";
declare module "*.css";
