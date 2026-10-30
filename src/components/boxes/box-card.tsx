import Image from "next/image";
import Link from "next/link";
import { Gift } from "lucide-react";
import type { MysteryBox } from "@/lib/boxes";
import { cn } from "@/lib/utils";

export function BoxCard({ box }: { box: MysteryBox }) {
  const values = box.prizes.map((p) => p.value);
  const best = box.prizes.reduce((a, b) => (a.odds < b.odds ? a : b));

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg">
      <div className="relative aspect-[1.5] overflow-hidden bg-[#140b24]">
        <Image
          src="/images/mystery-box.png"
          alt={`${box.name} กล่องสุ่ม`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          style={{ filter: `hue-rotate(${box.hue}deg)` }}
          className="object-cover object-right transition-transform duration-500 group-hover:scale-105"
        />
        <span className={cn("absolute left-2 top-2 rounded-md px-2 py-0.5 text-[11px] font-bold", box.accent)}>{box.name}</span>
      </div>
      <div className="p-3.5">
        <h3 className="font-bold">{box.name}</h3>
        <p className="mt-0.5 line-clamp-2 min-h-8 text-xs text-muted-foreground">{box.tagline}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Gift className="size-3.5 text-coral" /> รางวัลมูลค่า ฿{Math.min(...values).toLocaleString()} – ฿{Math.max(...values).toLocaleString()}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">รางวัลใหญ่: {best.name} ({best.odds}%)</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xl font-bold"><span className="mr-0.5 text-sm">฿</span>{box.price.toLocaleString()}</p>
          <Link href={`/boxes/${box.id}`} className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-bold text-ink transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            เปิดกล่อง
          </Link>
        </div>
      </div>
    </article>
  );
}
