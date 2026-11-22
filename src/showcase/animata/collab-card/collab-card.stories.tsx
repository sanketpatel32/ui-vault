// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/card/collab-card.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";

import CollabCard from "@/showcase/animata/collab-card/collab-card";

const meta = {
  title: "Card/Collab Card",
  component: CollabCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    greeting: { control: "text" },
    eyebrow: { control: "text" },
    intro: { control: "text" },
    conjunction: { control: "text" },
    trailing: { control: "text" },
    liveLabel: { control: "text" },
    backgroundUrl: { control: "text" },
  },
} satisfies Meta<typeof CollabCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma multiplayer — dashed frame, live presence, named cursor pills. */
export const Primary: Story = {
  args: {
    greeting: "hello!",
    eyebrow: "Now in multiplayer",
    intro: "editing",
    conjunction: "&",
    trailing: "",
    liveLabel: "Live · 4 editing",
  },
  render: (args) => (
    <div className="w-full full-content">
      <CollabCard {...args} className="rounded-xl" />
    </div>
  ),
};

/** Bento slot — scales via container queries, not viewport breakpoints. */
export const InBentoGrid: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <div className="col-span-2">
        <CollabCard />
      </div>
      <div className="flex min-h-40 items-center text-pretty rounded-2xl border border-border bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
        Drop into a wide bento cell — frame, greeting, pills, and cursors track the card width via
        cqi.
      </div>
    </div>
  ),
};
