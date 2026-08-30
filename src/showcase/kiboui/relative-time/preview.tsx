import {
  RelativeTime,
  RelativeTimeZone,
  RelativeTimeZoneDate,
  RelativeTimeZoneDisplay,
  RelativeTimeZoneLabel,
} from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/relative-time).

const timezones = [
  { label: "EST", zone: "America/New_York" },
  { label: "GMT", zone: "Europe/London" },
  { label: "JST", zone: "Asia/Tokyo" },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="rounded-md border bg-background p-4">
          <RelativeTime>
            {timezones.map(({ zone, label }) => (
              <RelativeTimeZone key={zone} zone={zone}>
                <RelativeTimeZoneLabel>{label}</RelativeTimeZoneLabel>
                <RelativeTimeZoneDate />
                <RelativeTimeZoneDisplay />
              </RelativeTimeZone>
            ))}
          </RelativeTime>
        </div>
      </div>
    </div>
  );
}
