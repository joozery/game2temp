"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, LayoutGrid, List, SearchX, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { GamesHero } from "@/components/games/games-hero";
import { SearchBox } from "@/components/games/search-box";
import { apps, premiumCategories, type Plan, type PremiumApp } from "@/lib/premium-apps";
import { cn } from "@/lib/utils";
import { PremiumCard } from "./premium-card";
import { PremiumDialog } from "./premium-dialog";

type Sort = "popular" | "price-asc" | "price-desc";
const sorts: { value: Sort; label: string }[] = [
  { value: "popular", label: "ขายดี" },
  { value: "price-asc", label: "ราคาต่ำสุด" },
  { value: "price-desc", label: "ราคาสูงสุด" },
];

const pills = [
  { icon: Zap, label: "ได้รับภายใน 5 นาที", tone: "text-amber-500" },
  { icon: ShieldCheck, label: "รับประกันตลอดอายุ", tone: "text-success" },
  { icon: BadgeCheck, label: "ราคาคุ้มกว่าสมัครเอง", tone: "text-ink" },
];

export function PremiumPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [list, setList] = useState(false);
  const [buying, setBuying] = useState<{ app: PremiumApp; plan: Plan } | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = apps.filter((a) => (category === "all" || a.category === category) && (!q || `${a.name} ${a.tagline}`.toLowerCase().includes(q)));
    const by: Record<Sort, (a: PremiumApp, b: PremiumApp) => number> = {
      popular: (a, b) => Number(b.badge === "ขายดี") - Number(a.badge === "ขายดี"),
      "price-asc": (a, b) => a.plans[0].price - b.plans[0].price,
      "price-desc": (a, b) => b.plans[0].price - a.plans[0].price,
    };
    return result.sort(by[sort]);
  }, [category, query, sort]);

  return (
    <AccountShell
      wide
      hero={<GamesHero title="แอป" accent="พรีเมียม" subtitle="ดูหนัง ฟังเพลง ใช้ AI ราคาคุ้ม รับประกันตลอดอายุ" pills={pills} bubble={["สมัครง่าย ราคาคุ้ม", "ได้รับสิทธิ์ภายใน 5 นาที"]} />}
    >
      <nav aria-label="หมวดแอปพรีเมียม" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {["all", ...premiumCategories].map((c) => {
          const count = c === "all" ? apps.length : apps.filter((a) => a.category === c).length;
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

      <section aria-label="รายการแอปพรีเมียม">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-ink"><Sparkles className="size-6" /></span>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-extrabold">แอปพรีเมียมทั้งหมด <span className="text-muted-foreground">({visible.length})</span></h2>
            <p className="text-xs text-muted-foreground sm:text-sm">เลือกแอปและระยะเวลาที่ต้องการ ชำระเงินแล้วรับสิทธิ์ทันที</p>
          </div>
          <SearchBox value={query} onChange={setQuery} className="w-full sm:w-64" />
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            เรียงตาม:
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {sorts.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </label>
          <div role="group" aria-label="รูปแบบการแสดงผล" className="flex gap-1 rounded-lg border border-border bg-card p-1">
            {[{ v: false, label: "ตาราง", Icon: LayoutGrid }, { v: true, label: "รายการ", Icon: List }].map(({ v, label, Icon }) => (
              <button key={label} aria-label={label} aria-pressed={list === v} onClick={() => setList(v)} className={cn("grid size-8 place-items-center rounded-md transition", list === v ? "bg-primary text-ink" : "text-muted-foreground hover:text-foreground")}>
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>

        {visible.length ? (
          <ul className={cn("grid gap-4", list ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5")}>
            {visible.map((a) => <li key={a.id}><PremiumCard app={a} list={list} onBuy={(plan) => setBuying({ app: a, plan })} /></li>)}
          </ul>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">
            <SearchX className="size-12 text-border" />
            <p className="mt-3 text-sm">ไม่พบแอปที่ตรงกับเงื่อนไข</p>
            <button onClick={() => { setCategory("all"); setQuery(""); }} className="mt-3 text-xs font-semibold text-foreground underline underline-offset-4">ล้างตัวกรอง</button>
          </div>
        )}
      </section>

      {buying && <PremiumDialog app={buying.app} plan={buying.plan} onClose={() => setBuying(null)} />}
    </AccountShell>
  );
}
