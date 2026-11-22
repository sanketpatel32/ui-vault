// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/shopping-list.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import ShoppingList from "@/showcase/animata/shopping-list/shopping-list";

const meta = {
  title: "Widget/Shopping List",
  component: ShoppingList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ShoppingList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroceryRun: Story = {
  name: "Grocery run",
  args: {
    title: "Shopping list",
  },
};

export const Primary = GroceryRun;
