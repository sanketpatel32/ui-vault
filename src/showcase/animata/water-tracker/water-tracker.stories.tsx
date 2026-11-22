// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/water-tracker.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import WaterTracker from "@/showcase/animata/water-tracker/water-tracker";

const meta = {
  title: "Widget/Water Tracker",
  component: WaterTracker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof WaterTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MorningStart: Story = {
  name: "Morning start",
  args: {
    dailyGoal: 2000,
    defaultIntake: 500,
    sipMl: 250,
  },
};

export const AfternoonCatchUp: Story = {
  name: "Afternoon catch-up",
  args: {
    dailyGoal: 2500,
    defaultIntake: 1400,
    sipMl: 300,
  },
};
