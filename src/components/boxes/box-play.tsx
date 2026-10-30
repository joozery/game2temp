"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, Gift, PartyPopper, RotateCcw, SkipForward, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { drawPrize, rarityOf, type MysteryBox, type Prize } from "@/lib/boxes";
import { cn } from "@/lib/utils";
import { PrizeImage } from "./prize-image";
import { rarityStyle } from "./rarity";

type Phase = "idle" | "spinning" | "won";

const ITEM = 120; // reel tile width in px
const GAP = 8;
const REEL_LENGTH = 48;
const WIN_INDEX = 40;
const SPIN_SECONDS = 5.5;

function ReelTile({ prize }: { prize: Prize }) {
  const r = rarityStyle[rarityOf(prize)];
  return (
    <div className={cn("flex shrink-0 flex-col items-center rounded-xl border-2 p-2 text-center", r.tile)} style={{ width: ITEM, height: 152 }}>
      <PrizeImage image={prize.image} name={prize.name} />
      <p className="mt-2 line-clamp-2 text-[11px] font-semibold leading-tight">{prize.name}</p>
      <p className="mt-auto text-[10px] text-muted-foreground">฿{prize.value.toLocaleString()}</p>
    </div>
  );
}

/** A long strip of random prizes with the real result planted near the end. */
function buildReel(box: MysteryBox, winner: Prize) {
  const reel = Array.from({ length: REEL_LENGTH }, () => drawPrize(box));
  reel[WIN_INDEX] = winner;
  return reel;
}

