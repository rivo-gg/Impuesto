"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import ChartTooltip from "@/components/ui/chart-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Maximize2 } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import ExcelJS from 'exceljs';

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
  className?: string;
}

export function Overview({ height = 350, className }: OverviewProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadAsPng = async () => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: document.documentElement.classList.contains('dark') ? '#0f0f0f' : '#ffffff'
    });
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "revenue-overview-chart.png";
    link.href = image;
    link.click();
  };

  const downloadAsCSV = () => {
    const csvContent = [
      ["Month", "Revenue"],
      ...revenueData.map(item => [item.name, item.total.toString()])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "revenue-overview-data.csv";
    link.click();
  };

  const downloadAsExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Your App';
    workbook.lastModifiedBy = 'Your App';
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet('Revenue Overview');
    
    worksheet.columns = [
      { header: 'Month', key: 'month', width: 15 },
      { header: 'Revenue', key: 'revenue', width: 15 }
    ];

    worksheet.getRow(1).font = { bold: true };

    revenueData.forEach(item => {
      worksheet.addRow({ month: item.name, revenue: item.total });
    });

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.total, 0);
    const totalRow = worksheet.addRow({ month: 'Total', revenue: totalRevenue });
    totalRow.font = { bold: true };

    worksheet.getColumn('revenue').numFmt = '€#,##0.00';

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "revenue-overview-report.xlsx";
    link.click();
  };

  const chartContent = (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={revenueData}>
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
          content={<ChartTooltip />}
          cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
        />
        <Bar 
          dataKey="total" 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Revenue Overview</CardTitle>
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
            <DialogTitle>Revenue Overview</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-[calc(90vh-100px)]">
            {chartContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
