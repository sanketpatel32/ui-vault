import { DirectionProvider } from "./direction";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex gap-4">
      <DirectionProvider dir="ltr">
        <Button variant="outline" size="sm">
          LTR
        </Button>
      </DirectionProvider>
      <DirectionProvider dir="rtl">
        <Button variant="outline" size="sm">
          RTL
        </Button>
      </DirectionProvider>
    </div>
  );
}
