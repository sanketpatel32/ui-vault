// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/notes.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import Notes from "@/showcase/animata/notes/notes";

const meta = {
  title: "Widget/Notes",
  component: Notes,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Notes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AboutJohn: Story = {
  name: "About John",
  args: {},
};

export const Primary = AboutJohn;
