import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 240 },
  { name: "Mar", total: 180 },
  { name: "Apr", total: 320 },
  { name: "May", total: 290 },
];

export default function Preview() {
  return (
    <Card className="w-80">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">Monthly Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
              <Bar dataKey="total" fill="currentColor" className="fill-accent" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
