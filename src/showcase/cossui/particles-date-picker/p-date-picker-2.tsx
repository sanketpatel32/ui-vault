import type { DateRange } from "@daypicker/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/showcase/_shared/cossui/button";
import { Calendar } from "@/showcase/_shared/cossui/calendar";
import { Popover, PopoverPopup, PopoverTrigger } from "@/showcase/_shared/cossui/popover";

export default function Particle() {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <Popover>
      <PopoverTrigger render={<Button className="w-full justify-start" variant="outline" />}>
        <CalendarIcon aria-hidden="true" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
            </>
          ) : (
            format(date.from, "LLL dd, y")
          )
        ) : (
          <span>Pick a date range</span>
        )}
      </PopoverTrigger>
      <PopoverPopup>
        <Calendar defaultMonth={date?.from} mode="range" onSelect={setDate} selected={date} />
      </PopoverPopup>
    </Popover>
  );
}
