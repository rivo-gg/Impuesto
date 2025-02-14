import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import CustomChartTooltip from "../ui/chart-tooltip";

const data = [
  { name: "Product A", revenue: 4000 },
  { name: "Product B", revenue: 3000 },
  { name: "Product C", revenue: 2000 },
  { name: "Product D", revenue: 2780 },
  { name: "Product E", revenue: 1890 },
  { name: "Product F", revenue: 2500 },
  { name: "Product G", revenue: 3200 },
  { name: "Product H", revenue: 1500 },
  { name: "Product I", revenue: 2900 },
  { name: "Product J", revenue: 3100 },
  { name: "Product K", revenue: 2700 },
  { name: "Product L", revenue: 2300 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function TopProductsChart() {
  return (
    <ChartContainer config={chartConfig} className="max-h-[500px] w-full">
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <ChartTooltip content={<CustomChartTooltip />} />
        <Bar dataKey="revenue" stackId="a" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
