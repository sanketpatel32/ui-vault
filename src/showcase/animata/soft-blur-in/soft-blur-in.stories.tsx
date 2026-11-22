// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/soft-blur-in.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import SoftBlurIn from "@/showcase/animata/soft-blur-in/soft-blur-in";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/showcase/_shared/animata/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Soft Blur In",
  component: SoftBlurIn,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SoftBlurIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
