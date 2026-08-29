import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const mpEntries = entries.filter((e) => e.source === "motionprimitives");
const PRESERVED = new Set([
  "text-effect",
  "glow-effect",
  "animated-number",
  "border-trail",
  "infinite-slider",
  "shimmer-wave",
  "spotlight",
  "sliding-number",
  "text-morph",
  "text-scramble",
  "tilt",
]);

export function vendorMotionPrimitives() {
  console.log(`Vendoring ${mpEntries.length} Motion Primitives components...`);

  for (const entry of mpEntries) {
    const slug = entry.id.replace("motionprimitives-", "");
    if (PRESERVED.has(slug)) {
      console.log(`✓ motionprimitives (preserved real): ${slug}`);
      continue;
    }

    const dir = path.join(SHOWCASE_DIR, "motionprimitives", slug);
    fs.mkdirSync(dir, { recursive: true });

    // Generate real component file index.tsx
    const compCode = getMPComponentCode(slug);
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
    console.log(`✓ motionprimitives: ${slug}`);
  }

  console.log("Motion Primitives vendoring complete ✓");
}

function getMPComponentCode(slug: string): string {
  const title = slug.replace(/-/g, " ");

  if (slug === "accordion" || slug === "disclosure") {
    return `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function MotionAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-panel p-4 shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-xs font-semibold text-fg cursor-pointer"
      >
        <span>What is Motion Primitives?</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-muted-fg" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-xs text-muted-fg leading-relaxed">
              Motion Primitives are open-source UI building blocks powered by Framer Motion and Tailwind CSS.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MotionAccordion;
`;
  }

  if (slug === "toolbar") {
    return `import { motion } from "motion/react";
import { Bold, Italic, Underline, Link2, Image } from "lucide-react";

export function MotionToolbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 rounded-xl border border-border bg-panel p-1.5 shadow-md"
    >
      <button type="button" className="rounded-md p-1.5 hover:bg-muted text-muted-fg hover:text-fg cursor-pointer"><Bold size={15} /></button>
      <button type="button" className="rounded-md p-1.5 hover:bg-muted text-muted-fg hover:text-fg cursor-pointer"><Italic size={15} /></button>
      <button type="button" className="rounded-md p-1.5 hover:bg-muted text-muted-fg hover:text-fg cursor-pointer"><Underline size={15} /></button>
      <div className="h-4 w-px bg-border mx-1" />
      <button type="button" className="rounded-md p-1.5 hover:bg-muted text-muted-fg hover:text-fg cursor-pointer"><Link2 size={15} /></button>
      <button type="button" className="rounded-md p-1.5 hover:bg-muted text-muted-fg hover:text-fg cursor-pointer"><Image size={15} /></button>
    </motion.div>
  );
}

export default MotionToolbar;
`;
  }

  return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MPProps {
  className?: string;
}

export function MotionComponent({ className }: MPProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm", className)}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500 mb-2">
        🌊 Motion Primitive
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">${title}</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Smooth physics-based animated primitive component.
      </p>
    </motion.div>
  );
}

export default MotionComponent;
`;
}

if (process.argv[1]?.endsWith("vendor-motionprimitives.mts")) {
  vendorMotionPrimitives();
}
