// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/calorie-counter.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import CalorieCounter from "@/showcase/animata/calorie-counter/calorie-counter";

const meta = {
  title: "Widget/Calorie Counter",
  component: CalorieCounter,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CalorieCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    goal: 4000,
    fulfilled: 120,
  },
};
