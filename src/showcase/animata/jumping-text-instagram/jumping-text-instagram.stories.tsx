// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/jumping-text-instagram.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import JumpingTextInstagram from "@/showcase/animata/jumping-text-instagram/jumping-text-instagram";

const meta = {
  title: "Text/Jumping Text Instagram",
  component: JumpingTextInstagram,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["word", "character"],
    },
  },
} satisfies Meta<typeof JumpingTextInstagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "This is a jumping text effect",
    mode: "word",
  },
};
