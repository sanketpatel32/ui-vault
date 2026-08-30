import { addDays } from "date-fns";
import { useState } from "react";
import {
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureRow,
  type GanttFeature,
  GanttHeader,
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttToday,
} from "./index";

const now = new Date();
const day = (offset: number) => addDays(now, offset);

const done = { id: "done", name: "Done", color: "#10b981" };
const doing = { id: "doing", name: "In progress", color: "#f59e0b" };
const todo = { id: "todo", name: "Planned", color: "#8b5cf6" };

const initialFeatures: GanttFeature[] = [
  {
    id: "g1",
    name: "Registry import",
    startAt: day(-40),
    endAt: day(-18),
    status: done,
  },
  {
    id: "g2",
    name: "Preview frames",
    startAt: day(-20),
    endAt: day(4),
    status: doing,
  },
  {
    id: "g3",
    name: "Search ranking",
    startAt: day(-10),
    endAt: day(14),
    status: doing,
  },
  {
    id: "g4",
    name: "Favorites sync",
    startAt: day(2),
    endAt: day(22),
    status: todo,
  },
  {
    id: "g5",
    name: "v0.5 release",
    startAt: day(16),
    endAt: day(30),
    status: todo,
  },
];

export default function Preview() {
  const [features, setFeatures] = useState<GanttFeature[]>(initialFeatures);

  const handleMove = (id: string, startAt: Date, endAt: Date | null) => {
    setFeatures((prev) =>
      prev.map((feature) => (feature.id === id ? { ...feature, startAt, endAt } : feature)),
    );
  };

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="h-64 w-full max-w-2xl overflow-hidden rounded-lg border border-border">
          <GanttProvider range="monthly">
            <GanttSidebar>
              <GanttSidebarGroup name="Roadmap">
                {features.map((feature) => (
                  <GanttSidebarItem feature={feature} key={feature.id} />
                ))}
              </GanttSidebarGroup>
            </GanttSidebar>

            <GanttTimeline>
              <GanttHeader />
              <GanttFeatureList>
                <GanttFeatureListGroup>
                  <GanttFeatureRow features={features} onMove={handleMove}>
                    {(feature) => (
                      <div className="flex w-full items-center gap-2">
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: feature.status.color }}
                        />
                        <p className="flex-1 truncate text-xs font-medium">{feature.name}</p>
                      </div>
                    )}
                  </GanttFeatureRow>
                </GanttFeatureListGroup>
              </GanttFeatureList>
              <GanttToday />
            </GanttTimeline>
          </GanttProvider>
        </div>
      </div>
    </div>
  );
}
