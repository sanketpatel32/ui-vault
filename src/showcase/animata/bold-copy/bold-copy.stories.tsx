// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/bold-copy.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import BoldCopy from "@/showcase/animata/bold-copy/bold-copy";

const meta = {
  title: "Text/Bold Copy",
  component: BoldCopy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["sm", "md", "xl"],
    },
  },
} satisfies Meta<typeof BoldCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Animata",
    size: "md",
    backgroundTextClassName: "",
    textClassName: "",
  },
};
