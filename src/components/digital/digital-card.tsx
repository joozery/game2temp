import { ArrowRight, Flame, Ticket } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import type { DigitalProduct } from "@/lib/digital-products";
import { cn } from "@/lib/utils";

export function DigitalCard({ product: p, list, onOpen }: { product: DigitalProduct; list: boolean; onOpen: () => void }) {
  return (
    <article className={cn("group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg", list && "flex")}>
      <div className={cn("relative overflow-hidden", list ? "w-40 shrink-0 sm:w-56" : "aspect-[1.55]")}>
        <Artwork name={p.id} />
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md border border-white/15 bg-black/20 px-1.5 py-1 text-[9px] font-medium tracking-wider text-white backdrop-blur-sm"><Ticket className="size-3" aria-hidden /> DIGITAL CARD</span>
        {p.hot && <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-coral px-2 py-0.5 text-[11px] font-bold text-white"><Flame className="size-3" /> ยอดนิยม</span>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <p className="text-[11px] font-medium text-muted-foreground">{p.type}</p>
        <h3 className="truncate font-bold">{p.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{p.desc}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-medium">
          {p.amounts.map((a) => <li key={a} className="rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground">฿{a.toLocaleString()}</li>)}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <p className="text-xs text-muted-foreground">เริ่มต้น <b className="text-base text-foreground">฿{p.price.toLocaleString()}</b></p>
          <button onClick={onOpen} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-bold text-ink transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            เลือกมูลค่า <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
