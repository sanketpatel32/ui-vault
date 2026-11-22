// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/text-explode-imessage.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import TextExplodeIMessage from "@/showcase/animata/text-explode-imessage/text-explode-imessage";

const meta = {
  title: "Text/Text Explode Imessage",
  component: TextExplodeIMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["loop", "hover"],
    },
  },
} satisfies Meta<typeof TextExplodeIMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "iMessage text explode effect 🧨 🔥 🎃 🎉 🪅",
    mode: "loop",
    className: "text-red-500",
  },
};
