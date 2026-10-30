import Image from "next/image";
import { BadgeCheck, Headphones, Zap, type LucideIcon } from "lucide-react";

const pills: { icon: LucideIcon; label: string; tone: string }[] = [
  { icon: Zap, label: "เติมไว ได้รับทันที", tone: "text-amber-500" },
  { icon: BadgeCheck, label: "ปลอดภัย 100%", tone: "text-success" },
  { icon: Headphones, label: "มีทีมงานดูแลตลอด", tone: "text-ink" },
];

const tiles = [
  { src: "/images/games/rov.jpg", className: "right-[8%] top-[46%] -rotate-6" },
  { src: "/images/games/pubgm-cover.png", className: "right-[3%] top-[6%] rotate-6" },
  { src: "/images/games/freefire.jpg", className: "right-[-1%] top-[40%] rotate-12" },
];

export function HowToHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#fffef9_20%,#fff4cf_62%,#ffe28b_100%)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_45%,rgba(255,203,69,.45),transparent_32%)]" />
      <div className="relative flex min-h-[280px] items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">วิธีการ<span className="text-amber-500">เติมเกม</span></h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">เติมเกมง่าย ๆ ไม่กี่ขั้นตอน รวดเร็ว ปลอดภัย ได้รับไอเทมทันที</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {pills.map(({ icon: Icon, label, tone }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-3.5 py-2 text-xs font-semibold shadow-sm">
                <Icon className={`size-4 ${tone}`} /> {label}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] sm:block">
          {tiles.map((t) => (
            <span key={t.src} className={`absolute size-24 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white/80 lg:size-28 ${t.className}`}>
              <Image src={t.src} alt="" fill sizes="112px" className="object-cover" />
            </span>
          ))}
          <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="absolute -bottom-20 right-[22%] w-[340px] drop-shadow-[0_12px_20px_rgba(105,71,7,.25)] lg:w-[400px]" />
        </div>
      </div>
    </section>
  );
}
