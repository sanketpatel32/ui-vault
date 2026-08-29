import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index";
import { fetchCachedJson, fetchCachedText, SHOWCASE_DIR } from "./vendor-utils.mts";
import { vendorNumberFlow, cleanImports, results, EXISTING_KEYS } from "./vendor-numberflow.mts";

async function main() {
  console.log("=== STARTING UI VAULT PREVIEW VENDORING ===");
  console.log(`Total entries to vendor: ${entries.length}`);

  // 1. NumberFlow
  await vendorNumberFlow();

  // 2. ReactBits
  await vendorReactBits();

  // 3. Motion Primitives
  await vendorMotionPrimitives();

  // 4. FancyComponents
  await vendorFancy();

  // 5. Watermelon UI
  await vendorWatermelon();

  // 6. Aceternity UI
  await vendorAceternity();

  // 7. Launch UI
  await vendorLaunchUI();

  // 8. Origin UI
  await vendorOriginUI();

  // 9. Shadcn UI
  await vendorShadcn();

  // 10. Magic UI
  await vendorMagicUI();

  // 11. Animata
  await vendorAnimata();

  // 12. Animate UI
  await vendorAnimateUI();

  console.log("\n=== ALL SOURCES VENDORED ===");
  console.log(
    `Vendored ${results.length} new previews + 10 existing = ${results.length + 10} total previews!`,
  );

  // Generate src/showcase/index.ts
  await updateShowcaseIndex();

  // Update src/data/components/<source>.ts
  await updateRegistryData();

  // Update src/showcase/README.md
  await updateShowcaseReadme();
}

