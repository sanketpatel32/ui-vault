// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/card/glowing-card.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import GlowingCard from "@/showcase/animata/glowing-card/glowing-card";

const meta = {
  title: "Card/Glowing Card",
  component: GlowingCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GlowingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fromColor: "#4158D0",
    viaColor: "#C850C0",
    toColor: "#FFCC70",
  },
};
