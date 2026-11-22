// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/image/trailing-image.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import TrailingImage from "@/showcase/animata/trailing-image/trailing-image";

const meta = {
  title: "Image/Trailing Image",
  component: TrailingImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TrailingImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "h-96 w-full full-content",
    children: (
      <div className="h-full w-full flex items-center justify-center">
        <span className="text-sm text-muted-foreground">
          Move your mouse to see the trailing effect
        </span>
      </div>
    ),
  },
};
