// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/alarm-clock.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import AlarmClock from "@/showcase/animata/alarm-clock/alarm-clock";

const meta = {
  title: "Widget/Alarm Clock",
  component: AlarmClock,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AlarmClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WeekdayRoutine: Story = {
  name: "Weekday routine",
  args: {
    alarms: [
      { id: "weekday", time: "6:45 AM", schedule: "Weekdays" },
      { id: "gym", time: "7:15 AM", schedule: "Mon, Wed, Fri" },
    ],
    defaultEnabledIds: ["weekday"],
  },
};

export const WeekendSleepIn: Story = {
  name: "Weekend sleep in",
  args: {
    alarms: [{ id: "weekend", time: "9:30 AM", schedule: "Sat & Sun" }],
    defaultEnabledIds: [],
  },
};
