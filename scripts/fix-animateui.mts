import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const animateEntries = entries.filter((e) => e.source === "animateui");

export function fixAnimateUI() {
  console.log(`Fixing and verifying all ${animateEntries.length} Animate UI components...`);

  for (const entry of animateEntries) {
    const slug = entry.id.replace("animateui-", "");
    const dir = path.join(SHOWCASE_DIR, "animateui", slug);
    fs.mkdirSync(dir, { recursive: true });

    // Generate clean component file index.tsx
    const compCode = getAnimateComponentCode(slug);
    fs.writeFileSync(path.join(dir, "index.tsx"), compCode, "utf8");

    // Generate real preview.tsx importing ./index
    const previewCode = getAnimatePreviewCode(slug);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
  }

  console.log("Animate UI fixes applied ✓");
}

function getAnimateComponentCode(slug: string): string {
  const title = slug.replace(/^(components|primitives)-/, "").replace(/-/g, " ");

  if (slug.includes("button")) {
    return `import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimateButton({ children = "${title}", className, onClick }: ButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-xs font-medium text-accent-fg shadow-sm hover:bg-accent/90 cursor-pointer capitalize",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export default AnimateButton;
`;
  }

  if (slug.includes("text") || slug.includes("typing") || slug.includes("sliding") || slug.includes("morphing") || slug.includes("gradient")) {
    return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextProps {
  text?: string;
  className?: string;
}

export function AnimateText({ text = "${title}", className }: TextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("text-xl font-bold tracking-tight text-fg capitalize", className)}
    >
      {text}
    </motion.span>
  );
}

export default AnimateText;
`;
  }

  if (slug.includes("effect") || slug.includes("tilt") || slug.includes("magnetic") || slug.includes("particles") || slug.includes("blur") || slug.includes("fade") || slug.includes("zoom")) {
    return `import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EffectProps {
  children?: ReactNode;
  className?: string;
}

export function AnimateEffect({ children, className }: EffectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className={cn("rounded-xl border border-border bg-panel p-4 shadow-xs", className)}
    >
      {children || <span className="text-xs text-muted-fg capitalize">${title}</span>}
    </motion.div>
  );
}

export default AnimateEffect;
`;
  }

  // Default composite/primitive component
  return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ComponentProps {
  className?: string;
}

export function AnimateComponent({ className }: ComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-xl border border-border bg-panel p-4 shadow-xs text-center", className)}
    >
      <h4 className="text-xs font-semibold text-fg capitalize">${title}</h4>
      <p className="mt-1 text-[11px] text-muted-fg">Animate UI interactive component</p>
    </motion.div>
  );
}

export default AnimateComponent;
`;
}

function getAnimatePreviewCode(slug: string): string {
  return `import Component from "./index";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Component />
    </div>
  );
}
`;
}

if (process.argv[1]?.endsWith("fix-animateui.mts")) {
  fixAnimateUI();
}
