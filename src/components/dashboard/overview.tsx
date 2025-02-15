"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import ChartTooltip from "@/components/ui/chart-tooltip";

export interface RevenueData {
  name: string;
  total: number;
}

export const revenueData: RevenueData[] = [
  { name: "Jan", total: -4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 5000 },
  { name: "Apr", total: 4000 },
  { name: "May", total: 3000 },
  { name: "Jun", total: 2000 },
  { name: "Jul", total: 4000 },
  { name: "Aug", total: 3000 },
  { name: "Sep", total: -2500 },
  { name: "Oct", total: 2000 },
  { name: "Nov", total: 3000 },
  { name: "Dec", total: 5000 },
];

interface OverviewProps {
  height?: number | string;
}

export function Overview({ height = 300 }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={revenueData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Tooltip 
          content={<ChartTooltip />}
          cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
