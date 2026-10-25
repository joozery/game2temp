"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

const bottomSheet =
  "inset-x-0 bottom-0 max-h-[88dvh] w-full rounded-t-3xl pb-[max(1.5rem,env(safe-area-inset-bottom))] data-[state=open]:animate-slide-in-bottom";
const rightDrawer = "inset-y-0 right-0 w-[85vw] max-w-sm data-[state=open]:animate-slide-in-right";

const sideClasses = {
  left: "inset-y-0 left-0 w-[85vw] max-w-sm data-[state=open]:animate-slide-in-left",
  right: rightDrawer,
  bottom: bottomSheet,
  auto: cn(
    bottomSheet,
    "lg:inset-x-auto lg:inset-y-0 lg:right-0 lg:max-h-none lg:w-[85vw] lg:max-w-sm lg:rounded-none lg:pb-6 lg:data-[state=open]:animate-slide-in-right"
  ),
};

function SheetContent({
  side = "right",
  className,
  children,
  hideClose = false,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  /** "auto" is a bottom sheet on phones/tablets and a right-hand drawer from `lg` up. */
  side?: "left" | "right" | "bottom" | "auto";
  hideClose?: boolean;
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
      <SheetPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col bg-card shadow-2xl outline-none",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {(side === "bottom" || side === "auto") && (
          <span aria-hidden className={cn("mx-auto -mt-2 mb-3 h-1.5 w-10 shrink-0 rounded-full bg-border", side === "auto" && "lg:hidden")} />
        )}
        {children}
        {!hideClose && (
          <SheetPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <X className="size-5" />
            <span className="sr-only">ปิด</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription };
