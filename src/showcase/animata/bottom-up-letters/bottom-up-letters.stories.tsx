// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/bottom-up-letters.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import BottomUpLetters from "@/showcase/animata/bottom-up-letters/bottom-up-letters";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/showcase/_shared/animata/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Bottom-Up Letters",
  component: BottomUpLetters,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomUpLetters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
