import { Toggle } from "./toggle";
import { Bold, Italic, Underline } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold size={15} />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic size={15} />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline size={15} />
      </Toggle>
    </div>
  );
}
