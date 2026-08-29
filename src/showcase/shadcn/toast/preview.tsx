import { Button } from "@/components/ui/button";
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
