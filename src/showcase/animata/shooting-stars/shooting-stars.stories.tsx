// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/shooting-stars.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";

import ShootingStars from "@/showcase/animata/shooting-stars/shooting-stars";

const meta = {
  title: "Background/Shooting Stars",
  component: ShootingStars,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ShootingStars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div className="flex min-h-96 w-full flex-col items-center justify-center text-center text-white">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Make a wish</h2>
        <p className="mt-3 text-sm text-white/60">Watch the sky — they keep falling.</p>
      </div>
    ),
  },
};
