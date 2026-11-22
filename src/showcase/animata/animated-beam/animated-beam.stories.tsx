// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/animated-beam.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import AnimatedBeam from "@/showcase/animata/animated-beam/animated-beam";

const meta = {
  title: "Background/Animated Beam",
  component: AnimatedBeam,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedBeam>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div className="flex min-h-96 w-full flex-col items-center justify-center text-xl text-white md:text-3xl">
        <div className="max-w-lg rounded-xl p-4 text-center font-light backdrop-blur-sm">
          Look at the <span className="line-through">stars</span> <strong>meteors</strong>! Look how
          they <span className="line-through">shine</span> <strong>fall</strong> for you!
          <small className="mt-5 block text-sm text-white/30">This is a placeholder content</small>
        </div>
      </div>
    ),
  },
};
