// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/fund-widget.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import FundWidget from "@/showcase/animata/fund-widget/fund-widget";

const meta = {
  title: "Widget/Fund Widget",
  component: FundWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FundWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    funds: [
      { value: "2.7Cr", change: 12, label: "Stocks" },
      { value: "3.5Cr", change: -8, label: "Funds" },
      { value: "1.2Cr", change: 6, label: "Deposits" },
    ],
  },
};
