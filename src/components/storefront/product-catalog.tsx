"use client";

import { useState } from "react";
import { ArrowRight, Crown, Flame, ShoppingCart } from "lucide-react";
import { games, type Game } from "@/lib/games";
import { ChipGroup } from "@/components/ui/toggle-group";
import { TopupDialog } from "@/components/topup-dialog";
import { Artwork } from "./artwork";
import { SectionHeading } from "./section-heading";
import { DigitalProducts } from "./digital-products";

export type CartItem = { name: string; price: number };

const gameFilters: Record<string, Game["category"] | null> = {
  ทั้งหมด: null,
  Mobile: "mobile",
  PC: "pc",
  "Game Card": "card",
};

const accounts = [
  { game: "rov", title: "ไอดี RoV", detail: "Rank Conqueror | สกิน 120+", price: 1290, tag: "HOT" },
  { game: "genshin", title: "ไอดี Genshin Impact", detail: "AR 60 | ตัวละคร 5★ ครบ", price: 2490, tag: "NEW" },
  { game: "freefire", title: "ไอดี Free Fire", detail: "ชุดหายาก | เพชรสุดคุ้ม", price: 1990, tag: "HOT" },
  { game: "valorant", title: "ไอดี Valorant", detail: "Rank Immortal | สกินครบ", price: 2990 },
  { game: "pubgm", title: "ไอดี PUBG Mobile", detail: "สกินระดับพรีเมียม", price: 1590 },
];

const matches = (name: string, query: string) => name.toLowerCase().includes(query.trim().toLowerCase());
const minPrice = (game: Game) => Math.min(...game.packages.map((p) => p.price));

function Empty() {
  return (
    <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
      ไม่พบสินค้าที่ค้นหา ลองเปลี่ยนหมวดหรือคำค้นหา
    </p>
  );
}

export { PopularGames } from "./popular-games";

export function ProductCatalog({ query, onAdd }: { query: string; onAdd: (item: CartItem) => void }) {
  const [gameFilter, setGameFilter] = useState("ทั้งหมด");
  const [accountFilter, setAccountFilter] = useState("ทั้งหมด");
  const [active, setActive] = useState<Game | null>(null);

  const filteredGames = games.filter(
    (g) => (!gameFilters[gameFilter] || g.category === gameFilters[gameFilter]) && matches(g.name, query)
  );
  const filteredAccounts = accounts.filter(
    (a) => (accountFilter === "ทั้งหมด" || a.title.endsWith(accountFilter)) && matches(a.title, query)
  );


  return (
    <>
      <section id="games">
        <SectionHeading title="เกมยอดนิยมสำหรับเติมเงิน" icon={Flame}>
          <ChipGroup label="กรองหมวดเกม" options={Object.keys(gameFilters)} value={gameFilter} onValueChange={setGameFilter} />
        </SectionHeading>
        {filteredGames.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredGames.map((game) => (
              <button
                key={game.id}
                onClick={() => setActive(game)}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Artwork name={game.id} />
                  {game.hot && (
                    <span className="absolute left-3 top-3 rounded-md bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">HOT</span>
                  )}
                </div>
                <div className="flex items-end justify-between gap-2 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{game.name}</h3>
                    <p className="text-xs text-muted-foreground">{game.publisher}</p>
                    <p className="mt-2 text-sm">
                      เริ่มต้น <b>฿{minPrice(game).toLocaleString()}</b>
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-ink transition group-hover:bg-ink group-hover:text-primary">
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </section>

      <section id="accounts">
        <SectionHeading title="ไอดีเกมแนะนำ" icon={Crown} href="#accounts">
          <ChipGroup
            label="กรองไอดีเกม"
            options={["ทั้งหมด", "RoV", "Free Fire", "Genshin Impact", "Valorant"]}
            value={accountFilter}
            onValueChange={setAccountFilter}
          />
        </SectionHeading>
        {filteredAccounts.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {filteredAccounts.map((a) => (
              <article key={a.title} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Artwork name={a.game} />
                  {a.tag && (
                    <span
                      className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-bold text-white ${a.tag === "NEW" ? "bg-sky-500" : "bg-rose-500"}`}
                    >
                      {a.tag}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="truncate font-semibold">{a.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <strong className="text-lg">฿{a.price.toLocaleString()}</strong>
                    <button
                      aria-label={`เพิ่ม ${a.title} ลงตะกร้า`}
                      onClick={() => onAdd({ name: a.title, price: a.price })}
                      className="grid size-9 place-items-center rounded-xl bg-primary text-ink transition hover:bg-ink hover:text-primary"
                    >
                      <ShoppingCart className="size-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </section>

      <DigitalProducts query={query} onAdd={onAdd} />

      {active && (
        <TopupDialog key={active.id} game={active} open onOpenChange={(open) => !open && setActive(null)} />
      )}
    </>
  );
}
