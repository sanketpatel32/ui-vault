// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/widget/vpn-widget.stories.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { Meta, StoryObj } from "@/showcase/_shared/animata/storybook";
import VpnConnection from "@/showcase/animata/vpn-widget/vpn-widget";

const meta = {
  title: "Widget/VPN Connection",
  component: VpnConnection,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof VpnConnection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  name: "Connected",
  args: {
    serverName: "Tokyo",
    latency: "48 ms",
    downloadMbps: "112.3",
    defaultConnected: true,
  },
};

export const Disconnected: Story = {
  name: "Disconnected",
  args: {
    serverName: "Frankfurt",
    latency: "—",
    downloadMbps: "0",
    defaultConnected: false,
  },
};
