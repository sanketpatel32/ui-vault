import { useState } from "react";
import { ArrowRight, FilePlus2, Settings, Moon, Search, UserPlus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const itemClass = "gap-2";
const iconClass = "size-4 shrink-0 opacity-80";

export default function Preview() {
  const [last, setLast] = useState("nothing yet");

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Command className="overflow-hidden rounded-xl border border-border bg-panel">
            <CommandInput placeholder="Type a command or search…" />
            <CommandPanel>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandGroupLabel>Suggestions</CommandGroupLabel>
                  <CommandItem
                    className={itemClass}
                    value="components"
                    onClick={() => setLast("Browse components")}
                  >
                    <Search className={iconClass} />
                    Browse components
                    <CommandShortcut>⌘K</CommandShortcut>
                  </CommandItem>
                  <CommandItem
                    className={itemClass}
                    value="favorites"
                    onClick={() => setLast("Open favorites")}
                  >
                    <UserPlus className={iconClass} />
                    Open favorites
                    <CommandShortcut>⌘F</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <CommandGroupLabel>Actions</CommandGroupLabel>
                  <CommandItem
                    className={itemClass}
                    value="new"
                    onClick={() => setLast("New project")}
                  >
                    <FilePlus2 className={iconClass} />
                    New project
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem
                    className={itemClass}
                    value="theme"
                    onClick={() => setLast("Toggle theme")}
                  >
                    <Moon className={iconClass} />
                    Toggle theme
                    <CommandShortcut>⌘⇧L</CommandShortcut>
                  </CommandItem>
                  <CommandItem
                    className={itemClass}
                    value="settings"
                    onClick={() => setLast("Open settings")}
                  >
                    <Settings className={iconClass} />
                    Open settings
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                  <CommandItem
                    className={itemClass}
                    value="deploy"
                    onClick={() => setLast("Deploy site")}
                  >
                    <ArrowRight className={iconClass} />
                    Deploy site
                    <CommandShortcut>⌘D</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandPanel>
            <CommandFooter>
              <span>
                Last run: <strong className="text-fg">{last}</strong>
              </span>
              <span>↑↓ navigate · ↵ select</span>
            </CommandFooter>
          </Command>
          <p className="text-center text-xs text-muted-fg">
            Filter the list by typing — try “theme”.
          </p>
        </div>
      </div>
    </div>
  );
}
