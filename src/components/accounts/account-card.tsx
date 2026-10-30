import { ArrowRight, ShieldCheck } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import type { GameAccount } from "@/lib/accounts";
import { cn } from "@/lib/utils";

export function AccountCard({ account: a, list, onOpen }: { account: GameAccount; list: boolean; onOpen: () => void }) {
  return (
    <article className={cn("group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg", list && "flex")}>
      <div className={cn("relative overflow-hidden", list ? "w-40 shrink-0 sm:w-56" : "aspect-[1.5]")}>
        <Artwork name={a.game} />
        {a.tag && (
          <span className={cn("absolute left-2 top-2 rounded-md px-2 py-0.5 text-[11px] font-bold text-white", a.tag === "NEW" ? "bg-success" : "bg-coral")}>{a.tag}</span>
        )}
        {a.stock <= 2 && <span className="absolute bottom-2 right-2 rounded-md bg-ink/80 px-2 py-0.5 text-[10px] font-medium text-white">เหลือ {a.stock} ไอดี</span>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <p className="text-[11px] font-medium text-muted-foreground">{a.gameName}</p>
        <h3 className="truncate font-bold">{a.title}</h3>
        <p className="truncate text-xs text-muted-foreground">{a.detail}</p>
        <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-success"><ShieldCheck className="size-3.5" /> ตรวจสอบแล้ว · รับประกัน 7 วัน</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <strong className="text-lg">฿{a.price.toLocaleString()}</strong>
          <button onClick={onOpen} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-bold text-ink transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            ดูรายละเอียด <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
