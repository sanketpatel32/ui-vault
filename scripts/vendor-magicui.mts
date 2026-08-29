import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { fetchCachedJson, SHOWCASE_DIR } from "./vendor-utils.mts";

const magicEntries = entries.filter((e) => e.source === "magicui");

function cleanImports(code: string): string {
  return code
    .replace(/@\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/components\/magicui\//g, "./")
    .replace(/@\/components\/ui\//g, "@/components/ui/")
    .replace(/NodeJS\.Timeout/g, "ReturnType<typeof setTimeout>")
    .replace(/import { ChevronLeft, ChevronRight } from "lucide-react";/g, 'import { ChevronLeft, ChevronRight } from "lucide-react";');
}

export async function vendorMagicUI() {
  console.log(`Vendoring ${magicEntries.length} Magic UI components...`);

  for (const entry of magicEntries) {
    const slug = entry.id.replace("magicui-", "");
    const dir = path.join(SHOWCASE_DIR, "magicui", slug);
    fs.mkdirSync(dir, { recursive: true });

    const url = `https://magicui.design/r/${slug}.json`;
    let mainComponentFile = slug;

    try {
      const reg = await fetchCachedJson(url, `magicui/${slug}.json`);
      if (reg.files && Array.isArray(reg.files)) {
        for (const file of reg.files) {
          const fileName = path.basename(file.path || file.name);
          const baseName = fileName.replace(/\.tsx?$/, "");
          if (baseName === slug || !mainComponentFile) {
            mainComponentFile = baseName;
          }
          const cleaned = cleanImports(file.content);
          fs.writeFileSync(path.join(dir, fileName), cleaned, "utf8");
        }
      }
    } catch (e: any) {
      console.warn(`Could not fetch registry for magicui/${slug}: ${e.message}`);
    }

    // Write real preview.tsx
    const previewCode = getMagicPreview(slug, mainComponentFile);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ magicui: ${slug}`);
  }

  console.log("Magic UI vendoring complete ✓");
}

function getMagicPreview(slug: string, mainFile: string): string {
  switch (slug) {
    case "marquee":
      return `import { Marquee } from "./marquee";

const reviews = [
  { name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing." },
  { name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless. This is amazing." },
  { name: "John", username: "@john", body: "I'm at a loss for words. This is amazing. I love it." },
];

export default function Preview() {
  return (
    <div className="relative flex h-[160px] w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-panel">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <figure
            key={review.username}
            className="relative w-48 cursor-pointer overflow-hidden rounded-xl border border-border bg-muted/40 p-3 hover:bg-muted/80"
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-xs font-medium text-fg">{review.name}</figcaption>
                <p className="text-[10px] text-muted-fg">{review.username}</p>
              </div>
            </div>
            <blockquote className="mt-2 text-[11px] text-muted-fg leading-relaxed">{review.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    </div>
  );
}
`;
    case "terminal":
      return `import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "./terminal";

export default function Preview() {
  return (
    <Terminal className="max-w-md">
      <TypingAnimation>&gt; npx create-react-app my-app</TypingAnimation>
      <AnimatedSpan delay={1500} className="text-emerald-500">
        <span>✔ Installing dependencies.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2500} className="text-emerald-500">
        <span>✔ Successfully created project!</span>
      </AnimatedSpan>
    </Terminal>
  );
}
`;
    case "bento-grid":
      return `import { BentoCard, BentoGrid } from "./bento-grid";
import { Bell, FileText } from "lucide-react";

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-linear-to-tr from-accent/20 to-transparent" />,
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-linear-to-tr from-pink-500/20 to-transparent" />,
  },
];

export default function Preview() {
  return (
    <BentoGrid className="max-w-md">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
`;
    case "animated-list":
      return `import { AnimatedList } from "./animated-list";

const notifications = [
  { name: "Payment received", description: "$125.00 from Jane", time: "15m ago", icon: "💸", color: "#00C9A7" },
  { name: "User signed up", description: "Alex joined UI Vault", time: "10m ago", icon: "👤", color: "#FFB800" },
  { name: "New message", description: "Hey, check out this component", time: "5m ago", icon: "💬", color: "#FF3D71" },
];

export default function Preview() {
  return (
    <div className="relative flex h-[220px] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-panel p-4 shadow-xs">
      <AnimatedList>
        {notifications.map((item, idx) => (
          <figure
            key={idx}
            className="relative mx-auto min-h-fit w-full max-w-[340px] cursor-pointer overflow-hidden rounded-xl p-3 border border-border bg-muted/30 transition-all hover:bg-muted/70"
          >
            <div className="flex flex-row items-center gap-3">
              <div
                className="flex size-8 items-center justify-center rounded-xl"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-sm">{item.icon}</span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <figcaption className="text-xs font-semibold text-fg">{item.name}</figcaption>
                <p className="text-[11px] text-muted-fg">{item.description}</p>
              </div>
            </div>
          </figure>
        ))}
      </AnimatedList>
    </div>
  );
}
`;
    case "dock":
      return `import { Dock, DockIcon } from "./dock";
import { Home, Search, Folder, Settings, Bell } from "lucide-react";

export default function Preview() {
  return (
    <div className="relative flex items-center justify-center p-4">
      <Dock direction="middle">
        <DockIcon><Home size={18} /></DockIcon>
        <DockIcon><Search size={18} /></DockIcon>
        <DockIcon><Folder size={18} /></DockIcon>
        <DockIcon><Bell size={18} /></DockIcon>
        <DockIcon><Settings size={18} /></DockIcon>
      </Dock>
    </div>
  );
}
`;
    case "meteors":
      return `import { Meteors } from "./meteors";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950 p-6 shadow-xl">
      <Meteors number={20} />
      <div className="relative z-10 text-center">
        <h4 className="text-xl font-bold tracking-tight text-white">Meteor Shower</h4>
        <p className="mt-1 text-xs text-zinc-400">Atmospheric falling star streaks</p>
      </div>
    </div>
  );
}
`;
    case "confetti":
      return `import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function Preview() {
  const handleClick = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={handleClick}>Trigger Confetti 🎉</Button>
    </div>
  );
}
`;
    case "particles":
      return `import { Particles } from "./particles";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <Particles className="absolute inset-0" quantity={60} ease={80} refresh />
      <div className="relative z-10 text-center">
        <h4 className="text-lg font-bold text-fg">Particles Effect</h4>
        <p className="mt-1 text-xs text-muted-fg">Dynamic floating background node network</p>
      </div>
    </div>
  );
}
`;
    case "blur-fade":
      return `import { BlurFade } from "./blur-fade";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <BlurFade delay={0.25} inView>
        <h3 className="text-2xl font-bold tracking-tight text-fg">Hello BlurFade</h3>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <p className="text-xs text-muted-fg">Smooth progressive blur-in animation sequence.</p>
      </BlurFade>
    </div>
  );
}
`;
    case "typing-animation":
      return `import { TypingAnimation } from "./typing-animation";

