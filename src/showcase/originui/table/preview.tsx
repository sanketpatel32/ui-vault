import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>License</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Button</TableCell>
              <TableCell>Origin UI</TableCell>
              <TableCell>MIT</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Input</TableCell>
              <TableCell>Origin UI</TableCell>
              <TableCell>MIT</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
