// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/fabs/speed-dial.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import { Copy, Edit, Share2, Trash } from "lucide-react";
import SpeedDial from "@/showcase/animata/speed-dial/speed-dial";

const meta = {
  title: "Fabs/Speed Dial",
  component: SpeedDial,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right"],
    },
  },
} satisfies Meta<typeof SpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

const actionButtons = [
  { icon: <Copy className="size-5" />, label: "Copy", key: "copy", action: () => {} },
  { icon: <Edit className="size-5" />, label: "Edit", key: "edit", action: () => {} },
  { icon: <Share2 className="size-5" />, label: "Share", key: "share", action: () => {} },
  { icon: <Trash className="size-5" />, label: "Delete", key: "delete", action: () => {} },
];

export const Primary: Story = {
  args: {
    direction: "right",
    actionButtons,
    triggerLabel: "Document actions",
  },
};
