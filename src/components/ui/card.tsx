import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("rounded-2xl border border-border bg-card p-5 sm:p-6", className)} {...props} />;
}

function CardTitle({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-ink"><Icon className="size-[18px]" /></span>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children && <div className="ml-auto">{children}</div>}
    </div>
  );
}

export { Card, CardTitle };
