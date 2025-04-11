"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const dialogOverlayVariants = cva(
  "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm",
  {
    variants: {
      opacity: {
        light: "bg-black/40",
        medium: "bg-black/60",
        heavy: "bg-black/80",
      },
    },
    defaultVariants: {
      opacity: "medium",
    },
  }
);

interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof dialogOverlayVariants> {}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, opacity, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(dialogOverlayVariants({ opacity }), className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg bg-popover",
  {
    variants: {
      size: {
        sm: "max-w-sm p-4",
        default: "max-w-lg p-6",
        lg: "max-w-2xl p-6",
        xl: "max-w-4xl p-8",
        full: "max-w-[calc(100%-2rem)] h-[calc(100%-2rem)] p-6",
      },
      position: {
        center: "",
        top: "top-[10%] translate-y-0",
        bottom: "top-auto bottom-[10%] translate-y-0",
      },
      noPadding: {
        true: "p-0",
      },
    },
    defaultVariants: {
      size: "default",
      position: "center",
    },
    compoundVariants: [
      {
        noPadding: true,
        class: "p-0",
      },
    ],
  }
);

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean;
  overlayProps?: DialogOverlayProps;
  closeIcon?: React.ReactNode;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size,
      position,
      noPadding,
      showCloseButton = true,
      overlayProps,
      closeIcon,
      ...props
    },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay {...overlayProps} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          dialogContentVariants({ size, position, noPadding }),
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1.5 bg-muted/80 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            {closeIcon || <X className="h-4 w-4" />}
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const dialogTitleVariants = cva("leading-none tracking-tight", {
  variants: {
    size: {
      default: "text-lg font-semibold",
      lg: "text-xl font-semibold",
      xl: "text-2xl font-bold",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
    VariantProps<typeof dialogTitleVariants> {}

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, size, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleVariants({ size }), className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1.5", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
