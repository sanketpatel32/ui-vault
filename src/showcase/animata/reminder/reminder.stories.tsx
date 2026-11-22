// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/reminder.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import Reminder from "@/showcase/animata/reminder/reminder";

const meta = {
  title: "Widget/Reminder",
  component: Reminder,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Reminder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandupIn30: Story = {
  name: "Standup in 30",
  args: {
    title: "Today",
    buckets: [
      { label: "Work", count: 2, className: "bg-violet-200 dark:bg-violet-500/35" },
      { label: "Personal", count: 1, className: "bg-emerald-200 dark:bg-emerald-500/35" },
    ],
    nextLabel: "Engineering standup in 30 min",
  },
};

export const WeekendErrands: Story = {
  name: "Weekend errands",
  args: {
    title: "Saturday",
    buckets: [
      { label: "Home", count: 4, className: "bg-emerald-200 dark:bg-emerald-500/35" },
      { label: "Shop", count: 2, className: "bg-amber-200 dark:bg-amber-500/35" },
    ],
    nextLabel: "Grocery pickup at 2:00 PM",
  },
};
