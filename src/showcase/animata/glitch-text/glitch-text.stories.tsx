// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/glitch-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";

import GlitchText from "@/showcase/animata/glitch-text/glitch-text";

const meta = {
  title: "Text/Glitch Text",
  component: GlitchText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof GlitchText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "404",
    className: "font-(family-name:--font-mono) text-8xl font-bold tracking-tight text-white",
  },
  render: (args) => (
    <div className="full-content w-full text-center bg-[#030380] px-12 py-16">
      <GlitchText {...args} />
    </div>
  ),
};
