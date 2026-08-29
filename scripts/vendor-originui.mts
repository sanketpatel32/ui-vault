import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const originEntries = entries.filter((e) => e.source === "originui");

export function vendorOriginUI() {
  console.log(`Vendoring ${originEntries.length} Origin UI components...`);

  for (const entry of originEntries) {
    const slug = entry.id.replace("originui-", "");
    const dir = path.join(SHOWCASE_DIR, "originui", slug);
    fs.mkdirSync(dir, { recursive: true });

    // Generate real component preview
    const previewCode = getOriginPreview(slug);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ originui: ${slug}`);
  }

  console.log("Origin UI vendoring complete ✓");
}

function getOriginPreview(slug: string): string {
  const title = slug.replace(/-/g, " ");

  switch (slug) {
    case "button":
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Origin Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
`;
    case "badge":
      return `import { Badge } from "@/components/ui/badge";

export default function Preview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="outline">Archived</Badge>
    </div>
  );
}
`;
    case "accordion":
      return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Preview() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem value="1">
        <AccordionTrigger className="text-xs">How does Origin UI work?</AccordionTrigger>
        <AccordionContent className="text-xs text-muted-fg">
          Origin UI provides copy-paste variants for high-density components.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
`;
    case "switch":
      return `import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="origin-switch" defaultChecked />
      <Label htmlFor="origin-switch" className="cursor-pointer text-xs">Enable Notifications</Label>
    </div>
  );
}
`;
    case "slider":
      return `import { Slider } from "@/components/ui/slider";

export default function Preview() {
  return (
    <div className="w-64 space-y-2">
      <Slider defaultValue={[45]} max={100} step={1} />
    </div>
  );
}
`;
    case "avatar":
      return `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Preview() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>OR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  );
}
`;
    case "banner":
      return `import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-accent/30 bg-accent-soft p-3 text-xs text-fg max-w-md w-full">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-accent" />
        <span>Origin UI v2 component variants now available.</span>
      </div>
      <Button size="sm" variant="outline" className="h-7 text-xs">Upgrade</Button>
    </div>
  );
}
`;
    case "easings":
      return `import { motion } from "motion/react";

export default function Preview() {
  return (
    <div className="flex flex-col gap-3 w-64">
      <motion.div
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
        className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-xs text-accent-fg font-bold"
      >
        O
      </motion.div>
      <span className="text-[11px] text-muted-fg font-mono">cubic-bezier(0.16, 1, 0.3, 1)</span>
    </div>
  );
}
`;
    default:
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="rounded-xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm space-y-2">
      <h4 className="text-sm font-semibold text-fg capitalize">${title} Family</h4>
      <p className="text-xs text-muted-fg leading-relaxed">
        Origin UI curated high-density component variant collection.
      </p>
      <Button size="sm" variant="outline">Inspect Variants</Button>
    </div>
  );
}
`;
  }
}

if (process.argv[1]?.endsWith("vendor-originui.mts")) {
  vendorOriginUI();
}
