import { Checkbox } from "@/showcase/_shared/cossui/checkbox";
import { CheckboxGroup } from "@/showcase/_shared/cossui/checkbox-group";
import { Label } from "@/showcase/_shared/cossui/label";

export default function Particle() {
  return (
    <CheckboxGroup aria-label="Select frameworks" defaultValue={["next"]}>
      <Label>
        <Checkbox value="next" />
        Next.js
      </Label>
      <Label>
        <Checkbox disabled value="vite" />
        Vite
      </Label>
      <Label>
        <Checkbox value="astro" />
        Astro
      </Label>
    </CheckboxGroup>
  );
}
