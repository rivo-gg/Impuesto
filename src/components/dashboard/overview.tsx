"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import ChartTooltip from "@/components/ui/chart-tooltip";

const data = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 5000 },
  { name: "Apr", total: 4000 },
  { name: "May", total: 3000 },
  { name: "Jun", total: 2000 },
  { name: "Jul", total: 4000 },
  { name: "Aug", total: 3000 },
  { name: "Sep", total: 4000 },
  { name: "Oct", total: 2000 },
  { name: "Nov", total: 3000 },
  { name: "Dec", total: 5000 },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
