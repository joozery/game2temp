"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { apps, premiumCategories, saving, type PremiumApp } from "@/lib/premium-apps";
import { ChipGroup } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import type { CartItem } from "./product-catalog";

function PremiumAppCard({ app, onAdd }: { app: PremiumApp; onAdd: (item: CartItem) => void }) {
  const [plan, setPlan] = useState(app.plans[0]);
  const save = saving(app, plan);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-xl bg-section">
        <Image
          src={`/images/premium/${app.id}.webp`}
          alt={`ภาพสินค้า ${app.name}`}
          fill
          sizes="(min-width: 1536px) 22vw, (min-width: 1280px) 29vw, (min-width: 640px) 44vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold leading-tight">{app.name}</h3>
            {app.badge && (
              <span className={cn("shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold", app.badge === "ใหม่" ? "bg-success text-white" : "bg-coral text-white")}>
                {app.badge}
              </span>
            )}
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{app.tagline}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-mint/30 px-2 py-0.5 font-medium text-ink">
          <BadgeCheck className="size-3 text-success" /> {app.access}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-section px-2 py-0.5 font-medium text-ink">
          <Zap className="size-3" /> ได้รับภายใน 5 นาที
        </span>
      </div>

      <div role="radiogroup" aria-label={`ระยะเวลา ${app.name}`} className="mt-4 grid grid-cols-3 gap-1.5">
        {app.plans.map((p) => {
          const selected = p.months === plan.months;
          return (
            <button
              key={p.months}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setPlan(p)}
              className={cn(
                "rounded-lg border px-2 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected ? "border-primary bg-primary text-ink" : "border-border bg-muted/50 text-muted-foreground hover:border-primary/60 hover:text-foreground"
              )}
            >
              {p.months} เดือน
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex items-end justify-between gap-2 pt-4">
        <div>
          <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            ราคา {plan.months} เดือน
            {save > 0 && <span className="rounded bg-coral/10 px-1 font-semibold text-coral">ประหยัด {save}%</span>}
          </p>
          <p className="mt-0.5 text-xl font-semibold leading-none tracking-tight">
            <span className="mr-0.5 text-sm">฿</span>{plan.price.toLocaleString("th-TH")}
          </p>
        </div>
        <button
          type="button"
          aria-label={`เพิ่ม ${app.name} ${plan.months} เดือน ลงตะกร้า`}
          onClick={() => onAdd({ name: `${app.name} ${plan.months} เดือน`, price: plan.price, art: app.id })}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-ink transition hover:bg-coral hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ShoppingCart className="size-4" />
        </button>
      </div>
    </article>
  );
}

export function PremiumApps({ query, onAdd }: { query: string; onAdd: (item: CartItem) => void }) {
  const [filter, setFilter] = useState("ทั้งหมด");
  const items = apps.filter(
    (app) => (filter === "ทั้งหมด" || app.category === filter) && app.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section id="premium">
      <SectionHeading title="แอปพรีเมียม" subtitle="ดูหนัง ฟังเพลง ใช้ AI ราคาคุ้ม รับประกันตลอดอายุ" icon={Sparkles} href="/premium">
        <ChipGroup label="กรองแอปพรีเมียม" options={["ทั้งหมด", ...premiumCategories]} value={filter} onValueChange={setFilter} />
      </SectionHeading>
      {items.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((app) => <PremiumAppCard key={app.id} app={app} onAdd={onAdd} />)}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">ไม่พบแอปที่ค้นหา ลองเปลี่ยนหมวดหรือคำค้นหา</p>
      )}
    </section>
  );
}
