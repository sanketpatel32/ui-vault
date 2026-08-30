import { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "./index";

const groups = [
  {
    group: "Frontend",
    items: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    group: "Backend",
    items: [
      { value: "node", label: "Node.js" },
      { value: "django", label: "Django" },
      { value: "rails", label: "Rails" },
    ],
  },
];

const data = groups.flatMap((g) => g.items);

export default function Preview() {
  const [value, setValue] = useState("react");

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Combobox
          data={data}
          defaultValue="react"
          onValueChange={setValue}
          type="framework"
          value={value}
        >
          <ComboboxTrigger className="w-56" />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxList>
              <ComboboxEmpty />
              {groups.map((g) => (
                <ComboboxGroup heading={g.group} key={g.group}>
                  {g.items.map((item) => (
                    <ComboboxItem key={item.value} value={item.value}>
                      {item.label}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="text-muted-fg text-xs">
          Selected:{" "}
          <span className="font-medium text-fg">
            {data.find((item) => item.value === value)?.label ?? "none"}
          </span>
        </p>
      </div>
    </div>
  );
}
