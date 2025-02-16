import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import ChartTooltip from "@/components/ui/chart-tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Maximize2 } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import ExcelJS from 'exceljs';

const data = [
  { name: "Project A", revenue: 4000 },
  { name: "Project B", revenue: 3000 },
  { name: "Project C", revenue: 2000 },
  { name: "Project D", revenue: 2780 },
  { name: "Project E", revenue: 1890 },
]

export function TopProjectsChart() {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadAsPng = async () => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: document.documentElement.classList.contains('dark') ? '#0f0f0f' : '#ffffff'
    });
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "top-projects-chart.png";
    link.href = image;
    link.click();
  };

  const downloadAsCSV = () => {
    const csvContent = [
      ["Project", "Revenue"],
      ...data.map(item => [item.name, item.revenue.toString()])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "top-projects-data.csv";
    link.click();
  };

  const downloadAsExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Your App';
    workbook.lastModifiedBy = 'Your App';
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet('Top Projects');
    
    worksheet.columns = [
      { header: 'Project', key: 'project', width: 15 },
      { header: 'Revenue', key: 'revenue', width: 15 }
    ];

    worksheet.getRow(1).font = { bold: true };

    data.forEach(item => {
      worksheet.addRow({ project: item.name, revenue: item.revenue });
    });

    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalRow = worksheet.addRow({ project: 'Total', revenue: totalRevenue });
    totalRow.font = { bold: true };

    worksheet.getColumn('revenue').numFmt = '€#,##0.00';

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "top-projects-report.xlsx";
    link.click();
  };

  const chartContent = (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="revenue" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Top Projects</CardTitle>
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
            <DialogTitle>Top Projects</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-[calc(90vh-100px)]">
            {chartContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

