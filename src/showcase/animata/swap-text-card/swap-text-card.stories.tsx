// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/card/swap-text-card.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import SwapTextCard from "@/showcase/animata/swap-text-card/swap-text-card";

const meta = {
  title: "Card/Swap Text Card",
  component: SwapTextCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwapTextCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialText: "Hand-crafted ✍️ interaction animation on internet",
    finalText:
      "Animata is developed by a passionate team of developers who love animations. We study the best interactions from top websites and bring them to you, saving you hours of development time.",
  },
};
