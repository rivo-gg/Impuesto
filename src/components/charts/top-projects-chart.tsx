import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Project A", revenue: 4000 },
  { name: "Project B", revenue: 3000 },
  { name: "Project C", revenue: 2000 },
  { name: "Project D", revenue: 2780 },
  { name: "Project E", revenue: 1890 },
]

export function TopProjectsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}

