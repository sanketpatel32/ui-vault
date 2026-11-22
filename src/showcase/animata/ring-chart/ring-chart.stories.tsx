// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/graphs/ring-chart.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import Rings from "@/showcase/animata/ring-chart/ring-chart";

const meta = {
  title: "Graphs/Ring Chart",
  component: Rings,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Rings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 96,
    gap: 4,
    width: 20,
    rings: [
      {
        progress: 10,
        trackClassName: "text-rose-600/10",
        progressClassName: "text-rose-600",
      },
      {
        progress: 60,
        trackClassName: "text-lime-500/20",
        progressClassName: "text-lime-500",
      },
      {
        progress: 40,
        trackClassName: "text-teal-400/30",
        progressClassName: "text-teal-400",
      },
    ],
  },
};