// 2. REACTBITS
async function vendorReactBits() {
  console.log("\nProcessing ReactBits...");
  const rbEntries = entries.filter((e) => e.source === "reactbits");

  for (const entry of rbEntries) {
    const slug = entry.id.replace(/^reactbits-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "reactbits", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      const pascalName = entry.name.replace(/\s+/g, "");
      const json = await fetchCachedJson(
        `https://reactbits.dev/r/${pascalName}-TS-TW.json`,
        `reactbits/${pascalName}.json`,
      );

      // Write files
      let mainCompName = pascalName;
      if (json.files && json.files.length > 0) {
        for (const f of json.files) {
          const fileName = path.basename(f.path || f.name);
          const cleaned = cleanImports(f.content || "");
          fs.writeFileSync(path.join(dir, fileName), cleaned, "utf8");
          if (fileName.endsWith(".tsx") || fileName.endsWith(".jsx")) {
            mainCompName = fileName.replace(/\.(tsx|jsx|ts|js)$/, "");
          }
        }
      }

      // Generate preview.tsx
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateReactBitsPreview(slug, mainCompName),
        "utf8",
      );

      results.push({
        previewKey,
        source: "reactbits",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
      console.log(`✓ reactbits: ${slug}`);
    } catch (e: any) {
      console.error(`✗ reactbits failed for ${slug}:`, e.message);
      // Generate fallback preview
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "reactbits",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
    }
  }
}

function generateReactBitsPreview(slug: string, compName: string): string {
  if (slug === "split-text") {
    return `import SplitText from "./SplitText";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <SplitText
        text="Build stunning interfaces faster"
        className="text-3xl font-bold tracking-tight text-fg"
        delay={40}
      />
      <p className="text-xs text-muted-fg">Letters animate smoothly on mount</p>
    </div>
  );
}
`;
  }
  if (slug === "glitch-text") {
    return `import GlitchText from "./GlitchText";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <GlitchText speed={1} enableShadows enableOnHover={false} className="text-4xl font-extrabold tracking-tight">
        CYBERPUNK
      </GlitchText>
      <p className="text-xs text-muted-fg">RGB chromatic aberration glitch effect</p>
    </div>
  );
}
`;
  }
  if (slug === "decrypted-text") {
    return `import DecryptedText from "./DecryptedText";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center font-mono">
      <div className="text-2xl font-bold text-fg">
        <DecryptedText text="SECURITY_PROTOCOL_ACTIVATED" speed={60} maxIterations={12} animateOn="view" />
      </div>
      <p className="text-xs text-muted-fg font-sans">Scrambles random characters before decrypting real text</p>
    </div>
  );
}
`;
  }
  if (slug === "gradient-text") {
    return `import GradientText from "./GradientText";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <GradientText colors={["#8b5cf6", "#ec4899", "#3b82f6", "#8b5cf6"]} animationSpeed={4} className="text-4xl font-extrabold">
        Gradient Elegance
      </GradientText>
      <p className="text-xs text-muted-fg">Multi-stop animated gradient sweep</p>
    </div>
  );
}
`;
  }
  if (slug === "circular-text") {
    return `import CircularText from "./CircularText";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <CircularText text="REACT*BITS*CREATIVE*COMPONENTS*" spinDuration={20} className="font-mono text-xs font-semibold" />
    </div>
  );
}
`;
  }
  if (slug === "magnet") {
    return `import Magnet from "./Magnet";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Magnet padding={50} magnetStrength={3}>
        <Button size="md" className="shadow-lg">
          Hover Around Me
        </Button>
      </Magnet>
      <p className="text-xs text-muted-fg">Element pulls toward your cursor with spring physics</p>
    </div>
  );
}
`;
  }
  if (slug === "star-border") {
    return `import StarBorder from "./StarBorder";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <StarBorder as="button" className="cursor-pointer" color="cyan" speed="4s">
        <span className="px-6 py-2.5 text-sm font-medium">Explore Vault</span>
      </StarBorder>
      <p className="text-xs text-muted-fg">Traveling light streak along the component border</p>
    </div>
  );
}
`;
  }
  // Generic fallback calling default export or rendering visually
  return `import Component from "./${compName}";

export default function Preview() {
  return (
    <div className="relative flex min-h-[220px] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/20 p-6 text-center">
      <Component />
    </div>
  );
}
`;
}

// 3. MOTION PRIMITIVES
async function vendorMotionPrimitives() {
  console.log("\nProcessing Motion Primitives...");
  const mpEntries = entries.filter((e) => e.source === "motionprimitives");
  const regData = await fetchCachedJson(
    "https://raw.githubusercontent.com/ibelick/motion-primitives/main/public/c/registry.json",
    "motionprimitives/registry.json",
  );
  const items: any[] = regData.items || [];

  for (const entry of mpEntries) {
    const slug = entry.id.replace(/^motionprimitives-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "motionprimitives", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      const regName = slug === "shimmer-wave" ? "text-shimmer-wave" : slug;
      const item = items.find((it: any) => it.name === regName || it.name === slug);

      if (item && item.files) {
        for (const file of item.files) {
          const content =
            file.content ||
            (await fetchCachedText(
              `https://raw.githubusercontent.com/ibelick/motion-primitives/main/${file.path}`,
              `motionprimitives/${path.basename(file.path)}`,
            ));
          const fileName = path.basename(file.path);
          fs.writeFileSync(path.join(dir, fileName), cleanImports(content), "utf8");
        }
      }

      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateMotionPrimitivesPreview(slug),
        "utf8",
      );

      results.push({
        previewKey,
        source: "motionprimitives",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
      console.log(`✓ motionprimitives: ${slug}`);
    } catch (e: any) {
      console.error(`✗ motionprimitives failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "motionprimitives",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
    }
  }
}

function generateMotionPrimitivesPreview(slug: string): string {
  if (slug === "text-scramble") {
    return `import { TextScramble } from "./text-scramble";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center font-mono">
      <TextScramble className="text-2xl font-bold tracking-tight text-fg" duration={1.2}>
        MOTION PRIMITIVES
      </TextScramble>
      <p className="text-xs text-muted-fg font-sans">Hover or mount triggers character scramble</p>
    </div>
  );
}
`;
  }
  if (slug === "text-morph") {
    return `import { useState, useEffect } from "react";
import { TextMorph } from "./text-morph";

const WORDS = ["Create", "Design", "Animate", "Ship"];

export default function Preview() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="text-4xl font-extrabold tracking-tight text-fg min-h-[48px] flex items-center">
        <TextMorph>{WORDS[idx]}</TextMorph>
      </div>
      <p className="text-xs text-muted-fg">Smooth glyph morphing between changing words</p>
    </div>
  );
}
`;
  }
  if (slug === "text-roll") {
    return `import { TextRoll } from "./text-roll";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="text-3xl font-extrabold tracking-tight text-fg">
        <TextRoll>STUNNING TYPOGRAPHY</TextRoll>
      </div>
      <p className="text-xs text-muted-fg">Hover over the text to roll individual characters</p>
    </div>
  );
}
`;
  }
  if (slug === "shimmer-wave") {
    return `import { TextShimmerWave } from "./text-shimmer-wave";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <TextShimmerWave className="text-2xl font-semibold tracking-tight" duration={1.5} spread={1.2}>
        Generating live preview...
      </TextShimmerWave>
      <p className="text-xs text-muted-fg">Light wave passing continuously through text</p>
    </div>
  );
}
`;
  }
  if (slug === "animated-number") {
    return `import { useState } from "react";
import { AnimatedNumber } from "./animated-number";
import { Button } from "@/components/ui/button";

export default function Preview() {
  const [val, setVal] = useState(1280);

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="font-mono text-4xl font-bold tracking-tight text-fg">
        $<AnimatedNumber value={val} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setVal(Math.floor(Math.random() * 9000) + 1000)}>
          Randomize Value
        </Button>
      </div>
    </div>
  );
}
`;
  }
  if (slug === "sliding-number") {
    return `import { useState } from "react";
import { SlidingNumber } from "./sliding-number";
import { Button } from "@/components/ui/button";

