import { Button } from "@/showcase/_shared/originui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Origin UI Dialog</DialogTitle>
              <DialogDescription>Vendored straight from the Origin UI registry.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
