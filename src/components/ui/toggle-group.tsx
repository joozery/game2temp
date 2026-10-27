"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

/** Single-select chip filter; never allows deselecting to an empty value. */
function ChipGroup({
  value,
  onValueChange,
  options,
  className,
  label,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  className?: string;
  label: string;
}) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      aria-label={label}
      value={value}
      onValueChange={(v) => v && onValueChange(v)}
      className={cn("no-scrollbar flex gap-1.5 overflow-x-auto", className)}
    >
      {options.map((option) => (
        <ToggleGroupPrimitive.Item
          key={option}
          value={option}
          className="shrink-0 whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-ink"
        >
          {option}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}

export { ChipGroup };
