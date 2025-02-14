"use client";

import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import CustomChartTooltip from "../ui/chart-tooltip";

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

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Overview() {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <ChartTooltip content={<CustomChartTooltip />} />
        <Bar dataKey="total" stackId="a" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
