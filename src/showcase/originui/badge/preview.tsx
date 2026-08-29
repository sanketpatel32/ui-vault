import { OriginBadge } from "./index";

export default function Preview() {
  return (
    <div className="flex flex-wrap gap-2">
      <OriginBadge variant="default">Active</OriginBadge>
      <OriginBadge variant="secondary">Pending</OriginBadge>
      <OriginBadge variant="outline">Archived</OriginBadge>
    </div>
  );
}
