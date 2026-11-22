// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/tabs/shift-tabs.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";

import ShiftTabs from "@/showcase/animata/shift-tabs/shift-tabs";

const meta = {
  title: "Tabs/Shift Tabs",
  component: ShiftTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: null,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof ShiftTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: null },
  render: () => (
    <ShiftTabs defaultActiveIndex={0}>
      <ShiftTabs.List aria-label="Shift tabs">
        <ShiftTabs.Tab label="Issues">
          <ShiftTabs.Label>Issues</ShiftTabs.Label>
        </ShiftTabs.Tab>
        <ShiftTabs.Tab label="Pull Requests">
          <ShiftTabs.Label>Pull Requests</ShiftTabs.Label>
        </ShiftTabs.Tab>
        <ShiftTabs.Tab label="Actions">
          <ShiftTabs.Label>Actions</ShiftTabs.Label>
        </ShiftTabs.Tab>
        <ShiftTabs.Tab label="Projects">
          <ShiftTabs.Label>Projects</ShiftTabs.Label>
        </ShiftTabs.Tab>
      </ShiftTabs.List>
    </ShiftTabs>
  ),
};
