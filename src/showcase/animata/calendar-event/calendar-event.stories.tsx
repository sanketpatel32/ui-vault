// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/calendar-event.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import CalendarEvent from "@/showcase/animata/calendar-event/calendar-event";

const workdayEvents = [
  { title: "Design critique", time: "10:00 – 10:45", variant: "violet" as const },
  { title: "Lunch with Alex", time: "12:30 – 1:15", variant: "cyan" as const },
  { title: "Ship review", time: "3:00 – 4:00", variant: "emerald" as const },
  { title: "Yoga", time: "6:30 – 7:30", variant: "amber" as const },
];

const meta = {
  title: "Widget/Calendar Event",
  component: CalendarEvent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    date: new Date(2026, 4, 30),
    events: workdayEvents,
  },
} satisfies Meta<typeof CalendarEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkdayGlance: Story = {
  name: "Workday glance",
};

export const LightAfternoon: Story = {
  name: "Light afternoon",
  args: {
    events: [
      { title: "Focus block", time: "2:00 – 4:00", variant: "violet" },
      { title: "1:1", time: "4:30 – 5:00", variant: "rose" },
    ],
  },
};

export const Primary = WorkdayGlance;
