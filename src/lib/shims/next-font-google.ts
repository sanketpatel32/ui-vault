/** Stand-in for next/font/google: vendored previews fall back to the app's own font stack. */
interface NextFont {
  className: string;
  variable: string;
  style: { fontFamily: string };
}

const font = (_options?: unknown): NextFont => ({
  className: "",
  variable: "",
  style: { fontFamily: "inherit" },
});

export const Inter = font;
export const Space_Grotesk = font;
export const Tourney = font;
