// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/vertical-tiles.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import VerticalTiles from "@/showcase/animata/vertical-tiles/vertical-tiles";

const meta = {
  title: "Preloader/Vertical Tiles",
  component: VerticalTiles,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tileClassName: { control: "text" },
    minTileWidth: { control: { type: "number", min: 20, max: 200, step: 1 } },
    animationDuration: { control: { type: "number", min: 0.1, max: 5, step: 0.1 } },
    animationDelay: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
    stagger: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
  },
} satisfies Meta<typeof VerticalTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tileClassName: "bg-linear-to-r from-zinc-100 to-zinc-300",
    minTileWidth: 32,
    animationDuration: 0.5,
    animationDelay: 1,
    stagger: 0.05,
    children: (
      <div className="flex h-full w-full items-center justify-center bg-zinc-800 p-24">
        <p className="text-2xl font-extrabold text-white">Welcome to our amazing website!</p>
      </div>
    ),
  },
};

export const Narrow: Story = {
  args: {
    tileClassName: "bg-linear-to-r from-zinc-100 to-zinc-300",
    minTileWidth: 16,
    animationDuration: 0.5,
    animationDelay: 1,
    stagger: 0.05,
    children: (
      <div className="flex h-96 w-28 items-center justify-center bg-zinc-800 p-24">
        <p className="text-center text-2xl font-extrabold text-white">
          Welcome to our amazing website!
        </p>
      </div>
    ),
  },
};
