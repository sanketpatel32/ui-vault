// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/graphs/donut-chart.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import DonutChart from "@/showcase/animata/donut-chart/donut-chart";

const meta = {
  title: "Graphs/Donut Chart",
  component: DonutChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 200,
    progress: 30,
    circleWidth: 16,
    progressWidth: 16,
    rounded: true,
  },
};
