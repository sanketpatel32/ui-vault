import { addDays } from "date-fns";
import { useState } from "react";
import { KanbanBoard, KanbanCard, KanbanCards, KanbanHeader, KanbanProvider } from "./index";
import { Avatar, AvatarFallback, AvatarImage } from "@/showcase/_shared/kiboui/ui/avatar";

// Demo adapted from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/kanban) with static data.

const now = new Date();
const day = (offset: number) => addDays(now, offset);

const columns = [
  { id: "planned", name: "Planned", color: "#8b5cf6" },
  { id: "in-progress", name: "In Progress", color: "#f59e0b" },
  { id: "done", name: "Done", color: "#10b981" },
];

const users = [
  { id: "u1", name: "Alice Nakamura", image: "" },
  { id: "u2", name: "Bruno Silva", image: "" },
  { id: "u3", name: "Chidi Okafor", image: "" },
  { id: "u4", name: "Dana Whitfield", image: "" },
];

const initialFeatures = [
  {
    id: "f1",
    name: "Scale compelling lifetime value",
    startAt: day(-30),
    endAt: day(160),
    column: "planned",
    owner: users[0],
  },
  {
    id: "f2",
    name: "Seize viral paradigms",
    startAt: day(-10),
    endAt: day(70),
    column: "planned",
    owner: users[1],
  },
  {
    id: "f3",
    name: "Transition robust methodologies",
    startAt: day(-60),
    endAt: day(110),
    column: "in-progress",
    owner: users[2],
  },
  {
    id: "f4",
    name: "Evolve distributed metrics",
    startAt: day(-40),
    endAt: day(130),
    column: "in-progress",
    owner: users[3],
  },
  {
    id: "f5",
    name: "Strategize frictionless architectures",
    startAt: day(-20),
    endAt: day(90),
    column: "in-progress",
    owner: users[0],
  },
  {
    id: "f6",
    name: "Whiteboard sticky large language models",
    startAt: day(-15),
    endAt: day(80),
    column: "in-progress",
    owner: users[1],
  },
  {
    id: "f7",
    name: "Reinvent rich communities",
    startAt: day(-5),
    endAt: day(60),
    column: "in-progress",
    owner: users[2],
  },
  {
    id: "f8",
    name: "Drive cross-platform users",
    startAt: day(-25),
    endAt: day(100),
    column: "in-progress",
    owner: users[3],
  },
  {
    id: "f9",
    name: "Innovate bleeding-edge models",
    startAt: day(-90),
    endAt: day(-5),
    column: "done",
    owner: users[0],
  },
  {
    id: "f10",
    name: "Deliver plug-and-play experiences",
    startAt: day(-75),
    endAt: day(-10),
    column: "done",
    owner: users[1],
  },
  {
    id: "f11",
    name: "Repurpose innovative users",
    startAt: day(-60),
    endAt: day(-20),
    column: "done",
    owner: users[2],
  },
  {
    id: "f12",
    name: "Streamline turn-key solutions",
    startAt: day(-50),
    endAt: day(-15),
    column: "done",
    owner: users[3],
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export default function Preview() {
  const [features, setFeatures] = useState(initialFeatures);

  return (
    <div className="w-full">
      <div className="flex min-h-96 items-stretch justify-center p-6">
        <KanbanProvider columns={columns} data={features} onDataChange={setFeatures}>
          {(column) => (
            <KanbanBoard id={column.id} key={column.id}>
              <KanbanHeader>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: column.color }} />
                  <span>{column.name}</span>
                </div>
              </KanbanHeader>
              <KanbanCards id={column.id}>
                {(feature: (typeof features)[number]) => (
                  <KanbanCard
                    column={column.id}
                    id={feature.id}
                    key={feature.id}
                    name={feature.name}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="m-0 flex-1 font-medium text-sm">{feature.name}</p>
                      </div>
                      {feature.owner && (
                        <Avatar className="h-4 w-4 shrink-0">
                          <AvatarImage src={feature.owner.image} />
                          <AvatarFallback>{feature.owner.name?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <p className="m-0 text-muted-foreground text-xs">
                      {shortDateFormatter.format(feature.startAt)} -{" "}
                      {dateFormatter.format(feature.endAt)}
                    </p>
                  </KanbanCard>
                )}
              </KanbanCards>
            </KanbanBoard>
          )}
        </KanbanProvider>
      </div>
    </div>
  );
}
