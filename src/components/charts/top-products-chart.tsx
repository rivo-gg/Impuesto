import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import ChartTooltip from "@/components/ui/chart-tooltip"

const data = [
  { name: "Product A", revenue: 4000 },
  { name: "Product B", revenue: 3000 },
  { name: "Product C", revenue: 2000 },
  { name: "Product D", revenue: 2780 },
  { name: "Product E", revenue: 1890 },
]

export function TopProductsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
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
        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

