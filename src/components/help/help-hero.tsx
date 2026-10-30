import Image from "next/image";
import { MessageCircleMore, Search, ShieldCheck } from "lucide-react";
import { popularSearches } from "@/lib/help";

export function HelpHero({ query, onQuery }: { query: string; onQuery: (value: string) => void }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#fffef9_20%,#fff4cf_62%,#ffe28b_100%)]">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_45%,rgba(255,203,69,.45),transparent_32%)]" />
      <div className="relative flex min-h-[320px] items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative z-10 w-full max-w-xl">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-6xl">ศูนย์ช่วย<span className="text-amber-500">เหลือ</span></h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">รวมคำถามที่พบบ่อย วิธีการใช้งาน และวิธีแก้ไขปัญหา<br className="hidden sm:block" /> เพื่อให้คุณเติมเกมได้อย่างราบรื่น ตลอด 24 ชั่วโมง</p>

          <label className="mt-5 flex h-14 items-center gap-3 rounded-full border border-amber-200 bg-white pl-5 pr-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/50">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              aria-label="ค้นหาคำถามหรือปัญหา"
              placeholder="ค้นหาวิธีการเติมเกม ปัญหา หรือคำถามที่ต้องการ..."
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-ink"><Search className="size-5" /></span>
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold">ค้นหายอดนิยม :</span>
            {popularSearches.map((tag) => (
              <button key={tag} onClick={() => onQuery(tag)} className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium shadow-sm transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] sm:block">
          <span className="absolute left-[2%] top-[8%] -rotate-6 rounded-xl bg-coral px-4 py-2 text-2xl font-extrabold text-white shadow-lg">24 ชม.</span>
          <span className="absolute left-[3%] top-[40%] grid size-16 place-items-center rounded-2xl bg-sky-400 text-white shadow-lg ring-4 ring-white/70"><MessageCircleMore className="size-8" /></span>
          <span className="absolute right-[1%] top-[7%] rotate-6 rounded-2xl bg-white/95 px-4 py-2 text-center text-sm font-extrabold leading-tight shadow-lg">มีคำถาม?<span className="block text-[11px] font-semibold text-muted-foreground">เราพร้อมช่วยเหลือ<br />ตลอด 24 ชั่วโมง</span></span>
          <span className="absolute bottom-[8%] right-[2%] grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-[#ffb300] text-ink shadow-xl ring-4 ring-white/70"><ShieldCheck className="size-11" strokeWidth={2.2} /></span>
          <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="absolute -bottom-16 right-[16%] w-[330px] drop-shadow-[0_12px_20px_rgba(105,71,7,.25)] lg:w-[390px]" />
        </div>
      </div>
    </section>
  );
}
