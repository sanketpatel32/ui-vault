// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/swipe-button.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import SwipeButton from "@/showcase/animata/swipe-button/swipe-button";

const meta = {
  title: "Button/Swipe Button",
  component: SwipeButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwipeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "",
    secondText: "Get access",
    firstText: "Get access",
    firstClass: "bg-orange-500 text-white",
    secondClass: "bg-red-500 text-white",
  },
};
