import { Switch } from "./switch";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" defaultChecked />
      <Label htmlFor="airplane-mode" className="cursor-pointer">Airplane Mode</Label>
    </div>
  );
}
