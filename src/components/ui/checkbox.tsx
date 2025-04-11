"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  labelPosition?: "right" | "left";
  variant?: "default" | "destructive" | "success";
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      checked,
      onCheckedChange,
      label,
      description,
      size = "md",
      labelPosition = "right",
      variant = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    // Size mappings
    const sizeClasses = {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    // Variant mappings
    const variantClasses = {
      default: "border-primary data-[state=checked]:bg-primary",
      destructive: "border-destructive data-[state=checked]:bg-destructive",
      success: "border-green-600 data-[state=checked]:bg-green-600",
    };

    // Label size mappings
    const labelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    // Render order based on label position
    const renderOrder =
      labelPosition === "left" ? "flex-row-reverse" : "flex-row";

    return (
      <div
        className={cn(
          "flex items-center gap-2 max-w-full",
          renderOrder,
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        {/* Radix Checkbox with animation */}
        <div className="relative flex-shrink-0">
          <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
              "peer flex items-center justify-center h-5 w-5 rounded-sm border-2 border-border bg-background transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed",
              "transition-all duration-200",
              sizeClasses[size],
              variantClasses[variant],
              className
            )}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: checked ? 1 : 0 }}
                transition={{ type: "spring", duration: 0.3 }}
              >
                <CheckIcon
                  className={cn("text-primary-foreground", sizeClasses[size])}
                />
              </motion.div>
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </div>

        {/* Label and optional description */}
        {(label || description) && (
          <div
            className={cn(
              "flex flex-col",
              labelPosition === "left" ? "items-end mr-2" : "items-start ml-2"
            )}
            onClick={() => !disabled && onCheckedChange?.(!checked)}
          >
            {label && (
              <label
                className={cn(
                  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  labelSizeClasses[size],
                  checked ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  "text-muted-foreground mt-0.5",
                  size === "sm" ? "text-xs" : "text-xs"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
