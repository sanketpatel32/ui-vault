// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/overlay/modal.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import Modal from "@/showcase/animata/modal/modal";

const meta = {
  title: "Overlay/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    modalSize: {
      control: { type: "select" },
      options: ["sm", "lg"],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    modalSize: "sm",
  },
};

export const Seconday: Story = {
  args: {
    modalSize: "lg",
  },
};
