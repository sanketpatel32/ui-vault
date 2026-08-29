import * as fs from "node:fs";
import * as path from "node:path";
import { SHOWCASE_DIR } from "./vendor-utils.mts";

const SHADCN_DIR = path.join(SHOWCASE_DIR, "shadcn");

export function fixShadcnPreviews() {
  console.log("Fixing Shadcn previews to import locally from ./ ...");

  // 1. bubble
  fs.writeFileSync(
    path.join(SHADCN_DIR, "bubble", "preview.tsx"),
    `import { Bubble, BubbleAvatar, BubbleContent, BubbleMessage } from "./bubble";

export default function Preview() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Bubble variant="received">
        <BubbleAvatar src="https://github.com/shadcn.png" fallback="CN" />
        <BubbleContent>
          <BubbleMessage>Hey! Have you seen the new shadcn components?</BubbleMessage>
        </BubbleContent>
      </Bubble>
      <Bubble variant="sent">
        <BubbleContent>
          <BubbleMessage>Yes, they look fantastic! 🔥</BubbleMessage>
        </BubbleContent>
      </Bubble>
    </div>
  );
}
`,
    "utf8",
  );

  // 2. button-group
  fs.writeFileSync(
    path.join(SHADCN_DIR, "button-group", "preview.tsx"),
    `import { ButtonGroup, ButtonGroupItem } from "./button-group";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <ButtonGroup>
      <ButtonGroupItem asChild><Button variant="outline" size="sm">Years</Button></ButtonGroupItem>
      <ButtonGroupItem asChild><Button variant="outline" size="sm">Months</Button></ButtonGroupItem>
      <ButtonGroupItem asChild><Button variant="outline" size="sm">Days</Button></ButtonGroupItem>
    </ButtonGroup>
  );
}
`,
    "utf8",
  );

  // 3. direction
  fs.writeFileSync(
    path.join(SHADCN_DIR, "direction", "preview.tsx"),
    `import { Direction, DirectionIndicator } from "./direction";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex gap-4">
      <Direction value="up">
        <DirectionIndicator><TrendingUp className="text-emerald-500" size={16} /></DirectionIndicator>
        <span className="text-xs font-semibold text-emerald-500">+12.5%</span>
      </Direction>
      <Direction value="down">
        <DirectionIndicator><TrendingDown className="text-red-500" size={16} /></DirectionIndicator>
        <span className="text-xs font-semibold text-red-500">-3.2%</span>
      </Direction>
    </div>
  );
}
`,
    "utf8",
  );

  // 4. empty
  fs.writeFileSync(
    path.join(SHADCN_DIR, "empty", "preview.tsx"),
    `import { Empty, EmptyDescription, EmptyHeader, EmptyIcon, EmptyTitle } from "./empty";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Empty className="max-w-sm rounded-xl border border-dashed border-border p-6 text-center">
      <EmptyHeader>
        <EmptyIcon><Inbox size={28} className="text-muted-fg mx-auto mb-2" /></EmptyIcon>
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

  // 5. field
  fs.writeFileSync(
    path.join(SHADCN_DIR, "field", "preview.tsx"),
    `import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "./field";
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

  // 6. item
  fs.writeFileSync(
    path.join(SHADCN_DIR, "item", "preview.tsx"),
    `import { Item, ItemContent, ItemDescription, ItemTitle } from "./item";
import { Layers } from "lucide-react";

export default function Preview() {
  return (
    <Item className="flex items-center gap-3 rounded-xl border border-border bg-panel p-3 max-w-sm">
      <Layers className="text-accent shrink-0" size={20} />
      <ItemContent>
        <ItemTitle className="text-xs font-semibold">Modular Architecture</ItemTitle>
        <ItemDescription className="text-[11px] text-muted-fg">Completely customizable React components.</ItemDescription>
      </ItemContent>
    </Item>
  );
}
`,
    "utf8",
  );

  // 7. kbd
  fs.writeFileSync(
    path.join(SHADCN_DIR, "kbd", "preview.tsx"),
    `import { Kbd, KbdGroup } from "./kbd";

export default function Preview() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-fg">Press</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <span className="text-xs text-muted-fg">to search</span>
    </div>
  );
}
`,
    "utf8",
  );

  // 8. marker
  fs.writeFileSync(
    path.join(SHADCN_DIR, "marker", "preview.tsx"),
    `import { Marker } from "./marker";

export default function Preview() {
  return (
    <div className="flex gap-3 items-center">
      <Marker status="online">Active</Marker>
      <Marker status="busy">Busy</Marker>
      <Marker status="offline">Offline</Marker>
    </div>
  );
}
`,
    "utf8",
  );

  // 9. message
  fs.writeFileSync(
    path.join(SHADCN_DIR, "message", "preview.tsx"),
    `import { Message, MessageAvatar, MessageContent, MessageName, MessageText } from "./message";

export default function Preview() {
  return (
    <Message className="flex gap-3 max-w-sm">
      <MessageAvatar src="https://github.com/shadcn.png" fallback="SC" />
      <MessageContent>
        <MessageName className="text-xs font-semibold">shadcn</MessageName>
        <MessageText className="text-xs text-muted-fg mt-0.5">
          Clean, accessible UI primitives for modern React applications.
        </MessageText>
      </MessageContent>
    </Message>
  );
}
`,
    "utf8",
  );

  // 10. native-select
  fs.writeFileSync(
    path.join(SHADCN_DIR, "native-select", "preview.tsx"),
    `import { NativeSelect, NativeSelectOption } from "./native-select";

export default function Preview() {
  return (
    <div className="w-60">
      <NativeSelect defaultValue="system">
        <NativeSelectOption value="light">Light Theme</NativeSelectOption>
        <NativeSelectOption value="dark">Dark Theme</NativeSelectOption>
        <NativeSelectOption value="system">System Preference</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
`,
    "utf8",
  );

  // 11. sidebar
  fs.writeFileSync(
    path.join(SHADCN_DIR, "sidebar", "preview.tsx"),
    `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./sidebar";
import { LayoutDashboard, FolderGit2, Settings } from "lucide-react";

export default function Preview() {
  return (
    <SidebarProvider className="min-h-[180px] w-64 rounded-xl border border-border bg-panel shadow-xs">
      <Sidebar className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive><LayoutDashboard size={15} /> <span>Dashboard</span></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton><FolderGit2 size={15} /> <span>Projects</span></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton><Settings size={15} /> <span>Settings</span></SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
`,
    "utf8",
  );

  // 12. sonner
  fs.writeFileSync(
    path.join(SHADCN_DIR, "sonner", "preview.tsx"),
    `import { Toaster } from "./sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button size="sm" onClick={() => toast("Event has been created", { description: "Sunday, December 03, 2026 at 9:00 AM" })}>
        Show Sonner Toast
      </Button>
      <Toaster />
    </div>
  );
}
`,
    "utf8",
  );

  // 13. toast
  fs.writeFileSync(
    path.join(SHADCN_DIR, "toast", "preview.tsx"),
    `import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button size="sm" onClick={() => setOpen(true)}>Open Toast</Button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>Your settings have been saved successfully.</ToastDescription>
      </Toast>
      <ToastViewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" />
    </ToastProvider>
  );
}
`,
    "utf8",
  );

  // 14. attachment
  fs.writeFileSync(
    path.join(SHADCN_DIR, "attachment", "attachment.tsx"),
    `import type { ReactNode } from "react";
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AttachmentProps {
  name: string;
  size?: string;
  className?: string;
  children?: ReactNode;
}

export function Attachment({ name, size = "2.4 MB", className }: AttachmentProps) {
  return (
    <div className={cn("flex items-center gap-2.5 rounded-lg border border-border bg-panel px-3 py-2 text-xs", className)}>
      <Paperclip size={15} className="text-muted-fg shrink-0" />
      <span className="font-medium text-fg truncate">{name}</span>
      <span className="text-[10px] text-muted-fg ml-auto">{size}</span>
    </div>
  );
}
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(SHADCN_DIR, "attachment", "preview.tsx"),
    `import { Attachment } from "./attachment";

export default function Preview() {
  return (
    <div className="w-64 space-y-2">
      <Attachment name="project-specification.pdf" size="1.2 MB" />
      <Attachment name="design-mockups.fig" size="8.4 MB" />
    </div>
  );
}
`,
    "utf8",
  );

  // 15. combobox
  fs.writeFileSync(
    path.join(SHADCN_DIR, "combobox", "combobox.tsx"),
    `import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
          className="w-[200px] justify-between text-xs"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-8 text-xs" />
          <CommandList>
            <CommandEmpty className="p-2 text-xs text-muted-fg">No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="text-xs cursor-pointer"
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                    size={14}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(SHADCN_DIR, "combobox", "preview.tsx"),
    `import { Combobox } from "./combobox";

export default function Preview() {
  return (
    <div className="flex justify-center p-4">
      <Combobox />
    </div>
  );
}
`,
    "utf8",
  );

  // 16. data-table
  fs.writeFileSync(
    path.join(SHADCN_DIR, "data-table", "data-table.tsx"),
    `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
];

export function DataTable() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Invoice</TableHead>
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="text-xs text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="text-xs font-medium">{invoice.id}</TableCell>
              <TableCell className="text-xs">{invoice.status}</TableCell>
              <TableCell className="text-xs text-right">{invoice.amount}</TableCell>
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
  fs.writeFileSync(
    path.join(SHADCN_DIR, "data-table", "preview.tsx"),
    `import { DataTable } from "./data-table";

export default function Preview() {
  return (
    <div className="flex justify-center p-2">
      <DataTable />
    </div>
  );
}
`,
    "utf8",
  );

  // 17. date-picker
  fs.writeFileSync(
    path.join(SHADCN_DIR, "date-picker", "date-picker.tsx"),
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
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(SHADCN_DIR, "date-picker", "preview.tsx"),
    `import { DatePicker } from "./date-picker";

export default function Preview() {
  return (
    <div className="flex justify-center p-4">
      <DatePicker />
    </div>
  );
}
`,
    "utf8",
  );

  // 18. input-group
  fs.writeFileSync(
    path.join(SHADCN_DIR, "input-group", "input-group.tsx"),
    `import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputGroupProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function InputGroup({ prefix, suffix, children, className }: InputGroupProps) {
  return (
    <div className={cn("relative flex items-center rounded-lg border border-border bg-panel focus-within:ring-1 focus-within:ring-ring", className)}>
      {prefix && <div className="pl-3 pr-1 text-muted-fg text-xs">{prefix}</div>}
      {children}
      {suffix && <div className="pr-3 pl-1 text-muted-fg text-xs">{suffix}</div>}
    </div>
  );
}
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(SHADCN_DIR, "input-group", "preview.tsx"),
    `import { InputGroup } from "./input-group";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Preview() {
  return (
    <div className="w-64">
      <InputGroup prefix={<Search size={14} />}>
        <Input placeholder="Search..." className="border-0 shadow-none focus-visible:ring-0 text-xs pl-1" />
      </InputGroup>
    </div>
  );
}
`,
    "utf8",
  );

  // 19. message-scroller
  fs.writeFileSync(
    path.join(SHADCN_DIR, "message-scroller", "message-scroller.tsx"),
    `import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface MessageScrollerProps {
  children: ReactNode;
  className?: string;
}

export function MessageScroller({ children, className }: MessageScrollerProps) {
  return (
    <ScrollArea className={cn("h-48 w-full max-w-sm rounded-xl border border-border bg-panel p-3", className)}>
      <div className="space-y-3">{children}</div>
    </ScrollArea>
  );
}
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(SHADCN_DIR, "message-scroller", "preview.tsx"),
    `import { MessageScroller } from "./message-scroller";

export default function Preview() {
  return (
    <MessageScroller>
      <div className="text-xs p-2 rounded bg-muted/50">User: How do I get started?</div>
      <div className="text-xs p-2 rounded bg-accent-soft text-accent">Assistant: Run npm install and check the docs!</div>
      <div className="text-xs p-2 rounded bg-muted/50">User: Got it, thank you!</div>
    </MessageScroller>
  );
}
`,
    "utf8",
  );

  // 20. questionnaire
  fs.writeFileSync(
    path.join(SHADCN_DIR, "questionnaire", "questionnaire.tsx"),
    `import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function Questionnaire() {
  const [selected, setSelected] = useState("option-1");

  return (
    <div className="w-72 rounded-xl border border-border bg-panel p-4 shadow-xs space-y-3">
      <h4 className="text-xs font-semibold text-fg">How satisfied are you with UI Vault?</h4>
      <RadioGroup value={selected} onValueChange={setSelected} className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-1" id="q1" />
          <Label htmlFor="q1" className="text-xs cursor-pointer">Very Satisfied</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-2" id="q2" />
          <Label htmlFor="q2" className="text-xs cursor-pointer">Satisfied</Label>
        </div>
      </RadioGroup>
      <Button size="sm" className="w-full mt-2">Submit Feedback</Button>
    </div>
  );
}
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(SHADCN_DIR, "questionnaire", "preview.tsx"),
    `import { Questionnaire } from "./questionnaire";

export default function Preview() {
  return (
    <div className="flex justify-center p-2">
      <Questionnaire />
    </div>
  );
}
`,
    "utf8",
  );

  // 21. typography
  fs.writeFileSync(
    path.join(SHADCN_DIR, "typography", "typography.tsx"),
    `import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

export function Typography({ title = "Taxonomy & Typography", children, className }: TypographyProps) {
  return (
    <div className={cn("max-w-sm space-y-2 text-left", className)}>
      <h3 className="text-lg font-bold tracking-tight text-fg">{title}</h3>
      {children || (
        <p className="text-xs text-muted-fg leading-relaxed">
          The king, seeing how much happier his subjects were, realized the importance of typography.
        </p>
      )}
    </div>
  );
}
`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(SHADCN_DIR, "typography", "preview.tsx"),
    `import { Typography } from "./typography";

export default function Preview() {
  return (
    <div className="flex justify-center p-2">
      <Typography />
    </div>
  );
}
`,
    "utf8",
  );

  console.log("Shadcn previews updated ✓");
}

if (process.argv[1]?.endsWith("fix-shadcn-previews.mts")) {
  fixShadcnPreviews();
}
