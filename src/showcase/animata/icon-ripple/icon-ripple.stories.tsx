// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/icon/icon-ripple.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import { Mic } from "lucide-react";
import IconRipple from "@/showcase/animata/icon-ripple/icon-ripple";

const meta = {
  title: "Icon/Icon Ripple",
  component: IconRipple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: { control: false },
  },
} satisfies Meta<typeof IconRipple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: Mic,
    iconSize: 24,
    iconColor: "#ddd",
    borderColor: "#ddd",
    inset: "10px",
  },
};
