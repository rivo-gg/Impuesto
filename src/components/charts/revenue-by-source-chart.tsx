import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import ChartTooltip from "@/components/ui/chart-tooltip"

const data = [
  { name: "Direct", value: 400 },
  { name: "Affiliate", value: 300 },
  { name: "Social", value: 200 },
  { name: "Email", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function RevenueBySourceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

