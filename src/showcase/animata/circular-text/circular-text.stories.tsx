// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/circular-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import CircularText from "@/showcase/animata/circular-text/circular-text";

const meta = {
  title: "Text/Circular Text",
  component: CircularText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CircularText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "CIRCULAR•TEXT•COMPONENT•",
    spinDuration: 30,
    radius: 5,
  },
};
