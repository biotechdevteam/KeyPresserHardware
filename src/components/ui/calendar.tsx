"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  elevated?: boolean;
  size?: "default" | "sm" | "lg";
  colorTheme?: "default" | "blue" | "green" | "purple" | "amber";
  minimal?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  elevated = false,
  size = "default",
  colorTheme = "default",
  minimal = false,
  ...props
}: CalendarProps) {
  const sizeClasses = {
    sm: { day: "h-7 w-7", caption: "text-xs", head: "text-xs" },
    default: { day: "h-8 w-8", caption: "text-sm", head: "text-[0.8rem]" },
    lg: { day: "h-9 w-9", caption: "text-base", head: "text-sm" },
  };

  const colorThemeClasses = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
    blue: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white",
    green: "bg-green-600 text-white hover:bg-green-700 hover:text-white",
    purple: "bg-purple-600 text-white hover:bg-purple-700 hover:text-white",
    amber: "bg-amber-600 text-white hover:bg-amber-700 hover:text-white",
  };

  const todayClasses = {
    default: "bg-accent text-accent-foreground",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    amber: "bg-amber-100 text-amber-800",
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3",
        elevated && "border rounded-md shadow-sm bg-card",
        minimal && "border-none shadow-none p-2",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: cn("font-medium", sizeClasses[size].caption),
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-muted-minimal rounded-md w-8 font-normal",
          sizeClasses[size].head
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent",
          "[&:has([aria-selected].day-outside)]:bg-accent/50",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "p-0 font-normal aria-selected:opacity-100",
          sizeClasses[size].day
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: cn(colorThemeClasses[colorTheme]),
        day_today: cn(todayClasses[colorTheme]),
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        PreviousMonthButton: () => (
          <ChevronLeft className={cn("h-4 w-4", minimal && "h-3 w-3")} />
        ),
        NextMonthButton: () => (
          <ChevronRight className={cn("h-4 w-4", minimal && "h-3 w-3")} />
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
