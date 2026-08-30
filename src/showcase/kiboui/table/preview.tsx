import { addDays } from "date-fns";
import type { ColumnDef } from "./index";
import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from "./index";

// Demo adapted from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/table) with static data.

const now = new Date();
const day = (offset: number) => addDays(now, offset);

const statuses = [
  { id: "planned", name: "Planned", color: "#8b5cf6" },
  { id: "in-progress", name: "In Progress", color: "#f59e0b" },
  { id: "done", name: "Done", color: "#10b981" },
];

const exampleProducts = [
  { id: "p1", name: "Core Platform" },
  { id: "p2", name: "Mobile App" },
  { id: "p3", name: "Analytics Suite" },
  { id: "p4", name: "Developer API" },
];

const exampleInitiatives = [
  { id: "i1", name: "Platform Reliability" },
  { id: "i2", name: "Growth Loops" },
];

const exampleReleases = [
  { id: "r1", name: "v2.4" },
  { id: "r2", name: "v2.5" },
  { id: "r3", name: "v3.0" },
];

const pick = <T,>(items: T[], seed: number) => items[seed % items.length];

const exampleFeatures = Array.from({ length: 20 })
  .fill(null)
  .map((_, index) => ({
    id: `f${index + 1}`,
    name: [
      "Scale compelling lifetime value",
      "Seize viral paradigms",
      "Transition robust methodologies",
      "Evolve distributed metrics",
      "Strategize frictionless architectures",
      "Enhance interactive markets",
      "Whiteboard sticky large language models",
      "Reinvent rich communities",
      "Drive cross-platform users",
      "Simplify integrated methodologies",
      "Optimize cutting-edge experiences",
      "Evolve rich technologies",
      "Innovate bleeding-edge models",
      "Deliver plug-and-play experiences",
      "Repurpose innovative users",
      "Productize smart markets",
      "Collaborate extensible large language models",
      "Cultivate decentralized initiatives",
      "Streamline turn-key solutions",
      "Integrate rich convergence",
    ][index],
    startAt: day(-90 + index * 4),
    endAt: day(120 - index * 3),
    status: pick(statuses, index),
    product: pick(exampleProducts, index),
    initiative: pick(exampleInitiatives, index + 1),
    release: pick(exampleReleases, index + 2),
  }));

export default function Preview() {
  const columns: ColumnDef<(typeof exampleFeatures)[number]>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => row.original.status.name,
    },
    {
      accessorKey: "product",
      header: ({ column }) => <TableColumnHeader column={column} title="Product" />,
      cell: ({ row }) => row.original.product.name,
    },
    {
      accessorKey: "startAt",
      header: ({ column }) => <TableColumnHeader column={column} title="Start At" />,
      cell: ({ row }) =>
        new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
        }).format(row.original.startAt),
    },
    {
      accessorKey: "endAt",
      header: ({ column }) => <TableColumnHeader column={column} title="End At" />,
      cell: ({ row }) =>
        new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
        }).format(row.original.endAt),
    },
    {
      id: "release",
      accessorFn: (row) => row.release.id,
      header: ({ column }) => <TableColumnHeader column={column} title="Release" />,
      cell: ({ row }) => row.original.release.name,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex min-h-96 justify-center p-6">
        <div className="w-full max-w-4xl">
          <TableProvider columns={columns} data={exampleFeatures}>
            <TableHeader>
              {({ headerGroup }) => (
                <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
                  {({ header }) => <TableHead header={header} key={header.id} />}
                </TableHeaderGroup>
              )}
            </TableHeader>
            <TableBody>
              {({ row }) => (
                <TableRow key={row.id} row={row}>
                  {({ cell }) => <TableCell cell={cell} key={cell.id} />}
                </TableRow>
              )}
            </TableBody>
          </TableProvider>
        </div>
      </div>
    </div>
  );
}
