"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", currentYear: 4000, previousYear: 2400 },
  { name: "Feb", currentYear: 3000, previousYear: 1398 },
  { name: "Mar", currentYear: 2000, previousYear: 9800 },
  { name: "Apr", currentYear: 2780, previousYear: 3908 },
  { name: "May", currentYear: 1890, previousYear: 4800 },
  { name: "Jun", currentYear: 2390, previousYear: 3800 },
  { name: "Jul", currentYear: 3490, previousYear: 4300 },
]

export function MonthlyComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="currentYear" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="previousYear" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

