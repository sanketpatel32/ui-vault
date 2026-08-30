import { Avatar, AvatarFallback } from "./avatar";

const team = [
  { initials: "SP", tone: "bg-accent-soft text-accent" },
  { initials: "MK", tone: "bg-emerald-500/15 text-emerald-600" },
  { initials: "JD", tone: "bg-amber-500/15 text-amber-600" },
  { initials: "AR", tone: "bg-sky-500/15 text-sky-600" },
];

const sizes = [
  { size: "size-6 text-[10px]", label: "size-6" },
  { size: "size-8 text-xs", label: "size-8 (default)" },
  { size: "size-10 text-sm", label: "size-10" },
  { size: "size-12 text-base", label: "size-12" },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-6 p-6">
        <div className="flex items-center">
          {team.map((member, index) => (
            <div
              key={member.initials}
              className={index === 0 ? "" : "-ms-2.5"}
              title={member.initials}
            >
              <Avatar className="size-10 ring-2 ring-panel">
                <AvatarFallback className={member.tone}>{member.initials}</AvatarFallback>
              </Avatar>
            </div>
          ))}
          <div className="-ms-2.5">
            <Avatar className="size-10 ring-2 ring-panel">
              <AvatarFallback className="bg-muted text-muted-fg">+6</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-center gap-4">
          {sizes.map((entry) => (
            <div key={entry.label} className="flex flex-col items-center gap-1.5">
              <Avatar className={entry.size}>
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-fg">{entry.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
