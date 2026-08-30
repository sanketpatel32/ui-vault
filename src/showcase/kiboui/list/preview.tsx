import { addDays } from "date-fns";
import { useState } from "react";
import type { DragEndEvent } from "./index";
import { ListGroup, ListHeader, ListItem, ListItems, ListProvider } from "./index";

// Demo adapted from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/list) with static data.

const now = new Date();
const day = (offset: number) => addDays(now, offset);

const statuses = [
  { id: "planned", name: "Planned", color: "#8b5cf6" },
  { id: "in-progress", name: "In Progress", color: "#f59e0b" },
  { id: "done", name: "Done", color: "#10b981" },
];

const initialFeatures = [
  {
    id: "f1",
    name: "Drive compelling systems",
    startAt: day(-20),
    endAt: day(30),
    status: statuses[0],
  },
  {
    id: "f2",
    name: "Innovate compelling e-commerce",
    startAt: day(-15),
    endAt: day(40),
    status: statuses[0],
  },
  {
    id: "f3",
    name: "Incentivize user-centric networks",
    startAt: day(-10),
    endAt: day(50),
    status: statuses[0],
  },
  {
    id: "f4",
    name: "Orchestrate immersive paradigms",
    startAt: day(-5),
    endAt: day(60),
    status: statuses[0],
  },
  {
    id: "f5",
    name: "Streamline front-end systems",
    startAt: day(-25),
    endAt: day(20),
    status: statuses[1],
  },
  {
    id: "f6",
    name: "Recontextualize mission-critical synergy",
    startAt: day(-30),
    endAt: day(25),
    status: statuses[1],
  },
  {
    id: "f7",
    name: "Harness bleeding-edge mindshare",
    startAt: day(-35),
    endAt: day(15),
    status: statuses[1],
  },
  {
    id: "f8",
    name: "Whiteboard transparent e-tailers",
    startAt: day(-40),
    endAt: day(10),
    status: statuses[1],
  },
  {
    id: "f9",
    name: "Facilitate dynamic users",
    startAt: day(-60),
    endAt: day(-5),
    status: statuses[2],
  },
  {
    id: "f10",
    name: "Aggregate impactful initiatives",
    startAt: day(-55),
    endAt: day(-10),
    status: statuses[2],
  },
  {
    id: "f11",
    name: "Maximize cross-media partnerships",
    startAt: day(-50),
    endAt: day(-15),
    status: statuses[2],
  },
];

export default function Preview() {
  const [features, setFeatures] = useState(initialFeatures);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const status = statuses.find((status) => status.name === over.id);

    if (!status) {
      return;
    }

    setFeatures(
      features.map((feature) => {
        if (feature.id === active.id) {
          return { ...feature, status };
        }

        return feature;
      }),
    );
  };

  return (
    <div className="w-full">
      <div className="flex min-h-96 items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <ListProvider onDragEnd={handleDragEnd}>
            {statuses.map((status) => (
              <ListGroup id={status.name} key={status.name}>
                <ListHeader color={status.color} name={status.name} />
                <ListItems>
                  {features
                    .filter((feature) => feature.status.name === status.name)
                    .map((feature, index) => (
                      <ListItem
                        id={feature.id}
                        index={index}
                        key={feature.id}
                        name={feature.name}
                        parent={feature.status.name}
                      />
                    ))}
                </ListItems>
              </ListGroup>
            ))}
          </ListProvider>
        </div>
      </div>
    </div>
  );
}
