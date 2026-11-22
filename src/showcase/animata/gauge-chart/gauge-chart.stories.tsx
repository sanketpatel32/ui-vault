// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/graphs/gauge-chart.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import GaugeChart from "@/showcase/animata/gauge-chart/gauge-chart";

const meta = {
  title: "Graphs/Gauge Chart",
  component: GaugeChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    gap: 100,
    progress: 70,
    size: 150,
    progressWidth: 10,
    circleWidth: 10,
    rounded: true,
    showValue: true,
  },
};
