// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/list/transaction-list.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import { ChefHat, Receipt, Signal } from "lucide-react";
import TransactionList from "@/showcase/animata/transaction-list/transaction-list";

const meta = {
  title: "List/Transaction List",
  component: TransactionList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: { transactions: { control: { type: "object" } } },
} satisfies Meta<typeof TransactionList>;

export default meta;
type Story = StoryObj<typeof meta>;

const transactions = [
  {
    id: "67593",
    name: "Netflix",
    type: "Subscription",
    amount: -6.99,
    date: "September 26",
    time: "12:01 am",
    icon: <Receipt className="h-10 w-10 p-2 text-white" />,
    paymentMethod: "Credit Card",
    cardLastFour: "9342",
    cardType: "visa",
  },
  {
    id: "67482",
    name: "Verizon",
    type: "Mobile Recharge",
    amount: -4.05,
    date: "September 24",
    time: "05:18 pm",
    icon: <Signal className="h-10 w-10 p-2 text-white" />,
    paymentMethod: "Credit Card",
    cardLastFour: "2316",
    cardType: "mastercard",
  },
  {
    id: "52363",
    name: "Figma",
    type: "Subscription",
    amount: -15.0,
    date: "September 15",
    time: "01:11 pm",
    icon: <Receipt className="h-10 w-10 p-2 text-white" />,
    paymentMethod: "Credit Card",
    cardLastFour: "9342",
    cardType: "visa",
  },
  {
    id: "54635",
    name: "Rive",
    type: "Subscription",
    amount: -32.0,
    date: "September 16",
    time: "02:11 pm",
    icon: <Receipt className="h-10 w-10 p-2 text-white" />,
    paymentMethod: "Credit Card",
    cardLastFour: "9342",
    cardType: "mastercard",
  },
  {
    id: "52342",
    name: "Big Belly Burger",
    type: "Restaurant",
    amount: -12.05,
    date: "September 12",
    time: "09:06 pm",
    icon: <ChefHat className="h-10 w-10 p-2 text-white" />,
    paymentMethod: "Credit Card",
    cardLastFour: "2316",
    cardType: "visa",
  },
];

export const Primary: Story = {
  args: {
    transactions: transactions,
  },
};
