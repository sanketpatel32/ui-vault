// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/scale-down-fade.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import ScaleDownFade from "@/showcase/animata/scale-down-fade/scale-down-fade";
import { TEXT_ANIMATOR_PRESET_STORY_ARGS } from "@/showcase/_shared/animata/animata/text/text-animator-preset.stories-shared";

const meta = {
  title: "Text/Scale Down Fade",
  component: ScaleDownFade,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ScaleDownFade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: TEXT_ANIMATOR_PRESET_STORY_ARGS,
};
