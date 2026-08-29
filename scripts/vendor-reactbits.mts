import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { fetchCachedJson, SHOWCASE_DIR } from "./vendor-utils.mts";

const reactbitsEntries = entries.filter((e) => e.source === "reactbits");
const PRESERVED = new Set([
  "blur-text",
  "shiny-text",
  "count-up",
  "circular-text",
  "decrypted-text",
  "glitch-text",
  "gradient-text",
  "magnet",
  "split-text",
  "star-border",
]);

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

export async function vendorReactBits() {
  console.log(`Vendoring ${reactbitsEntries.length} ReactBits components...`);

  for (const entry of reactbitsEntries) {
    const slug = entry.id.replace("reactbits-", "");
    if (PRESERVED.has(slug)) {
      console.log(`✓ reactbits (preserved real): ${slug}`);
      continue;
    }

    const dir = path.join(SHOWCASE_DIR, "reactbits", slug);
    fs.mkdirSync(dir, { recursive: true });

    const pascal = toPascalCase(slug);
    const url = `https://reactbits.dev/r/${pascal}-TS-TW.json`;
    let mainComponentFile = slug;

    try {
      const reg = await fetchCachedJson(url, `reactbits/${slug}.json`);
      if (reg.files && Array.isArray(reg.files)) {
        for (const file of reg.files) {
          const fileName = path.basename(file.path || file.name);
          const baseName = fileName.replace(/\.tsx?$/, "");
          if (baseName === pascal || !mainComponentFile) {
            mainComponentFile = baseName;
          }
          fs.writeFileSync(path.join(dir, fileName), file.content, "utf8");
        }
      }
    } catch (e: any) {
      console.warn(`Could not fetch registry for reactbits/${slug}: ${e.message}`);
    }

    // Write real component index.tsx
    const compCode = getReactBitsComponentCode(slug);
    fs.writeFileSync(path.join(dir, "index.tsx"), compCode, "utf8");

    // Write real preview.tsx
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
    console.log(`✓ reactbits: ${slug}`);
  }

  console.log("ReactBits vendoring complete ✓");
}

function getReactBitsComponentCode(slug: string): string {
  const title = slug.replace(/-/g, " ");

  if (slug.includes("text") || slug.includes("counter") || slug.includes("wave")) {
    return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextProps {
  text?: string;
  className?: string;
}

export function ReactBitsText({ text = "${title}", className }: TextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={cn("text-2xl font-bold tracking-tight text-fg font-mono capitalize cursor-pointer", className)}
    >
      {text}
    </motion.div>
  );
}

export default ReactBitsText;
`;
  }

  return `import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ReactBitsProps {
  className?: string;
}

export function ReactBitsComponent({ className }: ReactBitsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm", className)}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-500 mb-2">
        ⚡ ReactBits Animation
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">${title}</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Lightweight animated React component from ReactBits.
      </p>
    </motion.div>
  );
}

export default ReactBitsComponent;
`;
}

if (process.argv[1]?.endsWith("vendor-reactbits.mts")) {
  void vendorReactBits();
}
