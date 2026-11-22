// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/tabs/fluid-tabs.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import { Inbox, Landmark, PieChart } from "lucide-react";

import FluidTabs from "@/showcase/animata/fluid-tabs/fluid-tabs";

const meta = {
  title: "Tabs/Fluid Tabs",
  component: FluidTabs,
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
} satisfies Meta<typeof FluidTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: null },
  render: () => (
    <FluidTabs defaultActiveIndex={2}>
      <FluidTabs.List aria-label="Fluid tabs">
        <FluidTabs.Tab>
          <FluidTabs.Label>Accounts</FluidTabs.Label>
        </FluidTabs.Tab>
        <FluidTabs.Tab>
          <FluidTabs.Icon>
            <Inbox aria-hidden />
          </FluidTabs.Icon>
          <FluidTabs.Label>Deposits</FluidTabs.Label>
        </FluidTabs.Tab>
        <FluidTabs.Tab>
          <FluidTabs.Icon>
            <PieChart aria-hidden />
          </FluidTabs.Icon>
          <FluidTabs.Label>Funds</FluidTabs.Label>
        </FluidTabs.Tab>
      </FluidTabs.List>
    </FluidTabs>
  ),
};

export const WithIcons: Story = {
  args: { children: null },
  render: () => (
    <FluidTabs defaultActiveIndex={0}>
      <FluidTabs.List aria-label="Fluid tabs with icons">
        <FluidTabs.Tab>
          <FluidTabs.Icon>
            <Landmark aria-hidden />
          </FluidTabs.Icon>
          <FluidTabs.Label>Accounts</FluidTabs.Label>
        </FluidTabs.Tab>
        <FluidTabs.Tab>
          <FluidTabs.Icon>
            <Inbox aria-hidden />
          </FluidTabs.Icon>
          <FluidTabs.Label>Deposits</FluidTabs.Label>
        </FluidTabs.Tab>
        <FluidTabs.Tab>
          <FluidTabs.Icon>
            <PieChart aria-hidden />
          </FluidTabs.Icon>
          <FluidTabs.Label>Funds</FluidTabs.Label>
        </FluidTabs.Tab>
      </FluidTabs.List>
    </FluidTabs>
  ),
};
