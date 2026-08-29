import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Users, FolderGit2 } from "lucide-react";

export default function Preview() {
  return (
    <aside className="w-64 rounded-xl border border-border bg-panel p-4 shadow-xs">
      <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-fg">
        Workspace
      </div>
      <nav className="space-y-1">
        <Button variant="subtle" size="sm" className="w-full justify-start gap-2">
          <LayoutDashboard size={15} /> Dashboard
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <FolderGit2 size={15} /> Projects
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Users size={15} /> Team
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Settings size={15} /> Settings
        </Button>
      </nav>
    </aside>
  );
}
