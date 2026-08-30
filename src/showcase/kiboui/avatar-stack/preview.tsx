import { Avatar, AvatarFallback } from "@/showcase/_shared/kiboui/ui/avatar";
import { AvatarStack } from "./index";

const people = [
  { initials: "SA", className: "bg-accent text-accent-fg" },
  { initials: "MK", className: "bg-emerald-600 text-white" },
  { initials: "JT", className: "bg-sky-600 text-white" },
  { initials: "RL", className: "bg-amber-600 text-white" },
  { initials: "AD", className: "bg-rose-600 text-white" },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-8 p-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-fg text-xs">Static</p>
          <AvatarStack>
            {people.map((person) => (
              <Avatar key={person.initials}>
                <AvatarFallback className={`text-xs font-semibold ${person.className}`}>
                  {person.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarStack>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-fg text-xs">Hover to fan out (animate + size 48)</p>
          <AvatarStack animate size={48}>
            {people.map((person) => (
              <Avatar key={person.initials}>
                <AvatarFallback className={`text-sm font-semibold ${person.className}`}>
                  {person.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarStack>
        </div>
      </div>
    </div>
  );
}
