// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/toggle-switch.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import ToggleSwitch from "@/showcase/animata/toggle-switch/toggle-switch";

const meta = {
  title: "Button/Toggle Switch",
  component: ToggleSwitch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    defaultChecked: false,
    onChange: () => {},
  },
};