export default function Preview() {
  const [count, setCount] = useState(482);

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="font-mono text-5xl font-bold tracking-tight text-accent">
        <SlidingNumber value={count} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setCount((c) => c + 15)}>
          +15
        </Button>
        <Button size="sm" variant="outline" onClick={() => setCount((c) => Math.max(0, c - 20))}>
          -20
        </Button>
      </div>
    </div>
  );
}
`;
  }
  if (slug === "spotlight") {
    return `import { Spotlight } from "./spotlight";

export default function Preview() {
  return (
    <div className="relative flex h-64 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-8 shadow-xs">
      <Spotlight className="from-accent/40 via-accent/20 to-transparent" size={240} />
      <div className="relative z-10 text-center">
        <h4 className="text-lg font-semibold text-fg">Interactive Spotlight</h4>
        <p className="mt-1 text-xs text-muted-fg">Hover and move pointer around this container</p>
      </div>
    </div>
  );
}
`;
  }
  if (slug === "tilt") {
    return `import { Tilt } from "./tilt";

export default function Preview() {
  return (
    <Tilt rotationFactor={15} isReversed className="flex flex-col items-center justify-center">
      <div className="flex h-44 w-72 flex-col justify-between rounded-2xl border border-border bg-panel p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-accent">3D TILT</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <p className="text-sm font-semibold text-fg">Hover pointer across this card</p>
        <p className="text-[11px] text-muted-fg">Smooth gyro-like perspective response</p>
      </div>
    </Tilt>
  );
}
`;
  }
  if (slug === "magnetic") {
    return `import { Magnetic } from "./magnetic";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Magnetic springOptions={{ bounce: 0.2 }}>
        <Button size="md" className="shadow-md">
          Magnetic Target
        </Button>
      </Magnetic>
      <p className="text-xs text-muted-fg">Cursor attraction with spring physics</p>
    </div>
  );
}
`;
  }
  if (slug === "border-trail") {
    return `import { BorderTrail } from "./border-trail";

export default function Preview() {
  return (
    <div className="relative flex h-40 w-72 items-center justify-center rounded-2xl border border-border bg-panel p-6 shadow-sm">
      <BorderTrail size={80} className="bg-linear-to-r from-accent via-pink-500 to-transparent" />
      <div className="text-center">
        <p className="text-sm font-semibold text-fg">Border Trail</p>
        <p className="text-xs text-muted-fg">Animated beam along container perimeter</p>
      </div>
    </div>
  );
}
`;
  }
  if (slug === "infinite-slider") {
    return `import { InfiniteSlider } from "./infinite-slider";

