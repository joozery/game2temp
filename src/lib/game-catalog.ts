import { CreditCard, Flame, Gamepad2, Gift, LayoutGrid, Monitor, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import { games, type Game } from "./games";

export type CatalogCategory = "all" | "popular" | "mobile" | "pc" | "console" | "card" | "new" | "promo";
export type Badge = "ยอดนิยม" | "มาแรง" | "ใหม่";

export const catalogCategories: { id: CatalogCategory; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "ทั้งหมด", icon: LayoutGrid },
  { id: "popular", label: "เกมยอดนิยม", icon: Flame },
  { id: "mobile", label: "มือถือ", icon: Smartphone },
  { id: "pc", label: "PC", icon: Monitor },
  { id: "console", label: "คอนโซล", icon: Gamepad2 },
  { id: "card", label: "บัตรเติมเงิน", icon: CreditCard },
  { id: "new", label: "เกมใหม่", icon: Sparkles },
  { id: "promo", label: "โปรโมชั่น", icon: Gift },
];

/** Presentation data that the core `games` list doesn't carry. */
const meta: Record<string, { desc: string; badge?: Badge; isNew?: boolean; console?: boolean }> = {
  rov: { desc: "เติมคูปอง RoV ราคาพิเศษ", badge: "ยอดนิยม" },
  freefire: { desc: "เติมเพชร Free Fire ราคาดี", badge: "ยอดนิยม" },
  pubgm: { desc: "เติม UC PUBG Mobile", badge: "ยอดนิยม" },
  genshin: { desc: "เติม Genesis Crystal", badge: "มาแรง" },
  mlbb: { desc: "เติมเพชร Mobile Legends", badge: "ยอดนิยม" },
  ragnarok: { desc: "เติมเพชร Ragnarok Origin", badge: "ใหม่", isNew: true },
  valorant: { desc: "เติม Valorant Points", badge: "มาแรง" },
  lol: { desc: "เติม Riot Points", badge: "ยอดนิยม" },
  steam: { desc: "บัตรเติมเงิน Steam Wallet" },
  truemoney: { desc: "บัตรเติมเงิน TrueMoney" },
  playstation: { desc: "บัตรเติมเงิน PlayStation", badge: "ใหม่", isNew: true, console: true },
};

export type CatalogGame = Game & { desc: string; badge?: Badge; isNew: boolean; isConsole: boolean; hasPromo: boolean; fromPrice: number; platform: string };

export const catalogGames: CatalogGame[] = games.map((g) => {
  const m = meta[g.id] ?? { desc: `เติม ${g.name}` };
  const isConsole = !!m.console;
  return {
    ...g,
    desc: m.desc,
    badge: m.badge,
    isNew: !!m.isNew,
    isConsole,
    hasPromo: g.packages.some((p) => p.bonus),
    fromPrice: Math.min(...g.packages.map((p) => p.price)),
    platform: isConsole ? "คอนโซล" : g.category === "mobile" ? "มือถือ" : g.category === "pc" ? "PC" : "บัตรเติมเงิน",
  };
});

export function inCategory(g: CatalogGame, c: CatalogCategory) {
  switch (c) {
    case "popular": return !!g.hot;
    case "mobile": return g.category === "mobile";
    case "pc": return g.category === "pc";
    case "console": return g.isConsole;
    case "card": return g.category === "card" && !g.isConsole;
    case "new": return g.isNew;
    case "promo": return g.hasPromo;
    default: return true;
  }
}
