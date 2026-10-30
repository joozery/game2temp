import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, Flame } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import type { Promotion } from "@/lib/promotions";

export function PromoCard({ promo: p }: { promo: Promotion }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg">
      <div className="relative aspect-[1.7] overflow-hidden bg-[#140b24]">
        {p.image.startsWith("/") ? (
          <Image src={p.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <Artwork name={p.image} />
        )}
        <span className="absolute left-2 top-2 rounded-md bg-coral px-2 py-0.5 text-[11px] font-bold text-white">{p.badge}</span>
        {p.hot && <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-amber-500 px-2 py-0.5 text-[11px] font-bold text-ink"><Flame className="size-3" /> HOT</span>}
      </div>
      <div className="p-3.5">
        <p className="text-[11px] font-medium text-muted-foreground">{p.category}</p>
        <h3 className="font-bold leading-snug">{p.title}</h3>
        <p className="mt-1 line-clamp-2 min-h-8 text-xs text-muted-foreground">{p.desc}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-coral"><CalendarClock className="size-3.5" /> {p.until}</p>
        <Link href={p.href} className="mt-3 flex h-9 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-ink transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          รับโปรโมชั่น <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
