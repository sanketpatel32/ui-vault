// One-shot: vendor real COSS UI + Cult UI + Kibo UI registry code into src/showcase.
// COSS:   https://coss.com/ui/r/<name>.json          (components, hooks, particle families)
// Cult:   raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/r/<name>.json
//         (site itself is behind a bot challenge; repo files are identical)
// Kibo:   https://www.kibo-ui.com/r/<name>.json
// Run: npx tsx scripts/vendor-v06.mts
import { existsSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

async function fetchJSON(url: string, name: string): Promise<any | null> {
  const cf = `.vcache/v06-${name}.json`;
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

const CULT_REPO = "https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/r";
const SHADCN = "https://ui.shadcn.com/r/styles/new-york-v4";

const depQueue: { source: string; name: string }[] = [];
const queuedShared = new Set<string>();
const newDeps = new Set<string>();
// main file + default-export flag per shared dir, for barrel index.ts generation
const sharedMain = new Map<string, { file: string; defaultExport: boolean }>();

// hand-authored previews for hook entries (vendorEntry reports NOEXPORT for these)
const HOOK_PREVIEWS: Record<string, string> = {
  "use-media-query": `import { useIsMobile, useMediaQuery } from "./use-media-query";

export default function Preview() {
  const isDesktop = useMediaQuery("lg");
  const isMobile = useIsMobile();
  const coarsePointer = useMediaQuery({ pointer: "coarse" });

  const rows = [
    { label: 'useMediaQuery("lg")', value: isDesktop },
    { label: "useIsMobile() — max-md", value: isMobile },
    { label: 'useMediaQuery({ pointer: "coarse" })', value: coarsePointer },
  ];

  return (
    <div className="flex flex-col gap-3 p-6">
      <p className="text-xs text-muted-fg">Resize the window — each row re-renders live:</p>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between gap-4 rounded-lg border border-border bg-panel px-4 py-3"
        >
          <code className="text-xs">{row.label}</code>
          <span
            className={\`rounded-full px-2.5 py-0.5 text-xs font-medium \${
              row.value ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-500/15 text-zinc-400"
            }\`}
          >
            {String(row.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
`,
  "use-copy-to-clipboard": `import { useState } from "react";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

export default function Preview() {
  const [value, setValue] = useState("npx shadcn@latest add @coss/use-copy-to-clipboard");
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 });

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full max-w-md rounded-lg border border-border bg-panel px-3 py-2 font-mono text-xs"
        aria-label="Text to copy"
      />
      <button
        type="button"
        onClick={() => copyToClipboard(value)}
        className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
      >
        {isCopied ? "Copied ✓" : "Copy to clipboard"}
      </button>
      <p className="text-xs text-muted-fg">isCopied resets after the 2s timeout.</p>
    </div>
  );
}
`,
};

function queueShared(source: string, name: string) {
  const key = `${source}/${name}`;
  if (!queuedShared.has(key)) {
    queuedShared.add(key);
    depQueue.push({ source, name });
  }
}

function rewriteImports(src: string, source: string): string {
  let out = src;
  // registry-style paths appear in COSS items AND in shadcn-registry fallback items
  // vendored into the cultui/kiboui shared pools — rewrite them for every source.
  out = out.replaceAll("@/registry/default/lib/utils", "@/lib/utils");
  out = out.replaceAll("@/registry/new-york-v4/lib/utils", "@/lib/utils");
  out = out.replace(/@\/registry\/[\w-]+\/ui\/([\w-]+)/g, (_m, x: string) => {
    queueShared(source, x);
    return `@/showcase/_shared/${source}/${x}`;
  });
  out = out.replace(/@\/registry\/[\w-]+\/hooks\/([\w-]+)/g, (_m, h: string) => {
    queueShared(source, h);
    return `@/showcase/_shared/${source}/${h}`;
  });
  out = out.replace(/@\/registry\/[\w-]+\/lib\/([\w-]+)/g, (_m, x: string) => {
    if (x === "utils") return "@/lib/utils";
    queueShared(source, x);
    return `@/showcase/_shared/${source}/${x}`;
  });
  out = out.replace(/@\/registry\/[\w-]+\/particles\/([\w-]+)/g, (_m, p: string) => {
    queueShared(source, p);
    return `@/showcase/_shared/${source}/${p}`;
  });
  if (source === "cultui") {
    out = out.replace(/@\/components\/ui\/([\w-]+)/g, (_m, x: string) => {
      // separate ui/ subpool: cult's own components can shadow shadcn names (popover!)
      queueShared("cultui", `ui/${x}`);
      return `@/showcase/_shared/cultui/ui/${x}`;
    });
  } else if (source === "kiboui") {
    out = out.replace(/@\/components\/ui\/([\w-]+)/g, (_m, x: string) => {
      // separate ui/ subpool: kibo entries can share names with the shadcn primitives they use (table!)
      queueShared("kiboui", `ui/${x}`);
      return `@/showcase/_shared/kiboui/ui/${x}`;
    });
    out = out.replace(/@\/components\/kibo\/([\w-]+)/g, (_m, x: string) => {
      queueShared("kiboui", x);
      return `@/showcase/_shared/kiboui/${x}`;
    });
    out = out.replace(/@\/hooks\/([\w-]+)/g, (_m, h: string) => {
      queueShared("kiboui", h);
      return `@/showcase/_shared/kiboui/${h}`;
    });
  }
  return out;
}

function exportsOf(
  src: string,
  hint: string,
): { defaultExport: boolean; name: string | null; all: string[] } {
  const names: string[] = [];
  for (const m of src.matchAll(/export (?:function|const|class) ([A-Z]\w+)/g)) names.push(m[1]);
  for (const m of src.matchAll(/export \{([^}]+)\}/g)) {
    for (const part of m[1].split(",")) {
      const t = part.trim();
      if (!t) continue;
      const asMatch = t.match(/^([\w$]+) as ([\w$]+)$/);
      names.push(asMatch ? asMatch[2] : t.split(/\s+/)[0]);
    }
  }
  const hasDefault = /export default/.test(src);
  // rank: exact folder-name match, then skip factory handles / hooks / config-ish exports
  const isComponentish = (n: string) =>
    !/Handle$/.test(n) &&
    !/^use[A-Z]/.test(n) &&
    !/(?:Variants|Context|Config|Styles|ClassNames)$/.test(n);
  const pick =
    names.find((n) => n === hint) ??
    names.find((n) => isComponentish(n) && /^[A-Z]/.test(n)) ??
    null;
  return { defaultExport: hasDefault, name: pick, all: names };
}

function writeItemFiles(
  item: any,
  source: string,
  outDir: string,
  hint: string,
): {
  file: string;
  firstFile: string;
  exp: { defaultExport: boolean; name: string | null; all: string[] };
} {
  mkdirSync(outDir, { recursive: true });
  let main = {
    file: "",
    firstFile: "",
    exp: { defaultExport: false, name: null as string | null, all: [] as string[] },
  };
  for (const f of item.files ?? []) {
    const base = (f.path ?? "").split("/").pop()!;
    if (/\.(css)$/.test(base)) {
      // side-effect css: write plus a sibling .css.d.ts (allowArbitraryExtensions)
      writeFileSync(join(outDir, base), f.content ?? "");
      writeFileSync(
        join(outDir, `${base}.d.ts`),
        "declare const css: string;\nexport default css;\n",
      );
      continue;
    }
    if (!/\.(tsx|ts)$/.test(base)) continue;
    let content = rewriteImports(
      (f.content ?? "").replace(/^['"]use client['"];?\r?\n/m, ""),
      source,
    );
    // browser-safe timeout type (no @types/node in the client tsconfig)
    content = content.replace(/NodeJS\.Timeout/g, "ReturnType<typeof setTimeout>");
    writeFileSync(join(outDir, base), content);
    const stem = base.replace(/\.(tsx|ts)$/, "");
    if (!main.firstFile) main.firstFile = stem;
    const exp = exportsOf(content, hint);
    if (exp.defaultExport || exp.name) main = { ...main, file: stem, exp };
  }
  for (const d of item.dependencies ?? []) if (!d.startsWith("@types/")) newDeps.add(d);
  return main;
}

// Per-entry demo overrides, keyed "<source>:<folder>". Absent -> default no-prop render.
const DEMO: Record<string, string> = {};

function previewFor(
  main: { file: string; exp: { defaultExport: boolean; name: string | null } },
  key: string,
): string | null {
  if (!main.exp.defaultExport && !main.exp.name) return null;
  const imp = main.exp.defaultExport
    ? `import Component from "./${main.file}";`
    : `import { ${main.exp.name} } from "./${main.file}";`;
  const comp = main.exp.defaultExport ? "Component" : main.exp.name!;
  const body = DEMO[key]
    ? DEMO[key].split("__COMP__").join(comp)
    : `      <div className="flex min-h-48 items-center justify-center p-6">\n        <${comp} />\n      </div>`;
  return `${imp}\n\nexport default function Preview() {\n  return (\n    <div className="w-full">\n${body}\n    </div>\n  );\n}\n`;
}

const report: string[] = [];

const pascal = (s: string) =>
  s
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");

async function vendorEntry(source: string, folder: string, registryName: string, url: string) {
  const outDir = `src/showcase/${source}/${folder}`;
  rmSync(outDir, { recursive: true, force: true });
  const item = await fetchJSON(url, `${source}-${registryName}`);
  if (!item) {
    report.push(`MISS ${source}/${folder} (${registryName})`);
    return;
  }
  // queue registry deps
  for (const rd of item.registryDependencies ?? []) {
    if (source === "cossui" && rd.startsWith("@coss/"))
      queueShared("cossui", rd.slice("@coss/".length));
    else if (source === "kiboui" && /^[\w-]+$/.test(rd)) queueShared("kiboui", rd);
    else if (source === "cultui" && rd.startsWith("http")) {
      const n = rd
        .split("/")
        .pop()!
        .replace(/\.json$/, "");
      queueShared("cultui", n);
    }
  }
  const main = writeItemFiles(item, source, outDir, pascal(folder));
  const preview = previewFor(main, `${source}:${folder}`);
  if (!preview) {
    report.push(`NOEXPORT ${source}/${folder} (${registryName})`);
    return;
  }
  writeFileSync(join(outDir, "preview.tsx"), preview);
  report.push(`OK ${source}/${folder} <- ${registryName} [${main.exp.all.slice(0, 6).join(", ")}]`);
}

// ---------- plan ----------
const cossPlan = JSON.parse(readFileSync(".vcache/v06-coss-particles.json", "utf8")) as Record<
  string,
  string
>;
const cultComps = JSON.parse(readFileSync("research/cultui.json", "utf8")).components as any[];
const kiboComps = JSON.parse(readFileSync("research/kiboui.json", "utf8")).components as any[];
const CULT_REGNAME: Record<string, string> = {
  "bg-animated-fractal-grid": "bg-animated-fractal-dot-grid",
  "hero-color-panels": "hero-color-panel",
};

async function main() {
  // COSS: 55 components + 2 hooks (from cossui.ts order) + 54 particle families
  const cossData = readFileSync("src/data/components/cossui.ts", "utf8");
  const cossIds = [...cossData.matchAll(/id: "(cossui-[\w-]+)"/g)].map((m) => m[1]);
  for (const id of cossIds) {
    if (id.startsWith("cossui-particles-")) {
      const folder = id.replace("cossui-", "");
      const registryName = cossPlan[folder];
      await vendorEntry(
        "cossui",
        folder,
        registryName,
        `https://coss.com/ui/r/${registryName}.json`,
      );
    } else if (id === "cossui-date-picker") {
      // no standalone registry item — the docs compose it; vendor the p-date-picker-1 particle
      await vendorEntry(
        "cossui",
        "date-picker",
        "p-date-picker-1",
        `https://coss.com/ui/r/p-date-picker-1.json`,
      );
    } else if (id === "cossui-segmented-control") {
      // registry item is cva styles only — the docs demo composes p-radio-group-8
      await vendorEntry(
        "cossui",
        "segmented-control",
        "p-radio-group-8",
        `https://coss.com/ui/r/p-radio-group-8.json`,
      );
    } else {
      const name = id.replace("cossui-", "");
      await vendorEntry("cossui", name, name, `https://coss.com/ui/r/${name}.json`);
    }
  }

  // Cult
  for (const c of cultComps) {
    const reg = CULT_REGNAME[c.slug] ?? c.slug;
    await vendorEntry("cultui", c.slug, reg, `${CULT_REPO}/${reg}.json`);
  }

  // Kibo (typography is a registry:style with zero files — not vendorable, skipped)
  for (const c of kiboComps) {
    if (c.slug === "typography") continue;
    await vendorEntry("kiboui", c.slug, c.slug, `https://www.kibo-ui.com/r/${c.slug}.json`);
  }

  // shared deps
  const sharedReport: string[] = [];
  while (depQueue.length) {
    const { source, name } = depQueue.shift()!;
    const uiSubpool = name.startsWith("ui/");
    const bare = uiSubpool ? name.slice(3) : name;
    const url =
      source === "cossui"
        ? `https://coss.com/ui/r/${name}.json`
        : source === "kiboui"
          ? `https://www.kibo-ui.com/r/${name}.json`
          : `${CULT_REPO}/${name}.json`;
    let item = await fetchJSON(url, `shared-${source}-${name.replaceAll("/", "-")}`);
    if (!item && (source === "cultui" || source === "kiboui")) {
      // internal shadcn primitive not hosted on the source registry — pull from shadcn's registry
      item = await fetchJSON(
        `${SHADCN}/${bare}.json`,
        `shared-${source}-${name.replaceAll("/", "-")}`,
      );
    }
    if (!item) {
      sharedReport.push(`MISS ${source}/${name}`);
      continue;
    }
    for (const rd of item.registryDependencies ?? []) {
      if (source === "cossui" && rd.startsWith("@coss/"))
        queueShared("cossui", rd.slice("@coss/".length));
      else if (source === "kiboui" && /^[\w-]+$/.test(rd)) queueShared("kiboui", rd);
    }
    const main = writeItemFiles(
      item,
      source,
      `src/showcase/_shared/${source}/${name}`,
      pascal(bare),
    );
    if (main.firstFile)
      sharedMain.set(`${source}/${name}`, {
        file: main.firstFile,
        defaultExport: main.exp.defaultExport,
      });
    sharedReport.push(`OK ${source}/${name}`);
  }

  // directory imports (@/showcase/_shared/<source>/<name>) need an index barrel
  for (const [key, m] of sharedMain) {
    const [source, name] = [key.split("/")[0], key.split("/").slice(1).join("/")];
    const barrel = [
      `export * from "./${m.file}";`,
      ...(m.defaultExport ? [`export { default } from "./${m.file}";`] : []),
    ].join("\n");
    writeFileSync(`src/showcase/_shared/${source}/${name}/index.ts`, barrel);
  }

  // hooks export functions, not components — previews call them instead
  writeFileSync(
    "src/showcase/cossui/use-media-query/preview.tsx",
    HOOK_PREVIEWS["use-media-query"],
  );
  writeFileSync(
    "src/showcase/cossui/use-copy-to-clipboard/preview.tsx",
    HOOK_PREVIEWS["use-copy-to-clipboard"],
  );

  console.log(report.join("\n"));
  if (sharedReport.length) console.log("shared deps:\n" + sharedReport.join("\n"));
  const miss = report.filter((l) => l.startsWith("MISS") || l.startsWith("NOEXPORT"));
  console.log(`\nentries: ${report.length}, problems: ${miss.length}`);
  console.log("new npm deps to check:", [...newDeps].join(", ") || "none");
}

main();
