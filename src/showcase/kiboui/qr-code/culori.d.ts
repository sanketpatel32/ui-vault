// Minimal ambient declaration for culori 4.x (the published package ships no
// .d.ts for its "import" export). Covers the surface used by the vendored
// kiboui QR code component: oklch() + formatHex().
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
