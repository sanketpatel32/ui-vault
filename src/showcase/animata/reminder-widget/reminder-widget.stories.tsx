// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/reminder-widget.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import ReminderWidget from "@/showcase/animata/reminder-widget/reminder-widget";

const meta = {
  title: "Widget/Reminder Widget",
  component: ReminderWidget,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ReminderWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TripPacking: Story = {
  name: "Trip packing",
  args: {
    title: "Packing",
  },
};

export const Primary = TripPacking;
