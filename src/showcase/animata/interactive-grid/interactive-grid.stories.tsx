// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/interactive-grid.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import InteractiveGrid from "@/showcase/animata/interactive-grid/interactive-grid";

const meta = {
  title: "Background/Interactive Grid",
  component: InteractiveGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InteractiveGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div className="pointer-events-none my-24 flex h-fit max-w-sm flex-col items-center justify-center text-center text-zinc-800">
        <h1 className="text-4xl font-bold">Hello there!</h1>
        <p className="text-balance text-base">
          I am a placeholder content. Hover over the small squares to see the animation.
        </p>
      </div>
    ),
  },
};
