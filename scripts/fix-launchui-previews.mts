import * as fs from "node:fs";
import * as path from "node:path";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const LAUNCH_DIR = path.join(SHOWCASE_DIR, "launchui");

export function fixLaunchUIPreviews() {
  console.log("Fixing Launch UI previews to import locally from ./ ...");

  // 1. badge
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "badge", "preview.tsx"),
    `import { Badge } from "./badge";

export default function Preview() {
  return (
    <div className="flex gap-2">
      <Badge>New Release</Badge>
      <Badge variant="outline">v2.0.0</Badge>
    </div>
  );
}
`,
    "utf8",
  );

  // 2. button
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "button", "preview.tsx"),
    `import { Button } from "./button";

export default function Preview() {
  return (
    <div className="flex gap-3">
      <Button>Launch App</Button>
      <Button variant="outline">Documentation</Button>
    </div>
  );
}
`,
    "utf8",
  );

  // 3. cta
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "cta", "preview.tsx"),
    `import { Button } from "./button";
import { LinkButton } from "./link-button";

export default function Preview() {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-r from-accent/10 via-panel to-panel p-6 text-center max-w-md">
      <h3 className="text-lg font-bold text-fg">Ready to build your next project?</h3>
      <p className="text-xs text-muted-fg mt-1">Get started with Launch UI blocks today.</p>
      <div className="mt-4 flex justify-center gap-3">
        <Button size="sm">Start Building Now</Button>
        <LinkButton href="#" variant="outline" size="sm">Explore Docs</LinkButton>
      </div>
    </div>
  );
}
`,
    "utf8",
  );

  // 4. faq
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "faq", "preview.tsx"),
    `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

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
`,
    "utf8",
  );

  // 5. footer
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "footer", "preview.tsx"),
    `import { Footer, FooterBottom, FooterContent } from "./footer";
import { Button } from "./button";

export default function Preview() {
  return (
    <Footer className="w-full max-w-md rounded-xl border border-border bg-panel p-4 shadow-xs">
      <FooterContent className="text-center text-xs">
        <h4 className="font-semibold text-fg">Launch UI</h4>
        <p className="text-[11px] text-muted-fg mt-1">Free & premium landing page components</p>
      </FooterContent>
      <FooterBottom className="mt-4 flex justify-between items-center text-[10px] text-muted-fg border-t border-border pt-2">
        <span>© 2026 Launch UI</span>
        <Button size="sm" variant="ghost" className="h-6 text-[10px]">Privacy</Button>
      </FooterBottom>
    </Footer>
  );
}
`,
    "utf8",
  );

  // 6. hero
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "hero", "preview.tsx"),
    `import { Badge } from "./badge";
import { Button } from "./button";
import { Mockup, MockupFrame } from "./mockup";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-3">
      <Badge variant="outline">🚀 Launch UI Components</Badge>
      <h1 className="text-2xl font-bold tracking-tight text-fg">
        Build landing pages in minutes
      </h1>
      <p className="text-xs text-muted-fg max-w-sm">
        Pre-built, responsive React and Tailwind components to ship modern websites fast.
      </p>
      <div className="flex gap-2 pt-1">
        <Button size="sm">Get Started</Button>
        <Button size="sm" variant="outline">Learn More</Button>
      </div>
      <MockupFrame size="small" className="w-full mt-3">
        <Mockup type="responsive" className="bg-panel p-3 text-center text-xs text-muted-fg">
          Interactive Hero Preview Window
        </Mockup>
      </MockupFrame>
    </div>
  );
}
`,
    "utf8",
  );

  // 7. items
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "items", "preview.tsx"),
    `import { Item, ItemTitle, ItemDescription, ItemIcon } from "./item";
import { Zap, Shield } from "lucide-react";

export default function Preview() {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-md">
      <Item className="rounded-xl border border-border bg-panel p-3">
        <ItemIcon><Zap size={16} className="text-accent" /></ItemIcon>
        <ItemTitle className="text-xs font-semibold">Ultra Fast</ItemTitle>
        <ItemDescription className="text-[10px] text-muted-fg">Lightning speed page loads</ItemDescription>
      </Item>
      <Item className="rounded-xl border border-border bg-panel p-3">
        <ItemIcon><Shield size={16} className="text-accent" /></ItemIcon>
        <ItemTitle className="text-xs font-semibold">Accessible</ItemTitle>
        <ItemDescription className="text-[10px] text-muted-fg">WAI-ARIA compliant design</ItemDescription>
      </Item>
    </div>
  );
}
`,
    "utf8",
  );

  // 8. logos
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "logos", "preview.tsx"),
    `import Logo from "./logo";
import { ReactLogo } from "./react";

export default function Preview() {
  return (
    <div className="flex items-center justify-around gap-6 p-4 rounded-xl border border-border bg-panel">
      <Logo image={ReactLogo} name="React" />
      <Logo image={ReactLogo} name="Framework" badge="v19" />
    </div>
  );
}
`,
    "utf8",
  );

  // 9. mockup
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "mockup", "preview.tsx"),
    `import { Mockup, MockupFrame } from "./mockup";

export default function Preview() {
  return (
    <MockupFrame size="small" className="w-72">
      <Mockup type="responsive" className="bg-panel p-6 text-center text-xs text-muted-fg">
        Responsive Device Mockup Frame
      </Mockup>
    </MockupFrame>
  );
}
`,
    "utf8",
  );

  // 10. navbar
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "navbar", "preview.tsx"),
    `import { Navbar, NavbarLeft, NavbarRight } from "./navbar";
import { Button } from "./button";

export default function Preview() {
  return (
    <Navbar className="w-full max-w-lg rounded-xl border border-border bg-panel/90 p-3 shadow-xs">
      <NavbarLeft>
        <span className="font-bold text-xs tracking-wider text-fg">LAUNCHUI</span>
      </NavbarLeft>
      <NavbarRight>
        <Button size="sm">Sign In</Button>
      </NavbarRight>
    </Navbar>
  );
}
`,
    "utf8",
  );

  // 11. pricing
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "pricing", "pricing.tsx"),
    `import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  children?: ReactNode;
  className?: string;
}

export function PricingCard({ title, price, period = "/month", children, className }: PricingCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-panel p-5 shadow-sm max-w-xs space-y-3", className)}>
      <div>
        <h4 className="text-xs font-semibold text-muted-fg uppercase tracking-wider">{title}</h4>
        <div className="text-2xl font-bold text-fg mt-1">
          {price} <span className="text-xs font-normal text-muted-fg">{period}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
`,
    "utf8",
  );

  fs.writeFileSync(
    path.join(LAUNCH_DIR, "pricing", "preview.tsx"),
    `import { PricingCard } from "./pricing";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <PricingCard title="Pro Plan" price="$29">
      <p className="text-xs text-muted-fg">Full access to all Launch UI marketing blocks.</p>
      <Button size="sm" className="w-full mt-2">Subscribe</Button>
    </PricingCard>
  );
}
`,
    "utf8",
  );

  // 12. screenshot
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "screenshot", "preview.tsx"),
    `import { Screenshot } from "./screenshot";

export default function Preview() {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-border shadow-md">
      <Screenshot
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
        alt="Dashboard Screenshot"
        className="w-full object-cover"
      />
    </div>
  );
}
`,
    "utf8",
  );

  // 13. stats
  fs.writeFileSync(
    path.join(LAUNCH_DIR, "stats", "stats.tsx"),
    `import { cn } from "@/lib/utils";

export interface StatItemProps {
  value: string;
  label: string;
  className?: string;
}

export function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-panel p-3 text-center", className)}>
      <div className="text-lg font-bold text-fg">{value}</div>
      <div className="text-[10px] text-muted-fg mt-0.5">{label}</div>
    </div>
  );
}
`,
    "utf8",
  );

  fs.writeFileSync(
    path.join(LAUNCH_DIR, "stats", "preview.tsx"),
    `import { StatItem } from "./stats";

export default function Preview() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-sm">
      <StatItem value="10k+" label="Users" />
      <StatItem value="99.9%" label="Uptime" />
      <StatItem value="50+" label="Blocks" />
    </div>
  );
}
`,
    "utf8",
  );

  console.log("Launch UI previews updated ✓");
}

if (process.argv[1]?.endsWith("fix-launchui-previews.mts")) {
  fixLaunchUIPreviews();
}
