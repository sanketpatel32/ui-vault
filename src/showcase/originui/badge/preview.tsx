import { Badge } from "@/components/ui/badge";

export default function Preview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="outline">Archived</Badge>
    </div>
  );
}