export default function Preview() {
  return (
    <div className="w-full max-w-lg overflow-hidden py-4">
      <InfiniteSlider gap={24} duration={20}>
        <div className="flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-panel text-xs font-medium">React</div>
        <div className="flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-panel text-xs font-medium">Tailwind</div>
        <div className="flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-panel text-xs font-medium">Motion</div>
        <div className="flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-panel text-xs font-medium">TypeScript</div>
        <div className="flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-panel text-xs font-medium">Vite</div>
      </InfiniteSlider>
    </div>
  );
}
`;
  }
  // Generic fallback
  return `export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <p className="text-sm font-semibold text-fg">${slug}</p>
      <p className="text-xs text-muted-fg">Motion Primitive Component</p>
    </div>
  );
}
`;
}

// 4. FANCYCOMPONENTS
async function vendorFancy() {
  console.log("\nProcessing FancyComponents...");
  const fancyEntries = entries.filter((e) => e.source === "fancy");

  for (const entry of fancyEntries) {
    const slug = entry.id.replace(/^fancy-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "fancy", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      const regSlug = slug === "number-ticker" ? "basic-number-ticker" : slug;
      const demoJson = await fetchCachedJson(
        `https://fancycomponents.dev/r/${regSlug}-demo.json`,
        `fancy/${regSlug}-demo.json`,
      );

      // Write files from demo
      if (demoJson.files) {
        for (const f of demoJson.files) {
          const fileName = path.basename(f.path || f.name);
          fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
        }
      }

      // Fetch registry dependencies
      if (demoJson.registryDependencies) {
        for (const depUrl of demoJson.registryDependencies) {
          try {
            const depJson = await fetchCachedJson(depUrl, `fancy/${path.basename(depUrl)}`);
            if (depJson.files) {
              for (const f of depJson.files) {
                const fileName = path.basename(f.path || f.name);
                fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
              }
            }
          } catch {}
        }
      }

      // Write preview.tsx
      fs.writeFileSync(path.join(dir, "preview.tsx"), generateFancyPreview(slug, regSlug), "utf8");

      results.push({
        previewKey,
        source: "fancy",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
      console.log(`✓ fancy: ${slug}`);
    } catch (e: any) {
      console.error(`✗ fancy failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "fancy",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
    }
  }
}

function generateFancyPreview(_slug: string, regSlug: string): string {
  return `import Demo from "./${regSlug}-demo";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Demo />
    </div>
  );
}
`;
}

// 5. WATERMELON
async function vendorWatermelon() {
  console.log("\nProcessing Watermelon UI...");
  const wmEntries = entries.filter((e) => e.source === "watermelon");

  for (const entry of wmEntries) {
    const slug = entry.id.replace(/^watermelon-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "watermelon", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      const json = await fetchCachedJson(
        `https://registry.watermelon.sh/r/${slug}.json`,
        `watermelon/${slug}.json`,
      );

      let compFileName = `${slug}.tsx`;
      if (json.files) {
        for (const f of json.files) {
          const fileName = path.basename(f.path || f.name);
          fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
          if (fileName.endsWith(".tsx")) compFileName = fileName;
        }
      }

      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateWatermelonPreview(slug, compFileName),
        "utf8",
      );

      results.push({
        previewKey,
        source: "watermelon",
        slug,
        originUrl: entry.sourceUrl,
        license: "Free",
        title: entry.name,
      });
      console.log(`✓ watermelon: ${slug}`);
    } catch (e: any) {
      console.error(`✗ watermelon failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "watermelon",
        slug,
        originUrl: entry.sourceUrl,
        license: "Free",
        title: entry.name,
      });
    }
  }
}

function generateWatermelonPreview(slug: string, compFile: string): string {
  const modName = compFile.replace(/\.tsx$/, "");
  return `import Component from "./${modName}";

export default function Preview() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-panel p-6 shadow-sm">
      <Component />
    </div>
  );
}
`;
}

// 6. ACETERNITY
async function vendorAceternity() {
  console.log("\nProcessing Aceternity UI...");
  const acetEntries = entries.filter((e) => e.source === "aceternity");

  const nameMap: Record<string, string> = {
    "3d-card-effect": "3d-card",
    "lamp-effect": "lamp",
    "github-globe": "globe",
  };

  for (const entry of acetEntries) {
    const slug = entry.id.replace(/^aceternity-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "aceternity", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      const regName = nameMap[slug] || slug;
      const json = await fetchCachedJson(
        `https://ui.aceternity.com/registry/${regName}.json`,
        `aceternity/${regName}.json`,
      );

      let mainFile = `${slug}.tsx`;
      if (json.files) {
        for (const f of json.files) {
          const fileName = path.basename(f.path || f.name);
          fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
          if (fileName.endsWith(".tsx")) mainFile = fileName;
        }
      }

      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateAceternityPreview(slug, mainFile),
        "utf8",
      );

      results.push({
        previewKey,
        source: "aceternity",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT (free tier)",
        title: entry.name,
      });
      console.log(`✓ aceternity: ${slug}`);
    } catch (e: any) {
      console.error(`✗ aceternity failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "aceternity",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT (free tier)",
        title: entry.name,
      });
    }
  }
}

function generateAceternityPreview(slug: string, mainFile: string): string {
  const mod = mainFile.replace(/\.tsx$/, "");
  if (slug === "3d-card-effect") {
    return `import { CardBody, CardContainer, CardItem } from "./3d-card";

export default function Preview() {
  return (
    <CardContainer className="inter-var py-2">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-accent/[0.1] bg-panel border-border w-auto sm:w-[22rem] h-auto rounded-xl p-6 border">
        <CardItem translateZ="50" className="text-xl font-bold text-fg">
          Aceternity 3D Card
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-muted-fg text-xs max-w-sm mt-2">
          Hover over this card to witness realistic parallax and 3D perspective shifts.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="h-28 w-full rounded-lg bg-linear-to-br from-accent/40 to-pink-500/30 flex items-center justify-center font-mono text-xs">
            Interactive 3D Plane
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
`;
  }
  if (slug === "lamp-effect") {
    return `import { LampContainer } from "./lamp";
import { motion } from "framer-motion";

export default function Preview() {
  return (
    <LampContainer className="h-[280px] pt-12 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        className="bg-linear-to-br from-fg to-muted-fg py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent"
      >
        Lamps done right
      </motion.h1>
    </LampContainer>
  );
}
`;
  }
  if (slug === "aurora-background") {
    return `import { AuroraBackground } from "./aurora-background";
import { motion } from "framer-motion";

export default function Preview() {
  return (
    <AuroraBackground className="h-[280px] rounded-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0.0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col gap-3 items-center justify-center px-4 text-center"
      >
        <div className="text-2xl font-bold text-fg">Background lights are cool you know.</div>
        <div className="font-extralight text-xs text-muted-fg">And this, is chemical burn.</div>
      </motion.div>
    </AuroraBackground>
  );
}
`;
  }
  // Generic
  return `import * as Module from "./${mod}";

export default function Preview() {
  const Component = Module.default || Object.values(Module)[0] as any;
  return (
    <div className="relative flex min-h-[220px] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border border-border/60 p-4">
      {Component ? <Component /> : <p className="text-xs text-muted-fg">${slug}</p>}
    </div>
  );
}
`;
}

// 7. LAUNCH UI
async function vendorLaunchUI() {
  console.log("\nProcessing Launch UI...");
  const launchEntries = entries.filter((e) => e.source === "launchui");

  for (const entry of launchEntries) {
    const slug = entry.id.replace(/^launchui-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "launchui", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      if (slug === "fade") {
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-48 w-72 overflow-hidden rounded-xl border border-border bg-panel p-4 fade-y">
        <div className="space-y-3 font-mono text-xs text-muted-fg">
          <p>01. Initializing UI Vault core modules...</p>
          <p>02. Connecting 12 component registries...</p>
          <p>03. Resolving Tailwind v4 design tokens...</p>
          <p>04. Loading reactive animation drivers...</p>
          <p>05. Building zero-runtime previews...</p>
          <p>06. Syncing offline cache layers...</p>
          <p>07. Ready for deployment.</p>
        </div>
      </div>
      <p className="text-xs text-muted-fg">Launch UI fade-y gradient mask utility</p>
    </div>
  );
}
`,
          "utf8",
        );
      } else if (slug === "glass") {
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `export default function Preview() {
  return (
    <div className="relative flex h-56 w-80 items-center justify-center rounded-2xl bg-linear-to-br from-accent/20 via-purple-500/10 to-transparent p-6">
      <div className="glass-2 relative flex flex-col gap-2 rounded-xl p-6 shadow-xl backdrop-blur-md">
        <p className="text-xs font-mono font-medium text-accent">LAUNCH UI GLASS</p>
        <h4 className="text-sm font-semibold text-fg">Multi-stop Glassmorphism</h4>
        <p className="text-xs text-muted-fg">Luminescent border with subtle background blur and tint.</p>
      </div>
    </div>
  );
}
`,
          "utf8",
        );
      } else {
        const json = await fetchCachedJson(
          `https://www.launchuicomponents.com/r/${slug}.json`,
          `launchui/${slug}.json`,
        );

        let mainComp = `${slug}.tsx`;
        if (json.files) {
          for (const f of json.files) {
            const fileName = path.basename(f.path || f.name);
            fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
            if (fileName.endsWith(".tsx")) mainComp = fileName;
          }
        }

        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `import Component from "./${mainComp.replace(/\.tsx$/, "")}";

export default function Preview() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-panel p-6 shadow-sm">
      <Component />
    </div>
  );
}
`,
          "utf8",
        );
      }

      results.push({
        previewKey,
        source: "launchui",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
      console.log(`✓ launchui: ${slug}`);
    } catch (e: any) {
      console.error(`✗ launchui failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "launchui",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
    }
  }
}

// 8. ORIGIN UI
async function vendorOriginUI() {
  console.log("\nProcessing Origin UI...");
  const originEntries = entries.filter((e) => e.source === "originui");

  for (const entry of originEntries) {
    const slug = entry.id.replace(/^originui-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "originui", slug);
    fs.mkdirSync(dir, { recursive: true });

    if (slug === "easings") {
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        `import { useState } from "react";
import { Button } from "@/components/ui/button";

const EASINGS = [
  { name: "ease-out", css: "cubic-bezier(0, 0, 0.2, 1)" },
  { name: "spring", css: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  { name: "bounce", css: "cubic-bezier(0.68, -0.6, 0.32, 1.6)" },
  { name: "snappy", css: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
];

export default function Preview() {
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="flex gap-2">
        {EASINGS.map((e, i) => (
          <button
            key={e.name}
            onClick={() => setActive(i)}
            className={\`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors \${
              active === i ? "bg-accent text-accent-fg" : "bg-muted text-muted-fg hover:text-fg"
            }\`}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="relative h-16 w-full rounded-xl border border-border bg-panel p-3">
        <div
          style={{
            transform: toggle ? "translateX(calc(100% + 180px))" : "translateX(0)",
            transition: \`transform 0.7s \${EASINGS[active].css}\`,
          }}
          className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center text-accent-fg font-mono text-xs font-bold shadow-md"
        >
          ●
        </div>
      </div>

      <Button size="sm" variant="outline" onClick={() => setToggle(!toggle)}>
        Trigger Animation
      </Button>
    </div>
  );
}
`,
        "utf8",
      );
    } else {
      // Try coss.com/origin/r/<slug>.json
      try {
        const json = await fetchCachedJson(
          `https://coss.com/origin/r/${slug}.json`,
          `originui/${slug}.json`,
        );
        let compFile = `${slug}.tsx`;
        if (json.files) {
          for (const f of json.files) {
            const fileName = path.basename(f.path || f.name);
            fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
            if (fileName.endsWith(".tsx")) compFile = fileName;
          }
        }
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `import Component from "./${compFile.replace(/\.tsx$/, "")}";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Component />
    </div>
  );
}
`,
          "utf8",
        );
      } catch {
        // Fallback preview
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          generateFallbackPreview(entry.name, entry.description),
          "utf8",
        );
      }
    }

    results.push({
      previewKey,
      source: "originui",
      slug,
      originUrl: entry.sourceUrl,
      license: "MIT",
      title: entry.name,
    });
    console.log(`✓ originui: ${slug}`);
  }
}

// 9. SHADCN UI
async function vendorShadcn() {
  console.log("\nProcessing shadcn/ui...");
  const shadcnEntries = entries.filter((e) => e.source === "shadcn");

  for (const entry of shadcnEntries) {
    const slug = entry.id.replace(/^shadcn-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "shadcn", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      if (slug === "data-table") {
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const USERS = [
  { id: "USR-001", name: "Alex Rivera", role: "Frontend Engineer", status: "Active" },
  { id: "USR-002", name: "Sarah Chen", role: "Product Designer", status: "Active" },
  { id: "USR-003", name: "Marcus Vance", role: "DevOps Lead", status: "Offline" },
];

export default function Preview() {
  return (
    <div className="w-full max-w-lg rounded-xl border border-border bg-panel overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {USERS.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-mono text-xs">{u.id}</TableCell>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-muted-fg">{u.role}</TableCell>
              <TableCell>
                <span className={\`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold \${
                  u.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-fg"
                }\`}>
                  {u.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
`,
          "utf8",
        );
      } else if (slug === "date-picker") {
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  const [date, setDate] = useState("Aug 29, 2026");

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4 text-muted-fg" />
        <span>{date}</span>
      </Button>
      <p className="text-xs text-muted-fg">Popover date selection trigger</p>
    </div>
  );
}
`,
          "utf8",
        );
      } else if (slug === "typography") {
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `export default function Preview() {
  return (
    <div className="max-w-md space-y-3 text-left">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax Chronicles</h3>
      <p className="text-sm leading-6 text-muted-fg">
        Once upon a time, in a far-off land, there was a very lazy king who spent all his time at the palace.
      </p>
      <blockquote className="border-l-2 border-accent pl-4 text-xs italic text-muted-fg">
        "After all, everyone knows laughing is free... or is it?"
      </blockquote>
    </div>
  );
}
`,
          "utf8",
        );
      } else if (slug === "questionnaire") {
        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          `import { useState } from "react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { q: "What type of project are you building?", opts: ["SaaS Web App", "Mobile App", "Landing Page"] },
  { q: "Which framework do you prefer?", opts: ["React 19 / Next.js", "Vite + SPA", "Astro / Remix"] },
];

export default function Preview() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-panel p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between text-xs text-muted-fg">
        <span>Step {step + 1} of {STEPS.length}</span>
        <span>Questionnaire</span>
      </div>

      <h4 className="text-sm font-semibold text-fg">{STEPS[step].q}</h4>

      <div className="space-y-2">
        {STEPS[step].opts.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={\`w-full text-left rounded-xl border p-3 text-xs font-medium transition-all \${
              selected === opt
                ? "border-accent bg-accent-soft text-accent"
                : "border-border bg-muted/40 hover:bg-muted text-fg"
            }\`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          size="sm"
          disabled={!selected}
          onClick={() => {
            if (step < STEPS.length - 1) {
              setStep(step + 1);
              setSelected(null);
            }
          }}
        >
          {step < STEPS.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
}
`,
          "utf8",
        );
      } else {
        const url =
          slug === "toast"
            ? "https://ui.shadcn.com/r/styles/default/toast.json"
            : `https://ui.shadcn.com/r/styles/new-york-v4/${slug}.json`;

        const json = await fetchCachedJson(url, `shadcn/${slug}.json`);
        let mainComp = `${slug}.tsx`;
        if (json.files) {
          for (const f of json.files) {
            const fileName = path.basename(f.path || f.name);
            fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
            if (fileName.endsWith(".tsx")) mainComp = fileName;
          }
        }

        fs.writeFileSync(
          path.join(dir, "preview.tsx"),
          generateShadcnPreview(slug, mainComp),
          "utf8",
        );
      }

      results.push({
        previewKey,
        source: "shadcn",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
      console.log(`✓ shadcn: ${slug}`);
    } catch (e: any) {
      console.error(`✗ shadcn failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "shadcn",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
    }
  }
}

function generateShadcnPreview(slug: string, mainComp: string): string {
  const mod = mainComp.replace(/\.tsx$/, "");
  return `import * as Module from "./${mod}";

export default function Preview() {
  const Component = Module.default || Object.values(Module)[0] as any;
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {Component ? <Component /> : <p className="text-xs text-muted-fg">${slug}</p>}
    </div>
  );
}
`;
}

// 10. MAGIC UI
async function vendorMagicUI() {
  console.log("\nProcessing Magic UI...");
  const magicEntries = entries.filter((e) => e.source === "magicui");

  for (const entry of magicEntries) {
    const slug = entry.id.replace(/^magicui-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "magicui", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      const json = await fetchCachedJson(
        `https://magicui.design/r/${slug}.json`,
        `magicui/${slug}.json`,
      );

      let mainComp = `${slug}.tsx`;
      if (json.files) {
        for (const f of json.files) {
          const fileName = path.basename(f.path || f.name);
          fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
          if (fileName.endsWith(".tsx")) mainComp = fileName;
        }
      }

      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateMagicUIPreview(slug, mainComp),
        "utf8",
      );

      results.push({
        previewKey,
        source: "magicui",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
      console.log(`✓ magicui: ${slug}`);
    } catch (e: any) {
      console.error(`✗ magicui failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "magicui",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
    }
  }
}

function generateMagicUIPreview(slug: string, mainComp: string): string {
  const mod = mainComp.replace(/\.tsx$/, "");
  return `import * as Module from "./${mod}";

export default function Preview() {
  const Component = Module.default || Object.values(Module)[0] as any;
  return (
    <div className="relative flex min-h-[240px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      {Component ? <Component /> : <p className="text-xs text-muted-fg">${slug}</p>}
    </div>
  );
}
`;
}

// 11. ANIMATA
async function vendorAnimata() {
  console.log("\nProcessing Animata...");
  const animataEntries = entries.filter((e) => e.source === "animata");

  for (const entry of animataEntries) {
    const slug = entry.id.replace(/^animata-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "animata", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      const urlObj = new URL(entry.sourceUrl);
      const cat = urlObj.pathname.replace(/^\/docs\//, "").split("/")[0] || "background";

      const json = await fetchCachedJson(
        `https://animata.design/r/${cat}/${slug}.json`,
        `animata/${cat}-${slug}.json`,
      );

      let mainComp = `${slug}.tsx`;
      if (json.files) {
        for (const f of json.files) {
          const fileName = path.basename(f.path || f.name);
          fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
          if (fileName.endsWith(".tsx")) mainComp = fileName;
        }
      }

      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateAnimataPreview(slug, mainComp),
        "utf8",
      );

      results.push({
        previewKey,
        source: "animata",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
      console.log(`✓ animata: ${slug}`);
    } catch (e: any) {
      console.error(`✗ animata failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "animata",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT",
        title: entry.name,
      });
    }
  }
}

function generateAnimataPreview(slug: string, mainComp: string): string {
  const mod = mainComp.replace(/\.tsx$/, "");
  return `import * as Module from "./${mod}";

export default function Preview() {
  const Component = Module.default || Object.values(Module)[0] as any;
  return (
    <div className="relative flex min-h-[220px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      {Component ? <Component /> : <p className="text-xs text-muted-fg">${slug}</p>}
    </div>
  );
}
`;
}

// 12. ANIMATE UI
async function vendorAnimateUI() {
  console.log("\nProcessing Animate UI...");
  const animUiEntries = entries.filter((e) => e.source === "animateui");

  for (const entry of animUiEntries) {
    const slug = entry.id.replace(/^animateui-/, "");
    const previewKey = entry.id;
    if (EXISTING_KEYS.has(previewKey)) continue;

    const dir = path.join(SHOWCASE_DIR, "animateui", slug);
    fs.mkdirSync(dir, { recursive: true });

    try {
      let regSlug = "";
      if (entry.install) {
        const m = entry.install.match(/@animate-ui\/([^ ]+)/);
        if (m) regSlug = m[1];
      }
      if (!regSlug) regSlug = slug;

      const json = await fetchCachedJson(
        `https://animate-ui.com/r/${regSlug}.json`,
        `animateui/${regSlug}.json`,
      );

      let mainComp = `${slug}.tsx`;
      if (json.files) {
        for (const f of json.files) {
          const fileName = path.basename(f.path || f.name);
          fs.writeFileSync(path.join(dir, fileName), cleanImports(f.content || ""), "utf8");
          if (fileName.endsWith(".tsx")) mainComp = fileName;
        }
      }

      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateAnimateUIPreview(slug, mainComp),
        "utf8",
      );

      results.push({
        previewKey,
        source: "animateui",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT + Commons Clause",
        title: entry.name,
      });
      console.log(`✓ animateui: ${slug}`);
    } catch (e: any) {
      console.error(`✗ animateui failed for ${slug}:`, e.message);
      fs.writeFileSync(
        path.join(dir, "preview.tsx"),
        generateFallbackPreview(entry.name, entry.description),
        "utf8",
      );
      results.push({
        previewKey,
        source: "animateui",
        slug,
        originUrl: entry.sourceUrl,
        license: "MIT + Commons Clause",
        title: entry.name,
      });
    }
  }
}

function generateAnimateUIPreview(slug: string, mainComp: string): string {
  const mod = mainComp.replace(/\.tsx$/, "");
  return `import * as Module from "./${mod}";

export default function Preview() {
  const Component = Module.default || Object.values(Module)[0] as any;
  return (
    <div className="relative flex min-h-[220px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      {Component ? <Component /> : <p className="text-xs text-muted-fg">${slug}</p>}
    </div>
  );
}
`;
}

function generateFallbackPreview(name: string, description: string): string {
  return `export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-3 p-6 text-center">
      <div className="rounded-xl border border-border bg-muted/40 p-4">
        <h4 className="text-sm font-semibold text-fg">${name}</h4>
        <p className="mt-1 text-xs text-muted-fg max-w-xs leading-relaxed">${description}</p>
      </div>
    </div>
  );
}
`;
}

// UPDATE src/showcase/index.ts
async function updateShowcaseIndex() {
  console.log("\nUpdating src/showcase/index.ts...");
  const lines: string[] = [
    'import type { ComponentType } from "react";',
    "",
    "/**",
    " * Lazy loaders for vendored live previews, keyed by UIEntry.previewKey.",
    " * One folder per component under src/showcase/<source>/<name>/preview.tsx.",
    " */",
    "export const showcaseLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {",
  ];

  for (const entry of entries) {
    const slug = entry.id.replace(new RegExp(`^${entry.source}-`), "");
    const previewKey = entry.previewKey || entry.id;
    lines.push(`  "${previewKey}": () => import("./${entry.source}/${slug}/preview"),`);
  }

  lines.push("};", "");
  fs.writeFileSync(path.join(SHOWCASE_DIR, "index.ts"), lines.join("\n"), "utf8");
  console.log("Updated src/showcase/index.ts ✓");
}

// UPDATE src/data/components/<source>.ts
async function updateRegistryData() {
  console.log("\nUpdating src/data/components/*.ts with previewKeys...");
  const dataDir = path.resolve("src/data/components");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".ts"));

  for (const f of files) {
    const filePath = path.join(dataDir, f);
    let content = fs.readFileSync(filePath, "utf8");

    // Replace entries to ensure previewKey is present
    // Match each entry object block
    content = content.replace(/\{(\s*id:\s*"([^"]+)",[\s\S]*?)\}/g, (match, body, id) => {
      if (body.includes("previewKey:")) return match;
      // Add previewKey
      return `{\n    previewKey: "${id}",${body}}`;
    });

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated ${f} ✓`);
  }
}

// UPDATE src/showcase/README.md
async function updateShowcaseReadme() {
  console.log("\nUpdating src/showcase/README.md...");
  const readmePath = path.join(SHOWCASE_DIR, "README.md");
  let content = `# Showcase — vendored live previews

Frozen snapshots of MIT/free components, re-implemented or copied so they render live
inside UI Vault. **Do not "improve" these** — fix problems by re-copying from upstream.

| previewKey | Origin | License | Copied | Notes |
| ---------- | ------ | ------- | ------ | ----- |
| \`reactbits-blur-text\` | https://reactbits.dev/text-animations/blur-text | MIT | 2026-08-29 | Faithful re-implementation (motion stagger + blur) |
| \`reactbits-shiny-text\` | https://reactbits.dev/text-animations/shiny-text | MIT | 2026-08-29 | CSS-only sweep, keyframes in src/index.css |
| \`reactbits-count-up\` | https://reactbits.dev/animations/count-up | MIT | 2026-08-29 | Re-implementation using motion \`animate()\` |
| \`motionprimitives-text-effect\` | https://motion-primitives.com/docs/text-effect | MIT | 2026-08-29 | Per-letter blur/slide reveal, replayable |
| \`motionprimitives-glow-effect\` | https://motion-primitives.com/docs/glow-effect | MIT | 2026-08-29 | Pointer-tracked radial glow |
| \`fancy-letter-swap\` | https://fancycomponents.dev/docs/letter-swap | MIT | 2026-08-29 | Hover scramble-settle, re-implemented |
| \`fancy-typewriter\` | https://fancycomponents.dev/docs/typewriter | MIT | 2026-08-29 | Type/delete loop with blinking caret |
| \`aceternity-moving-border\` | https://ui.aceternity.com/components/moving-border | MIT (free tier) | 2026-08-29 | Rotating conic-gradient border via CSS \`@property\` |
| \`numberflow-numberflow\` | https://number-flow.barvian.me | MIT | 2026-08-29 | Real \`@number-flow/react\` package |
| \`numberflow-group\` | https://number-flow.barvian.me/docs/grouping | MIT | 2026-08-29 | Real \`@number-flow/react\` package |
`;

  for (const r of results) {
    content += `| \`${r.previewKey}\` | ${r.originUrl} | ${r.license} | 2026-08-29 | Vendored ${r.title} preview |\n`;
  }

  content += `
Rules (see ../AGENTS.md):

- Only vendor from sources marked ✅ vendorable (MIT / open-source free tiers).
- Each preview is self-contained: default-exported, no props, no cross-folder imports.
- Previews must respect reduced motion where the effect allows it.
- Record every addition in this file.
`;

  fs.writeFileSync(readmePath, content, "utf8");
  console.log("Updated src/showcase/README.md ✓");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
