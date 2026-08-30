import { Activity, FolderKanban, Settings2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTab } from "./tabs";

const panels: Record<string, { title: string; body: string }> = {
  overview: {
    title: "546 components across 9 sources",
    body: "Every entry carries an install command, license note and a live preview. Favorites and recents are stored locally in your browser.",
  },
  activity: {
    title: "Last sync: 2 minutes ago",
    body: "shadcn (65), magicui (76), animata (154) and animate-ui (154) refreshed without conflicts. 3 entries need a re-vendor: marked with a stale badge.",
  },
  settings: {
    title: "Local-first settings",
    body: "Theme follows the system, preview density is compact and motion respects prefers-reduced-motion. Nothing leaves this device.",
  },
};

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList className="w-full">
            <TabsTab value="overview" className="gap-1.5">
              <FolderKanban />
              Overview
            </TabsTab>
            <TabsTab value="activity" className="gap-1.5">
              <Activity />
              Activity
            </TabsTab>
            <TabsTab value="settings" className="gap-1.5">
              <Settings2 />
              Settings
            </TabsTab>
          </TabsList>
          {Object.entries(panels).map(([value, panel]) => (
            <TabsContent key={value} value={value} className="pt-3">
              <h3 className="text-sm font-semibold text-fg">{panel.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-fg">{panel.body}</p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
