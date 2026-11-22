// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/card/case-study-card.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import CaseStudyCard from "@/showcase/animata/case-study-card/case-study-card";

const meta = {
  title: "Card/Case Study Card",
  component: CaseStudyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["content", "simple-image"],
    },
  },
} satisfies Meta<typeof CaseStudyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title:
      "How Delivery Hero streamlines marketing reports across all their brands with Clarisights",
    category: "BOOKS",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://github.com/codse/animata",
    type: "content",
    image:
      "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};

export const Secondary: Story = {
  args: {
    image:
      "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://github.com/codse/animata",
    type: "simple-image",
  },
};
