"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Headphones, ShieldCheck, Tags, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkles } from "@/components/effects/sparkles";
import { staggerChild, staggerParent } from "@/components/effects/motion";

const slides = [
  {
    image: "/images/hero-gaming-v2.png",
    position: "70% center",
    eyebrow: "GAME TOP-UP & DIGITAL STORE",
    title: "เติมเกมไว",
    highlight: "ปลอดภัย 100%",
    text: "บริการเติมเกม ซื้อไอดีเกม และสินค้าดิจิทัล ครบ จบ ในที่เดียว",
    cta: { label: "เติมเกมเลย", href: "#games" },
  },
  {
    image: "/images/mystery-box.png",
    position: "right center",
    eyebrow: "RANDOM BOX",
    title: "กล่องสุ่มสุดคุ้ม",
    highlight: "ลุ้นไอเทมหายาก",
    text: "เปิดกล่องรับรางวัลมากมาย ทั้งเพชร สกิน และไอดีเกมระดับพรีเมียม",
    cta: { label: "เปิดกล่องเลย", href: "#promotions" },
  },
  {
    image: "/images/game-artwork-atlas.png",
    position: "left top",
    eyebrow: "PROMOTION",
    title: "เติมเยอะ ยิ่งคุ้ม",
    highlight: "ลดสูงสุด 20%",
    text: "ใช้โค้ด PK20 รับส่วนลดเพิ่ม เมื่อเติมเกมครบ 500 บาทขึ้นไป",
    cta: { label: "ดูโปรโมชั่น", href: "#promotions" },
  },
];

const features = [
  { icon: Zap, title: "เติมไว", text: "ภายใน 1 นาที" },
  { icon: ShieldCheck, title: "ปลอดภัย", text: "ตัวแทนถูกลิขสิทธิ์" },
  { icon: Tags, title: "ราคาดี", text: "ถูกกว่าในเกม" },
  { icon: Headphones, title: "ดูแล 24 ชม.", text: "ทีมงานพร้อมช่วย" },
];

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);
  const slide = slides[index];

  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section id="home" className="space-y-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate min-h-[300px] overflow-hidden rounded-3xl bg-ink text-white sm:min-h-[440px] xl:aspect-[2.9] xl:min-h-0"
      >
        {slides.map((s, i) => (
          <div
            key={s.title}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 -z-10 overflow-hidden transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Re-keyed on activation so the slow zoom restarts with each slide. */}
            <div
              key={i === index ? `active-${index}` : "idle"}
              className={cn("absolute inset-0 bg-cover", i === index && "ken-burns")}
              style={{ backgroundImage: `url("${s.image}")`, backgroundPosition: s.position }}
            />
          </div>
        ))}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-transparent" />
        <Sparkles count={18} seed={index + 3} className="-z-10" />
        <div className="pointer-events-none absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-primary/20 blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            variants={staggerParent}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="absolute inset-0 flex touch-pan-y flex-col justify-center p-5 pb-12 sm:p-10 xl:p-14"
          >
            <motion.span
              variants={staggerChild}
              className="shine w-fit shrink-0 rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wider text-ink"
            >
              {slide.eyebrow}
            </motion.span>
            <motion.h1 variants={staggerChild} className="mt-4 text-[2rem] font-bold leading-[1.1] sm:mt-5 sm:text-5xl xl:text-6xl">
              {slide.title}
              <br />
              <span className="text-shimmer">{slide.highlight}</span>
            </motion.h1>
            <motion.p variants={staggerChild} className="mt-3 line-clamp-2 max-w-[16rem] text-[13px] text-white/75 sm:mt-4 sm:max-w-md sm:text-base">
              {slide.text}
            </motion.p>
            <motion.div variants={staggerChild} className="mt-5 flex flex-wrap gap-3 sm:mt-7">
              <motion.a
                href={slide.cta.href}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="shine inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 sm:h-12 sm:px-6 font-semibold text-ink shadow-lg shadow-primary/30 transition-colors hover:bg-yellow-300"
              >
                <span className="relative z-[2] flex items-center gap-2">
                  {slide.cta.label} <ArrowRight className="size-4" />
                </span>
              </motion.a>
              <motion.a
                href="#how"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="hidden h-12 items-center rounded-xl border border-white/25 sm:inline-flex bg-white/5 px-6 font-medium backdrop-blur transition-colors hover:bg-white/15"
              >
                วิธีการเติม
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 right-5 flex items-center gap-3 sm:bottom-8 sm:right-8">
          <div className="flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.title}
                aria-label={`สไลด์ที่ ${i + 1}`}
                onClick={() => setIndex(i)}
                className="relative h-1.5 w-3 overflow-hidden rounded-full bg-white/40 transition-all hover:bg-white/70 data-[active=true]:w-8"
                data-active={i === index}
              >
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button aria-label="สไลด์ก่อนหน้า" onClick={() => go(-1)} className="hidden size-10 place-items-center rounded-full border border-white/25 bg-black/30 sm:grid backdrop-blur transition hover:bg-white hover:text-ink">
            <ChevronLeft className="size-5" />
          </button>
          <button aria-label="สไลด์ถัดไป" onClick={() => go(1)} className="hidden size-10 place-items-center rounded-full bg-white text-ink sm:grid transition hover:bg-primary">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="show"
        className="hidden gap-3 lg:grid lg:grid-cols-4"
      >
        {features.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            variants={staggerChild}
            whileHover={{ y: -4 }}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-lg hover:shadow-primary/10"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-amber-600 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold leading-tight">{title}</p>
              <p className="truncate text-xs text-muted-foreground">{text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
