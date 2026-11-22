// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/graphs/progress.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import Progress from "@/showcase/animata/progress/progress";

const meta = {
  title: "Graphs/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    progress: 30,
  },
  render: (args) => {
    return (
      <div className="rounded bg-zinc-400 p-8">
        <strong className="font-normal text-gray-50">
          <strong>{args.progress}%</strong> progress
        </strong>
        {/** The height & width are important */}
        <div className="h-[12px] w-96">
          <Progress {...args} />
        </div>
      </div>
    );
  },
};
