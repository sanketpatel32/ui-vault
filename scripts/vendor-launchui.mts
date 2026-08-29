import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { fetchCachedJson, SHOWCASE_DIR } from "./vendor-utils.mts";

const launchEntries = entries.filter((e) => e.source === "launchui");

function cleanImports(code: string): string {
  return code
    .replace(/@\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/components\/launchui\//g, "./")
    .replace(/@\/components\/ui\//g, "@/components/ui/");
}

export async function vendorLaunchUI() {
  console.log(`Vendoring ${launchEntries.length} Launch UI components...`);

  for (const entry of launchEntries) {
    const slug = entry.id.replace("launchui-", "");
    const dir = path.join(SHOWCASE_DIR, "launchui", slug);
    fs.mkdirSync(dir, { recursive: true });

    let mainComponentFile = slug;

    if (slug !== "fade" && slug !== "glass") {
      const url = `https://www.launchuicomponents.com/r/${slug}.json`;
      try {
        const reg = await fetchCachedJson(url, `launchui/${slug}.json`);
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
        console.warn(`Could not fetch registry for launchui/${slug}: ${e.message}`);
      }
    }

    // Write real preview.tsx
    const previewCode = getLaunchPreview(slug, mainComponentFile);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ launchui: ${slug}`);
  }

  console.log("Launch UI vendoring complete ✓");
}

function getLaunchPreview(slug: string, mainFile: string): string {
  switch (slug) {
    case "hero":
      return `import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-1 text-xs text-muted-fg mb-4">
        <span>🚀 Launch UI Components</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        Build landing pages in minutes
      </h1>
      <p className="mt-3 text-xs text-muted-fg leading-relaxed max-w-md">
        Pre-built, responsive React and Tailwind components to ship modern websites fast.
      </p>
      <div className="mt-6 flex gap-3">
        <Button>Get Started <ArrowRight size={14} /></Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  );
}
`;
    case "navbar":
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <header className="w-full max-w-lg rounded-xl border border-border bg-panel/80 p-3 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xs tracking-wider text-fg">LAUNCHUI</div>
        <nav className="flex gap-4 text-xs text-muted-fg">
          <a href="#" className="hover:text-fg">Features</a>
          <a href="#" className="hover:text-fg">Pricing</a>
          <a href="#" className="hover:text-fg">About</a>
        </nav>
        <Button size="sm">Sign In</Button>
      </div>
    </header>
  );
}
`;
    case "pricing":
      return `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Preview() {
  return (
    <Card className="w-72 border-accent">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">Pro Plan</CardTitle>
        <div className="text-2xl font-bold text-fg">$29 <span className="text-xs font-normal text-muted-fg">/month</span></div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <ul className="space-y-2 text-xs text-muted-fg">
          <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Unlimited components</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Full source code</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Priority support</li>
        </ul>
        <Button size="sm" className="w-full">Subscribe</Button>
      </CardContent>
    </Card>
  );
}
`;
    case "faq":
      return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Preview() {
  return (
    <div className="w-full max-w-sm">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="text-xs">How do I install Launch UI?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-fg">
            Copy and paste components directly or use the shadcn CLI registry.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="text-xs">Is it compatible with Tailwind v4?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-fg">
            Yes, fully tested and compatible with modern React and Tailwind CSS v4.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
`;
    case "footer":
      return `export default function Preview() {
  return (
    <footer className="w-full max-w-md rounded-xl border border-border bg-panel p-6 shadow-xs text-center text-xs text-muted-fg">
      <p>© 2026 Launch UI. Built with React & Tailwind CSS.</p>
    </footer>
  );
}
`;
    case "stats":
      return `export default function Preview() {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-md text-center">
      <div className="rounded-xl border border-border bg-panel p-4">
        <div className="text-xl font-bold text-fg">10k+</div>
        <div className="text-[10px] text-muted-fg">Developers</div>
      </div>
      <div className="rounded-xl border border-border bg-panel p-4">
        <div className="text-xl font-bold text-fg">99.9%</div>
        <div className="text-[10px] text-muted-fg">Uptime</div>
      </div>
      <div className="rounded-xl border border-border bg-panel p-4">
        <div className="text-xl font-bold text-fg">50+</div>
        <div className="text-[10px] text-muted-fg">Components</div>
      </div>
    </div>
  );
}
`;
    case "items":
      return `import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Sparkles } from "lucide-react";

const items = [
  { icon: Zap, title: "Ultra Fast", desc: "Optimized for lightning load times." },
  { icon: Shield, title: "Accessible", desc: "WAI-ARIA compliant components." },
  { icon: Sparkles, title: "Customizable", desc: "Easy styling with Tailwind." },
];

export default function Preview() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-md">
      {items.map((item, i) => (
        <Card key={i}>
          <CardContent className="p-3 text-center space-y-1">
            <item.icon size={18} className="mx-auto text-accent mb-1" />
            <h5 className="text-xs font-semibold text-fg">{item.title}</h5>
            <p className="text-[10px] text-muted-fg leading-tight">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`;
    case "logos":
      return `export default function Preview() {
  return (
    <div className="flex items-center justify-around gap-6 opacity-70 max-w-md">
      <span className="font-bold tracking-widest text-xs">GITHUB</span>
      <span className="font-bold tracking-widest text-xs">VERCEL</span>
      <span className="font-bold tracking-widest text-xs">STRIPE</span>
      <span className="font-bold tracking-widest text-xs">LINEAR</span>
    </div>
  );
}
`;
    case "cta":
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="rounded-2xl border border-border bg-linear-to-r from-accent/10 via-panel to-panel p-6 text-center max-w-md">
      <h3 className="text-lg font-bold text-fg">Ready to build your next project?</h3>
      <p className="text-xs text-muted-fg mt-1">Get started with Launch UI blocks today.</p>
      <Button size="sm" className="mt-4">Start Building Now</Button>
    </div>
  );
}
`;
    case "badge":
      return `import { Badge } from "@/components/ui/badge";

export default function Preview() {
  return (
    <div className="flex gap-2">
      <Badge>New Release</Badge>
      <Badge variant="outline">v2.0.0</Badge>
    </div>
  );
}
`;
    case "button":
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex gap-3">
      <Button>Launch App</Button>
      <Button variant="outline">Documentation</Button>
    </div>
  );
}
`;
    case "glow":
      return `export default function Preview() {
  return (
    <div className="relative flex items-center justify-center p-8">
      <div className="absolute h-24 w-24 rounded-full bg-accent/40 blur-2xl" />
      <div className="relative z-10 rounded-xl border border-border bg-panel/90 px-6 py-3 text-xs font-semibold shadow-lg">
        Luminous Glow Effect
      </div>
    </div>
  );
}
`;
    case "mockup":
      return `export default function Preview() {
  return (
    <div className="w-80 rounded-xl border border-border bg-panel p-2 shadow-xl">
      <div className="flex items-center gap-1.5 px-2 py-1 mb-2 border-b border-border/50">
        <div className="size-2 rounded-full bg-red-500/80" />
        <div className="size-2 rounded-full bg-yellow-500/80" />
        <div className="size-2 rounded-full bg-green-500/80" />
      </div>
      <div className="h-28 rounded-md bg-muted/40 flex items-center justify-center text-xs text-muted-fg">
        Browser Window Mockup
      </div>
    </div>
  );
}
`;
    case "screenshot":
      return `export default function Preview() {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-border shadow-xl">
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
        alt="Dashboard Screenshot"
        className="w-full object-cover"
      />
    </div>
  );
}
`;
    case "fade":
      return `import { motion } from "motion/react";

export default function Preview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-border bg-panel p-6 shadow-xs text-center"
    >
      <h4 className="text-sm font-semibold text-fg">Smooth Fade Transition</h4>
      <p className="mt-1 text-xs text-muted-fg">Subtle entry motion for headers and sections.</p>
    </motion.div>
  );
}
`;
    case "glass":
      return `export default function Preview() {
  return (
    <div className="relative flex items-center justify-center p-8 bg-gradient-to-tr from-accent/20 to-purple-500/20 rounded-2xl">
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-lg text-center dark:bg-black/20">
        <h4 className="text-sm font-semibold text-fg">Frosted Glassmorphism</h4>
        <p className="mt-1 text-xs text-muted-fg">Backdrop blur with translucent border gradient.</p>
      </div>
    </div>
  );
}
`;
    default:
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Button variant="outline">LaunchUI ${slug}</Button>
    </div>
  );
}
`;
  }
}

if (process.argv[1]?.endsWith("vendor-launchui.mts")) {
  void vendorLaunchUI();
}
