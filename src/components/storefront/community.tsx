"use client";

import { useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Newspaper, Star } from "lucide-react";
import { Artwork } from "./artwork";
import { SectionHeading } from "./section-heading";
import { TopupSteps } from "./topup-steps";

const news = [
  { art: "genshin", tag: "อัปเดต", title: "Genshin Impact เวอร์ชันใหม่ ตัวละครใหม่และกิจกรรมพิเศษ", date: "25 ต.ค. 2026" },
  { art: "freefire", tag: "กิจกรรม", title: "Free Fire ลุ้นรับรางวัลเด็ดและไอเทมพิเศษตลอดเดือน", date: "22 ต.ค. 2026" },
  { art: "rov", tag: "สกินใหม่", title: "RoV สกินคอลเล็กชันใหม่ สกินไหนโดนใจเกมเมอร์", date: "20 ต.ค. 2026" },
];

const reviews = [
  { name: "Nattapong S.", text: "เติมไวมากครับ ได้ทันที ใช้งานง่าย ปลอดภัยแน่นอน", game: "RoV" },
  { name: "Pimchanok K.", text: "ราคาถูกกว่าในเกมจริง โบนัสเยอะ แอดมินตอบไวมาก", game: "Genshin Impact" },
  { name: "Thanawat P.", text: "ซื้อไอดีไปแล้วสองตัว ได้ตามที่ลงไว้ทุกอย่าง แนะนำเลย", game: "Valorant" },
];

export function Community() {
  const [review, setReview] = useState(0);
  const current = reviews[review];
  const step = (d: number) => setReview((r) => (r + d + reviews.length) % reviews.length);

  return (
    <>
      <TopupSteps />

      <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
        <section id="news">
          <SectionHeading title="ข่าวสาร และบทความ" icon={Newspaper} href="#news" />
          <div className="grid gap-4 sm:grid-cols-3">
            {news.map((n) => (
              <article key={n.title} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-[16/9] overflow-hidden">
                  <Artwork name={n.art} />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold text-amber-600">{n.tag}</span>
                  <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug">{n.title}</h3>
                  <time className="mt-2 block text-xs text-muted-foreground">{n.date}</time>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="reviews">
          <SectionHeading title="รีวิวจากลูกค้า" icon={BadgeCheck} />
          <div className="flex h-[calc(100%-4.25rem)] min-h-56 flex-col rounded-2xl bg-ink p-6 text-white">
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 flex-1 text-lg leading-relaxed">“{current.text}”</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-primary font-bold text-ink">
                {current.name[0]}
              </span>
              <div>
                <p className="text-sm font-semibold">{current.name}</p>
                <p className="text-xs text-white/50">เติม {current.game}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <button aria-label="รีวิวก่อนหน้า" onClick={() => step(-1)} className="grid size-9 place-items-center rounded-full border border-white/20 transition hover:bg-white hover:text-ink">
                  <ChevronLeft className="size-4" />
                </button>
                <button aria-label="รีวิวถัดไป" onClick={() => step(1)} className="grid size-9 place-items-center rounded-full bg-primary text-ink transition hover:bg-primary-hover">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
