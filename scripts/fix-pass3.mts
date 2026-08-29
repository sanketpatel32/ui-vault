// Pass 3: remaining fixes — origin shared items (use-file-upload, logo),
// structure-preserving rewrite of multi-file watermelon dashboards, demo prop fixes.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const wmSharedQueue = new Set<string>();

function rewriteWm(src: string, itemName: string): string {
  let out = src;
  out = out.replace(/@\/components\/ui\/([\w-]+)/g, (_m, x: string) => {
    wmSharedQueue.add(x);
    return `@/showcase/_shared/watermelon/${x}`;
  });
  out = out.replace(/@\/components\/watermelon-ui\/([\w-]+)/g, (m, x: string) =>
    x === itemName
      ? m
      : ((_m) => {
          wmSharedQueue.add(x);
          return `@/showcase/_shared/watermelon/${x}`;
        })(m),
  );
  return out;
}

// ---------- 1. origin shared: use-file-upload + logo ----------
{
  const hook = JSON.parse(readFileSync(".vcache/probe-use-file-upload.json", "utf8"));
  const hookSrc = hook.files[0].content.replaceAll("@/registry/default/lib/utils", "@/lib/utils");
  writeFileSync("src/showcase/_shared/originui/use-file-upload.ts", hookSrc);

  const res = await fetch(
    "https://raw.githubusercontent.com/cosscom/coss/main/apps/origin/registry/default/components/navbar-components/logo.tsx",
  );
  if (res.ok) {
    const logoSrc = (await res.text())
      .replaceAll("@/registry/default/lib/utils", "@/lib/utils")
      .replace(/@\/registry\/[\w-]+\/ui\/([\w-]+)/g, "@/showcase/_shared/originui/$1");
    writeFileSync("src/showcase/_shared/originui/logo.tsx", logoSrc);
    console.log("logo.tsx fetched");
  } else console.log("logo fetch FAIL", res.status);

  for (const [file, from, to] of [
    [
      "src/showcase/originui/file-upload/comp-125.tsx",
      "@/registry/default/hooks/use-file-upload",
      "@/showcase/_shared/originui/use-file-upload",
    ],
    [
      "src/showcase/originui/navbar/comp-577.tsx",
      "@/registry/default/components/navbar-components/logo",
      "@/showcase/_shared/originui/logo",
    ],
  ] as const) {
    if (!existsSync(file)) {
      console.log("MISSING", file);
      continue;
    }
    writeFileSync(file, readFileSync(file, "utf8").replaceAll(from, to));
  }
}

