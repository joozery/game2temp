"use client";

import { useState } from "react";
import { BadgePercent, Gift, Megaphone, SearchX, Ticket, Zap } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { GamesHero } from "@/components/games/games-hero";
import { coupons, promoCategories, promotions } from "@/lib/promotions";
import { cn } from "@/lib/utils";
import { CouponCard } from "./coupon-card";
import { PromoCard } from "./promo-card";

const pills = [
  { icon: BadgePercent, label: "ลดสูงสุด 20%", tone: "text-coral" },
  { icon: Gift, label: "โบนัสและของแถม", tone: "text-amber-500" },
  { icon: Zap, label: "อัปเดตทุกสัปดาห์", tone: "text-ink" },
];

export function PromotionsPage() {
  const [category, setCategory] = useState("all");
  const visible = promotions.filter((p) => category === "all" || p.category === category);

  return (
    <AccountShell
      wide
      hero={<GamesHero title="โปร" accent="โมชั่น" subtitle="ดีลพิเศษ ส่วนลด และโค้ดสุดคุ้ม อัปเดตทุกสัปดาห์" pills={pills} bubble={["เติมเยอะ ยิ่งคุ้ม", "ลดสูงสุด 20%"]} />}
    >
      <section aria-label="โค้ดส่วนลด">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-ink"><Ticket className="size-6" /></span>
          <div>
            <h2 className="text-xl font-extrabold">โค้ดส่วนลด</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">คัดลอกโค้ดแล้วนำไปใช้ตอนชำระเงิน</p>
          </div>
        </div>
        <ul className="grid gap-4 lg:grid-cols-2 min-[1380px]:grid-cols-3">
          {coupons.map((c) => <CouponCard key={c.code} coupon={c} />)}
        </ul>
      </section>

      <section aria-label="โปรโมชั่นทั้งหมด">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-coral text-white"><Megaphone className="size-6" /></span>
          <div>
            <h2 className="text-xl font-extrabold">โปรโมชั่นทั้งหมด <span className="text-muted-foreground">({visible.length})</span></h2>
            <p className="text-xs text-muted-foreground sm:text-sm">เลือกดูโปรโมชั่นตามประเภทสินค้า</p>
          </div>
        </div>

        <nav aria-label="ประเภทโปรโมชั่น" className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
          {["all", ...promoCategories].map((c) => {
            const count = c === "all" ? promotions.length : promotions.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  category === c ? "border-primary bg-primary text-ink shadow-sm" : "border-border bg-card"
                )}
              >
                {c === "all" ? "ทั้งหมด" : c} <span className="rounded-full bg-black/5 px-1.5 text-[11px]">{count}</span>
              </button>
            );
          })}
        </nav>

        {visible.length ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visible.map((p) => <li key={p.id}><PromoCard promo={p} /></li>)}
          </ul>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">
            <SearchX className="size-12 text-border" />
            <p className="mt-3 text-sm">ยังไม่มีโปรโมชั่นในหมวดนี้</p>
          </div>
        )}
      </section>
    </AccountShell>
  );
}
