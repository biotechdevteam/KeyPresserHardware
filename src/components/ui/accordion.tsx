"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils/utils";

// Exported type for better type safety when using the component
export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>;

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border border-muted/60 rounded-lg mb-3 transition-all duration-300",
      "hover:border-muted hover:shadow-lg hover:shadow-muted/10",
      "focus-within:border-primary/30 focus-within:shadow-md focus-within:shadow-primary/10",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full justify-between items-center gap-2 text-left p-4 text-md lg:text-lg font-medium",
        "text-foreground bg-transparent rounded-lg",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
        "transition-all duration-200 ease-out",
        "data-[state=open]:bg-muted/10",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <ChevronDownIcon
        className={cn(
          "h-5 w-5 flex-shrink-0 text-muted-foreground",
          "transition-transform duration-300 ease-in-out",
          "group-hover:text-primary",
          "data-[state=open]:rotate-180 data-[state=open]:text-primary"
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "px-5 py-4 text-sm lg:text-base text-muted-foreground",
      "border-t border-muted/40",
      "transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pt-1">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
