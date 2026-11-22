// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/diagonal-lines.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import DiagonalLines from "@/showcase/animata/diagonal-lines/diagonal-lines";

const meta = {
  title: "Background/Diagonal Lines",
  component: DiagonalLines,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: {
        type: "range",
        min: 5,
        max: 100,
        step: 5,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof DiagonalLines>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "#cacaca",
    spacing: 10,
  },
};
