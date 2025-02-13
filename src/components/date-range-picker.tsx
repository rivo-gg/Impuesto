"use client";

import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import type * as React from "react";
import { format } from "date-fns";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DateRangePicker({
  className,
  date,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <span>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </span>
              ) : (
                <span>{format(date.from, "LLL dd, y")}</span>
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DatePicker />
        </PopoverContent>
      </Popover>
    </div>
  );
}
