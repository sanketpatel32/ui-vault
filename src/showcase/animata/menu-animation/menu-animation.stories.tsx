// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/list/menu-animation.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import MenuAnimation from "@/showcase/animata/menu-animation/menu-animation";

const meta = {
  title: "List/Menu Animation",
  component: MenuAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MenuAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    menuItems: ["Home", "Features", "Company", "FAQs", "Terms of Use", "Get In Touch"],
  },
};
