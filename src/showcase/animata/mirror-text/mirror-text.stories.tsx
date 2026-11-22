// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/mirror-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import MirrorText from "@/showcase/animata/mirror-text/mirror-text";

const meta = {
  title: "Text/Mirror Text",
  component: MirrorText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right"],
    },
  },
} satisfies Meta<typeof MirrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "ANIMATA",
    direction: "up",
  },
};
