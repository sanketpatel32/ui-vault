import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "./calendar";

export default function Preview() {
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState(new Date());

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="rounded-xl border border-border bg-panel p-4">
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            onSelect={setDate}
            selected={date}
          />
          <p className="mt-3 border-t border-border pt-3 text-center text-xs text-muted-fg">
            {date ? `Selected: ${format(date, "PPP")}` : "Pick a date"}
          </p>
        </div>
      </div>
    </div>
  );
}
