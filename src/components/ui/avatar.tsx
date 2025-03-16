"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils/utils";

// Define size variants for better flexibility
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
  status?: "online" | "offline" | "away" | "busy" | null;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
  xl: "h-16 w-16 text-xl",
};

const statusClasses: Record<NonNullable<AvatarProps["status"]>, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-400",
  busy: "bg-red-500",
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "md", status = null, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        "border border-border/50 transition-all duration-200",
        "shadow-sm hover:shadow-md hover:scale-105",
        sizeClasses[size],
        className
      )}
      {...props}
    />
    {status && (
      <span
        className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-background",
          statusClasses[status],
          size === "xs"
            ? "h-2 w-2"
            : size === "sm"
            ? "h-2.5 w-2.5"
            : size === "md"
            ? "h-3 w-3"
            : size === "lg"
            ? "h-3.5 w-3.5"
            : "h-4 w-4"
        )}
      />
    )}
  </div>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  placeholderUrl?: string;
}

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, placeholderUrl, ...props }, ref) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  return (
    <AvatarPrimitive.Image
      ref={(node) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        imgRef.current = node;
      }}
      className={cn(
        "aspect-square h-full w-full object-cover transition-opacity",
        "opacity-0 data-[state=loaded]:opacity-100", // Corrected typo here
        className
      )}
      onLoadingStatusChange={(status) => {
        if (status === "error" && placeholderUrl && imgRef.current) {
          imgRef.current.src = placeholderUrl;
        }
      }}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  delayMs?: number;
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, delayMs = 600, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    delayMs={delayMs}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-secondary text-secondary-foreground font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, AvatarSize };
