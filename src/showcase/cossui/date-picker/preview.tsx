import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/showcase/_shared/cossui/button";
import { Calendar } from "@/showcase/_shared/cossui/calendar";
import { Popover, PopoverPopup, PopoverTrigger } from "@/showcase/_shared/cossui/popover";

export default function Preview() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-6">
        <div className="w-60">
          <Popover>
            <PopoverTrigger render={<Button className="w-full justify-start" variant="outline" />}>
              <CalendarIcon aria-hidden="true" />
              {date ? format(date, "PPP") : "Pick a date"}
            </PopoverTrigger>
            <PopoverPopup>
              <Calendar mode="single" onSelect={setDate} selected={date} />
            </PopoverPopup>
          </Popover>
        </div>
        <p className="text-xs text-muted-fg">
          {date
            ? `Selected: ${format(date, "EEEE, MMMM d, yyyy")}`
            : "Open the popover to browse the current month"}
        </p>
      </div>
    </div>
  );
}
