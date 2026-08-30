import { Checkbox } from "@/showcase/_shared/cossui/checkbox";
import { Label } from "@/showcase/_shared/cossui/label";

export default function Particle() {
  return (
    <Label>
      <Checkbox defaultChecked disabled />
      Accept terms and conditions
    </Label>
  );
}
