// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/typing-text.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import TypingText from "@/showcase/animata/typing-text/typing-text";

const meta = {
  title: "Text/Typing Text",
  component: TypingText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TypingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "> yarn add @animata/awesomeness",
    delay: 32,
    repeat: true,
    grow: false,
    alwaysVisibleCount: 1,
    smooth: false,
    waitTime: 1000,
    hideCursorOnComplete: false,
  },
  render: (props) => (
    <div className="min-w-96 max-w-96 rounded-sm bg-gray-800 px-4 py-2 text-yellow-400 shadow-lg">
      <TypingText {...props} />
    </div>
  ),
};

export const Smooth: Story = {
  args: {
    text: "This is a smooth typing text",
    delay: 50,
    alwaysVisibleCount: 0,
    smooth: true,
    waitTime: 5000,
  },
  render: (props) => (
    <div className="min-w-96 max-w-96 rounded-sm bg-gray-800 px-4 py-2 text-yellow-400 shadow-lg">
      <TypingText {...props} />
    </div>
  ),
};
