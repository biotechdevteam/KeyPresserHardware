"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

// Define theme variants
type NavigationMenuTheme = "light" | "dark" | "auto";
type NavigationMenuSize = "sm" | "md" | "lg";

interface NavigationItemThemeProps {
  theme?: NavigationMenuTheme;
  active?: boolean;
  className?: string;
}

// Enhanced props interfaces
interface NavigationMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  theme?: NavigationMenuTheme;
  size?: NavigationMenuSize;
  isSticky?: boolean;
}

interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

interface ListItemProps extends NavigationMenuLinkProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

// Size variants
const sizeVariants: Record<NavigationMenuSize, string> = {
  sm: "text-xs h-8 px-3 py-1",
  md: "text-sm h-10 px-4 py-2",
  lg: "text-base h-12 px-5 py-3",
};

// Theme variants
const themeVariants: Record<NavigationMenuTheme, string> = {
  light: "text-muted-foreground hover:text-primary data-[active]:text-primary",
  dark: "text-gray-200 hover:text-primary data-[active]:text-primary",
  auto: "",
};

const navigationItemThemeVariants: Record<NavigationMenuTheme, string> = {
  light:
    "border-primary text-primary hover:bg-primary hover:border-ring hover:text-primary-foreground",
  dark: "border-primary-foreground text-primary-foreground hover:bg-primary hover:border-ring hover:text-primary-foreground",
  auto: "",
};

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(
  (
    {
      className,
      children,
      theme = "auto",
      size = "md",
      isSticky = false,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();
    const isLandingPage = pathname === "/en/home" || pathname === "/fr/home";
    const autoTheme = isLandingPage ? "dark" : "light";
    const currentTheme = theme === "auto" ? autoTheme : theme;

    return (
      <NavigationMenuPrimitive.Root
        ref={ref}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          isSticky && "sticky top-0 backdrop-blur-sm bg-background/80",
          themeVariants[currentTheme],
          className
        )}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </NavigationMenuPrimitive.Root>
    );
  }
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-1 md:gap-2 xl:gap-4",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex items-center justify-center rounded-md transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none bg-transparent hover:bg-transparent hover:text-primary transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "text-xs h-8 px-3 py-1",
        md: "text-sm h-10 px-4 py-2",
        lg: "text-base h-12 px-5 py-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    size?: NavigationMenuSize;
    theme?: NavigationMenuTheme;
  }
>(({ className, children, size = "md", theme = "auto", ...props }, ref) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/en/home" || pathname === "/fr/home";
  const autoTheme = isLandingPage ? "dark" : "light";
  const currentTheme = theme === "auto" ? autoTheme : theme;

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        navigationMenuTriggerStyle({ size }),
        "uppercase font-medium",
        themeVariants[currentTheme],
        className
      )}
      {...props}
    >
      <span className="mr-1">{children}</span>
      <ChevronDownIcon
        className="relative top-[1px] h-3 w-3 transition duration-300 ease-in-out group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
});

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "absolute left-0 top-0 w-auto data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
      "bg-popover p-4 shadow-lg rounded-lg border border-border/10 flex flex-col gap-4 min-w-[220px]",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps & {
    size?: NavigationMenuSize;
    theme?: NavigationMenuTheme;
  }
>(
  (
    {
      className,
      href,
      active,
      icon,
      size = "md",
      theme = "auto",
      children,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();
    const isLandingPage = pathname === "/en/home" || pathname === "/fr/home";
    const isActive = active !== undefined ? active : pathname === href;
    const autoTheme = isLandingPage ? "dark" : "light";
    const currentTheme = theme === "auto" ? autoTheme : theme;

    return (
      <Link href={href} passHref>
        <NavigationMenuPrimitive.Link
          ref={ref}
          className={cn(
            navigationMenuTriggerStyle({ size }),
            "relative font-medium no-underline transition-all duration-200 ease-in-out",
            "hover:no-underline focus:no-underline uppercase",
            isActive &&
              "font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-current",
            themeVariants[currentTheme],
            className
          )}
          {...props}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </NavigationMenuPrimitive.Link>
      </Link>
    );
  }
);

NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const ListItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  ListItemProps
>(({ className, href, title, description, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 hover:bg-muted/50 transition-colors duration-200 mb-10",
          "focus:bg-muted focus:outline-none",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <div className="text-xs font-semibold text-foreground uppercase leading-none">
            {title}
          </div>
        </div>
        {description && (
          <p className="line-clamp-2 text-sm font-light leading-snug max-w-xs pt-1 lowercase">
            {description}
          </p>
        )}
        {children}
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        "transition-all duration-200 ease-in-out",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export const useNavigationItemTheme = ({
  theme = "auto",
  active = false,
  className = "",
}: NavigationItemThemeProps) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/en/home" || pathname === "/fr/home";
  const autoTheme: NavigationMenuTheme = isLandingPage ? "dark" : "light";
  const currentTheme = theme === "auto" ? autoTheme : theme;

  const themeClasses = navigationItemThemeVariants[currentTheme];

  const activeClasses = active ? "data-[active]:font-semibold" : "";

  return cn(themeClasses, activeClasses, className);
};

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  ListItem,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

export type {
  NavigationMenuProps,
  NavigationMenuLinkProps,
  ListItemProps,
  NavigationMenuTheme,
  NavigationMenuSize,
};
