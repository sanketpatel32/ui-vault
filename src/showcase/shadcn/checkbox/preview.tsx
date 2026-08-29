import { Checkbox } from "./checkbox";
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