// ---------- 2. watermelon dashboards: structure-preserving ----------
const DASH: Record<string, string> = {
  "dashboard-agndex": "agndex-dashboard",
  "dashboard-astrix": "astrix-dashboard",
  "dashboard-jobtracker": "jobtracker-dashboard",
};
for (const [folder, item] of Object.entries(DASH)) {
  const json = JSON.parse(readFileSync(`.vcache/watermelon-${item}.json`, "utf8"));
  const outDir = `src/showcase/watermelon/${folder}`;
  rmSync(outDir, { recursive: true, force: true });
  let demoRel = "";
  for (const f of json.files ?? []) {
    const raw = f.path ?? "";
    const rel = raw.replace(/^src\/components\/watermelon-ui\//, "");
    if (!/\.(tsx|ts)$/.test(rel)) continue;
    const content = rewriteWm(f.content ?? "", rel.split("/")[0]);
    const dest = join(outDir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, content);
    const base = rel.split("/").pop()!;
    if (/demo/i.test(base) && /export default/.test(content)) demoRel = rel.replace(/\.tsx?$/, "");
    if (!demoRel && /export default/.test(content)) demoRel = rel.replace(/\.tsx?$/, "");
  }
  for (const d of json.dependencies ?? []) {
    /* handled by npm install earlier */
  }
  if (demoRel) {
    writeFileSync(
      join(outDir, "preview.tsx"),
      `import Component from "./${demoRel}";\n\nexport default function Preview() {\n  return (\n    <div className="w-full">\n      <div className="flex min-h-96 items-start justify-center p-4">\n        <Component />\n      </div>\n    </div>\n  );\n}\n`,
    );
    console.log(`dashboard ${folder}: demo=${demoRel}`);
  } else console.log(`dashboard ${folder}: NO DEMO`);
}

// fetch queued wm shared deps (skip ones that already exist flat or as dir)
for (const name of wmSharedQueue) {
  const flat = `src/showcase/_shared/watermelon/${name}.tsx`;
  const dir = `src/showcase/_shared/watermelon/${name}`;
  if (existsSync(flat) || existsSync(dir)) continue;
  try {
    const res = await fetch(`https://registry.watermelon.sh/r/${name}.json`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const text = await res.text();
    if (!res.ok || !text.trimStart().startsWith("{")) {
      console.log(`wm shared MISS ${name}`);
      continue;
    }
    const item = JSON.parse(text);
    mkdirSync(dir, { recursive: true });
    for (const f of item.files ?? []) {
      const base = (f.path ?? "").split("/").pop()!;
      if (!/\.(tsx|ts)$/.test(base)) continue;
      writeFileSync(join(dir, base), rewriteWm(f.content ?? "", name));
    }
    console.log(`wm shared OK ${name}`);
  } catch (e) {
    console.log(`wm shared ERR ${name} ${e}`);
  }
}

// ---------- 3. demo prop fixes ----------
function put(file: string, content: string) {
  writeFileSync(file, content);
}

put(
  "src/showcase/originui/image-cropper/preview.tsx",
  `import { Cropper, CropperCropArea, CropperImage } from "./cropper";

export default function Preview() {
  return (
    <div className="flex justify-center p-6">
      <Cropper className="h-72 w-[28rem]">
        <CropperImage src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=640&q=70" alt="Crop me" />
        <CropperCropArea />
      </Cropper>
    </div>
  );
}
`,
);

put(
  "src/showcase/originui/stepper/preview.tsx",
  `import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from "./stepper";

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Stepper defaultValue={2}>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <div className="space-y-0.5">
              <StepperTitle>Account</StepperTitle>
              <StepperDescription>Create your account</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <div className="space-y-0.5">
              <StepperTitle>Profile</StepperTitle>
              <StepperDescription>Set up your profile</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3}>
          <StepperTrigger>
            <StepperIndicator>3</StepperIndicator>
            <div className="space-y-0.5">
              <StepperTitle>Done</StepperTitle>
              <StepperDescription>Start building</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </Stepper>
    </div>
  );
}
`,
);

put(
  "src/showcase/originui/timeline/preview.tsx",
  `import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineItem, TimelineSeparator, TimelineTitle } from "./timeline";

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Timeline>
        <TimelineItem step={1}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate>February 2026</TimelineDate>
            <TimelineTitle>Registry released</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Origin UI components ship as shadcn registry items.</TimelineContent>
        </TimelineItem>
        <TimelineItem step={2}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate>August 2026</TimelineDate>
            <TimelineTitle>Vendored into UI Vault</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Every family now renders a live preview.</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
`,
);

put(
  "src/showcase/originui/tree/preview.tsx",
  `import { Tree, TreeItem, TreeItemLabel } from "./tree";

const src = {
  id: "src",
  name: "src",
  children: [
    { id: "components", name: "components", children: [{ id: "button", name: "button.tsx" }, { id: "input", name: "input.tsx" }] },
    { id: "index", name: "index.ts" },
  ],
};

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Tree>
        <TreeItem item={src} className="my-1.5">
          <TreeItemLabel>src</TreeItemLabel>
          <TreeItem item={src.children![0] as never} className="my-1.5">
            <TreeItemLabel>components</TreeItemLabel>
            <TreeItem item={src.children![0].children![0] as never} className="my-1.5">
              <TreeItemLabel>button.tsx</TreeItemLabel>
            </TreeItem>
          </TreeItem>
          <TreeItem item={src.children![1] as never} className="my-1.5">
            <TreeItemLabel>index.ts</TreeItemLabel>
          </TreeItem>
        </TreeItem>
      </Tree>
    </div>
  );
}
`,
);
console.log("demos fixed");
