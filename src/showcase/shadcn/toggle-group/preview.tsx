import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export default function Preview() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft size={15} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter size={15} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight size={15} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
