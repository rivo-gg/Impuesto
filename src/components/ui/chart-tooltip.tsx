import { Card, CardContent } from "@/components/ui/card";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export default function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <Card className="shadow-md">
        <CardContent className="p-2">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="text-muted-foreground text-sm">
              <span className="text-foreground font-medium">{entry.value}</span> {entry.name}
            </p>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
}
