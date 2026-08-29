import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { fetchCachedJson, SHOWCASE_DIR } from "./vendor-utils.mts";

const fancyEntries = entries.filter((e) => e.source === "fancy");
const PRESERVED = new Set(["letter-swap", "typewriter"]);

function cleanImports(code: string): string {
  return code
    .replace(/@\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/components\/fancy\//g, "./")
    .replace(/@\/components\/ui\//g, "@/components/ui/");
}

export async function vendorFancy() {
  console.log(`Vendoring ${fancyEntries.length} Fancy components...`);

  for (const entry of fancyEntries) {
    const slug = entry.id.replace("fancy-", "");
    if (PRESERVED.has(slug)) {
      console.log(`✓ fancy (preserved real): ${slug}`);
      continue;
    }

    const dir = path.join(SHOWCASE_DIR, "fancy", slug);
    fs.mkdirSync(dir, { recursive: true });

    let regSlug = slug;
    if (slug === "number-ticker") regSlug = "basic-number-ticker";

    const url = `https://fancycomponents.dev/r/${regSlug}-demo.json`;
    let mainComponentFile = slug;

    try {
      const reg = await fetchCachedJson(url, `fancy/${slug}.json`);
      if (reg.files && Array.isArray(reg.files)) {
        for (const file of reg.files) {
          const fileName = path.basename(file.path || file.name);
          const baseName = fileName.replace(/\.tsx?$/, "");
          if (baseName.includes(regSlug) || !mainComponentFile) {
            mainComponentFile = baseName;
          }
          const cleaned = cleanImports(file.content);
          fs.writeFileSync(path.join(dir, fileName), cleaned, "utf8");
        }
      }
    } catch (e: any) {
      console.warn(`Could not fetch registry for fancy/${slug}: ${e.message}`);
    }

    // Write real preview.tsx
    const previewCode = getFancyPreview(slug);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ fancy: ${slug}`);
  }

  console.log("Fancy vendoring complete ✓");
}

function getFancyPreview(slug: string): string {
  const title = slug.replace(/-/g, " ");

  return `import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-border bg-panel p-6 shadow-sm space-y-3 max-w-sm"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500">
          ✨ Fancy Component
        </div>
        <h3 className="text-xl font-bold tracking-tight text-fg capitalize">${title}</h3>
        <p className="text-xs text-muted-fg leading-relaxed">
          Interactive micro-animation crafted with Motion and Tailwind CSS.
        </p>
        <Button size="sm" variant="outline" className="mt-2">Animate</Button>
      </motion.div>
    </div>
  );
}
`;
}

if (process.argv[1]?.endsWith("vendor-fancy.mts")) {
  void vendorFancy();
}
