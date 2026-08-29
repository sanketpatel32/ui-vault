import { Badge } from "./badge";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-6">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  );
}