export default function Preview() {
  return (
    <div className="text-center font-mono">
      <TypingAnimation className="text-2xl font-bold text-fg">
        Magic UI Typing Animation
      </TypingAnimation>
    </div>
  );
}
`;
    case "animated-shiny-text":
      return `import { AnimatedShinyText } from "./animated-shiny-text";

export default function Preview() {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full border border-border bg-panel px-4 py-1.5 shadow-xs">
        <AnimatedShinyText className="text-xs font-semibold">
          ✨ Introducing Magic UI Components
        </AnimatedShinyText>
      </div>
    </div>
  );
}
`;
    case "animated-gradient-text":
      return `import { AnimatedGradientText } from "./animated-gradient-text";

export default function Preview() {
  return (
    <div className="flex items-center justify-center">
      <AnimatedGradientText>
        🎉 <hr className="mx-2 h-4 w-px bg-border" />
        <span className="text-xs font-medium">Gradient Text Banner</span>
      </AnimatedGradientText>
    </div>
  );
}
`;
    case "shimmer-button":
      return `import { ShimmerButton } from "./shimmer-button";

export default function Preview() {
  return (
    <ShimmerButton className="shadow-2xl">
      <span className="text-center text-xs font-semibold leading-none tracking-tight text-white">
        Shimmer Button
      </span>
    </ShimmerButton>
  );
}
`;
    case "rainbow-button":
      return `import { RainbowButton } from "./rainbow-button";

export default function Preview() {
  return <RainbowButton>Get Unlimited Access</RainbowButton>;
}
`;
    case "ripple-button":
      return `import { RippleButton } from "./ripple-button";

export default function Preview() {
  return <RippleButton rippleColor="#8b5cf6">Click for Ripple</RippleButton>;
}
`;
    case "ripple":
      return `import { Ripple } from "./ripple";

export default function Preview() {
  return (
    <div className="relative flex h-52 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel">
      <p className="z-10 whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter text-fg">
        Ripple
      </p>
      <Ripple />
    </div>
  );
}
`;
    case "retro-grid":
      return `import { RetroGrid } from "./retro-grid";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-3xl font-bold leading-none tracking-tighter text-fg">
        Retro Grid
      </span>
      <RetroGrid />
    </div>
  );
}
`;
    case "dot-pattern":
      return `import { DotPattern } from "./dot-pattern";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <p className="z-10 text-2xl font-bold tracking-tight text-fg">Dot Pattern</p>
      <DotPattern className="[mask-image:radial-gradient(150px_circle_at_center,white,transparent)]" />
    </div>
  );
}
`;
    case "grid-pattern":
      return `import { GridPattern } from "./grid-pattern";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <p className="z-10 text-2xl font-bold tracking-tight text-fg">Grid Pattern</p>
      <GridPattern className="[mask-image:radial-gradient(150px_circle_at_center,white,transparent)]" />
    </div>
  );
}
`;
    case "flickering-grid":
      return `import { FlickeringGrid } from "./flickering-grid";

export default function Preview() {
  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel p-6 shadow-xs">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#8b5cf6"
        maxOpacity={0.4}
        flickerChance={0.1}
      />
      <p className="z-10 text-2xl font-bold tracking-tight text-fg">Flickering Grid</p>
    </div>
  );
}
`;
    case "magic-card":
      return `import { MagicCard } from "./magic-card";

