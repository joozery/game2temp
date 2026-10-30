"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, LayoutGrid, List, ShieldCheck, ShoppingBag, SearchX, Zap } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { GamesHero } from "@/components/games/games-hero";
import { SearchBox } from "@/components/games/search-box";
import { accountGames, accounts, type GameAccount } from "@/lib/accounts";
import { cn } from "@/lib/utils";
import { AccountCard } from "./account-card";
import { AccountDialog } from "./account-dialog";

type Sort = "popular" | "price-asc" | "price-desc";
const sorts: { value: Sort; label: string }[] = [
  { value: "popular", label: "ยอดนิยม" },
  { value: "price-asc", label: "ราคาต่ำสุด" },
  { value: "price-desc", label: "ราคาสูงสุด" },
];

const pills = [
  { icon: BadgeCheck, label: "ตรวจสอบทุกไอดี", tone: "text-success" },
  { icon: ShieldCheck, label: "รับประกันหลังการขาย", tone: "text-amber-500" },
  { icon: Zap, label: "ส่งมอบทันที", tone: "text-ink" },
];

export function AccountsPage() {
  const [game, setGame] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [list, setList] = useState(false);
  const [active, setActive] = useState<GameAccount | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = accounts.filter((a) => (game === "all" || a.game === game) && (!q || `${a.title} ${a.detail} ${a.gameName}`.toLowerCase().includes(q)));
    const by: Record<Sort, (a: GameAccount, b: GameAccount) => number> = {
      popular: (a, b) => Number(b.tag === "HOT") - Number(a.tag === "HOT"),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
    };
    return result.sort(by[sort]);
  }, [game, query, sort]);

  const tabs = [{ id: "all", name: "ทั้งหมด" }, ...accountGames];

  return (
    <AccountShell
      wide
      hero={<GamesHero title="ซื้อไอดี" accent="เกม" subtitle="ไอดีคุณภาพ ตรวจสอบแล้ว ปลอดภัย ไม่โดนแบน" pills={pills} bubble={["ไอดีแรงค์สูง สกินครบ", "รับประกันหลังการขาย"]} />}
    >
      <nav aria-label="เลือกเกม" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const count = t.id === "all" ? accounts.length : accounts.filter((a) => a.game === t.id).length;
          return (
            <button
              key={t.id}
              onClick={() => setGame(t.id)}
              aria-pressed={game === t.id}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                game === t.id ? "border-primary bg-primary text-ink shadow-sm" : "border-border bg-card"
              )}
            >
              {t.name} <span className="rounded-full bg-black/5 px-1.5 text-[11px]">{count}</span>
            </button>
          );
        })}
      </nav>

      <section aria-label="รายการไอดีเกม">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-ink"><ShoppingBag className="size-6" /></span>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-extrabold">ไอดีเกมทั้งหมด <span className="text-muted-foreground">({visible.length})</span></h2>
            <p className="text-xs text-muted-foreground sm:text-sm">เลือกไอดีที่ถูกใจ ชำระเงินแล้วรับข้อมูลทันที</p>
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
          <ul className={cn("grid gap-4", list ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5")}>
            {visible.map((a) => <li key={a.id}><AccountCard account={a} list={list} onOpen={() => setActive(a)} /></li>)}
          </ul>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">
            <SearchX className="size-12 text-border" />
            <p className="mt-3 text-sm">ไม่พบไอดีที่ตรงกับเงื่อนไข</p>
            <button onClick={() => { setGame("all"); setQuery(""); }} className="mt-3 text-xs font-semibold text-foreground underline underline-offset-4">ล้างตัวกรอง</button>
          </div>
        )}
      </section>

      {active && <AccountDialog account={active} onClose={() => setActive(null)} />}
    </AccountShell>
  );
}
