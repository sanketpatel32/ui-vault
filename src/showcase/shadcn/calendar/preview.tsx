import { useState } from "react";
import { Calendar } from "./calendar";

export default function Preview() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-xl border border-border bg-panel shadow-xs p-3"
    />
  );
}
