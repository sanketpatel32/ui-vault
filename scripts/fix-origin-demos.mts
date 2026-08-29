// Pass 2 of origin/watermelon vendoring: flatten _shared dirs into resolvable modules,
// and rewrite origin previews to compose the REAL named exports (no compound subcomponents).
import {
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { join } from "node:path";

// ---------- 1. flatten _shared/<source>/<name>/ dirs into <name>.tsx modules ----------
for (const source of ["originui", "watermelon"]) {
  const base = `src/showcase/_shared/${source}`;
  if (!existsSync(base)) continue;
  for (const name of readdirSync(base)) {
    const dir = join(base, name);
    const stat = readdirSync(dir);
    if (!stat) continue;
    let files: string[] = [];
    try {
      files = readdirSync(dir);
    } catch {
      continue;
    } // not a dir
    const isDir =
      existsSync(join(dir, "preview.tsx")) ||
      files.every((f) => !f.startsWith(".") && f.includes("."));
    if (!isDir) continue;
    const tsFiles = files.filter((f) => /\.(tsx|ts)$/.test(f));
    if (tsFiles.length === 0) {
      rmSync(dir, { recursive: true, force: true });
      continue;
    }
    const flat = `${base}/${name}.tsx`;
    if (tsFiles.length === 1 && !existsSync(flat)) {
      renameSync(join(dir, tsFiles[0]), flat);
      rmSync(dir, { recursive: true, force: true });
    } else {
      // barrel: re-export everything from the main file (first with a component export)
      const main =
        tsFiles.find((f) => /export/.test(readFileSync(join(dir, f), "utf8"))) ?? tsFiles[0];
      const src = readFileSync(join(dir, main), "utf8");
      const lines = [`export * from "./${name}/${main.replace(/\.tsx?$/, "")}";`];
      if (/export default/.test(src))
        lines.push(`export { default } from "./${name}/${main.replace(/\.tsx?$/, "")}";`);
      writeFileSync(flat, lines.join("\n") + "\n");
    }
  }
}

// ---------- 2. origin previews using the real exported names ----------
const P: Record<string, string> = {};
const wrap = (imports: string, body: string) =>
  `${imports}\n\nexport default function Preview() {\n  return (\n    <div className="w-full">\n${body}\n    </div>\n  );\n}\n`;

P["accordion"] = wrap(
  'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";',
  [
    '      <div className="mx-auto max-w-md p-6">',
    '        <Accordion type="single" collapsible defaultValue="a">',
    '          <AccordionItem value="a">',
    "            <AccordionTrigger>First question</AccordionTrigger>",
    "            <AccordionContent>Yes. It comes from the Origin UI registry.</AccordionContent>",
    "          </AccordionItem>",
    '          <AccordionItem value="b">',
    "            <AccordionTrigger>Second question</AccordionTrigger>",
    "            <AccordionContent>Copy-paste it with the shadcn CLI.</AccordionContent>",
    "          </AccordionItem>",
    "        </Accordion>",
    "      </div>",
  ].join("\n"),
);
P["avatar"] = wrap(
  'import { Avatar, AvatarFallback, AvatarImage } from "./avatar";',
  [
    '      <div className="flex items-center gap-3 p-6">',
    "        <Avatar>",
    '          <AvatarImage src="https://github.com/shadcn.png" alt="Origin" />',
    "          <AvatarFallback>OR</AvatarFallback>",
    "        </Avatar>",
    "        <Avatar>",
    '          <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="Demo" />',
    "          <AvatarFallback>DE</AvatarFallback>",
    "        </Avatar>",
    "        <Avatar>",
    "          <AvatarFallback>UV</AvatarFallback>",
    "        </Avatar>",
    "      </div>",
  ].join("\n"),
);
P["badge"] = wrap(
  'import { Badge } from "./badge";',
  [
    '      <div className="flex flex-wrap gap-2 p-6">',
    "        <Badge>Default</Badge>",
    '        <Badge variant="secondary">Secondary</Badge>',
    '        <Badge variant="destructive">Destructive</Badge>',
    '        <Badge variant="outline">Outline</Badge>',
    "      </div>",
  ].join("\n"),
);
P["breadcrumb"] = wrap(
  'import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";',
  [
    '      <div className="p-6">',
    "        <Breadcrumb>",
    "          <BreadcrumbList>",
    "            <BreadcrumbItem>",
    '              <BreadcrumbLink href="#">Home</BreadcrumbLink>',
    "            </BreadcrumbItem>",
    "            <BreadcrumbSeparator />",
    "            <BreadcrumbItem>",
    '              <BreadcrumbLink href="#">Components</BreadcrumbLink>',
    "            </BreadcrumbItem>",
    "            <BreadcrumbSeparator />",
    "            <BreadcrumbItem>",
    "              <BreadcrumbPage>Origin UI</BreadcrumbPage>",
    "            </BreadcrumbItem>",
    "          </BreadcrumbList>",
    "        </Breadcrumb>",
    "      </div>",
  ].join("\n"),
);
P["button"] = wrap(
  'import { Button } from "./button";',
  [
    '      <div className="flex flex-wrap items-center justify-center gap-3 p-6">',
    "        <Button>Primary</Button>",
    '        <Button variant="secondary">Secondary</Button>',
    '        <Button variant="outline">Outline</Button>',
    '        <Button variant="ghost">Ghost</Button>',
    '        <Button variant="destructive">Destructive</Button>',
    "      </div>",
  ].join("\n"),
);
P["checkbox"] = wrap(
  'import { Checkbox } from "./checkbox";',
  [
    '      <div className="flex flex-col gap-3 p-8">',
    '        <label className="flex items-center gap-2"><Checkbox defaultChecked id="terms" /> <label htmlFor="terms">Accept terms</label></label>',
    '        <label className="flex items-center gap-2"><Checkbox id="news" /> <label htmlFor="news">Subscribe</label></label>',
    "      </div>",
  ].join("\n"),
);
P["dialog"] = wrap(
  'import { Button } from "@/showcase/_shared/originui/button";\nimport { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";',
  [
    '      <div className="flex items-center justify-center p-8">',
    "        <Dialog>",
    "          <DialogTrigger asChild>",
    "            <Button>Open dialog</Button>",
    "          </DialogTrigger>",
    "          <DialogContent>",
    "            <DialogHeader>",
    "              <DialogTitle>Origin UI Dialog</DialogTitle>",
    "              <DialogDescription>Vendored straight from the Origin UI registry.</DialogDescription>",
    "            </DialogHeader>",
    "          </DialogContent>",
    "        </Dialog>",
    "      </div>",
  ].join("\n"),
);
P["input"] = wrap(
  'import { Input } from "./input";',
  [
    '      <div className="flex max-w-sm flex-col gap-3 p-6">',
    '        <Input placeholder="Email address" type="email" />',
    '        <Input placeholder="Password" type="password" />',
    "      </div>",
  ].join("\n"),
);
P["pagination"] = wrap(
  'import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";',
  [
    '      <div className="p-6">',
    "        <Pagination>",
    "          <PaginationContent>",
    "            <PaginationItem>",
    '              <PaginationPrevious href="#" />',
    "            </PaginationItem>",
    "            <PaginationItem>",
    '              <PaginationLink href="#">1</PaginationLink>',
    "            </PaginationItem>",
    "            <PaginationItem>",
    '              <PaginationLink href="#" isActive>\n                2\n              </PaginationLink>',
    "            </PaginationItem>",
    "            <PaginationItem>",
    '              <PaginationNext href="#" />',
    "            </PaginationItem>",
    "          </PaginationContent>",
    "        </Pagination>",
    "      </div>",
  ].join("\n"),
);
P["popover"] = wrap(
  'import { Button } from "@/showcase/_shared/originui/button";\nimport { Popover, PopoverContent, PopoverTrigger } from "./popover";',
  [
    '      <div className="flex items-center justify-center p-8">',
    "        <Popover>",
    "          <PopoverTrigger asChild>",
    '            <Button variant="outline">Open popover</Button>',
    "          </PopoverTrigger>",
    '          <PopoverContent className="w-64 p-4 text-sm">Vendored from the Origin UI registry.</PopoverContent>',
    "        </Popover>",
    "      </div>",
  ].join("\n"),
);
P["select"] = wrap(
  'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";',
  [
    '      <div className="flex items-center justify-center p-8">',
    "        <Select>",
    '          <SelectTrigger className="w-48">',
    '            <SelectValue placeholder="Select a fruit" />',
    "          </SelectTrigger>",
    "          <SelectContent>",
    '            <SelectItem value="apple">Apple</SelectItem>',
    '            <SelectItem value="banana">Banana</SelectItem>',
    '            <SelectItem value="cherry">Cherry</SelectItem>',
    "          </SelectContent>",
    "        </Select>",
    "      </div>",
  ].join("\n"),
);
P["slider"] = wrap(
  'import { Slider } from "./slider";',
  '      <div className="p-8">\n        <Slider defaultValue={[50]} max={100} step={1} />\n      </div>',
);
P["switch"] = wrap(
  'import { Switch } from "./switch";',
  [
    '      <div className="flex items-center gap-3 p-8">',
    '        <Switch defaultChecked id="notifications" />',
    '        <label htmlFor="notifications">Notifications</label>',
    "      </div>",
  ].join("\n"),
);
P["table"] = wrap(
  'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";',
  [
    '      <div className="p-6">',
    "        <Table>",
    "          <TableHeader>",
    "            <TableRow>",
    "              <TableHead>Component</TableHead>",
    "              <TableHead>Source</TableHead>",
    "              <TableHead>License</TableHead>",
    "            </TableRow>",
    "          </TableHeader>",
    "          <TableBody>",
    "            <TableRow>",
    "              <TableCell>Button</TableCell>",
    "              <TableCell>Origin UI</TableCell>",
    "              <TableCell>MIT</TableCell>",
    "            </TableRow>",
    "            <TableRow>",
    "              <TableCell>Input</TableCell>",
    "              <TableCell>Origin UI</TableCell>",
    "              <TableCell>MIT</TableCell>",
    "            </TableRow>",
    "          </TableBody>",
    "        </Table>",
    "      </div>",
  ].join("\n"),
);
P["tabs"] = wrap(
  'import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";',
  [
    '      <div className="p-6">',
    '        <Tabs defaultValue="one">',
    "          <TabsList>",
    '            <TabsTrigger value="one">Overview</TabsTrigger>',
    '            <TabsTrigger value="two">Settings</TabsTrigger>',
    "          </TabsList>",
    '          <TabsContent value="one" className="pt-3 text-sm">Overview tab content.</TabsContent>',
    '          <TabsContent value="two" className="pt-3 text-sm">Settings tab content.</TabsContent>',
    "        </Tabs>",
    "      </div>",
  ].join("\n"),
);
P["textarea"] = wrap(
  'import { Textarea } from "./textarea";',
  '      <div className="p-6">\n        <Textarea placeholder="Leave a comment" className="min-h-28 w-full max-w-md" />\n      </div>',
);
P["timeline"] = wrap(
  'import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle } from "./timeline";',
  [
    '      <div className="p-6">',
    "        <Timeline>",
    "          <TimelineItem>",
    "            <TimelineHeader>",
    "              <TimelineSeparator />",
    "              <TimelineDate>February 2026</TimelineDate>",
    "              <TimelineTitle>Registry released</TimelineTitle>",
    "            </TimelineHeader>",
    "            <TimelineContent>Origin UI components ship as shadcn registry items.</TimelineContent>",
    "          </TimelineItem>",
    "          <TimelineItem>",
    "            <TimelineHeader>",
    "              <TimelineSeparator />",
    "              <TimelineDate>August 2026</TimelineDate>",
    "              <TimelineTitle>Vendored into UI Vault</TimelineTitle>",
    "            </TimelineHeader>",
    "            <TimelineContent>Every family now renders a live preview.</TimelineContent>",
    "          </TimelineItem>",
    "        </Timeline>",
    "      </div>",
  ].join("\n"),
);
P["tooltip"] = wrap(
  'import { Button } from "@/showcase/_shared/originui/button";\nimport { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";',
  [
    '      <div className="flex items-center justify-center p-8">',
    "        <TooltipProvider>",
    "          <Tooltip>",
    "            <TooltipTrigger asChild>",
    '              <Button variant="outline">Hover me</Button>',
    "            </TooltipTrigger>",
    "            <TooltipContent>Vendored from Origin UI.</TooltipContent>",
    "          </Tooltip>",
    "        </TooltipProvider>",
    "      </div>",
  ].join("\n"),
);
P["radio"] = wrap(
  'import { RadioGroup, RadioGroupItem } from "./radio-group";',
  [
    '      <div className="p-8">',
    '        <RadioGroup defaultValue="comfortable">',
    '          <label className="flex items-center gap-2"><RadioGroupItem value="default" id="r1" /> Default</label>',
    '          <label className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="r2" /> Comfortable</label>',
    '          <label className="flex items-center gap-2"><RadioGroupItem value="compact" id="r3" /> Compact</label>',
    "        </RadioGroup>",
    "      </div>",
  ].join("\n"),
);
P["dropdown"] = wrap(
  'import { Button } from "@/showcase/_shared/originui/button";\nimport { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu";',
  [
    '      <div className="flex items-center justify-center p-8">',
    "        <DropdownMenu>",
    "          <DropdownMenuTrigger asChild>",
    '            <Button variant="outline">Open menu</Button>',
    "          </DropdownMenuTrigger>",
    "          <DropdownMenuContent>",
    "            <DropdownMenuLabel>Origin UI</DropdownMenuLabel>",
    "            <DropdownMenuItem>Profile</DropdownMenuItem>",
    "            <DropdownMenuItem>Billing</DropdownMenuItem>",
    "            <DropdownMenuItem>Settings</DropdownMenuItem>",
    "          </DropdownMenuContent>",
    "        </DropdownMenu>",
    "      </div>",
  ].join("\n"),
);
P["calendar-date-picker"] = wrap(
  'import { Calendar } from "./calendar";',
  '      <div className="flex items-center justify-center p-6">\n        <Calendar />\n      </div>',
);
P["stepper"] = wrap(
  'import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from "./stepper";',
  [
    '      <div className="p-6">',
    "        <Stepper defaultValue={2}>",
    "          <StepperItem>",
    "            <StepperTrigger>",
    "              <StepperIndicator>1</StepperIndicator>",
    '              <div className="space-y-0.5">',
    "                <StepperTitle>Account</StepperTitle>",
    "                <StepperDescription>Create your account</StepperDescription>",
    "              </div>",
    "            </StepperTrigger>",
    "            <StepperSeparator />",
    "          </StepperItem>",
    "          <StepperItem>",
    "            <StepperTrigger>",
    "              <StepperIndicator>2</StepperIndicator>",
    '              <div className="space-y-0.5">',
    "                <StepperTitle>Profile</StepperTitle>",
    "                <StepperDescription>Set up your profile</StepperDescription>",
    "              </div>",
    "            </StepperTrigger>",
    "            <StepperSeparator />",
    "          </StepperItem>",
    "          <StepperItem>",
    "            <StepperTrigger>",
    "              <StepperIndicator>3</StepperIndicator>",
    '              <div className="space-y-0.5">',
    "                <StepperTitle>Done</StepperTitle>",
    "                <StepperDescription>Start building</StepperDescription>",
    "              </div>",
    "            </StepperTrigger>",
    "          </StepperItem>",
    "        </Stepper>",
    "      </div>",
  ].join("\n"),
);
P["tree"] = wrap(
  'import { Tree, TreeItem, TreeItemLabel } from "./tree";',
  [
    '      <div className="p-6">',
    "        <Tree>",
    "          <TreeItem>",
    "            <TreeItemLabel>src</TreeItemLabel>",
    "            <TreeItem>",
    "              <TreeItemLabel>components</TreeItemLabel>",
    "              <TreeItem>",
    "                <TreeItemLabel>button.tsx</TreeItemLabel>",
    "              </TreeItem>",
    "            </TreeItem>",
    "            <TreeItem>",
    "              <TreeItemLabel>index.ts</TreeItemLabel>",
    "            </TreeItem>",
    "          </TreeItem>",
    "        </Tree>",
    "      </div>",
  ].join("\n"),
);
P["image-cropper"] = wrap(
  'import { Cropper, CropperCropArea, CropperDescription, CropperImage } from "./cropper";',
  [
    '      <div className="p-6">',
    '        <Cropper src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=640&q=70" alt="Crop me">',
    "          <CropperDescription>Drag to crop</CropperDescription>",
    "        </Cropper>",
    "      </div>",
  ].join("\n"),
);
P["event-calendar"] = wrap(
  'import { EventCalendar } from "./event-calendar";',
  '      <div className="p-4">\n        <EventCalendar />\n      </div>',
);

// folder -> component file name for the non-obvious ones
const FILE: Record<string, string> = { radio: "radio-group", dropdown: "dropdown-menu" };

for (const [fam, content] of Object.entries(P)) {
  const outDir = `src/showcase/originui/${fam}`;
  if (!existsSync(outDir)) {
    console.log(`SKIP ${fam} (no dir)`);
    continue;
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "preview.tsx"), content);
  console.log(`demo ${fam}`);
}
console.log("done");
