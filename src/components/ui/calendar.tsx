"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { format } from "date-fns";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Adds a subtle shadow and border for elevated appearance */
  elevated?: boolean;
  /** Controls the size of the calendar */
  size?: "default" | "sm" | "lg";
  /** Optional custom theme/color for selected dates */
  colorTheme?: "default" | "blue" | "green" | "purple" | "amber";
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  elevated = false,
  size = "default",
  colorTheme = "default",
  ...props
}: CalendarProps) {
  // Size classes mapping
  const sizeClasses = {
    sm: {
      container: "text-xs",
      day: "h-7 w-7",
      caption: "text-sm",
    },
    default: {
      container: "text-sm",
      day: "h-9 w-9",
      caption: "text-sm",
    },
    lg: {
      container: "text-base",
      day: "h-10 w-10",
      caption: "text-base",
    },
  };

  // Color theme classes for selected dates
  const colorThemeClasses = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
    blue: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white",
    green: "bg-green-600 text-white hover:bg-green-700 hover:text-white",
    purple: "bg-purple-600 text-white hover:bg-purple-700 hover:text-white",
    amber: "bg-amber-600 text-white hover:bg-amber-700 hover:text-white",
  };

  // Today classes based on color theme
  const todayClasses = {
    default: "bg-accent text-accent-foreground border border-primary/20",
    blue: "bg-blue-100 text-blue-800 border border-blue-300",
    green: "bg-green-100 text-green-800 border border-green-300",
    purple: "bg-purple-100 text-purple-800 border border-purple-300",
    amber: "bg-amber-100 text-amber-800 border border-amber-300",
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3 select-none",
        sizeClasses[size].container,
        elevated && "border rounded-lg shadow-sm bg-card",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center px-2",
        caption_label: cn(
          "font-medium text-center flex-1",
          sizeClasses[size].caption
        ),
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-muted-foreground rounded-md font-medium flex-1 text-center",
          size === "sm"
            ? "text-xs"
            : size === "lg"
            ? "text-sm"
            : "text-[0.8rem]"
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/50",
          "[&:has([aria-selected].day-outside)]:bg-accent/30",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "p-0 font-normal aria-selected:opacity-100",
          "inline-flex items-center justify-center rounded-md transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "disabled:pointer-events-none disabled:opacity-50",
          sizeClasses[size].day
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: colorThemeClasses[colorTheme],
        day_today: todayClasses[colorTheme],
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/30 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent/50 aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        PreviousMonthButton: () => <ChevronLeft className="h-4 w-4" />,
        NextMonthButton: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
