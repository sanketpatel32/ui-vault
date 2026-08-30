import { ArrowRightIcon } from "lucide-react";
import { Announcement, AnnouncementTag, AnnouncementTitle } from "./index";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Announcement>
          <AnnouncementTag>v0.4.0</AnnouncementTag>
          <AnnouncementTitle>
            <span className="truncate">UI Vault registry hits 700 components</span>
            <ArrowRightIcon className="text-muted-fg size-3.5 transition-transform group-hover:translate-x-0.5" />
          </AnnouncementTitle>
        </Announcement>

        <Announcement>
          <AnnouncementTag>docs</AnnouncementTag>
          <AnnouncementTitle>
            <span className="truncate">New: kiboui source added to the hub</span>
          </AnnouncementTitle>
        </Announcement>

        <Announcement variant="secondary">
          <AnnouncementTag>tip</AnnouncementTag>
          <AnnouncementTitle>
            <span className="truncate">Hover the pill — it lifts its shadow</span>
          </AnnouncementTitle>
        </Announcement>
      </div>
    </div>
  );
}
