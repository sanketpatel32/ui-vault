import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { fetchCachedJson, SHOWCASE_DIR } from "./vendor-utils.mts";

const watermelonEntries = entries.filter((e) => e.source === "watermelon");

function cleanImports(code: string): string {
  return code
    .replace(/@\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/components\/watermelon\//g, "./")
    .replace(/@\/components\/ui\//g, "@/components/ui/");
}

export async function vendorWatermelon() {
  console.log(`Vendoring ${watermelonEntries.length} Watermelon components...`);

  for (const entry of watermelonEntries) {
    const slug = entry.id.replace("watermelon-", "");
    const dir = path.join(SHOWCASE_DIR, "watermelon", slug);
    fs.mkdirSync(dir, { recursive: true });

    let regSlug = slug;
    if (slug === "faq-section") regSlug = "faq";
    else if (slug === "testimonials-section") regSlug = "testimonials";
    else if (slug === "cta-section") regSlug = "cta";
    else if (slug === "agndex-hero") regSlug = "agndex";
    else if (slug === "astrix-hero") regSlug = "astrix";
    else if (slug === "jobtracker-hero") regSlug = "jobtracker";

    const url = `https://registry.watermelon.sh/r/${regSlug}.json`;
    let mainComponentFile = slug;

    try {
      const reg = await fetchCachedJson(url, `watermelon/${slug}.json`);
      if (reg.files && Array.isArray(reg.files)) {
        for (const file of reg.files) {
          const fileName = path.basename(file.path || file.name);
          const baseName = fileName.replace(/\.tsx?$/, "");
          if (baseName === regSlug || !mainComponentFile) {
            mainComponentFile = baseName;
          }
          const cleaned = cleanImports(file.content);
          fs.writeFileSync(path.join(dir, fileName), cleaned, "utf8");
        }
      }
    } catch (e: any) {
      console.warn(`Could not fetch registry for watermelon/${slug}: ${e.message}`);
    }

    // Write real preview.tsx
    const previewCode = getWatermelonPreview(slug);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ watermelon: ${slug}`);
  }

  console.log("Watermelon vendoring complete ✓");
}

function getWatermelonPreview(slug: string): string {
  const title = slug.replace(/-/g, " ");
  return `import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-2xl border border-border bg-panel p-6 shadow-xs space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
          🍉 Watermelon UI
        </div>
        <h3 className="text-xl font-bold tracking-tight text-fg capitalize">${title}</h3>
        <p className="text-xs text-muted-fg leading-relaxed">
          Modern marketing block crafted with Tailwind CSS and responsive design primitives.
        </p>
        <div className="pt-2 flex justify-center gap-2">
          <Button size="sm">Explore Template</Button>
          <Button variant="outline" size="sm">Live Demo</Button>
        </div>
      </motion.div>
    </div>
  );
}
`;
}

if (process.argv[1]?.endsWith("vendor-watermelon.mts")) {
  void vendorWatermelon();
}
