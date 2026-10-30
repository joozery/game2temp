import Image from "next/image";
import { BadgeCheck, Headphones, Zap, type LucideIcon } from "lucide-react";

type Pill = { icon: LucideIcon; label: string; tone: string };

const defaultPills: Pill[] = [
  { icon: Zap, label: "เติมไวใน 1 นาที", tone: "text-amber-500" },
  { icon: BadgeCheck, label: "ปลอดภัย 100%", tone: "text-success" },
  { icon: Headphones, label: "ทีมงานดูแลตลอด 24 ชม.", tone: "text-ink" },
];

const tiles = [
  { src: "/images/games/genshin.jpg", className: "right-[44%] top-[8%] -rotate-6" },
  { src: "/images/games/rov.jpg", className: "right-[3%] top-[48%] rotate-6" },
  { src: "/images/games/freefire.jpg", className: "right-[30%] bottom-[6%] -rotate-3" },
];

/** Shared top banner for storefront list pages; defaults are the "เติมเกม" copy. */
export function GamesHero({
  title = "เติมเกม",
  accent = "สุดคุ้ม",
  subtitle = "รวดเร็ว ปลอดภัย ปลอดล็อค 100%",
  pills = defaultPills,
  bubble = ["เกมฮิต ครบทุกเกม", "เติมง่าย ได้เลยทันที"],
}: { title?: string; accent?: string; subtitle?: string; pills?: Pill[]; bubble?: [string, string] }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#fffef9_20%,#fff4cf_60%,#ffd45c_100%)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_50%,rgba(255,203,69,.5),transparent_34%)]" />
      <div className="relative flex min-h-[250px] items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-6xl">{title}<span className="text-amber-500">{accent}</span></h1>
          <p className="mt-2 text-lg font-semibold text-ink sm:text-2xl">{subtitle}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {pills.map(({ icon: Icon, label, tone }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-3.5 py-2 text-xs font-semibold shadow-sm">
                <Icon className={`size-4 ${tone}`} /> {label}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] sm:block">
          {tiles.map((t) => (
            <span key={t.src} className={`absolute size-20 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white/80 lg:size-24 ${t.className}`}>
              <Image src={t.src} alt="" fill sizes="96px" className="object-cover" />
            </span>
          ))}
          <span className="absolute right-[2%] top-[8%] rotate-6 rounded-2xl bg-white/95 px-4 py-2 text-center text-base font-extrabold leading-tight shadow-lg">
            <span className="text-coral">{bubble[0]}</span>
            <span className="block text-[11px] font-semibold text-muted-foreground">{bubble[1]}</span>
          </span>
          <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="absolute -bottom-14 right-[16%] w-[300px] drop-shadow-[0_12px_20px_rgba(105,71,7,.25)] lg:w-[350px]" />
        </div>
      </div>
    </section>
  );
}
