"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, Zap } from "lucide-react";
import { saving, type Plan, type PremiumApp } from "@/lib/premium-apps";
import { cn } from "@/lib/utils";

export function PremiumCard({ app, list, onBuy }: { app: PremiumApp; list: boolean; onBuy: (plan: Plan) => void }) {
  const [plan, setPlan] = useState(app.plans[0]);
  const save = saving(app, plan);

  return (
    <article className={cn("group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg", list && "flex")}>
      <div className={cn("relative overflow-hidden bg-section", list ? "w-40 shrink-0 sm:w-56" : "aspect-[3/2]")}>
        <Image src={`/images/premium/${app.id}.webp`} alt={`ภาพสินค้า ${app.name}`} fill sizes="(min-width: 1536px) 20vw, (min-width: 768px) 30vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {app.badge && (
          <span className={cn("absolute left-2 top-2 rounded-md px-2 py-0.5 text-[11px] font-bold text-white", app.badge === "ใหม่" ? "bg-success" : "bg-coral")}>{app.badge}</span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <p className="text-[11px] font-medium text-muted-foreground">{app.category}</p>
        <h3 className="truncate font-bold">{app.name}</h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">{app.tagline}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-medium">
          <span className="inline-flex items-center gap-1 rounded-md bg-mint/30 px-1.5 py-0.5"><BadgeCheck className="size-3 text-success" /> {app.access}</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-section px-1.5 py-0.5"><Zap className="size-3" /> ภายใน 5 นาที</span>
        </div>

        <div role="radiogroup" aria-label={`ระยะเวลา ${app.name}`} className="mt-3 grid grid-cols-3 gap-1.5">
          {app.plans.map((p) => (
            <button
              key={p.months}
              role="radio"
              aria-checked={p.months === plan.months}
              onClick={() => setPlan(p)}
              className={cn(
                "rounded-lg border px-1 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                p.months === plan.months ? "border-primary bg-primary text-ink" : "border-border bg-muted/50 text-muted-foreground hover:border-primary/60"
              )}
            >
              {p.months} เดือน
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              ราคา {plan.months} เดือน {save > 0 && <span className="rounded bg-coral/10 px-1 font-semibold text-coral">ประหยัด {save}%</span>}
            </p>
            <p className="text-xl font-bold leading-tight"><span className="mr-0.5 text-sm">฿</span>{plan.price.toLocaleString("th-TH")}</p>
          </div>
          <button onClick={() => onBuy(plan)} className="h-9 rounded-lg bg-primary px-4 text-sm font-bold text-ink transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            ซื้อเลย
          </button>
        </div>
      </div>
    </article>
  );
}
