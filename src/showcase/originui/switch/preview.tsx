import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Preview() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="origin-switch" defaultChecked />
      <Label htmlFor="origin-switch" className="cursor-pointer text-xs">
        Enable Notifications
      </Label>
    </div>
  );
}
