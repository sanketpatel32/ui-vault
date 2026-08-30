import { CreditCard } from "lucide-react";
import { Button } from "@/showcase/_shared/cossui/button";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const stats = [
  ["Components", "546"],
  ["Favorites", "38"],
  ["Sources", "9"],
  ["Last sync", "2 min ago"],
] as const;

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Open profile sheet</SheetTrigger>
          <SheetPopup side="right">
            <SheetHeader>
              <SheetTitle>Account overview</SheetTitle>
              <SheetDescription>A side sheet with scrollable content and actions.</SheetDescription>
            </SheetHeader>
            <SheetPanel>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent">
                    SP
                  </div>
                  <div>
                    <p className="text-sm font-medium">Owner account</p>
                    <p className="text-xs text-muted-fg">owner@uivault.local</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {stats.map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-muted px-3 py-2.5">
                      <p className="text-lg font-semibold leading-none">{value}</p>
                      <p className="mt-1 text-xs text-muted-fg">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SheetPanel>
            <SheetFooter>
              <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
              <Button>
                <CreditCard />
                Manage billing
              </Button>
            </SheetFooter>
          </SheetPopup>
        </Sheet>
        <p className="ms-4 text-xs text-muted-fg">Slides in from the right — Esc closes it.</p>
      </div>
    </div>
  );
}