export default function Preview() {
  return (
    <MagicCard className="cursor-pointer flex-col items-center justify-center p-8 text-center shadow-2xl w-72">
      <p className="text-base font-semibold text-fg">Magic Card</p>
      <p className="text-xs text-muted-fg mt-1">Interactive spotlight reflection border</p>
    </MagicCard>
  );
}
`;
    case "shine-border":
      return `import { ShineBorder } from "./shine-border";

export default function Preview() {
  return (
    <ShineBorder
      className="relative flex h-36 w-64 flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-panel p-4 text-center"
      color="#A07CFE"
    >
      <span className="text-sm font-semibold text-fg">Shine Border</span>
    </ShineBorder>
  );
}
`;
    case "border-beam":
      return `import { BorderBeam } from "./border-beam";

export default function Preview() {
  return (
    <div className="relative flex h-36 w-64 flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-panel p-4 text-center">
      <span className="text-sm font-semibold text-fg">Border Beam</span>
      <BorderBeam size={80} duration={8} delay={4} />
    </div>
  );
}
`;
    case "animated-beam":
      return `import { AnimatedBeam } from "./animated-beam";
import { useRef } from "react";
import { User, Server } from "lucide-react";

export default function Preview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-36 w-72 items-center justify-between overflow-hidden rounded-xl border border-border bg-panel p-6"
    >
      <div ref={fromRef} className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
        <User size={16} />
      </div>
      <div ref={toRef} className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
        <Server size={16} />
      </div>
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    </div>
  );
}
`;
    case "safari":
      return `import { Safari } from "./safari";

export default function Preview() {
  return (
    <div className="relative w-80">
      <Safari url="magicui.design" className="size-full" />
    </div>
  );
}
`;
    case "iphone":
      return `import { Iphone } from "./iphone";

export default function Preview() {
  return (
    <div className="relative w-48">
      <Iphone className="size-full" />
    </div>
  );
}
`;
    case "android":
      return `import { Android } from "./android";

export default function Preview() {
  return (
    <div className="relative w-48">
      <Android className="size-full" />
    </div>
  );
}
`;
    case "scroll-based-velocity":
      return `import { ScrollVelocityContainer, ScrollVelocityRow } from "./scroll-based-velocity";

export default function Preview() {
  return (
    <ScrollVelocityContainer className="w-full max-w-sm overflow-hidden py-2">
      <ScrollVelocityRow baseVelocity={2}>
        Magic UI Velocity Scroll
      </ScrollVelocityRow>
    </ScrollVelocityContainer>
  );
}
`;
    case "hyper-text":
      return `import { HyperText } from "./hyper-text";

export default function Preview() {
  return <HyperText className="text-2xl font-bold text-fg font-mono">HYPER TEXT</HyperText>;
}
`;
    case "word-rotate":
      return `import { WordRotate } from "./word-rotate";

export default function Preview() {
  return (
    <WordRotate
      className="text-3xl font-bold text-fg tracking-tight"
      words={["Beautiful", "Performant", "Animated", "Composable"]}
    />
  );
}
`;
    case "sparkles-text":
      return `import { SparklesText } from "./sparkles-text";

export default function Preview() {
  return <SparklesText className="text-2xl font-bold">Magic Sparkles</SparklesText>;
}
`;
    case "morphing-text":
      return `import { MorphingText } from "./morphing-text";

const texts = ["Dynamic", "Interactive", "Animated", "MagicUI"];

export default function Preview() {
  return <MorphingText texts={texts} className="text-2xl font-bold" />;
}
`;
    case "spinning-text":
      return `import { SpinningText } from "./spinning-text";

export default function Preview() {
  return <SpinningText className="text-xs font-semibold tracking-widest text-accent">MAGIC • UI • VAULT • </SpinningText>;
}
`;
    case "text-reveal":
      return `import { TextReveal } from "./text-reveal";

export default function Preview() {
  return (
    <div className="z-10 flex min-h-[120px] items-center justify-center">
      <TextReveal>Magic UI will change how you design modern React components.</TextReveal>
    </div>
  );
}
`;
    case "globe":
      return `import { Globe } from "./globe";

export default function Preview() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}
`;
    case "highlighter":
      return `import { Highlighter } from "./highlighter";

export default function Preview() {
  return (
    <p className="text-sm text-fg">
      Highlight important text with{" "}
      <Highlighter action="highlight" color="#8b5cf6">
        rough notation
      </Highlighter>{" "}
      effects.
    </p>
  );
}
`;
    default: {
      return `import * as ComponentModule from "./${mainFile}";

export default function Preview() {
  const Component = (ComponentModule as any).default || Object.values(ComponentModule)[0] as any;
  if (!Component) return <div className="text-xs text-muted-fg">Component loaded</div>;
  return (
    <div className="flex items-center justify-center p-4">
      <Component />
    </div>
  );
}
`;
    }
  }
}

if (process.argv[1]?.endsWith("vendor-magicui.mts")) {
  void vendorMagicUI();
}
