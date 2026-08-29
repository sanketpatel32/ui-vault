import * as fs from "node:fs";
import * as path from "node:path";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

export function fixPass3Types() {
  console.log("Applying final type-safety fixes for PASS 3...");

  // 1. launchui screenshot
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "launchui", "screenshot", "preview.tsx"),
    `import Screenshot from "./screenshot";

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

  // 2. Clean originui directory from raw downloaded files (keep only index.tsx and preview.tsx)
  const originDir = path.join(SHOWCASE_DIR, "originui");
  for (const family of fs.readdirSync(originDir)) {
    const familyDir = path.join(originDir, family);
    if (!fs.statSync(familyDir).isDirectory()) continue;

    for (const file of fs.readdirSync(familyDir)) {
      if (file !== "index.tsx" && file !== "preview.tsx") {
        fs.unlinkSync(path.join(familyDir, file));
      }
    }
  }

  // 3. watermelon unused imports
  const heroIndex = path.join(SHOWCASE_DIR, "watermelon", "hero-blocks", "index.tsx");
  if (fs.existsSync(heroIndex)) {
    let code = fs.readFileSync(heroIndex, "utf8");
    code = code.replace(/import\s+{\s*motion\s*}\s+from\s+["']motion\/react["'];?\n?/g, "");
    fs.writeFileSync(heroIndex, code, "utf8");
  }

  const microIndex = path.join(SHOWCASE_DIR, "watermelon", "micro-interactions", "index.tsx");
  if (fs.existsSync(microIndex)) {
    let code = fs.readFileSync(microIndex, "utf8");
    code = code.replace(/Check,\s*/g, "");
    fs.writeFileSync(microIndex, code, "utf8");
  }

  // 4. shadcn bubble preview
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "bubble", "preview.tsx"),
    `import { Bubble, BubbleContent } from "./bubble";

export default function Preview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Bubble variant="default">
        <BubbleContent>Hey! Have you seen the new shadcn components?</BubbleContent>
      </Bubble>
      <Bubble variant="outline" align="end">
        <BubbleContent>Yes, they look fantastic! 🔥</BubbleContent>
      </Bubble>
    </div>
  );
}
`,
    "utf8",
  );

  // 5. shadcn button-group preview
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "button-group", "preview.tsx"),
    `import { ButtonGroup } from "./button-group";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">Years</Button>
      <Button variant="outline" size="sm">Months</Button>
      <Button variant="outline" size="sm">Days</Button>
    </ButtonGroup>
  );
}
`,
    "utf8",
  );

  // 6. shadcn direction preview
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "direction", "preview.tsx"),
    `import { DirectionProvider } from "./direction";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex gap-4">
      <DirectionProvider dir="ltr">
        <Button variant="outline" size="sm">LTR</Button>
      </DirectionProvider>
      <DirectionProvider dir="rtl">
        <Button variant="outline" size="sm">RTL</Button>
      </DirectionProvider>
    </div>
  );
}
`,
    "utf8",
  );

  // 7. shadcn empty preview
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "empty", "preview.tsx"),
    `import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Empty className="max-w-sm rounded-xl border border-dashed border-border p-6 text-center">
      <EmptyHeader>
        <EmptyMedia variant="icon"><Inbox size={20} className="text-muted-fg mx-auto" /></EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>When you receive new messages, they will show up here.</EmptyDescription>
      </EmptyHeader>
      <Button size="sm" variant="outline" className="mt-3">Refresh Inbox</Button>
    </Empty>
  );
}
`,
    "utf8",
  );

  // 8. shadcn field preview
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "field", "preview.tsx"),
    `import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field";
import { Input } from "@/components/ui/input";

export default function Preview() {
  return (
    <FieldGroup className="w-72">
      <Field>
        <FieldLabel htmlFor="email-input">Email Address</FieldLabel>
        <Input id="email-input" placeholder="m@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
`,
    "utf8",
  );

  // 9. shadcn marker preview
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "marker", "preview.tsx"),
    `import { Marker } from "./marker";

export default function Preview() {
  return (
    <div className="w-64 space-y-2">
      <Marker variant="default">Default Marker Item</Marker>
      <Marker variant="separator">Separator Marker</Marker>
      <Marker variant="border">Bordered Marker Item</Marker>
    </div>
  );
}
`,
    "utf8",
  );

  // 10. shadcn message preview
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "message", "preview.tsx"),
    `import { Message, MessageAvatar, MessageContent, MessageHeader } from "./message";

export default function Preview() {
  return (
    <Message className="flex gap-3 max-w-sm">
      <MessageAvatar className="h-8 w-8 text-xs font-semibold">SC</MessageAvatar>
      <MessageContent>
        <MessageHeader>shadcn</MessageHeader>
        <div className="text-xs text-muted-fg mt-0.5">
          Clean, accessible UI primitives for modern React applications.
        </div>
      </MessageContent>
    </Message>
  );
}
`,
    "utf8",
  );

  // 11. shadcn combobox
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "combobox", "combobox.tsx"),
    `import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("next.js");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xs cursor-pointer"
        >
          {value
            ? frameworks.find((f) => f.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1 bg-panel border border-border rounded-lg shadow-md">
        <div className="space-y-1">
          {frameworks.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setValue(f.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-muted cursor-pointer",
                value === f.value ? "font-semibold text-accent" : "text-fg"
              )}
            >
              {f.label}
              {value === f.value && <Check size={14} className="text-accent" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
`,
    "utf8",
  );

  // 12. shadcn date-picker
  fs.writeFileSync(
    path.join(SHOWCASE_DIR, "shadcn", "date-picker", "date-picker.tsx"),
    `import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[220px] justify-start text-left text-xs font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2" size={14} />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
`,
    "utf8",
  );

  console.log("PASS 3 type fixes applied ✓");
}

if (process.argv[1]?.endsWith("fix-pass3-types.mts")) {
  fixPass3Types();
}
