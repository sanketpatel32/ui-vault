import {
  CalendarBody,
  CalendarDate,
  CalendarDatePicker,
  CalendarDatePagination,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
  type Feature,
} from "./index";

const now = new Date();

const shipped = { id: "s", name: "Shipped", color: "#10b981" };
const inProgress = { id: "p", name: "In progress", color: "#f59e0b" };
const planned = { id: "pl", name: "Planned", color: "#8b5cf6" };

const day = (d: number) => new Date(now.getFullYear(), now.getMonth(), d);

const features: Feature[] = [
  {
    id: "f1",
    name: "Design review",
    startAt: day(3),
    endAt: day(3),
    status: shipped,
  },
  {
    id: "f2",
    name: "Beta release",
    startAt: day(8),
    endAt: day(8),
    status: inProgress,
  },
  {
    id: "f3",
    name: "Blog post",
    startAt: day(8),
    endAt: day(8),
    status: planned,
  },
  {
    id: "f4",
    name: "Docs refresh",
    startAt: day(14),
    endAt: day(14),
    status: planned,
  },
  {
    id: "f5",
    name: "v1.0 launch",
    startAt: day(21),
    endAt: day(21),
    status: planned,
  },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-panel">
          <CalendarProvider>
            <CalendarDate>
              <CalendarDatePicker>
                <CalendarMonthPicker />
                <CalendarYearPicker end={now.getFullYear() + 2} start={now.getFullYear() - 1} />
              </CalendarDatePicker>
              <CalendarDatePagination />
            </CalendarDate>
            <CalendarHeader />
            <CalendarBody features={features}>
              {({ feature }) => <CalendarItem feature={feature} />}
            </CalendarBody>
          </CalendarProvider>
        </div>
      </div>
    </div>
  );
}
