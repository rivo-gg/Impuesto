import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import CustomChartTooltip from "../ui/chart-tooltip";

const data = [
  { name: "Direct", value: 400, fill: "var(--color-direct)" },
  { name: "Affiliate", value: 300, fill: "var(--color-affiliate)" },
  { name: "Social", value: 200, fill: "var(--color-social)" },
  { name: "Email", value: 100, fill: "var(--color-email)" },
];

const chartConfig = {
  value: {
    label: "Value",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-1))",
  },
  affiliate: {
    label: "Affiliate",
    color: "hsl(var(--chart-2))",
  },
  social: {
    label: "Social",
    color: "hsl(var(--chart-3))",
  },
  email: {
    label: "Email",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function RevenueBySourceChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-video min-h-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        />
      </PieChart>
    </ChartContainer>
  );
}
