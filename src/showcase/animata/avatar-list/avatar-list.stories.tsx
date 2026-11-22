// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/list/avatar-list.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import AvatarList from "@/showcase/animata/avatar-list/avatar-list";

const meta = {
  title: "List/Avatar List",
  component: AvatarList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof AvatarList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
  },
};
