// One-shot: vendor real Origin UI + Watermelon UI code, replacing stand-in previews.
// Inputs: .vcache/origin-registry.json (index), .vcache/origin-config.ts (family -> comp map),
// live fetches from coss.com/origin/r/* and registry.watermelon.sh/r/*.
// Run: npx tsx scripts/vendor-origin-watermelon.mts
import { existsSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

async function fetchJSON(url: string, name: string): Promise<any | null> {
  const cf = `.vcache/${name}.json`;
  if (existsSync(cf)) return JSON.parse(readFileSync(cf, "utf8"));
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const text = await res.text();
      if (res.ok && text.trimStart().startsWith("{")) {
        const json = JSON.parse(text);
        writeFileSync(cf, JSON.stringify(json));
        return json;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
  }
  console.log(`FETCH FAIL ${url}`);
  return null;
}

const depQueue: [string, string][] = [];
const queuedShared = new Set<string>();
const newDeps = new Set<string>();

function rewriteImports(src: string, source: string, folderFile: string): string {
  let out = src;
  if (source === "originui") {
    out = out.replaceAll("@/registry/default/lib/utils", "@/lib/utils");
    out = out.replaceAll("@/registry/new-york-v4/lib/utils", "@/lib/utils");
    out = out.replace(/@\/registry\/[\w-]+\/ui\/([\w-]+)/g, (_m, x: string) => {
      if (!queuedShared.has(`originui/${x}`)) {
        queuedShared.add(`originui/${x}`);
        depQueue.push(["originui", x]);
      }
      return `@/showcase/_shared/originui/${x}`;
    });
    out = out.replace(/@\/hooks\/([\w-]+)/g, (_m, h: string) => {
      if (!queuedShared.has(`originui/${h}`)) {
        queuedShared.add(`originui/${h}`);
        depQueue.push(["originui", h]);
      }
      return `@/showcase/_shared/originui/${h}`;
    });
  } else {
    out = out.replace(/@\/components\/watermelon-ui\/([\w-]+)/g, (_m, x: string) => {
      if (x === folderFile) return `./${x}`;
      if (!queuedShared.has(`watermelon/${x}`)) {
        queuedShared.add(`watermelon/${x}`);
        depQueue.push(["watermelon", x]);
      }
      return `@/showcase/_shared/watermelon/${x}`;
    });
  }
  return out;
}

function exportsOf(src: string): { defaultExport: boolean; name: string | null } {
  const names: string[] = [];
  for (const m of src.matchAll(/export (?:function|const) ([A-Z]\w+)/g)) names.push(m[1]);
  for (const m of src.matchAll(/export \{([^}]+)\}/g)) {
    for (const part of m[1].split(",")) {
      const t = part.trim();
      if (!t) continue;
      const asMatch = t.match(/^([\w$]+) as ([\w$]+)$/);
      names.push(asMatch ? asMatch[2] : t.split(/\s+/)[0]);
    }
  }
  const hasDefault = /export default/.test(src);
  return { defaultExport: hasDefault, name: names.find((n) => /^[A-Z]/.test(n)) ?? null };
}

function writeItemFiles(
  item: any,
  source: string,
  outDir: string,
  folderFile: string,
): { file: string; exp: { defaultExport: boolean; name: string | null } } {
  mkdirSync(outDir, { recursive: true });
  let main = { file: "", exp: { defaultExport: false, name: null as string | null } };
  for (const f of item.files ?? []) {
    const base = (f.path ?? "").split("/").pop()!;
    if (!/\.(tsx|ts)$/.test(base)) continue;
    const content = rewriteImports(f.content ?? "", source, folderFile);
    writeFileSync(join(outDir, base), content);
    const exp = exportsOf(content);
    if (exp.defaultExport || exp.name) main = { file: base.replace(/\.(tsx|ts)$/, ""), exp };
  }
  for (const d of item.dependencies ?? []) if (!d.startsWith("@types/")) newDeps.add(d);
  return main;
}

function previewFor(
  main: { file: string; exp: { defaultExport: boolean; name: string | null } },
  demo?: string,
): string {
  const imp = main.exp.defaultExport
    ? `import Component from "./${main.file}";`
    : `import { ${main.exp.name} } from "./${main.file}";`;
  const comp = main.exp.defaultExport ? "Component" : main.exp.name!;
  const body = demo
    ? demo.split("__COMP__").join(comp)
    : `      <div className="flex min-h-48 items-center justify-center p-6">\n        <${comp} />\n      </div>`;
  return `${imp}\n\nexport default function Preview() {\n  return (\n    <div className="w-full">\n${body}\n    </div>\n  );\n}\n`;
}

