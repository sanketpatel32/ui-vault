// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/background/boids-ecosystem.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import BoidsEcosystem from "@/showcase/animata/boids-ecosystem/boids-ecosystem";

const meta = {
  title: "Background/Boids Ecosystem",
  component: BoidsEcosystem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    count: { control: { type: "number", min: 20, max: 400, step: 10 } },
    cursorRadius: { control: { type: "number", min: 20, max: 260, step: 10 } },
    background: { control: { type: "color" } },
  },
} satisfies Meta<typeof BoidsEcosystem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    count: 140,
    cursorRadius: 110,
    background: "#0b0b12",
    palette: ["#f5f5f4", "#fde68a", "#93c5fd", "#fca5a5"],
  },
  render: (args) => (
    <div className="w-full h-96 full-content">
      <BoidsEcosystem {...args}>
        <h3 className="text-center pointer-events-none text-xl font-semibold tracking-tight text-white/90">
          Move your cursor — watch the flock part.
        </h3>
      </BoidsEcosystem>
    </div>
  ),
};
