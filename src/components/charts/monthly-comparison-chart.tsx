import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartTooltip from "@/components/ui/chart-tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Maximize2 } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import ExcelJS from 'exceljs';

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
  const [showFullscreen, setShowFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadAsPng = async () => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: document.documentElement.classList.contains('dark') ? '#0f0f0f' : '#ffffff'
    });
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "monthly-comparison-chart.png";
    link.href = image;
    link.click();
  };

  const downloadAsCSV = () => {
    const csvContent = [
      ["Month", "Current Year", "Previous Year"],
      ...data.map(item => [item.name, item.currentYear.toString(), item.previousYear.toString()])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "monthly-comparison-data.csv";
    link.click();
  };

  const downloadAsExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Your App';
    workbook.lastModifiedBy = 'Your App';
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet('Monthly Comparison');
    
    worksheet.columns = [
      { header: 'Month', key: 'month', width: 15 },
      { header: 'Current Year', key: 'currentYear', width: 15 },
      { header: 'Previous Year', key: 'previousYear', width: 15 }
    ];

    worksheet.getRow(1).font = { bold: true };

    data.forEach(item => {
      worksheet.addRow({ 
        month: item.name, 
        currentYear: item.currentYear,
        previousYear: item.previousYear
      });
    });

    const totals = data.reduce((acc, item) => ({
      currentYear: acc.currentYear + item.currentYear,
      previousYear: acc.previousYear + item.previousYear
    }), { currentYear: 0, previousYear: 0 });

    const totalRow = worksheet.addRow({ 
      month: 'Total', 
      currentYear: totals.currentYear,
      previousYear: totals.previousYear
    });
    totalRow.font = { bold: true };

    worksheet.getColumn('currentYear').numFmt = '€#,##0.00';
    worksheet.getColumn('previousYear').numFmt = '€#,##0.00';

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "monthly-comparison-report.xlsx";
    link.click();
  };

  const chartContent = (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="currentYear" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="previousYear" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Monthly Comparison</CardTitle>
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
          <div style={{ width: '100%', height: 300 }}>
            {chartContent}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Monthly Comparison</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-[calc(90vh-100px)]">
            {chartContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

