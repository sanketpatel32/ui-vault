import { Dock, DockIcon } from "./dock";
import { Home, Search, Folder, Settings, Bell } from "lucide-react";

export default function Preview() {
  return (
    <div className="relative flex items-center justify-center p-4">
      <Dock direction="middle">
        <DockIcon>
          <Home size={18} />
        </DockIcon>
        <DockIcon>
          <Search size={18} />
        </DockIcon>
        <DockIcon>
          <Folder size={18} />
        </DockIcon>
        <DockIcon>
          <Bell size={18} />
        </DockIcon>
        <DockIcon>
          <Settings size={18} />
        </DockIcon>
      </Dock>
    </div>
  );
}
