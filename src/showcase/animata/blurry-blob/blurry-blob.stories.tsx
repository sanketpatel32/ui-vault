// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/blurry-blob.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";

import BlurryBlob from "@/showcase/animata/blurry-blob/blurry-blob";

const meta = {
  title: "Background/Blurry Blob",
  component: BlurryBlob,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BlurryBlob>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "rounded-xl opacity-45",
    firstBlobColor: "bg-purple-400",
    secondBlobColor: "bg-blue-400",
  },
};
