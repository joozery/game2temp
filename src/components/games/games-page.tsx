"use client";

import { useMemo, useState } from "react";
import { Gamepad2, LayoutGrid, List, SearchX } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { TopupDialog } from "@/components/topup-dialog";
import { catalogCategories, catalogGames, inCategory, type CatalogCategory, type CatalogGame } from "@/lib/game-catalog";
import { cn } from "@/lib/utils";
import { CategoryTabs } from "./category-tabs";
import { GameCard } from "./game-card";
import { GamesHero } from "./games-hero";
import { SearchBox } from "./search-box";

type Sort = "popular" | "price-asc" | "price-desc" | "name";
const sorts: { value: Sort; label: string }[] = [
  { value: "popular", label: "ยอดนิยม" },
  { value: "price-asc", label: "ราคาต่ำสุด" },
  { value: "price-desc", label: "ราคาสูงสุด" },
  { value: "name", label: "ชื่อ A-Z" },
];

export function GamesPage() {
  const [category, setCategory] = useState<CatalogCategory>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [list, setList] = useState(false);
  const [active, setActive] = useState<CatalogGame | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = catalogGames.filter((g) => inCategory(g, category) && (!q || `${g.name} ${g.desc}`.toLowerCase().includes(q)));
    const by: Record<Sort, (a: CatalogGame, b: CatalogGame) => number> = {
      popular: (a, b) => Number(!!b.hot) - Number(!!a.hot),
      "price-asc": (a, b) => a.fromPrice - b.fromPrice,
      "price-desc": (a, b) => b.fromPrice - a.fromPrice,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return result.sort(by[sort]);
  }, [category, query, sort]);

  const title = catalogCategories.find((c) => c.id === category)!;
  const reset = () => { setCategory("all"); setQuery(""); };

  return (
    <AccountShell wide hero={<GamesHero />}>
      <CategoryTabs active={category} onChange={setCategory} />

      <div>
        <section aria-label="รายการเกม" className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-ink"><Gamepad2 className="size-6" /></span>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold">{category === "all" ? "เกมทั้งหมด" : title.label} <span className="text-muted-foreground">({visible.length})</span></h2>
              <p className="text-xs text-muted-foreground sm:text-sm">เลือกเกมที่ต้องการเติมได้เลย เติมง่าย รับโค้ดทันที</p>
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
            <ul className={cn("grid gap-4", list ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6")}>
              {visible.map((g) => <li key={g.id}><GameCard game={g} list={list} onOpen={() => setActive(g)} /></li>)}
            </ul>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">
              <SearchX className="size-12 text-border" />
              <p className="mt-3 text-sm">ไม่พบเกมที่ตรงกับเงื่อนไข</p>
              <button onClick={reset} className="mt-3 text-xs font-semibold text-foreground underline underline-offset-4">ล้างตัวกรอง</button>
            </div>
          )}
        </section>
      </div>

      {active && <TopupDialog game={active} open onOpenChange={(open) => { if (!open) setActive(null); }} />}
    </AccountShell>
  );
}
