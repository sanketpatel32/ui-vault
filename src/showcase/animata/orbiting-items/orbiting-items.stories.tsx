// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/list/orbiting-items.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import OrbitingItems, { testOrbitingItems } from "@/showcase/animata/orbiting-items/orbiting-items";

const meta = {
  title: "List/Orbiting Items",
  component: OrbitingItems,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OrbitingItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: testOrbitingItems,
    radius: 50,
    pauseOnHover: false,
  },
};
