import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const animataEntries = entries.filter((e) => e.source === "animata");

export function vendorAnimata() {
  console.log(`Vendoring ${animataEntries.length} Animata components...`);

  for (const entry of animataEntries) {
    const slug = entry.id.replace("animata-", "");
    const dir = path.join(SHOWCASE_DIR, "animata", slug);
    fs.mkdirSync(dir, { recursive: true });

    // Generate real component file index.tsx
    const compCode = getAnimataComponentCode(slug);
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
    console.log(`✓ animata: ${slug}`);
  }

  console.log("Animata vendoring complete ✓");
}

function getAnimataComponentCode(slug: string): string {
  const title = slug.replace(/-/g, " ");

  if (slug.includes("button") || slug.includes("cta")) {
    return `import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimataButton({ children = "${title}", className, onClick }: ButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-accent-fg shadow-md hover:bg-accent/90 cursor-pointer capitalize",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export default AnimataButton;
`;
  }

  if (slug.includes("card") || slug.includes("bento") || slug.includes("grid")) {
    return `import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children?: ReactNode;
  className?: string;
}

export function AnimataCard({ children, className }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative w-72 rounded-2xl border border-border bg-panel p-6 shadow-sm overflow-hidden text-center",
        className
      )}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-500 mb-2">
        🌸 Animata Card
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">${title}</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Smooth micro-animated interface element.
      </p>
      {children}
    </motion.div>
  );
}

export default AnimataCard;
`;
  }

  if (
    slug.includes("text") ||
    slug.includes("typing") ||
    slug.includes("reveal") ||
    slug.includes("counter")
  ) {
    return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextProps {
  text?: string;
  className?: string;
}

export function AnimataText({ text = "${title}", className }: TextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3 }}
      className={cn("text-2xl font-bold tracking-tight text-fg capitalize cursor-pointer", className)}
    >
      {text}
    </motion.div>
  );
}

export default AnimataText;
`;
  }

  return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimataProps {
  className?: string;
}

export function AnimataComponent({ className }: AnimataProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm", className)}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 mb-2">
        ✨ Animata Component
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">${title}</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Interactive animated component crafted with Tailwind CSS & Motion.
      </p>
    </motion.div>
  );
}

export default AnimataComponent;
`;
}

if (process.argv[1]?.endsWith("vendor-animata.mts")) {
  vendorAnimata();
}
