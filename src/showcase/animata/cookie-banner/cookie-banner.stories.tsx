// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/skeleton/cookie-banner.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import CookieBanner from "@/showcase/animata/cookie-banner/cookie-banner";

const meta = {
  title: "Skeleton/Cookie Banner",
  component: CookieBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
