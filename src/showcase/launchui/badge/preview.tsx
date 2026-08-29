import { Badge } from "@/components/ui/badge";

export default function Preview() {
  return (
    <div className="flex gap-2">
      <Badge>New Release</Badge>
      <Badge variant="outline">v2.0.0</Badge>
    </div>
  );
}
