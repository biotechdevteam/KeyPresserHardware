"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date | null;
  onValueChange: (date: Date | null) => void;
  placeholder?: string; // Add placeholder prop
}

export function DatePickerDemo({
  value,
  onValueChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  // Default placeholder
  const [date, setDate] = React.useState<Date | null>(value);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate || null);
    onValueChange(selectedDate || null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}{" "}
          {/* Use placeholder when no date is selected */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