export function BoxPlay({ box }: { box: MysteryBox }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [prize, setPrize] = useState<Prize | null>(null);
  const [reel, setReel] = useState<Prize[]>([]);
  const [target, setTarget] = useState(0);
  const [round, setRound] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);

  const values = box.prizes.map((p) => p.value);
  const rarest = box.prizes.reduce((a, b) => (a.odds < b.odds ? a : b));

  const start = () => {
    const winner = drawPrize(box);
    const width = viewport.current?.offsetWidth ?? 800;
    // Land somewhere inside the winning tile rather than always dead-centre.
    const jitter = (Math.random() - 0.5) * ITEM * 0.6;
    setReel(buildReel(box, winner));
    setTarget(-(WIN_INDEX * (ITEM + GAP) + ITEM / 2 - width / 2 + jitter));
    setPrize(winner);
    setRound((n) => n + 1);
    setPhase("spinning");
  };

  const reset = () => { setPhase("idle"); setPrize(null); };
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <nav aria-label="เส้นทาง" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/boxes" className="transition hover:text-foreground">กล่องสุ่ม</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{box.name}</span>
      </nav>

      <section className="grid gap-5 rounded-2xl border border-border bg-card p-4 sm:p-5 md:grid-cols-[340px_minmax(0,1fr)]">
        <div className="relative aspect-[1.5] overflow-hidden rounded-xl bg-[#140b24]">
          <Image src="/images/mystery-box.png" alt={box.name} fill priority sizes="340px" style={{ filter: `hue-rotate(${box.hue}deg)` }} className="object-cover object-right" />
        </div>
        <div className="flex flex-col justify-center">
          <span className={cn("w-fit rounded-md px-2 py-0.5 text-[11px] font-bold", box.accent)}>{box.name}</span>
          <h1 className="mt-2 text-3xl font-extrabold">{box.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{box.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs">
            <li className="rounded-lg bg-muted px-3 py-1.5">รางวัลมูลค่า ฿{Math.min(...values).toLocaleString()} – ฿{Math.max(...values).toLocaleString()}</li>
            <li className="rounded-lg bg-muted px-3 py-1.5">{box.prizes.length} รางวัลในกล่อง</li>
            <li className="rounded-lg bg-amber-100 px-3 py-1.5 text-amber-700">รางวัลใหญ่ {rarest.name} ({rarest.odds}%)</li>
          </ul>
          <p className="mt-4 text-3xl font-extrabold"><span className="mr-1 text-lg">฿</span>{box.price.toLocaleString()}</p>
        </div>
      </section>

      {/* Mini-game stage */}
      <section aria-live="polite" className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        {phase === "idle" && (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-primary text-ink"><Gift className="size-8" /></span>
            <h2 className="mt-3 text-xl font-extrabold">พร้อมลุ้นรางวัลหรือยัง?</h2>
            <p className="mt-1 text-sm text-muted-foreground">กดเปิดกล่อง แล้วดูว่าแถบรางวัลจะหยุดที่อะไร</p>
            <Button size="lg" className="mt-5 min-w-64" onClick={start}><Sparkles /> เปิดกล่อง ฿{box.price.toLocaleString()}</Button>
          </div>
        )}

        {phase === "spinning" && (
          <div>
            <p className="mb-3 text-center text-sm font-medium">กำลังสุ่มรางวัล...</p>
            <div ref={viewport} className="relative overflow-hidden rounded-xl bg-ink py-4">
              <motion.div
                key={round}
                className="flex"
                style={{ gap: GAP, paddingLeft: GAP }}
                initial={{ x: 0 }}
                animate={{ x: target }}
                transition={{ duration: reduceMotion ? 0.2 : SPIN_SECONDS, ease: [0.1, 0.75, 0.15, 1] }}
                onAnimationComplete={() => setPhase("won")}
              >
                {reel.map((p, i) => <ReelTile key={i} prize={p} />)}
              </motion.div>
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary shadow-[0_0_12px_var(--primary)]" />
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 size-0 -translate-x-1/2 border-x-8 border-t-[10px] border-x-transparent border-t-primary" />
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
              <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
            </div>
            <Button variant="ghost" size="sm" className="mx-auto mt-3 flex" onClick={() => setPhase("won")}><SkipForward /> ข้าม</Button>
          </div>
        )}

        {phase === "won" && prize && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="py-2 text-center" role="status">
            <PartyPopper className="mx-auto size-10 text-amber-500" />
            <p className="mt-2 text-sm text-muted-foreground">ยินดีด้วย! คุณได้รับ</p>
            <div className={cn("mx-auto mt-3 flex w-fit flex-col items-center rounded-2xl border-2 px-10 py-5 shadow-lg", rarityStyle[rarityOf(prize)].tile)}>
              <PrizeImage image={prize.image} name={prize.name} className="size-24" />
              <p className="mt-3 text-xl font-extrabold">{prize.name}</p>
              <p className="text-sm text-muted-foreground">มูลค่า ฿{prize.value.toLocaleString()}{prize.value >= box.price ? " · คุ้มกว่าราคากล่อง" : ""}</p>
              <p className={cn("mt-1 text-xs font-bold", rarityStyle[rarityOf(prize)].text)}>{rarityStyle[rarityOf(prize)].label} · โอกาส {prize.odds}%</p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">ตัวอย่าง UI — ยังไม่มีการหักเงินหรือส่งรางวัลจริง</p>
            <div className="mt-4 flex justify-center gap-2">
              <Button variant="outline" asChild><Link href="/boxes">เลือกกล่องอื่น</Link></Button>
              <Button onClick={reset}><RotateCcw /> เปิดอีกครั้ง</Button>
            </div>
          </motion.div>
        )}
      </section>

      <section aria-label="ของรางวัลในกล่อง">
        <h2 className="mb-3 text-lg font-extrabold">ของรางวัลในกล่องนี้</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {box.prizes.map((p) => {
            const r = rarityStyle[rarityOf(p)];
            return (
              <li key={p.name} className={cn("flex flex-col items-center rounded-xl border-2 p-3 text-center", r.tile)}>
                <PrizeImage image={p.image} name={p.name} className="size-20" />
                <p className="mt-2 line-clamp-2 min-h-8 text-xs font-semibold leading-tight">{p.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">฿{p.value.toLocaleString()}</p>
                <p className={cn("mt-1 text-[11px] font-bold", r.text)}>{r.label} · {p.odds}%</p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
