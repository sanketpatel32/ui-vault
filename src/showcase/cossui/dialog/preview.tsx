import { useState } from "react";
import { Button } from "@/showcase/_shared/cossui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const inputClass =
  "h-9 w-full rounded-lg border border-border bg-panel px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

export default function Preview() {
  const [name, setName] = useState("Design system");

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Dialog>
          <DialogTrigger render={<Button />}>Create project</DialogTrigger>
          <DialogPopup className="max-w-md">
            <DialogHeader>
              <DialogTitle>New project</DialogTitle>
              <DialogDescription>
                Name the project and pick a slug for its registry files.
              </DialogDescription>
            </DialogHeader>
            <DialogPanel>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Project name
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="My project"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  Slug
                  <input
                    className={`${inputClass} font-mono text-xs`}
                    readOnly
                    value={name.toLowerCase().replaceAll(/\s+/g, "-")}
                  />
                </label>
              </div>
            </DialogPanel>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button>Create</Button>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      </div>
    </div>
  );
}
