import { Toaster } from "./sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        size="sm"
        onClick={() =>
          toast("Event has been created", { description: "Sunday, December 03, 2026 at 9:00 AM" })
        }
      >
        Show Sonner Toast
      </Button>
      <Toaster />
    </div>
  );
}
