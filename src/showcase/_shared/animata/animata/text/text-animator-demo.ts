// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/text-animator-demo.ts (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
/** Demo frame classes — typography lives in co-located text-animator-demo.css (imported via styles/globals.css). */
export const TEXT_ANIMATOR_DEMO_CLASS = "text-animator-demo";

/** Storybook frame — bordered tile matching doc previews. */
export const TEXT_ANIMATOR_STORY_FRAME_CLASS = `${TEXT_ANIMATOR_DEMO_CLASS} h-80 w-[32rem] rounded-lg border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100`;

/** Text category index grid tiles. */
export const TEXT_ANIMATOR_INDEX_FRAME_CLASS = `${TEXT_ANIMATOR_DEMO_CLASS} h-56 w-full min-h-56 text-foreground`;
