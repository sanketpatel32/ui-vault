import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tasks = [
  { code: "TASK-8782", title: "You can't compress the program without...", status: "In Progress" },
  { code: "TASK-7878", title: "Try to calculate the EXE feed, maybe it will...", status: "Done" },
  { code: "TASK-7839", title: "We need to bypass the neural TCP card!", status: "Todo" },
];

export default function Preview() {
  return (
    <div className="w-80 rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((t) => (
            <TableRow key={t.code}>
              <TableCell className="font-mono text-xs">{t.code}</TableCell>
              <TableCell className="text-xs truncate max-w-[120px]">{t.title}</TableCell>
              <TableCell className="text-xs">{t.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
