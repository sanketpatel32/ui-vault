// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/study-timer.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import StudyTimer from "@/showcase/animata/study-timer/study-timer";

const meta = {
  title: "Widget/Study Timer",
  component: StudyTimer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StudyTimer>;

export default meta;

type Story = StoryObj<typeof StudyTimer>;

export const Primary: Story = {
  args: {},
};
