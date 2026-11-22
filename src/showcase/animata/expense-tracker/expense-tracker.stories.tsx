// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/expense-tracker.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import ExpenseTracker, {
  spendingTrackerProps,
} from "@/showcase/animata/expense-tracker/expense-tracker";

const meta = {
  title: "Widget/Expense Tracker",
  component: ExpenseTracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ExpenseTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: spendingTrackerProps,
};
