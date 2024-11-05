"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils/utils";
import { Link } from "next-view-transitions";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

const NavCollapsible = ({
  triggerText,
  children,
  isOpen,
  onOpenChange,
  className,
  ...props
}: {
  triggerText: string;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}) => {
  return (
    <CollapsiblePrimitive.Root
      open={isOpen}
      onOpenChange={onOpenChange}
      className={cn("w-full flex flex-col items-center mx-auto", className)}
      {...props}
    >
      <CollapsiblePrimitive.Trigger className="flex justify-center items-center p-4 w-full bg-transparent">
        <span className="font-medium">{triggerText}</span>
        <ChevronDownIcon
          className={cn(
            "h-5 w-5 ml-2 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </CollapsiblePrimitive.Trigger>

      <CollapsiblePrimitive.Content className="overflow-hidden transition-all duration-500 ease-in-out w-full">
        <div className="p-4 bg-background rounded-b-md flex flex-col justify-center">
          {children}
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};

NavCollapsible.displayName = "NavCollapsible";

const NavCollapsibleListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { href: string }
>(({ className, href, children, ...props }, ref) => {
  return (
    <li className="w-full flex justify-center">
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block w-full select-none space-y-1 p-2 rounded-md text-center h-fit leading-none no-underline outline-none bg-transparent focus:bg-muted-primary focus:no-underline",
          className
        )}
        {...props}
      >
        <p className="text-xs font-semibold text-foreground uppercase leading-none">
          {children}
        </p>
      </Link>
    </li>
  );
});
NavCollapsibleListItem.displayName = "NavCollapsibleListItem";

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  NavCollapsible,
  NavCollapsibleListItem,
};
