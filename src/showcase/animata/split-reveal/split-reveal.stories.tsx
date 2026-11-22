// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";

import SplitReveal from "@/showcase/animata/split-reveal/split-reveal";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&h=1125&q=85",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&h=1125&q=85",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&h=1125&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&h=1125&q=85",
];

const meta = {
  title: "Preloader/Split Reveal",
  component: SplitReveal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    revealDuration: { control: { type: "number", min: 0.2, max: 2, step: 0.05 } },
    progressFadeMs: { control: { type: "number", min: 0, max: 800, step: 20 } },
    holdMs: { control: { type: "number", min: 0, max: 1200, step: 20 } },
    backgroundColor: { control: "color" },
    foregroundColor: { control: "color" },
    lockScroll: { control: "boolean" },
  },
} satisfies Meta<typeof SplitReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <>
      <p className="flex full-content items-center justify-center bg-zinc-100 max-w-md text-center text-balance leading-loose text-xl tracking-tight text-zinc-900 px-6 py-12">
        Page content mounts normally. SplitReveal covers it until images load.
      </p>
      <SplitReveal {...args}>
        <SplitReveal.Images urls={SAMPLE_IMAGES} />
        <SplitReveal.Overlay>
          <SplitReveal.Shutter side="top" />
          <SplitReveal.Shutter side="bottom" />
          <SplitReveal.Progress />
        </SplitReveal.Overlay>
      </SplitReveal>
    </>
  ),
  args: {
    backgroundColor: "#fff",
    foregroundColor: "#000",
    revealDuration: 0.85,
    holdMs: 240,
    lockScroll: true,
  },
};
