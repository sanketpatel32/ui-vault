// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/animated-gradient-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import { ArrowRight, Combine } from "lucide-react";
import AnimatedGradientText from "@/showcase/animata/animated-gradient-text/animated-gradient-text";
import { Separator } from "@/showcase/_shared/animata/components/ui/separator";

const meta = {
  title: "Text/Animated Gradient Text",
  component: AnimatedGradientText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedGradientText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Hello, world!",
    className: "text-6xl",
  },
};

export const CustomColors: Story = {
  args: {
    children: (
      <>
        <Combine className="h-4 w-4 text-blue-400" />{" "}
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Custom children & colors</span>
        <ArrowRight className="ml-1 h-4 w-4 text-blue-400" />{" "}
      </>
    ),
    className:
      "text-lg inline-flex cursor-pointer items-center rounded-lg border-2 hover:border-sky-500 border-sky-300 bg-muted px-3 py-1  md:border-4 md:px-6 md:py-2 md:text-2xl font-bold from-blue-300 via-blue-600 to-purple-300",
  },
};
