import * as fs from "node:fs";
import * as path from "node:path";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const WATERMELON_DIR = path.join(SHOWCASE_DIR, "watermelon");

export function fixWatermelonPreviews() {
  console.log("Fixing Watermelon previews to import locally from ./ ...");

  // 1. card-split-accordion
  fs.writeFileSync(
    path.join(WATERMELON_DIR, "card-split-accordion", "preview.tsx"),
    `import { AccordionApp } from "./card-split-accordion";

export default function Preview() {
  return (
    <div className="flex justify-center p-2">
      <AccordionApp />
    </div>
  );
}
`,
    "utf8",
  );

  const entries = [
    {
      slug: "micro-interactions",
      name: "Micro-interactions Pack",
      code: `import { motion } from "motion/react";
import { useState } from "react";
import { Check, Heart, Bookmark } from "lucide-react";

export function MicroInteractions() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-panel shadow-sm">
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => setLiked(!liked)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/40 text-xs font-medium cursor-pointer"
      >
        <Heart size={14} className={liked ? "fill-red-500 text-red-500" : "text-muted-fg"} />
        <span>{liked ? "Liked" : "Like"}</span>
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => setSaved(!saved)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/40 text-xs font-medium cursor-pointer"
      >
        <Bookmark size={14} className={saved ? "fill-accent text-accent" : "text-muted-fg"} />
        <span>{saved ? "Saved" : "Save"}</span>
      </motion.button>
    </div>
  );
}

export default MicroInteractions;
`,
    },
    {
      slug: "hero-blocks",
      name: "Hero Section Blocks",
      code: `import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function HeroBlock() {
  return (
    <div className="text-center p-6 max-w-md mx-auto space-y-3">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
        🍉 Watermelon UI
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-fg">Next-Gen SaaS Hero Block</h2>
      <p className="text-xs text-muted-fg max-w-sm mx-auto">
        Stunning, responsive hero layouts built with Tailwind CSS and Framer Motion.
      </p>
      <div className="flex justify-center gap-2 pt-2">
        <Button size="sm">Get Started</Button>
        <Button size="sm" variant="outline">Live Demo</Button>
      </div>
    </div>
  );
}

export default HeroBlock;
`,
    },
    {
      slug: "footer-blocks",
      name: "Footer Blocks",
      code: `export function FooterBlock() {
  return (
    <footer className="w-full max-w-md rounded-xl border border-border bg-panel p-6 shadow-xs text-center text-xs space-y-2">
      <div className="font-bold text-fg">WATERMELON UI</div>
      <div className="flex justify-center gap-4 text-muted-fg">
        <a href="#" className="hover:text-fg">Components</a>
        <a href="#" className="hover:text-fg">Blocks</a>
        <a href="#" className="hover:text-fg">Pricing</a>
      </div>
      <p className="text-[10px] text-muted-fg pt-2 border-t border-border">© 2026 Watermelon. All rights reserved.</p>
    </footer>
  );
}

export default FooterBlock;
`,
    },
    {
      slug: "auth-blocks",
      name: "Auth Blocks",
      code: `import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AuthBlock() {
  return (
    <div className="w-72 rounded-2xl border border-border bg-panel p-5 shadow-md space-y-3">
      <div className="text-center">
        <h3 className="text-sm font-bold text-fg">Welcome back</h3>
        <p className="text-[11px] text-muted-fg mt-0.5">Enter your email to sign in</p>
      </div>
      <Input placeholder="name@example.com" className="text-xs" />
      <Button size="sm" className="w-full">Sign In with Email</Button>
    </div>
  );
}

export default AuthBlock;
`,
    },
    {
      slug: "pricing-blocks",
      name: "Pricing Blocks",
      code: `import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingBlock() {
  return (
    <div className="w-64 rounded-2xl border border-accent bg-panel p-4 shadow-md space-y-3">
      <h4 className="text-xs font-semibold text-fg">Starter Plan</h4>
      <div className="text-2xl font-bold text-fg">$19 <span className="text-xs font-normal text-muted-fg">/mo</span></div>
      <ul className="space-y-1.5 text-xs text-muted-fg">
        <li className="flex items-center gap-1.5"><Check size={13} className="text-accent" /> 20+ Blocks</li>
        <li className="flex items-center gap-1.5"><Check size={13} className="text-accent" /> Unlimited exports</li>
      </ul>
      <Button size="sm" className="w-full">Get Started</Button>
    </div>
  );
}

export default PricingBlock;
`,
    },
    {
      slug: "faq-blocks",
      name: "FAQ Blocks",
      code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqBlock() {
  return (
    <div className="w-full max-w-sm">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="text-xs">Is Watermelon UI free?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-fg">
            Yes, Watermelon UI is 100% open source and free to use in your projects.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FaqBlock;
`,
    },
    {
      slug: "testimonial-blocks",
      name: "Testimonial Blocks",
      code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestimonialBlock() {
  return (
    <div className="rounded-2xl border border-border bg-panel p-4 max-w-sm space-y-2 shadow-xs">
      <p className="text-xs text-muted-fg italic leading-relaxed">
        "Watermelon UI cut our landing page development time by half. Highly recommended!"
      </p>
      <div className="flex items-center gap-2 pt-1">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>WM</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-xs font-semibold text-fg">Sarah Connor</div>
          <div className="text-[10px] text-muted-fg">Product Designer</div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialBlock;
`,
    },
    {
      slug: "cta-blocks",
      name: "CTA Blocks",
      code: `import { Button } from "@/components/ui/button";

export function CtaBlock() {
  return (
    <div className="rounded-2xl border border-border bg-linear-to-r from-emerald-500/10 via-panel to-panel p-6 text-center max-w-md shadow-xs">
      <h3 className="text-base font-bold text-fg">Start Building Faster Today</h3>
      <p className="text-xs text-muted-fg mt-1">Join thousands of creators using Watermelon UI blocks.</p>
      <Button size="sm" className="mt-4">Explore Library</Button>
    </div>
  );
}

export default CtaBlock;
`,
    },
    {
      slug: "dashboard-agndex",
      name: "Agndex Dashboard",
      code: `export function AgndexDashboard() {
  return (
    <div className="w-80 rounded-2xl border border-border bg-panel p-4 shadow-md space-y-3">
      <div className="flex justify-between items-center text-xs font-semibold border-b border-border pb-2">
        <span>Agndex Planner</span>
        <span className="text-[10px] text-emerald-500">Active</span>
      </div>
      <div className="space-y-2">
        <div className="p-2 rounded bg-muted/40 text-xs flex justify-between">
          <span>Team Sync</span>
          <span className="text-[10px] text-muted-fg">10:00 AM</span>
        </div>
        <div className="p-2 rounded bg-muted/40 text-xs flex justify-between">
          <span>Design Review</span>
          <span className="text-[10px] text-muted-fg">2:30 PM</span>
        </div>
      </div>
    </div>
  );
}

export default AgndexDashboard;
`,
    },
    {
      slug: "dashboard-astrix",
      name: "Astrix Dashboard",
      code: `export function AstrixDashboard() {
  return (
    <div className="w-80 rounded-2xl border border-border bg-panel p-4 shadow-md space-y-3">
      <div className="text-xs font-semibold text-fg">Astrix Analytics</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-lg bg-muted/30 border border-border text-center">
          <div className="text-base font-bold text-fg">24.5k</div>
          <div className="text-[10px] text-muted-fg">Page Views</div>
        </div>
        <div className="p-2.5 rounded-lg bg-muted/30 border border-border text-center">
          <div className="text-base font-bold text-fg">4.8%</div>
          <div className="text-[10px] text-muted-fg">Conversion</div>
        </div>
      </div>
    </div>
  );
}

export default AstrixDashboard;
`,
    },
    {
      slug: "dashboard-jobtracker",
      name: "Jobtracker Dashboard",
      code: `export function JobtrackerDashboard() {
  return (
    <div className="w-80 rounded-2xl border border-border bg-panel p-4 shadow-md space-y-2">
      <div className="text-xs font-semibold text-fg">Job Application Pipeline</div>
      <div className="flex gap-2 text-[10px]">
        <div className="flex-1 p-2 rounded bg-muted/50 text-center font-medium">Applied (8)</div>
        <div className="flex-1 p-2 rounded bg-accent-soft text-accent text-center font-medium">Interview (3)</div>
        <div className="flex-1 p-2 rounded bg-emerald-500/10 text-emerald-500 text-center font-medium">Offer (1)</div>
      </div>
    </div>
  );
}

export default JobtrackerDashboard;
`,
    },
  ];

  for (const item of entries) {
    const dir = path.join(WATERMELON_DIR, item.slug);
    fs.mkdirSync(dir, { recursive: true });

    // Write index.tsx
    fs.writeFileSync(path.join(dir, "index.tsx"), item.code, "utf8");

    // Write preview.tsx importing from ./index
    fs.writeFileSync(
      path.join(dir, "preview.tsx"),
      `import Component from "./index";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Component />
    </div>
  );
}
`,
      "utf8",
    );
    console.log(`✓ watermelon: ${item.slug}`);
  }

  console.log("Watermelon previews updated ✓");
}

if (process.argv[1]?.endsWith("fix-watermelon-previews.mts")) {
  fixWatermelonPreviews();
}
