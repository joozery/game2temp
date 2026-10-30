import { ArrowRight, Megaphone } from "lucide-react";
import { Artwork } from "./artwork";
import { SectionHeading } from "./section-heading";

const ctaClass =
  "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-ink transition group-hover:bg-primary-hover";

export function Promotions() {
  return (
    <section id="promotions">
      <SectionHeading title="โปรโมชั่นเติมเกม" subtitle="ดีลพิเศษอัปเดตทุกสัปดาห์" icon={Megaphone} href="/promotions" />
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <a href="/promotions" className="group relative isolate flex min-h-72 overflow-hidden rounded-3xl bg-section p-7 text-foreground sm:p-9">
          <div className="absolute inset-y-0 right-0 -z-10 w-2/3">
            <Artwork name="genshin" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-section from-35% via-section/70 via-55% to-transparent" />
          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wider text-ink">PROMOTION</span>
            <h3 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              เติมเกม
              <br />
              ลดสูงสุด <span className="text-coral">20%</span>
            </h3>
            <p className="mt-2 text-muted-foreground">เติมเยอะ ยิ่งคุ้ม | ใช้โค้ดลดเพิ่ม</p>
            <span className={`${ctaClass} mt-6 w-fit`}>
              ดูโปรโมชั่นทั้งหมด <ArrowRight className="size-4" />
            </span>
          </div>
        </a>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <a
            href="/boxes"
            className="group relative isolate flex min-h-40 flex-col justify-center overflow-hidden rounded-3xl bg-mint bg-cover bg-right p-6 text-foreground"
            style={{ backgroundImage: 'url("/images/mystery-box.png")' }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-mint via-mint/80 to-transparent" />
            <span className="w-fit rounded-md bg-coral px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">RANDOM BOX</span>
            <h3 className="mt-2 text-2xl font-bold">กล่องสุ่มสุดคุ้ม</h3>
            <p className="text-sm text-ink/70">เปิดรับรางวัลมากมาย</p>
            <span className={`${ctaClass} mt-3 w-fit`}>
              เปิดกล่องลุ้น <ArrowRight className="size-4" />
            </span>
          </a>
          <a
            href="/accounts"
            className="group relative isolate flex min-h-40 flex-col justify-center overflow-hidden rounded-3xl bg-[#ffe3e4] bg-cover p-6 text-foreground"
            style={{ backgroundImage: 'url("/images/hero-gaming.png")', backgroundPosition: "74% 40%" }}
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#ffe3e4] via-[#ffe3e4]/85 to-transparent" />
            <h3 className="text-2xl font-bold">ไอดีเกมคุณภาพ</h3>
            <p className="text-sm text-muted-foreground">ราคาดี ปลอดภัย รับประกันทุกไอดี</p>
            <span className={`${ctaClass} mt-3 w-fit`}>
              เลือกซื้อไอดีเกม <ArrowRight className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
