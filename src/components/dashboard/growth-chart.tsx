"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { revenueData } from "./overview";
import { DateRange } from "react-day-picker";
import ChartTooltip from "@/components/ui/chart-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Maximize2 } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import ExcelJS from 'exceljs';
import { DateRangePicker } from "@/components/ui/date-range-picker";

// Calculate cumulative growth data
function getGrowthData(dateRange?: DateRange) {
  return revenueData.reduce((acc, curr, index) => {
    const date = new Date(2024, index, 1); // Mock dates for demonstration
    
    // Filter by date range if provided
    if (dateRange?.from && date < dateRange.from) return acc;
    if (dateRange?.to && date > dateRange.to) return acc;
    
    const previousTotal = acc.length > 0 ? acc[acc.length - 1].total : 0;
    acc.push({
      name: curr.name,
      total: previousTotal + curr.total,
      date,
    });
    return acc;
  }, [] as { name: string; total: number; date: Date }[]);
}

interface GrowthChartProps {
  height?: number | string;
  dateRange?: DateRange;
  className?: string;
  setDateRange?: (range: DateRange | undefined) => void;
}

export function GrowthChart({ height = 350, dateRange, className, setDateRange }: GrowthChartProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const growthData = getGrowthData(dateRange);

  const downloadAsPng = async () => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: document.documentElement.classList.contains('dark') ? '#0f0f0f' : '#ffffff'
    });
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "revenue-growth-chart.png";
    link.href = image;
    link.click();
  };

  const downloadAsCSV = () => {
    const csvContent = [
      ["Month", "Total Revenue"],
      ...growthData.map(item => [item.name, item.total.toString()])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "revenue-growth-data.csv";
    link.click();
  };

  const downloadAsExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Your App';
    workbook.lastModifiedBy = 'Your App';
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet('Revenue Growth');
    
    worksheet.columns = [
      { header: 'Month', key: 'month', width: 15 },
      { header: 'Total Revenue', key: 'revenue', width: 15 }
    ];

    worksheet.getRow(1).font = { bold: true };

    growthData.forEach(item => {
      worksheet.addRow({ month: item.name, revenue: item.total });
    });

    const totalRevenue = growthData[growthData.length - 1].total;
    const totalRow = worksheet.addRow({ month: 'Total', revenue: totalRevenue });
    totalRow.font = { bold: true };

    worksheet.getColumn('revenue').numFmt = '€#,##0.00';

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "revenue-growth-report.xlsx";
    link.click();
  };

  const chartContent = (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={growthData}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(171, 47%, 43%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(171, 47%, 43%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value.toLocaleString()}`}
        />
        <Tooltip 
          content={<ChartTooltip dateFormat />}
          cursor={{ 
            stroke: 'hsl(var(--muted))',
            strokeWidth: 1,
            strokeDasharray: '4 4'
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="hsl(171, 47%, 43%)"
          fillOpacity={1}
          fill="url(#colorTotal)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Revenue Growth</CardTitle>
          <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div 
                    className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={downloadAsPng}>
                    Download PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadAsCSV}>
                    Download CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadAsExcel}>
                    Download Excel Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div 
                className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                onClick={() => setShowFullscreen(true)}
                title="Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
            {setDateRange && (
              <DateRangePicker
                date={dateRange}
                setDate={setDateRange}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="pl-2 pt-4" ref={chartRef}>
          <div style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height }}>
            {chartContent}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Revenue Growth</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-[calc(90vh-100px)]">
            {chartContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 