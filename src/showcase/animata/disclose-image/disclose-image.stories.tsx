// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/image/disclose-image.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import DiscloseImage from "@/showcase/animata/disclose-image/disclose-image";

const meta = {
  title: "Image/Disclose Image",
  component: DiscloseImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DiscloseImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "https://plus.unsplash.com/premium_vector-1689096860582-07eee139f9f1?bg=FFFFFF&w=800&auto=format&fit=crop&q=100&ixlib=rb-4.0.3",
    alt: "A beautiful image",
    doorClassName: "bg-yellow-200",
    vertical: false,
  },
};
