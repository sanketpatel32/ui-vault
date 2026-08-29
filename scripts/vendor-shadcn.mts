import * as fs from "node:fs";
import * as path from "node:path";
import { entries } from "../src/data/index.ts";
import { fetchCachedJson, SHOWCASE_DIR } from "./vendor-utils.mts";

const shadcnEntries = entries.filter((e) => e.source === "shadcn");

function cleanImports(code: string): string {
  return code
    .replace(/@\/registry\/new-york-v4\/hooks\/use-mobile/g, "@/hooks/use-mobile")
    .replace(/@\/registry\/default\/hooks\/use-mobile/g, "@/hooks/use-mobile")
    .replace(/@\/registry\/new-york-v4\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/registry\/default\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/registry\/new-york-v4\/ui\//g, "@/components/ui/")
    .replace(/@\/registry\/default\/ui\//g, "@/components/ui/");
}

export async function vendorShadcn() {
  console.log(`Vendoring ${shadcnEntries.length} shadcn components...`);

  for (const entry of shadcnEntries) {
    const slug = entry.id.replace("shadcn-", "");
    const dir = path.join(SHOWCASE_DIR, "shadcn", slug);
    fs.mkdirSync(dir, { recursive: true });

    const isToast = slug === "toast";
    const url = isToast
      ? "https://ui.shadcn.com/r/styles/default/toast.json"
      : `https://ui.shadcn.com/r/styles/new-york-v4/${slug}.json`;

    try {
      const reg = await fetchCachedJson(url, `shadcn/${slug}.json`);
      if (reg.files && Array.isArray(reg.files)) {
        for (const file of reg.files) {
          const fileName = path.basename(file.path || file.name);
          const cleaned = cleanImports(file.content);
          fs.writeFileSync(path.join(dir, fileName), cleaned, "utf8");
        }
      }
    } catch (e: any) {
      console.warn(`Could not fetch registry for shadcn/${slug}: ${e.message}`);
    }

    // Write real preview.tsx
    const previewCode = getShadcnPreview(slug);
    fs.writeFileSync(path.join(dir, "preview.tsx"), previewCode, "utf8");
    console.log(`✓ shadcn: ${slug}`);
  }

  console.log("Shadcn vendoring complete ✓");
}

function getShadcnPreview(slug: string): string {
  switch (slug) {
    case "accordion":
      return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export default function Preview() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
`;
    case "alert":
      return `import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Terminal } from "lucide-react";

export default function Preview() {
  return (
    <Alert className="w-full max-w-sm">
      <Terminal size={16} />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}
`;
    case "alert-dialog":
      return `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Alert Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
`;
    case "aspect-ratio":
      return `import { AspectRatio } from "./aspect-ratio";

export default function Preview() {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-border shadow-xs">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=60"
          alt="Photo by Drew Beamer"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}
`;
    case "avatar":
      return `import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function Preview() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  );
}
`;
    case "badge":
      return `import { Badge } from "./badge";

export default function Preview() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}
`;
    case "breadcrumb":
      return `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

export default function Preview() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
`;
    case "button":
      return `import { Button } from "./button";

export default function Preview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
`;
    case "button-group":
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="inline-flex rounded-lg border border-border p-1 bg-panel shadow-xs">
      <Button variant="ghost" size="sm" className="rounded-md">Day</Button>
      <Button variant="subtle" size="sm" className="rounded-md">Week</Button>
      <Button variant="ghost" size="sm" className="rounded-md">Month</Button>
      <Button variant="ghost" size="sm" className="rounded-md">Year</Button>
    </div>
  );
}
`;
    case "calendar":
      return `import { useState } from "react";
import { Calendar } from "./calendar";

export default function Preview() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-xl border border-border bg-panel shadow-xs p-3"
    />
  );
}
`;
    case "card":
      return `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-fg">Your project will be deployed to GitHub Pages.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Deploy</Button>
      </CardFooter>
    </Card>
  );
}
`;
    case "carousel":
      return `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Preview() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
`;
    case "chart":
      return `import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 240 },
  { name: "Mar", total: 180 },
  { name: "Apr", total: 320 },
  { name: "May", total: 290 },
];

export default function Preview() {
  return (
    <Card className="w-80">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">Monthly Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
              <Bar dataKey="total" fill="currentColor" className="fill-accent" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
`;
    case "checkbox":
      return `import { Checkbox } from "./checkbox";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms" className="cursor-pointer">
        Accept terms and conditions
      </Label>
    </div>
  );
}
`;
    case "collapsible":
      return `import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function Preview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-80 space-y-2 rounded-xl border border-border bg-panel p-4"
    >
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-xs font-semibold text-fg">Starred Repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronsUpDown size={14} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-fg">
        @shadcn/ui
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-fg">
          @tailwindlabs/tailwindcss
        </div>
        <div className="rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-fg">
          @radix-ui/primitives
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
`;
    case "command":
      return `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Calculator, Calendar, Smile } from "lucide-react";

export default function Preview() {
  return (
    <Command className="rounded-xl border border-border shadow-md max-w-xs">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem className="flex items-center gap-2">
            <Calendar size={14} /> <span>Calendar</span>
          </CommandItem>
          <CommandItem className="flex items-center gap-2">
            <Smile size={14} /> <span>Search Emoji</span>
          </CommandItem>
          <CommandItem className="flex items-center gap-2">
            <Calculator size={14} /> <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
`;
    case "context-menu":
      return `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./context-menu";

export default function Preview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-fg">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuItem>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
`;
    case "dialog":
      return `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-xs text-muted-fg">
          Profile form controls render here.
        </div>
      </DialogContent>
    </Dialog>
  );
}
`;
    case "drawer":
      return `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Set Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 text-center text-2xl font-bold font-mono">
            350 cal/day
          </div>
          <DrawerFooter>
            <Button size="sm">Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
`;
    case "dropdown-menu":
      return `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
`;
    case "hover-card":
      return `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="font-semibold text-accent">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-fg">@nextjs</h4>
            <p className="text-xs text-muted-fg leading-relaxed">
              The React Framework – created and maintained by @vercel.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
`;
    case "input":
      return `import { Input } from "./input";

export default function Preview() {
  return (
    <div className="w-72 space-y-3">
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
    </div>
  );
}
`;
    case "input-otp":
      return `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./input-otp";

export default function Preview() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
`;
    case "label":
      return `import { Label } from "./label";
import { Input } from "@/components/ui/input";

export default function Preview() {
  return (
    <div className="grid w-72 items-center gap-1.5">
      <Label htmlFor="email">Your email address</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  );
}
`;
    case "menubar":
      return `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./menubar";

export default function Preview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
`;
    case "navigation-menu":
      return `import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";

export default function Preview() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-muted" href="#">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-muted" href="#">
            Components
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-muted" href="#">
            Changelog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
`;
    case "pagination":
      return `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

export default function Preview() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
`;
    case "popover":
      return `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-2">
        <h4 className="font-semibold text-xs text-fg">Dimensions</h4>
        <p className="text-xs text-muted-fg">Set width and height properties for the layer.</p>
      </PopoverContent>
    </Popover>
  );
}
`;
    case "progress":
      return `import { Progress } from "./progress";

export default function Preview() {
  return <Progress value={66} className="w-64" />;
}
`;
    case "radio-group":
      return `import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <RadioGroup defaultValue="comfortable" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}
`;
    case "resizable":
      return `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";

export default function Preview() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md min-h-[140px] rounded-xl border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-xs text-muted-fg font-medium">
          Sidebar Panel
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-xs text-muted-fg font-medium">
          Main Content Panel
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
`;
    case "scroll-area":
      return `import { ScrollArea } from "./scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 25 }).map((_, i, a) => \`v1.2.0-beta.\${a.length - i}\`);

export default function Preview() {
  return (
    <ScrollArea className="h-48 w-48 rounded-xl border border-border p-4">
      <h4 className="mb-3 text-xs font-semibold leading-none text-fg">Tags</h4>
      {tags.map((tag) => (
        <div key={tag}>
          <div className="text-xs text-muted-fg py-1">{tag}</div>
          <Separator className="my-1" />
        </div>
      ))}
    </ScrollArea>
  );
}
`;
    case "select":
      return `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export default function Preview() {
  return (
    <Select defaultValue="apple">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
      </SelectContent>
    </Select>
  );
}
`;
    case "separator":
      return `import { Separator } from "./separator";

export default function Preview() {
  return (
    <div className="space-y-3 text-xs w-72">
      <div>
        <h4 className="text-xs font-semibold text-fg">Radix Primitives</h4>
        <p className="text-[11px] text-muted-fg">An open-source UI component library.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-xs text-muted-fg">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
`;
    case "sheet":
      return `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Panel</SheetTitle>
          <SheetDescription>
            Slide-over sheet panel for complex side drawer workflows.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
`;
    case "sidebar":
      return `import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Users, FolderGit2 } from "lucide-react";

export default function Preview() {
  return (
    <aside className="w-64 rounded-xl border border-border bg-panel p-4 shadow-xs">
      <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-fg">
        Workspace
      </div>
      <nav className="space-y-1">
        <Button variant="subtle" size="sm" className="w-full justify-start gap-2">
          <LayoutDashboard size={15} /> Dashboard
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <FolderGit2 size={15} /> Projects
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Users size={15} /> Team
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Settings size={15} /> Settings
        </Button>
      </nav>
    </aside>
  );
}
`;
    case "skeleton":
      return `import { Skeleton } from "./skeleton";

export default function Preview() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
`;
    case "slider":
      return `import { Slider } from "./slider";

export default function Preview() {
  return <Slider defaultValue={[50]} max={100} step={1} className="w-64" />;
}
`;
    case "sonner":
      return `import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Toaster />
      <Button
        variant="outline"
        onClick={() => toast("Event has been created", {
          description: "Sunday, December 03, 2026 at 9:00 AM",
        })}
      >
        Show Sonner Toast
      </Button>
    </div>
  );
}
`;
    case "spinner":
      return `import { Loader2 } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex items-center gap-3">
      <Loader2 size={16} className="animate-spin text-muted-fg" />
      <Loader2 size={24} className="animate-spin text-accent" />
      <Loader2 size={32} className="animate-spin text-fg" />
    </div>
  );
}
`;
    case "switch":
      return `import { Switch } from "./switch";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" defaultChecked />
      <Label htmlFor="airplane-mode" className="cursor-pointer">Airplane Mode</Label>
    </div>
  );
}
`;
    case "table":
      return `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const invoices = [
  { id: "INV001", status: "Paid", amount: "$250.00" },
  { id: "INV002", status: "Pending", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", amount: "$350.00" },
];

export default function Preview() {
  return (
    <div className="w-80 rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-mono">{inv.id}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell className="text-right font-mono">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
`;
    case "tabs":
      return `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./tabs";

export default function Preview() {
  return (
    <Tabs defaultValue="account" className="w-80">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="mt-2 text-xs text-muted-fg leading-relaxed">
          Manage your account preferences, billing, and profile details.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="mt-2 text-xs text-muted-fg leading-relaxed">
          Change your security credentials and multi-factor authentication.
        </p>
      </TabsContent>
    </Tabs>
  );
}
`;
    case "textarea":
      return `import { Textarea } from "./textarea";

export default function Preview() {
  return (
    <Textarea
      placeholder="Type your message here."
      className="w-72"
    />
  );
}
`;
    case "toast":
      return `import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export default function Preview() {
  return (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => toast("Scheduled: Catch up with team", {
          description: "Friday, Feb 10 at 5:57 PM",
        })}
      >
        Trigger Toast
      </Button>
    </div>
  );
}
`;
    case "toggle":
      return `import { Toggle } from "./toggle";
import { Bold, Italic, Underline } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Toggle bold"><Bold size={15} /></Toggle>
      <Toggle aria-label="Toggle italic"><Italic size={15} /></Toggle>
      <Toggle aria-label="Toggle underline"><Underline size={15} /></Toggle>
    </div>
  );
}
`;
    case "toggle-group":
      return `import {
  ToggleGroup,
  ToggleGroupItem,
} from "./toggle-group";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export default function Preview() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft size={15} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter size={15} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight size={15} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
`;
    case "tooltip":
      return `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover Me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
`;
    case "typography":
      return `export default function Preview() {
  return (
    <div className="max-w-sm space-y-2 text-left">
      <h3 className="text-lg font-bold tracking-tight text-fg">Taxonomy & Typography</h3>
      <p className="text-xs text-muted-fg leading-relaxed">
        The king, seeing how much happier his subjects were, realized the importance of typography.
      </p>
    </div>
  );
}
`;
    case "data-table":
      return `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tasks = [
  { code: "TASK-8782", title: "You can't compress the program without...", status: "In Progress" },
  { code: "TASK-7878", title: "Try to calculate the EXE feed, maybe it will...", status: "Done" },
  { code: "TASK-7839", title: "We need to bypass the neural TCP card!", status: "Todo" },
];

export default function Preview() {
  return (
    <div className="w-80 rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((t) => (
            <TableRow key={t.code}>
              <TableCell className="font-mono text-xs">{t.code}</TableCell>
              <TableCell className="text-xs truncate max-w-[120px]">{t.title}</TableCell>
              <TableCell className="text-xs">{t.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
`;
    case "date-picker":
      return `import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Preview() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-60 justify-start text-left font-normal">
          <CalendarIcon size={14} className="mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
`;
    case "combobox":
      return `import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

export default function Preview() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("next.js");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-52 justify-between">
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown size={14} className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-1">
        <div className="space-y-1">
          {frameworks.map((f) => (
            <div
              key={f.value}
              onClick={() => {
                setValue(f.value);
                setOpen(false);
              }}
              className="flex items-center justify-between px-2 py-1.5 text-xs rounded-md cursor-pointer hover:bg-muted"
            >
              <span>{f.label}</span>
              {value === f.value && <Check size={14} />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
`;
    case "questionnaire":
      return `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <Card className="w-80">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-semibold">How would you rate your experience?</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <RadioGroup defaultValue="4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="q5" />
            <Label htmlFor="q5">Excellent</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="q4" />
            <Label htmlFor="q4">Very Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="q3" />
            <Label htmlFor="q3">Average</Label>
          </div>
        </RadioGroup>
        <Button size="sm" className="w-full">Submit Feedback</Button>
      </CardContent>
    </Card>
  );
}
`;
    default:
      // Generic fallback for any other shadcn primitive (e.g. bubble, item, kbd, marker, message, message-scroller, native-select, direction, empty, field, attachment)
      return `import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="rounded-xl border border-border bg-panel p-4 shadow-xs text-center space-y-2">
        <h4 className="text-sm font-semibold text-fg capitalize">${slug.replace(/-/g, " ")}</h4>
        <p className="text-xs text-muted-fg">shadcn/ui canonical component implementation.</p>
        <Button size="sm" variant="outline">Interact</Button>
      </div>
    </div>
  );
}
`;
  }
}

if (process.argv[1]?.endsWith("vendor-shadcn.mts")) {
  void vendorShadcn();
}
