// Pass 5: flat shared origin items (cropper/slider/tree), dashboard css files,
// InputGroupAddon align prop, footer linkGroups preview, css module declaration.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const put = (f: string, c: string) => writeFileSync(f, c);
const rw = (s: string) =>
  s
    .replaceAll("@/registry/default/lib/utils", "@/lib/utils")
    .replace(/@\/registry\/[\w-]+\/ui\/([\w-]+)/g, "@/showcase/_shared/originui/$1");

// 1. flat shared origin items from cache
for (const name of ["cropper", "slider", "tree"]) {
  const item = JSON.parse(readFileSync(`.vcache/originui-${name}.json`, "utf8"));
  for (const f of item.files ?? []) {
    const base = (f.path ?? "").split("/").pop()!;
    if (!/\.(tsx|ts)$/.test(base)) continue;
    put(`src/showcase/_shared/originui/${name}.tsx`, rw(f.content ?? ""));
    break; // single-file items
  }
}

// 2. comp-554 hook import path
{
  const f = "src/showcase/originui/image-cropper/comp-554.tsx";
  put(
    f,
    readFileSync(f, "utf8").replaceAll(
      "@/registry/default/hooks/use-file-upload",
      "@/showcase/_shared/originui/use-file-upload",
    ),
  );
}

// 3. dashboard css files from cached items
for (const item of ["agndex-dashboard", "astrix-dashboard", "jobtracker-dashboard"]) {
  const j = JSON.parse(readFileSync(`.vcache/watermelon-${item}.json`, "utf8"));
  for (const f of j.files ?? []) {
    const rel = (f.path ?? "").replace(/^src\/components\/watermelon-ui\//, "");
    if (!rel.endsWith(".css")) continue;
    put(
      join(
        "src/showcase/watermelon",
        `dashboard-${item.startsWith("agndex") ? "agndex" : item.startsWith("astrix") ? "astrix" : "jobtracker"}`,
        rel,
      ),
      f.content ?? "",
    );
    console.log("css", rel);
  }
}

// 4. InputGroupAddon align prop
{
  const f = "src/showcase/_shared/watermelon/input-group.tsx";
  let src = readFileSync(f, "utf8");
  src = src.replace(
    /export const InputGroupAddon = React\.forwardRef<HTMLSpanElement, React\.HTMLAttributes<HTMLSpanElement>>\(\s*\(\{ className, \.\.\.props \}\), ref\) => \(\s*<span/,
    `export const InputGroupAddon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { align?: "inline-start" | "inline-end" }>(\n  ({ className, align, ...props }, ref) => (\n    <span`,
  );
  src = src.replace(
    /className=\{cn\("flex items-center gap-1\.5 px-3 text-muted-foreground \[&>svg\]:size-4", className\)\}/,
    `className={cn("flex items-center gap-1.5 px-3 text-muted-foreground [&>svg]:size-4", align === "inline-end" && "ml-auto", className)}`,
  );
  put(f, src);
}

// 5. footer preview with full props
put(
  "src/showcase/watermelon/footer-blocks/preview.tsx",
  `import { Footer1 } from "./footer-1";

const linkGroups = [
  { title: "Product", links: [{ label: "Components", href: "#" }, { label: "Blocks", href: "#" }, { label: "Registry", href: "#" }] },
  { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "GitHub", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
];

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Footer1
        logo={<span className="text-xl">🍉</span>}
        brandName="Watermelon UI"
        newsletterTitle="Stay in the loop"
        newsletterDescription="Get the newest blocks dropped in your inbox."
        linkGroups={linkGroups}
        copyright="© 2026 Watermelon UI. All rights reserved."
      />
    </div>
  );
}
`,
);

// 6. css module declaration for side-effect css imports
put("src/css.d.ts", 'declare module "*.css";\n');
console.log("pass5 done");
