import { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  useComboboxFilter,
} from "./combobox";

const FRUITS = [
  "Acai",
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cherry",
  "Dragon fruit",
  "Kiwi",
  "Mango",
  "Papaya",
  "Peach",
  "Pineapple",
];

export default function Preview() {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const filter = useComboboxFilter();

  const filtered = useMemo(
    () => FRUITS.filter((fruit) => filter.contains(fruit, inputValue.trim())),
    [filter, inputValue],
  );

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-xs">
          <Combobox
            inputValue={inputValue}
            onInputValueChange={(newInputValue) => setInputValue(newInputValue)}
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <ComboboxInput placeholder="Select a fruit…" />
            <ComboboxPopup>
              <ComboboxList>
                {filtered.map((fruit) => (
                  <ComboboxItem key={fruit} value={fruit}>
                    {fruit}
                  </ComboboxItem>
                ))}
              </ComboboxList>
              <ComboboxEmpty>No fruit found.</ComboboxEmpty>
            </ComboboxPopup>
          </Combobox>
        </div>
        <p className="text-xs text-muted-fg">
          Selected: {value ?? "nothing yet — type to filter, click to pick"}
        </p>
      </div>
    </div>
  );
}
