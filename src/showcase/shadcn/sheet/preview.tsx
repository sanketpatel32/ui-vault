import {
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
