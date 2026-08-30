import { useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "./autocomplete";

const FRAMEWORKS = [
  "Angular",
  "Astro",
  "Base UI",
  "Docusaurus",
  "Next.js",
  "React",
  "Remix",
  "Solid",
  "Svelte",
  "Vue",
];

export default function Preview() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-xs">
          <Autocomplete items={FRAMEWORKS} onValueChange={(newValue) => setValue(newValue)}>
            <AutocompleteInput
              placeholder="Search frameworks…"
              showClear
              startAddon={<SearchIcon />}
            />
            <AutocompletePopup>
              <AutocompleteList>
                {(item) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
              <AutocompleteEmpty>No frameworks found.</AutocompleteEmpty>
            </AutocompletePopup>
          </Autocomplete>
        </div>
        <p className="text-xs text-muted-fg">Value: {value.trim() ? value : "—"}</p>
      </div>
    </div>
  );
}
