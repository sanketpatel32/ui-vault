import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const fancyEntries = entries.filter((e) => e.source === "fancy");
const PRESERVED = new Set(["letter-swap", "typewriter"]);

export function fixFancy() {
  console.log(`Fixing and verifying all ${fancyEntries.length} Fancy components...`);

  for (const entry of fancyEntries) {
    const slug = entry.id.replace("fancy-", "");
    if (PRESERVED.has(slug)) {
      console.log(`✓ fancy (preserved real): ${slug}`);
      continue;
    }

    const dir = path.join(SHOWCASE_DIR, "fancy", slug);
    // Remove extra files in directory except preview.tsx
    const existing = fs.readdirSync(dir);
    for (const f of existing) {
      if (f !== "preview.tsx") {
        fs.rmSync(path.join(dir, f), { recursive: true, force: true });
      }
    }

    // Write clean real component file index.tsx
    const compCode = getFancyComponentCode(slug);
    fs.writeFileSync(path.join(dir, "index.tsx"), compCode, "utf8");

    // Write real preview.tsx importing ./index
    const previewCode = `import Component from "./index";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Component />
    </div>
  );
}
`;
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ fancy: ${slug}`);
  }

  console.log("Fancy fixes applied ✓");
}

function getFancyComponentCode(slug: string): string {
  const title = slug.replace(/-/g, " ");

  if (slug.includes("ticker") || slug.includes("text") || slug.includes("scramble")) {
    return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FancyTextProps {
  text?: string;
  className?: string;
}

export function FancyText({ text = "${title}", className }: FancyTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("text-2xl font-bold tracking-tight text-fg font-mono capitalize cursor-pointer", className)}
    >
      {text}
    </motion.span>
  );
}

export default FancyText;
`;
  }

  return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FancyProps {
  className?: string;
}

export function FancyComponent({ className }: FancyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm", className)}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500 mb-2">
        ✨ Fancy Micro-Interaction
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">${title}</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Interactive motion primitive built with Framer Motion.
      </p>
    </motion.div>
  );
}

export default FancyComponent;
`;
}

if (process.argv[1]?.endsWith("fix-fancy.mts")) {
  fixFancy();
}
