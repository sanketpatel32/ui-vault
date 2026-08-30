import { ArrowUpRight, ChevronRight, Inbox, PlusCircle, Tag } from "lucide-react";
import { Button } from "@/showcase/_shared/cossui/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const rows = [
  { icon: Inbox, label: "Inbox", value: "Component requests" },
  { icon: Tag, label: "Labels", value: "3 applied" },
  { icon: ArrowUpRight, label: "Export", value: "Markdown" },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
          <DrawerPopup showBar>
            <DrawerHeader>
              <DrawerTitle>Project options</DrawerTitle>
              <DrawerDescription>Swipe down or press Esc to dismiss.</DrawerDescription>
            </DrawerHeader>
            <DrawerPanel>
              <div className="flex flex-col">
                {rows.map((row) => (
                  <button
                    key={row.label}
                    type="button"
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm transition-colors hover:bg-accent-soft"
                  >
                    <row.icon className="size-4 text-muted-fg" />
                    <span className="font-medium">{row.label}</span>
                    <span className="text-xs text-muted-fg">{row.value}</span>
                    <ChevronRight className="ms-auto size-4 text-muted-fg" />
                  </button>
                ))}
              </div>
            </DrawerPanel>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
              <Button>
                <PlusCircle />
                Add option
              </Button>
            </DrawerFooter>
          </DrawerPopup>
        </Drawer>
      </div>
    </div>
  );
}
