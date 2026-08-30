import { MiniCalendar, MiniCalendarDay, MiniCalendarDays, MiniCalendarNavigation } from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/mini-calendar).

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <MiniCalendar>
          <MiniCalendarNavigation direction="prev" />
          <MiniCalendarDays>
            {(date) => <MiniCalendarDay date={date} key={date.toISOString()} />}
          </MiniCalendarDays>
          <MiniCalendarNavigation direction="next" />
        </MiniCalendar>
      </div>
    </div>
  );
}
