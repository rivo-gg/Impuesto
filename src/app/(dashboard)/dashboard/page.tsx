"use client";

import { Overview, revenueData } from "@/components/dashboard/overview";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Maximize2, Download } from "lucide-react";
import { OverviewDialog } from "@/components/dashboard/dialogs/overview";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import ExcelJS from 'exceljs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Helper function to determine the color class based on the percentage
function getPercentageColorClass(percentage: number): string {
  return percentage >= 0 ? "text-green-500" : "text-red-500";
}

// Helper function to format the percentage
function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(1)}%`;
}

export default function Dashboard() {
  const [showOverviewDialog, setShowOverviewDialog] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  
  const downloadAsPng = async () => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: '#0f0f0f'
    });
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "revenue-overview.png";
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
    link.download = "revenue-data.csv";
    link.click();
  };

  const downloadAsExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Your App';
    workbook.lastModifiedBy = 'Your App';
    workbook.created = new Date();
    workbook.modified = new Date();

    // Add data worksheet
    const worksheet = workbook.addWorksheet('Revenue Data');
    
    // Add headers with styling
    worksheet.columns = [
      { header: 'Month', key: 'month', width: 15 },
      { header: 'Revenue', key: 'revenue', width: 15 },
    ];

    // Make headers bold
    worksheet.getRow(1).font = { bold: true };

    // Add data
    revenueData.forEach(item => {
      worksheet.addRow({ month: item.name, revenue: item.total });
    });

    // Calculate total
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.total, 0);
    
    // Add total row with styling
    const totalRow = worksheet.addRow({ month: 'Total', revenue: totalRevenue });
    totalRow.font = { bold: true };
    
    // Style only the revenue cell in the total row
    const revenueCell = totalRow.getCell(2); // Column B
    revenueCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: totalRevenue >= 0 ? 'FF92E3A9' : 'FFE39292' }
    };

    // Format revenue column as currency
    worksheet.getColumn('revenue').numFmt = '€#,##0.00';

    // Add conditional formatting for positive/negative values (excluding total row)
    worksheet.addConditionalFormatting({
      ref: 'B2:B13',
      rules: [
        {
          type: 'cellIs',
          operator: 'greaterThan',
          formulae: [0],
          priority: 1,
          style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FF92E3A9' } } }
        },
        {
          type: 'cellIs',
          operator: 'lessThan',
          formulae: [0],
          priority: 2,
          style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFE39292' } } }
        }
      ]
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Create blob and download
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'revenue-report.xlsx';
    link.click();
  };

  // Mock data for the cards
  const cardData = [
    { title: "Total Revenue", value: "€45,231.89", percentage: 20.1 },
    { title: "Invoices", value: "+2,350", percentage: 180.1 },
    { title: "Paid Invoices", value: "+12,234", percentage: 19.0 },
    { title: "Active Projects", value: "+573", percentage: -2.5 },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Updated main content container */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-muted-foreground text-xs">
                <span className={`font-medium ${getPercentageColorClass(card.percentage)}`}>
                  {formatPercentage(card.percentage)}
                </span>
                {" from last month"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid flex-1 gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Overview</CardTitle>
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
                onClick={() => setShowOverviewDialog(true)}
                title="Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-2 pt-4" ref={chartRef}>
            <Overview />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentInvoices />
          </CardContent>
        </Card>
      </div>
      <OverviewDialog 
        open={showOverviewDialog} 
        onOpenChange={setShowOverviewDialog}
      />
    </div>
  );
}
