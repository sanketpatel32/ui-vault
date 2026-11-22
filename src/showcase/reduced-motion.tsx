import { useState, useSyncExternalStore, type ComponentType } from "react";
import { MotionGlobalConfig } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * prefers-reduced-motion guard for every live preview, applied by the preview
 * loader so vendored snapshots stay untouched (AGENTS.md rule 5):
 * - Motion: all Motion animations jump to their final state (skipAnimations).
 * - CSS keyframes/transitions: neutralised in src/index.css.
 * - Frame loops (rAF/canvas/WebGL/SMIL) can't be skipped from outside, so those
 *   previews mount only after an explicit "Play animation" click.
 * Without the preference set, previews render exactly as before.
 */

const query = window.matchMedia("(prefers-reduced-motion: reduce)");

const syncMotionConfig = () => {
  MotionGlobalConfig.skipAnimations = query.matches;
};
syncMotionConfig();
query.addEventListener("change", syncMotionConfig);

const subscribe = (onChange: () => void) => {
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => query.matches);
}

/**
 * Previews animated by frame loops that the Motion/CSS guards cannot reach, or that
 * restart from onAnimationComplete (skipped animations would make those spin).
 */
const FRAME_LOOP_PREVIEWS = new Set([
  "cultui-bg-animated-fractal-grid",
  "cultui-canvas-fractal-grid",
  "cultui-choice-poll",
  "cultui-grid-beam",
  "cultui-hero-color-panels",
  "cultui-hero-dithering",
  "cultui-hero-heatmap",
  "cultui-hero-liquid-metal",
  "cultui-hero-static-radial-gradient",
  "cultui-lightboard",
  "cultui-shader-lens-blur",
  "cultui-timer",
  "kiboui-reel",
  "kiboui-spinner",
  "magicui-animated-grid-pattern",
  "magicui-cool-mode",
  "magicui-dotted-map",
  "magicui-flickering-grid",
  "magicui-globe",
  "magicui-glyph-matrix",
  "magicui-hyper-text",
  "magicui-morphing-text",
  "magicui-particles",
  "magicui-pulsating-button",
  "magicui-smooth-cursor",
  "watermelon-dashboard-agndex",
  "watermelon-dashboard-astrix",
  "watermelon-dashboard-jobtracker",
]);

function PausedPreview({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="flex max-w-sm flex-col items-center gap-4 px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-border text-muted-fg">
        <Pause size={20} />
      </span>
      <div>
        <p className="text-sm font-medium text-fg">Animation paused</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-fg">
          Your system prefers reduced motion and this preview runs a continuous animation.
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onPlay}>
        <Play size={12} /> Play animation
      </Button>
    </div>
  );
}

export function withReducedMotion(Preview: ComponentType, previewKey: string): ComponentType {
  if (!FRAME_LOOP_PREVIEWS.has(previewKey)) return Preview;

  return function ReducedMotionGate() {
    const reduced = usePrefersReducedMotion();
    const [played, setPlayed] = useState(false);
    if (reduced && !played) return <PausedPreview onPlay={() => setPlayed(true)} />;
    return <Preview />;
  };
}
