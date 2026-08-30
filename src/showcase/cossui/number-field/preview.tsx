import { useState } from "react";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "./number-field";

export default function Preview() {
  const [value, setValue] = useState(2);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <div>
            <h3 className="text-sm font-medium text-fg">Seats</h3>
            <p className="mt-0.5 text-xs text-muted-fg">
              Steppers, keyboard arrows and scrubbing all work.
            </p>
          </div>
          <NumberField
            max={10}
            min={1}
            onValueChange={(newValue) => setValue(newValue ?? 1)}
            value={value}
          >
            <NumberFieldGroup>
              <NumberFieldDecrement aria-label="Decrease seats" />
              <NumberFieldInput aria-label="Number of seats" />
              <NumberFieldIncrement aria-label="Increase seats" />
            </NumberFieldGroup>
          </NumberField>
          <p className="text-xs text-muted-fg">
            {value} {value === 1 ? "seat" : "seats"} × $12.00 = ${(value * 12).toFixed(2)} / month
          </p>
        </div>
      </div>
    </div>
  );
}
