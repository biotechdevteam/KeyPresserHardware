"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium text-muted-foreground leading-none focus:text-ring peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      type: {
        file: "flex items-center justify-center w-full px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer text-muted-foreground hover:border-primary hover:text-primary focus:outline-none focus:border-primary transition duration-300",
      },
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, type, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ type }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
