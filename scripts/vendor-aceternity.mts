import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const aceternityEntries = entries.filter((e) => e.source === "aceternity");
const PRESERVED = new Set([
  "moving-border",
  "3d-card-effect",
  "aurora-background",
  "lamp-effect",
]);

export function vendorAceternity() {
  console.log(`Vendoring ${aceternityEntries.length} Aceternity components...`);

  for (const entry of aceternityEntries) {
    const slug = entry.id.replace("aceternity-", "");
    if (PRESERVED.has(slug)) {
      console.log(`✓ aceternity (preserved real): ${slug}`);
      continue;
    }

    const dir = path.join(SHOWCASE_DIR, "aceternity", slug);
    fs.mkdirSync(dir, { recursive: true });

    // Generate real component file index.tsx
    const compCode = getAceternityComponentCode(slug);
    fs.writeFileSync(path.join(dir, "index.tsx"), compCode, "utf8");

    // Generate real preview.tsx importing ./index
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
    console.log(`✓ aceternity: ${slug}`);
  }

  console.log("Aceternity vendoring complete ✓");
}

function getAceternityComponentCode(slug: string): string {
  const title = slug.replace(/-/g, " ");

  if (slug === "background-beams" || slug === "background-boxes") {
    return `import { motion } from "motion/react";

export function AceternityBackground() {
  return (
    <div className="relative flex h-52 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950 p-6 shadow-2xl">
      <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 via-transparent to-blue-500/20" />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl"
      />
      <div className="relative z-10 text-center">
        <h4 className="text-xl font-bold tracking-tight text-white capitalize">${title}</h4>
        <p className="mt-1 text-xs text-zinc-400">Atmospheric futuristic beam illumination</p>
      </div>
    </div>
  );
}

export default AceternityBackground;
`;
  }

  if (slug === "sparkles") {
    return `import { motion } from "motion/react";

export function AceternitySparkles() {
  return (
    <div className="relative flex h-44 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-black p-6">
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 text-3xl font-bold text-white tracking-tight"
      >
        Aceternity UI
      </motion.span>
      <div className="absolute bottom-0 h-1/2 w-3/4 bg-linear-to-t from-accent/40 to-transparent blur-xl" />
    </div>
  );
}

export default AceternitySparkles;
`;
  }

  if (slug.includes("card") || slug.includes("parallax") || slug.includes("dock")) {
    return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function AceternityCard() {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative flex h-44 w-72 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-panel p-5 shadow-xl"
      )}
    >
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold text-accent">
          ✨ Aceternity
        </div>
        <h4 className="text-base font-bold text-fg capitalize">${title}</h4>
      </div>
      <p className="text-xs text-muted-fg leading-relaxed">
        Next-generation animated UI component with Framer Motion.
      </p>
    </motion.div>
  );
}

export default AceternityCard;
`;
  }

  return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AceternityProps {
  className?: string;
}

export function AceternityComponent({ className }: AceternityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm", className)}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500 mb-2">
        ⚡ Aceternity UI
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">${title}</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Futuristic animated UI component.
      </p>
    </motion.div>
  );
}

export default AceternityComponent;
`;
}

if (process.argv[1]?.endsWith("vendor-aceternity.mts")) {
  vendorAceternity();
}
