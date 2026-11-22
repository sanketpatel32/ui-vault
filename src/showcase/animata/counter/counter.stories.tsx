// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/counter.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import Counter, { Formatter } from "@/showcase/animata/counter/counter";

const meta = {
  title: "Text/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down"],
    },
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    targetValue: 1000,
    direction: "up",
    delay: 0,
  },
};

export const Percentage: Story = {
  args: {
    targetValue: 100,
    direction: "up",
    format: (value) => `${value.toFixed(0)}%`,
  },
};

export const Currency: Story = {
  args: {
    targetValue: 1000,
    direction: "up",
    format: Formatter.currency,
  },
};
