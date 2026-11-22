// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/underline-hover-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryFn } from "@/showcase/_shared/animata/storybook";
import UnderlineHoverText, {
  type UnderlineHoverTextProps,
} from "@/showcase/animata/underline-hover-text/underline-hover-text";

export default {
  title: "text/Underline hover text",
  component: UnderlineHoverText,
  argTypes: {
    text: { control: "text" },
    textColor: { control: "color" },
    hoverTextColor: { control: "color" },
    hoverColor: { control: "color" },
    fontSize: { control: "text" },
    fontWeight: { control: "text" },
    className: { control: "text" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UnderlineHoverText>;

const Template: StoryFn<UnderlineHoverTextProps> = (args) => <UnderlineHoverText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Hover over me",
};
