// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/delivery-card.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import DeliveryCard from "@/showcase/animata/delivery-card/delivery-card";

const meta = {
  title: "Widget/Delivery Card",
  component: DeliveryCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DeliveryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OutForDelivery: Story = {
  name: "Out for delivery",
  args: {
    progress: 62,
    arrivalTime: "12:40",
    location: "Mission District",
    timeAgo: "8 min",
    simulateProgress: false,
  },
};

export const LiveDemo: Story = {
  name: "Live demo",
  args: {
    progress: 20,
    arrivalTime: "09:26",
    location: "Pokhara",
    timeAgo: "30 min",
    simulateProgress: true,
  },
};
