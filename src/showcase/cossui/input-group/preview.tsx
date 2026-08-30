import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "./input-group";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput defaultValue="ui-vault" inputMode="url" placeholder="your-site" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>.com</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <SearchIcon aria-hidden="true" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Search docs…" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>
                <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-fg">
                  ⌘K
                </kbd>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput defaultValue="49.00" inputMode="decimal" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>per seat / month</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
