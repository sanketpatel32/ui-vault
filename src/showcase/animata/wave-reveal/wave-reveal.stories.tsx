// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/wave-reveal.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import WaveReveal from "@/showcase/animata/wave-reveal/wave-reveal";

const meta = {
  title: "Text/Wave Reveal",
  component: WaveReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["up", "down"],
    },
    mode: {
      control: { type: "select" },
      options: ["letter", "word"],
    },
  },
} satisfies Meta<typeof WaveReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello World",
    direction: "down",
    mode: "letter",
    duration: "2000ms",
    delay: 0,
    blur: true,
    className: "text-foreground",
  },
};
