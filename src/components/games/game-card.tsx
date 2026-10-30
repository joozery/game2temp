import { ArrowRight, CheckCircle2, Flame, Sparkles } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import type { CatalogGame } from "@/lib/game-catalog";
import { cn } from "@/lib/utils";

const badgeStyle = { "ยอดนิยม": "bg-coral", "มาแรง": "bg-amber-500", "ใหม่": "bg-success" } as const;

export function GameCard({ game, list, onOpen }: { game: CatalogGame; list: boolean; onOpen: () => void }) {
  const isCard = game.category === "card";
  const Icon = game.badge === "ยอดนิยม" ? Flame : Sparkles;

  return (
    <article className={cn("group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg", list && "flex")}>
      <div className={cn("relative overflow-hidden", list ? "w-40 shrink-0 sm:w-56" : "aspect-[1.4]")}>
        <Artwork name={game.id} />
        {game.badge && (
          <span className={cn("absolute left-2 top-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold text-white", badgeStyle[game.badge])}>
            <Icon className="size-3" /> {game.badge}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <h3 className="truncate font-bold">{game.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{game.desc}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-medium">
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground">{game.platform}</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-success/15 px-1.5 py-0.5 text-success"><CheckCircle2 className="size-3" /> พร้อมเติมทันที</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">เริ่มต้น <b className="text-sm text-foreground">฿{game.fromPrice.toLocaleString()}</b></p>
        <button
          onClick={onOpen}
          className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-ink transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isCard ? "เติมเงิน" : "เติมเกม"} <ArrowRight className="size-4" />
        </button>
      </div>
    </article>
  );
}
