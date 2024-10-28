"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils/utils";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  showValue?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, showValue = true, ...props }, ref) => {
  const progressRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      {/* Conditionally render percentage text */}
      {showValue && (
        <div
          className="absolute -top-5 text-muted-foreground text-xs font-medium transition-transform"
          style={{ left: `${value}%`, transform: "translateX(-50%)" }}
        >
          {Math.round(value || 0)}%
        </div>
      )}

      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2.5 w-full overflow-hidden rounded-full bg-muted",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          ref={progressRef}
          className="h-full bg-primary transition-transform duration-1000"
          style={{
            width: `${value}%`,
            transform: `translateX(0)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
