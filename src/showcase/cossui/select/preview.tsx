import { useState } from "react";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "./select";

const TIMEZONES: Record<string, string> = {
  "America/Los_Angeles": "Pacific — Los Angeles",
  "America/New_York": "Eastern — New York",
  "Europe/London": "GMT — London",
  "Europe/Berlin": "CET — Berlin",
  "Asia/Tokyo": "JST — Tokyo",
  "Australia/Sydney": "AEST — Sydney",
};

export default function Preview() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-64">
          <Select items={TIMEZONES} value={value} onValueChange={(newValue) => setValue(newValue)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectPopup>
              {Object.entries(TIMEZONES).map(([tz, label]) => (
                <SelectItem key={tz} value={tz}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
        <p className="text-xs text-muted-fg">
          Selected: {value ? TIMEZONES[value] : "nothing yet"}
        </p>
      </div>
    </div>
  );
}
