// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/swap-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import SwapText from "@/showcase/animata/swap-text/swap-text";

const meta = {
  title: "Text/Swap Text",
  component: SwapText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwapText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialText: "Open",
    finalText: "Close",
    supportsHover: true,
    disableClick: false,
  },
};

export const ClickOnly: Story = {
  args: {
    initialText: "Menu",
    finalText: "Close",
    supportsHover: false,
    className: "text-blue-500",
  },
};
