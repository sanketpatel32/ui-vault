import * as fs from "node:fs";
import * as path from "node:path";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const EXISTING_KEYS = new Set([
  "reactbits-blur-text",
  "reactbits-shiny-text",
  "reactbits-count-up",
  "motionprimitives-text-effect",
  "motionprimitives-glow-effect",
  "fancy-letter-swap",
  "fancy-typewriter",
  "aceternity-moving-border",
  "numberflow-numberflow",
  "numberflow-group",
]);

interface VendorResult {
  previewKey: string;
  source: string;
  slug: string;
  originUrl: string;
  license: string;
  title: string;
}

const results: VendorResult[] = [];

// Helper to clean code imports
function cleanImports(code: string): string {
  let res = code;
  // Replace next/image if needed
  // Replace registry path prefixes
  res = res.replace(/@\/registry\/[^"'/]+\/ui\//g, "@/components/ui/");
  res = res.replace(/@\/registry\/[^"'/]+\/lib\//g, "@/lib/");
  res = res.replace(/@\/registry\/default\//g, "@/components/ui/");
  return res;
}

// 1. NUMBERFLOW
async function vendorNumberFlow() {
  console.log("Processing NumberFlow...");
  // numberflow-input
  const inputDir = path.join(SHOWCASE_DIR, "numberflow", "input");
  fs.mkdirSync(inputDir, { recursive: true });
  fs.writeFileSync(
    path.join(inputDir, "preview.tsx"),
    `import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Minus, Plus } from "lucide-react";

export default function Preview() {
  const [val, setVal] = useState(42);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-panel p-2 shadow-xs">
        <button
          onClick={() => setVal((v) => Math.max(0, v - 1))}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-muted text-fg transition-colors hover:bg-accent-soft hover:text-accent"
          aria-label="Decrease"
        >
          <Minus size={16} />
        </button>

        <div className="min-w-[70px] text-center font-mono text-3xl font-bold tracking-tight text-fg">
          <NumberFlow value={val} />
        </div>

        <button
          onClick={() => setVal((v) => v + 1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-muted text-fg transition-colors hover:bg-accent-soft hover:text-accent"
          aria-label="Increase"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className="text-xs text-muted-fg">Interactive stepper with animated digit transitions</p>
    </div>
  );
}
`,
    "utf8",
  );
  results.push({
    previewKey: "numberflow-input",
    source: "numberflow",
    slug: "input",
    originUrl: "https://number-flow.barvian.me/examples/#input",
    license: "MIT",
    title: "NumberFlow Input",
  });

  // numberflow-countdown
  const cdDir = path.join(SHOWCASE_DIR, "numberflow", "countdown");
  fs.mkdirSync(cdDir, { recursive: true });
  fs.writeFileSync(
    path.join(cdDir, "preview.tsx"),
    `import { useEffect, useState } from "react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { Eye, Heart, Share2 } from "lucide-react";

export default function Preview() {
  const [likes, setLikes] = useState(1284);
  const [views, setViews] = useState(8490);
  const [shares, setShares] = useState(312);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <NumberFlowGroup>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-panel p-3 shadow-xs">
          <button
            onClick={() => {
              setLiked(!liked);
              setLikes((l) => (liked ? l - 1 : l + 1));
            }}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Heart size={15} className={liked ? "fill-red-500 text-red-500" : ""} />
            <NumberFlow value={likes} format={{ notation: "compact" }} />
          </button>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={() => setViews((v) => v + Math.floor(Math.random() * 15) + 1)}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Eye size={15} />
            <NumberFlow value={views} format={{ notation: "compact" }} />
          </button>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={() => setShares((s) => s + 1)}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Share2 size={15} />
            <NumberFlow value={shares} format={{ notation: "compact" }} />
          </button>
        </div>
      </NumberFlowGroup>
      <p className="text-xs text-muted-fg">Click any metric to trigger smooth NumberFlow transitions</p>
    </div>
  );
}
`,
    "utf8",
  );
  results.push({
    previewKey: "numberflow-countdown",
    source: "numberflow",
    slug: "countdown",
    originUrl: "https://number-flow.barvian.me/examples/#activity",
    license: "MIT",
    title: "Countdown & Activity Bars",
  });
}

export { vendorNumberFlow, cleanImports, results, EXISTING_KEYS };
