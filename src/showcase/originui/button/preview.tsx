import { OriginButton } from "./index";

export default function Preview() {
  return (
    <div className="flex flex-wrap gap-2">
      <OriginButton variant="default">Origin Primary</OriginButton>
      <OriginButton variant="secondary">Secondary</OriginButton>
      <OriginButton variant="outline">Outline</OriginButton>
    </div>
  );
}
