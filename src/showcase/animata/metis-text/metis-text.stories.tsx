// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/metis-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";

import MetisText from "@/showcase/animata/metis-text/metis-text";

const meta = {
  title: "Text/Metis Text",
  component: MetisText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MetisText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "About us",
    className: "font-(family-name:--font-display) text-2xl lowercase text-foreground",
  },
};
