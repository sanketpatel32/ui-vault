import { AnimatedList } from "./animated-list";

const notifications = [
  { name: "Payment received", description: "$125.00 from Jane", time: "15m ago", icon: "💸", color: "#00C9A7" },
  { name: "User signed up", description: "Alex joined UI Vault", time: "10m ago", icon: "👤", color: "#FFB800" },
  { name: "New message", description: "Hey, check out this component", time: "5m ago", icon: "💬", color: "#FF3D71" },
];

export default function Preview() {
  return (
    <div className="relative flex h-[220px] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-panel p-4 shadow-xs">
      <AnimatedList>
        {notifications.map((item, idx) => (
          <figure
            key={idx}
            className="relative mx-auto min-h-fit w-full max-w-[340px] cursor-pointer overflow-hidden rounded-xl p-3 border border-border bg-muted/30 transition-all hover:bg-muted/70"
          >
            <div className="flex flex-row items-center gap-3">
              <div
                className="flex size-8 items-center justify-center rounded-xl"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-sm">{item.icon}</span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <figcaption className="text-xs font-semibold text-fg">{item.name}</figcaption>
                <p className="text-[11px] text-muted-fg">{item.description}</p>
              </div>
            </div>
          </figure>
        ))}
      </AnimatedList>
    </div>
  );
}
