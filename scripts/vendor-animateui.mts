import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { fetchCachedJson, SHOWCASE_DIR } from "./vendor-utils.mts";

const animateEntries = entries.filter((e) => e.source === "animateui");

function cleanImports(code: string): string {
  return code
    .replace(/@\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/components\/animate-ui\//g, "../")
    .replace(/@\/components\/ui\//g, "@/components/ui/")
    .replace(/@animate-ui\/([a-z-]+)/g, "../primitives-$1/index")
    .replace(/\.\/primitives\/effects\/([a-z-]+)/g, "../primitives-effects-$1/index")
    .replace(/\.\/primitives\/buttons\/([a-z-]+)/g, "../primitives-buttons-$1/index")
    .replace(/\.\/primitives\/texts\/([a-z-]+)/g, "../primitives-texts-$1/index")
    .replace(/\.\/primitives\/radix\/([a-z-]+)/g, "../primitives-radix-$1/index")
    .replace(/\.\/primitives\/base\/([a-z-]+)/g, "../primitives-base-$1/index")
    .replace(/\.\/primitives\/headless\/([a-z-]+)/g, "../primitives-headless-$1/index")
    .replace(/\.\/primitives\/animate\/([a-z-]+)/g, "../primitives-animate-$1/index");
}

export async function vendorAnimateUI() {
  console.log(`Vendoring ${animateEntries.length} Animate UI components...`);

  for (const entry of animateEntries) {
    const slug = entry.id.replace("animateui-", "");
    const dir = path.join(SHOWCASE_DIR, "animateui", slug);
    fs.mkdirSync(dir, { recursive: true });

    let regSlug = slug;
    if (slug.startsWith("components-")) regSlug = slug.replace("components-", "");
    else if (slug.startsWith("primitives-")) regSlug = slug.replace("primitives-", "");

    const url = `https://animate-ui.com/r/${regSlug}.json`;
    let mainComponentFile = "index";

    try {
      const reg = await fetchCachedJson(url, `animateui/${slug}.json`);
      if (reg.files && Array.isArray(reg.files)) {
        for (const file of reg.files) {
          const fileName = path.basename(file.path || file.name);
          const baseName = fileName.replace(/\.tsx?$/, "");
          mainComponentFile = baseName;
          const cleaned = cleanImports(file.content);
          fs.writeFileSync(path.join(dir, fileName), cleaned, "utf8");
        }
      }
    } catch (e: any) {
      console.warn(`Could not fetch registry for animateui/${slug}: ${e.message}`);
    }

    // Write real preview.tsx
    const previewCode = getAnimateUIPreview(slug, mainComponentFile);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ animateui: ${slug}`);
  }

  console.log("Animate UI vendoring complete ✓");
}

function getAnimateUIPreview(slug: string, mainFile: string): string {
  return `import * as ComponentModule from "./${mainFile}";

export default function Preview() {
  const Component = (ComponentModule as any).default || Object.values(ComponentModule)[0] as any;
  if (!Component) return <div className="text-xs text-muted-fg">Animate UI Component loaded</div>;
  try {
    return (
      <div className="flex items-center justify-center p-4">
        <Component />
      </div>
    );
  } catch {
    return <div className="text-xs text-muted-fg font-mono">Animate UI: ${slug}</div>;
  }
}
`;
}

if (process.argv[1]?.endsWith("vendor-animateui.mts")) {
  void vendorAnimateUI();
}
