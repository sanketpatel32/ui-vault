import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

type Status = "Live" | "Draft" | "Stale" | "Failed";

const statusTone: Record<Status, string> = {
  Live: "bg-emerald-500/15 text-emerald-600",
  Draft: "bg-zinc-500/15 text-zinc-500",
  Stale: "bg-amber-500/15 text-amber-600",
  Failed: "bg-red-500/15 text-red-600",
};

const rows: { name: string; source: string; installs: string; status: Status }[] = [
  { name: "Animated tabs", source: "COSS UI", installs: "12.4k", status: "Live" },
  { name: "Command palette", source: "COSS UI", installs: "9.1k", status: "Live" },
  { name: "Drawer menu", source: "COSS UI", installs: "5.8k", status: "Draft" },
  { name: "Segmented control", source: "COSS UI", installs: "4.0k", status: "Stale" },
  { name: "Preview card", source: "COSS UI", installs: "1.2k", status: "Failed" },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-panel">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Installs</TableHead>
                <TableHead className="pe-4 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium text-fg">{row.name}</TableCell>
                  <TableCell className="text-muted-fg">{row.source}</TableCell>
                  <TableCell className="text-right tabular-nums">{row.installs}</TableCell>
                  <TableCell className="pe-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[row.status]}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
