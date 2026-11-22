// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/container/announcement-ribbon.stories.tsx (MIT, codse/animata) on 2026-11-22 — "@/" import aliases rewritten; ui-vault compile fix: dropped unused icon imports (noUnusedLocals).
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import { Zap } from "lucide-react";
import AnnouncementRibbon from "@/showcase/animata/announcement-ribbon/announcement-ribbon";

const meta = {
  title: "Container/Announcement Ribbon",
  component: AnnouncementRibbon,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    badge: { control: "text" },
    ctaText: { control: "text" },
    repeat: { control: { type: "number", min: 2, max: 8 } },
    pauseOnHover: { control: "boolean" },
  },
} satisfies Meta<typeof AnnouncementRibbon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    pauseOnHover: true,
  },
};

export const NoControls: Story = {
  args: {
    badge: null,
    ctaText: null,
    pauseOnHover: true,
  },
};

export const CustomMessage: Story = {
  args: {
    badge: "V2",
    ctaText: "Read the docs",
    message: (
      <span className="flex items-center gap-2 whitespace-nowrap">
        <Zap className="h-3 w-3 shrink-0 text-black/75" aria-hidden />
        <span className="text-black/75">
          Animata <strong className="font-medium">2.0</strong> is here — faster animations, smaller
          bundles, zero config
        </span>
      </span>
    ),
    pauseOnHover: true,
  },
};
