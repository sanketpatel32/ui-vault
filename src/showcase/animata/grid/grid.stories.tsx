// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/grid.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import Grid from "@/showcase/animata/grid/grid";

const meta = {
  title: "Background/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "#cacaca",
    size: 20,
  },
};
