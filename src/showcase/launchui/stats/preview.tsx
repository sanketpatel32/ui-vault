import { StatItem } from "./stats";

export default function Preview() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-sm">
      <StatItem value="10k+" label="Users" />
      <StatItem value="99.9%" label="Uptime" />
      <StatItem value="50+" label="Blocks" />
    </div>
  );
}
