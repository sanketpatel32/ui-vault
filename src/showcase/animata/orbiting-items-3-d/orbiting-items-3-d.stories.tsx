// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/list/orbiting-items-3-d.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import OrbitingItems3D, {
  LucideIcons,
} from "@/showcase/animata/orbiting-items-3-d/orbiting-items-3-d";

const meta = {
  title: "List/Orbiting Items 3 D",
  component: OrbitingItems3D,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OrbitingItems3D>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    radiusX: 120,
    radiusY: 30,
    items: LucideIcons,
    duration: 25,
    tiltAngle: 360 - 30,
  },
};
