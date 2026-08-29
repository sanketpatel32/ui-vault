import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Calculator, Calendar, Smile } from "lucide-react";

export default function Preview() {
  return (
    <Command className="rounded-xl border border-border shadow-md max-w-xs">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem className="flex items-center gap-2">
            <Calendar size={14} /> <span>Calendar</span>
          </CommandItem>
          <CommandItem className="flex items-center gap-2">
            <Smile size={14} /> <span>Search Emoji</span>
          </CommandItem>
          <CommandItem className="flex items-center gap-2">
            <Calculator size={14} /> <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
