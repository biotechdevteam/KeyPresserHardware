"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

type NavCollapsibleProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Root
> & {
  triggerText: string;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  variant?: "default" | "outlined" | "subtle";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
};

const NavCollapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  NavCollapsibleProps
>(
  (
    {
      triggerText,
      children,
      isOpen,
      onOpenChange,
      className,
      variant = "default",
      size = "md",
      icon,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-primary/5 hover:bg-primary/10",
      outlined: "border border-border rounded-md hover:border-primary/50",
      subtle: "bg-transparent hover:bg-muted",
    };

    const sizes = {
      sm: "py-2 px-3 text-sm",
      md: "py-3 px-4 text-base",
      lg: "py-4 px-6 text-lg",
    };

    const pathname = usePathname();
    const isLandingPage = pathname === "/en/home" || pathname === "/fr/home";

    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        open={isOpen}
        onOpenChange={onOpenChange}
        className={cn("w-full flex flex-col items-center mx-auto", className)}
        {...props}
      >
        <CollapsiblePrimitive.Trigger
          className={cn(
            "flex justify-between items-center w-full text-primary hover:text-primary",
            "transition-colors duration-200 ease-in-out",
            "focus:outline-none focus:ring-offset-1",
            "font-medium rounded-md",
            isLandingPage && "text-gray-200",
            variants[variant],
            sizes[size],
            isOpen && variant === "default" && "bg-primary/10 text-primary",
            isOpen && variant === "outlined" && "border-primary/50 text-primary",
            isOpen && variant === "subtle" && "bg-muted text-primary",
            isOpen && "rounded-b-none",
            isOpen && isLandingPage && "text-primary"
          )}
        >
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <span>{triggerText}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </CollapsiblePrimitive.Trigger>

        <CollapsiblePrimitive.Content
          className={cn(
            "overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up w-full",
            variant === "outlined" && "border-x border-b border-border",
            variant === "outlined" && "rounded-b-md"
          )}
        >
          <div
            className={cn(
              "bg-background py-2 px-1",
              variant === "default" && "bg-primary/5",
              variant === "outlined" && "bg-transparent",
              variant !== "outlined" && "rounded-b-md"
            )}
          >
            {children}
          </div>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    );
  }
);

NavCollapsible.displayName = "NavCollapsible";

type NavCollapsibleListItemProps = React.ComponentPropsWithoutRef<
  typeof Link
> & {
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
};

const NavCollapsibleListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  NavCollapsibleListItemProps
>(({ className, href, children, active, icon, ...props }, ref) => {
  return (
    <li className="w-full">
      <Link
        ref={ref}
        href={href}
        className={cn(
          "flex items-center justify-center md:justify-start py-2 px-4 w-full",
          "rounded-md transition-colors duration-200 ease-in-out",
          "hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30",
          active && "bg-primary/15 text-primary font-medium",
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2 text-primary/80">{icon}</span>}
        <span
          className={cn(
            "font-medium capitalize",
            active ? "text-primary" : "text-foreground"
          )}
        >
          {children}
        </span>
      </Link>
    </li>
  );
});

NavCollapsibleListItem.displayName = "NavCollapsibleListItem";

// Add keyframe animations to your global CSS
const globalStyles = `
@keyframes collapsible-down {
  from { height: 0 }
  to { height: var(--radix-collapsible-content-height) }
}

@keyframes collapsible-up {
  from { height: var(--radix-collapsible-content-height) }
  to { height: 0 }
}
`;

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  NavCollapsible,
  NavCollapsibleListItem,
  globalStyles,
};
