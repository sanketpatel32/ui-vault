import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function OriginSwitch({
  label = "Enable Notifications",
  id = "origin-switch",
}: {
  label?: string;
  id?: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} defaultChecked />
      <Label htmlFor={id} className="cursor-pointer text-xs">
        {label}
      </Label>
    </div>
  );
}

export default OriginSwitch;
