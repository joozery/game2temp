"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { ChipGroup } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import type { CartItem } from "./product-catalog";

type Plan = { months: number; price: number };
type PremiumApp = {
  id: string;
  name: string;
  tagline: string;
  category: "ดูหนัง & ซีรีส์" | "ฟังเพลง" | "AI & ทำงาน";
  access: "บัญชีส่วนตัว" | "จอแชร์";
  badge?: "ขายดี" | "ใหม่";
  plans: Plan[];
};

// Sample prices until the real price list arrives.
const apps: PremiumApp[] = [
  { id: "netflix", name: "Netflix Premium", tagline: "4K Ultra HD ดูได้ทุกอุปกรณ์", category: "ดูหนัง & ซีรีส์", access: "จอแชร์", badge: "ขายดี", plans: [{ months: 1, price: 99 }, { months: 3, price: 279 }, { months: 12, price: 990 }] },
  { id: "youtube", name: "YouTube Premium", tagline: "ไม่มีโฆษณา เล่นเบื้องหลังได้", category: "ดูหนัง & ซีรีส์", access: "บัญชีส่วนตัว", badge: "ขายดี", plans: [{ months: 1, price: 59 }, { months: 3, price: 169 }, { months: 12, price: 590 }] },
  { id: "disney", name: "Disney+ Hotstar", tagline: "Marvel, Pixar, Star Wars ครบ", category: "ดูหนัง & ซีรีส์", access: "จอแชร์", plans: [{ months: 1, price: 79 }, { months: 3, price: 219 }, { months: 12, price: 790 }] },
  { id: "prime", name: "Prime Video", tagline: "ซีรีส์ออริจินัล พากย์ไทย", category: "ดูหนัง & ซีรีส์", access: "จอแชร์", plans: [{ months: 1, price: 69 }, { months: 3, price: 189 }] },
  { id: "spotify", name: "Spotify Premium", tagline: "ฟังเพลงไม่มีโฆษณา ดาวน์โหลดได้", category: "ฟังเพลง", access: "บัญชีส่วนตัว", badge: "ขายดี", plans: [{ months: 1, price: 69 }, { months: 3, price: 199 }, { months: 12, price: 690 }] },
  { id: "apple-music", name: "Apple Music", tagline: "เสียง Lossless และ Spatial Audio", category: "ฟังเพลง", access: "บัญชีส่วนตัว", plans: [{ months: 1, price: 59 }, { months: 3, price: 169 }] },
  { id: "chatgpt", name: "ChatGPT Plus", tagline: "ใช้งานโมเดลล่าสุด เร็วกว่าเดิม", category: "AI & ทำงาน", access: "บัญชีส่วนตัว", badge: "ใหม่", plans: [{ months: 1, price: 590 }, { months: 3, price: 1690 }] },
  { id: "canva", name: "Canva Pro", tagline: "เทมเพลตพรีเมียม ลบพื้นหลังได้", category: "AI & ทำงาน", access: "บัญชีส่วนตัว", plans: [{ months: 1, price: 59 }, { months: 12, price: 390 }] },
  { id: "capcut", name: "CapCut Pro", tagline: "ตัดต่อวิดีโอ เอฟเฟกต์ครบ ไม่มีลายน้ำ", category: "AI & ทำงาน", access: "บัญชีส่วนตัว", plans: [{ months: 1, price: 129 }, { months: 12, price: 990 }] },
];

const filters = ["ทั้งหมด", "ดูหนัง & ซีรีส์", "ฟังเพลง", "AI & ทำงาน"];

/** Percent saved against buying the shortest plan repeatedly. */
function saving(app: PremiumApp, plan: Plan) {
  const base = app.plans[0];
  const full = (base.price / base.months) * plan.months;
  return Math.round((1 - plan.price / full) * 100);
}

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
          onClick={() => onAdd({ name: `${app.name} ${plan.months} เดือน`, price: plan.price })}
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
      <SectionHeading title="แอปพรีเมียม" subtitle="ดูหนัง ฟังเพลง ใช้ AI ราคาคุ้ม รับประกันตลอดอายุ" icon={Sparkles}>
        <ChipGroup label="กรองแอปพรีเมียม" options={filters} value={filter} onValueChange={setFilter} />
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