// ---------- ORIGIN UI ----------
const cfg = readFileSync(".vcache/origin-config.ts", "utf8");
const famComps = new Map<string, string[]>();
for (const m of cfg.matchAll(/components: \[([\s\S]*?)\],\s*name: "[^"]*",\s*slug: "([^"]+)"/g)) {
  famComps.set(
    m[2],
    [...m[1].matchAll(/name: "(comp-\d+)"/g)].map((x) => x[1]),
  );
}
const ORIGIN_BASE: Record<string, string> = {
  "calendar-date-picker": "calendar",
  "image-cropper": "cropper",
  dropdown: "dropdown-menu",
  radio: "radio-group",
};
const ORIGIN_DEMO: Record<string, string> = {
  accordion: [
    '      <div className="mx-auto max-w-md p-6">',
    "        <__COMP__>",
    '          <__COMP__.Item value="a">',
    "            <__COMP__.Trigger>First question</__COMP__.Trigger>",
    "            <__COMP__.Content>Yes. It comes from the Origin UI registry.</__COMP__.Content>",
    "          </__COMP__.Item>",
    '          <__COMP__.Item value="b">',
    "            <__COMP__.Trigger>Second question</__COMP__.Trigger>",
    "            <__COMP__.Content>Copy-paste it with the shadcn CLI.</__COMP__.Content>",
    "          </__COMP__.Item>",
    "        </__COMP__>",
    "      </div>",
  ].join("\n"),
  avatar: [
    '      <div className="flex items-center gap-3 p-6">',
    '        <__COMP__ src="https://github.com/shadcn.png" alt="Origin" />',
    '        <__COMP__ fallback="OR" />',
    '        <__COMP__ src="https://i.pravatar.cc/64?img=12" alt="Demo" />',
    "      </div>",
  ].join("\n"),
  badge: [
    '      <div className="flex flex-wrap gap-2 p-6">',
    "        <__COMP__>Default</__COMP__>",
    '        <__COMP__ variant="secondary">Secondary</__COMP__>',
    '        <__COMP__ variant="destructive">Destructive</__COMP__>',
    '        <__COMP__ variant="outline">Outline</__COMP__>',
    "      </div>",
  ].join("\n"),
  breadcrumb: [
    '      <div className="p-6">',
    "        <__COMP__>",
    "          <__COMP__.List>",
    '            <__COMP__.Item><a href="#">Home</a></__COMP__.Item>',
    "            <__COMP__.Separator />",
    '            <__COMP__.Item><a href="#">Components</a></__COMP__.Item>',
    "            <__COMP__.Separator />",
    "            <__COMP__.Item>Origin UI</__COMP__.Item>",
    "          </__COMP__.List>",
    "        </__COMP__>",
    "      </div>",
  ].join("\n"),
  button: [
    '      <div className="flex flex-wrap items-center justify-center gap-3 p-6">',
    "        <__COMP__>Primary</__COMP__>",
    '        <__COMP__ variant="secondary">Secondary</__COMP__>',
    '        <__COMP__ variant="outline">Outline</__COMP__>',
    '        <__COMP__ variant="ghost">Ghost</__COMP__>',
    "      </div>",
  ].join("\n"),
  checkbox: [
    '      <div className="flex flex-col gap-3 p-8">',
    '        <label className="flex items-center gap-2"><__COMP__ defaultChecked /> Accept terms</label>',
    '        <label className="flex items-center gap-2"><__COMP__ /> Subscribe</label>',
    "      </div>",
  ].join("\n"),
  dialog: [
    '      <div className="flex items-center justify-center p-8">',
    "        <__COMP__>",
    "          <__COMP__.Trigger>Open dialog</__COMP__.Trigger>",
    "          <__COMP__.Content>",
    "            <__COMP__.Header>",
    "              <__COMP__.Title>Origin UI Dialog</__COMP__.Title>",
    "              <__COMP__.Description>Vendored straight from the Origin UI registry.</__COMP__.Description>",
    "            </__COMP__.Header>",
    "          </__COMP__.Content>",
    "        </__COMP__>",
    "      </div>",
  ].join("\n"),
  input: [
    '      <div className="flex max-w-sm flex-col gap-3 p-6">',
    '        <__COMP__ placeholder="Email address" type="email" />',
    '        <__COMP__ placeholder="Password" type="password" />',
    "      </div>",
  ].join("\n"),
  pagination: '      <div className="p-6"><__COMP__ /></div>',
  popover: [
    '      <div className="flex items-center justify-center p-8">',
    "        <__COMP__>",
    "          <__COMP__.Trigger>Open popover</__COMP__.Trigger>",
    '          <__COMP__.Content className="w-64 p-4 text-sm">Vendored from Origin UI registry.</__COMP__.Content>',
    "        </__COMP__>",
    "      </div>",
  ].join("\n"),
  select: [
    '      <div className="flex items-center justify-center p-8">',
    "        <__COMP__>",
    '          <__COMP__.Trigger className="w-48"><__COMP__.Value placeholder="Select a fruit" /></__COMP__.Trigger>',
    "          <__COMP__.Content>",
    '            <__COMP__.Item value="apple">Apple</__COMP__.Item>',
    '            <__COMP__.Item value="banana">Banana</__COMP__.Item>',
    "          </__COMP__.Content>",
    "        </__COMP__>",
    "      </div>",
  ].join("\n"),
  slider: '      <div className="p-8"><__COMP__ defaultValue={[50]} max={100} step={1} /></div>',
  stepper: '      <div className="p-8"><__COMP__ /></div>',
  switch:
    '      <div className="flex items-center gap-3 p-8"><__COMP__ defaultChecked /> Notifications</div>',
  table: '      <div className="p-6"><__COMP__ /></div>',
  tabs: [
    '      <div className="p-6">',
    '        <__COMP__ defaultValue="one">',
    "          <__COMP__.List>",
    '            <__COMP__.Trigger value="one">Overview</__COMP__.Trigger>',
    '            <__COMP__.Trigger value="two">Settings</__COMP__.Trigger>',
    "          </__COMP__.List>",
    '          <__COMP__.Content value="one">Overview tab content.</__COMP__.Content>',
    '          <__COMP__.Content value="two">Settings tab content.</__COMP__.Content>',
    "        </__COMP__>",
    "      </div>",
  ].join("\n"),
  textarea:
    '      <div className="p-6"><__COMP__ placeholder="Leave a comment" className="min-h-28 w-full max-w-md" /></div>',
  timeline: '      <div className="p-6"><__COMP__ /></div>',
  tooltip: [
    '      <div className="flex items-center justify-center p-8">',
    "        <__COMP__>",
    "          <__COMP__.Trigger>Hover me</__COMP__.Trigger>",
    "          <__COMP__.Content>Vendored from Origin UI.</__COMP__.Content>",
    "        </__COMP__>",
    "      </div>",
  ].join("\n"),
  tree: '      <div className="p-6"><__COMP__ /></div>',
};

const originReport: string[] = [];
const ORIGIN_FAMILIES = [
  ...new Set([
    ...Object.keys(ORIGIN_DEMO),
    ...Object.keys(ORIGIN_BASE),
    "alert",
    "banner",
    "file-upload",
    "event-calendar",
    "navbar",
    "notification",
  ]),
];
for (const family of ORIGIN_FAMILIES) {
  const outDir = `src/showcase/originui/${family}`;
  rmSync(outDir, { recursive: true, force: true });
  const registryName = ORIGIN_BASE[family] ?? family;
  let item = await fetchJSON(
    `https://coss.com/origin/r/${registryName}.json`,
    `originui-${registryName}`,
  );
  if (!item && famComps.has(family)) {
    const comp0 = famComps.get(family)![0];
    item = await fetchJSON(`https://coss.com/origin/r/${comp0}.json`, `originui-${comp0}`);
  }
  if (!item) {
    originReport.push(`MISS ${family}`);
    continue;
  }
  const main = writeItemFiles(item, "originui", outDir, family);
  if (!main.exp.defaultExport && !main.exp.name) {
    originReport.push(`NOEXPORT ${family} (${item.name})`);
    continue;
  }
  writeFileSync(join(outDir, "preview.tsx"), previewFor(main, ORIGIN_DEMO[family]));
  originReport.push(
    `OK ${family} <- ${item.name} (${main.file}, ${main.exp.defaultExport ? "default" : main.exp.name})`,
  );
}

// ---------- WATERMELON ----------
const WM_MAP: Record<string, string> = {
  "hero-blocks": "hero-1",
  "footer-blocks": "footer-1",
  "auth-blocks": "auth-01",
  "pricing-blocks": "pricing-1",
  "faq-blocks": "faq-1",
  "testimonial-blocks": "testimonials-1",
  "cta-blocks": "cta-1",
  "dashboard-agndex": "agndex-dashboard",
  "dashboard-astrix": "astrix-dashboard",
  "dashboard-jobtracker": "jobtracker-dashboard",
  "card-split-accordion": "card-split-accordion",
};
const wmReport: string[] = [];
for (const [folder, name] of Object.entries(WM_MAP)) {
  const item = await fetchJSON(
    `https://registry.watermelon.sh/r/${name}.json`,
    `watermelon-${name}`,
  );
  if (!item) {
    wmReport.push(`MISS ${folder}`);
    continue;
  }
  for (const rd of item.registryDependencies ?? []) {
    if (!queuedShared.has(`watermelon/${rd}`)) {
      queuedShared.add(`watermelon/${rd}`);
      depQueue.push(["watermelon", rd]);
    }
  }
  const outDir = `src/showcase/watermelon/${folder}`;
  rmSync(outDir, { recursive: true, force: true });
  const main = writeItemFiles(item, "watermelon", outDir, name);
  if (!main.exp.defaultExport && !main.exp.name) {
    wmReport.push(`NOEXPORT ${folder}`);
    continue;
  }
  writeFileSync(join(outDir, "preview.tsx"), previewFor(main));
  wmReport.push(
    `OK ${folder} <- ${name} (${main.file}, ${main.exp.defaultExport ? "default" : main.exp.name})`,
  );
}

// micro-interactions: compose two real watermelon micro components
{
  const picks = ["shimmer-button", "flip"];
  const outDir = "src/showcase/watermelon/micro-interactions";
  rmSync(outDir, { recursive: true, force: true });
  const importLines: string[] = [];
  const tags: string[] = [];
  let n = 0;
  for (const p of picks) {
    const item = await fetchJSON(`https://registry.watermelon.sh/r/${p}.json`, `watermelon-${p}`);
    if (!item) {
      wmReport.push(`MISS micro:${p}`);
      continue;
    }
    for (const rd of item.registryDependencies ?? []) {
      if (!queuedShared.has(`watermelon/${rd}`)) {
        queuedShared.add(`watermelon/${rd}`);
        depQueue.push(["watermelon", rd]);
      }
    }
    const main = writeItemFiles(item, "watermelon", join(outDir, p), p);
    if (!main.exp.defaultExport && !main.exp.name) {
      wmReport.push(`NOEXPORT micro:${p}`);
      continue;
    }
    n += 1;
    const local = `C${n}`;
    if (main.exp.defaultExport) importLines.push(`import ${local} from "./${p}/${main.file}";`);
    else importLines.push(`import { ${main.exp.name} as ${local} } from "./${p}/${main.file}";`);
    tags.push(local);
  }
  if (tags.length) {
    writeFileSync(
      join(outDir, "preview.tsx"),
      `${importLines.join("\n")}\n\nexport default function Preview() {\n  return (\n    <div className="flex flex-wrap items-center justify-center gap-6 p-8">\n      ${tags.map((t) => `<${t} />`).join("\n      ")}\n    </div>\n  );\n}\n`,
    );
    wmReport.push(`OK micro-interactions <- ${picks.join(" + ")}`);
  }
}

// ---------- shared deps ----------
const sharedReport: string[] = [];
while (depQueue.length) {
  const [source, name] = depQueue.shift()!;
  const url =
    source === "originui"
      ? `https://coss.com/origin/r/${name}.json`
      : `https://registry.watermelon.sh/r/${name}.json`;
  const item = await fetchJSON(url, `${source}-${name}`);
  if (!item) {
    sharedReport.push(`MISS ${source}/${name}`);
    continue;
  }
  writeItemFiles(item, source, `src/showcase/_shared/${source}/${name}`, name);
  sharedReport.push(`OK ${source}/${name}`);
}
if (sharedReport.length) console.log("shared deps:\n" + sharedReport.join("\n"));
console.log("origin:\n" + originReport.join("\n"));
console.log("watermelon:\n" + wmReport.join("\n"));
console.log("new npm deps to check:", [...newDeps].join(", ") || "none");
