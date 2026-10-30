"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Bell, BookOpen, ChevronLeft, ChevronRight, Crown, Eye, Flame, Gamepad2, Gift, LayoutGrid, Mail, Search, Star, Tag, type LucideIcon } from "lucide-react";
import { MobileTabBar } from "@/components/storefront/mobile-tab-bar";
import { Footer } from "@/components/storefront/footer";
import { StoreHeader } from "@/components/storefront/header";
import { Sidebar } from "@/components/storefront/sidebar";
import { articles, categoryLabels, type Article, type ArticleCategory } from "@/lib/articles";
import { cn } from "@/lib/utils";

type Filter = "all" | ArticleCategory;
const filters: { id: Filter; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "ทั้งหมด", icon: LayoutGrid },
  { id: "news", label: "ข่าวสารเกม", icon: Gamepad2 },
  { id: "updates", label: "อัปเดตแพตช์", icon: Bell },
  { id: "events", label: "กิจกรรม", icon: Gift },
  { id: "promos", label: "โปรโมชั่น", icon: Tag },
  { id: "guides", label: "ไกด์ & เทคนิค", icon: BookOpen },
  { id: "reviews", label: "รีวิวเกม", icon: Star },
];

function ArticleHero({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  return <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#fffef9_15%,#fff4cf_62%,#ffe28b_100%)]">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(255,203,69,.45),transparent_30%),linear-gradient(145deg,transparent_64%,rgba(255,255,255,.38)_64%,rgba(255,255,255,.38)_72%,transparent_72%)]" />
    <div aria-hidden className="absolute -right-14 -top-20 size-72 rounded-full border-[34px] border-white/35" />
    <div className="relative flex min-h-[295px] items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative z-20 w-full max-w-[560px]">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">ข่าวสาร<span className="text-amber-500">และบทความ</span></h1>
        <p className="mt-2 max-w-[470px] text-sm leading-relaxed text-slate-600 sm:text-base">อัปเดตข่าวเกมล่าสุด ไกด์การเล่น เทคนิคเติมเกม<br className="hidden sm:block" /> และบทความที่น่าสนใจ สำหรับเกมเมอร์ทุกคน</p>
        <label className="mt-5 flex h-12 w-full max-w-[500px] items-center gap-3 rounded-full border border-amber-200 bg-white px-4 shadow-sm"><Search className="size-5 shrink-0 text-muted-foreground" /><input aria-label="ค้นหาข่าวหรือบทความ" placeholder="ค้นหาบทความ ข่าวสาร หรือเกมที่สนใจ" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 text-sm outline-none placeholder:text-muted-foreground" /><span className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-ink">ค้นหา</span></label>
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-[3%] hidden h-full w-[49%] sm:block"><Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="absolute -bottom-24 right-[17%] w-[340px] drop-shadow-[0_12px_20px_rgba(105,71,7,.25)] lg:-bottom-32 lg:w-[430px]" /></div>
    </div>
  </section>;
}

function CategoryTabs({ active, onChange }: { active: Filter; onChange: (filter: Filter) => void }) {
  return <nav aria-label="หมวดหมู่บทความ" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{filters.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => onChange(id)} aria-pressed={active === id} className={cn("inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", active === id ? "border-primary bg-primary text-ink" : "border-border bg-white text-ink")}><Icon className="size-4" /> {label}</button>)}</nav>;
}

function FeaturedArticles() {
  const [main, second, third] = articles;
  return <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
    <Link href={`/articles/${main.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-white text-left shadow-[0_8px_22px_-18px_rgba(16,24,39,.4)] transition hover:-translate-y-0.5 hover:shadow-lg"><div className="relative h-56 overflow-hidden sm:h-64"><Image src={main.image} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-lg bg-coral px-2.5 py-1 text-xs font-bold text-white"><Flame className="mr-1 inline size-3.5" /> HOT</span></div><div className="p-5"><p className="text-xs font-semibold text-emerald-600">{categoryLabels[main.category]} <span className="ml-2 font-normal text-muted-foreground">{main.date}</span></p><h2 className="mt-2 text-xl font-extrabold leading-tight text-ink sm:text-2xl">{main.title}</h2><p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{main.summary}</p><span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-ink">อ่านเพิ่มเติม <ArrowRight className="size-4" /></span></div></Link>
    <div className="grid gap-4">{[second, third].map((article) => <Link key={article.slug} href={`/articles/${article.slug}`} className="group relative min-h-44 overflow-hidden rounded-2xl text-left text-white"><Image src={article.image} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" /><span className="absolute bottom-4 left-4 right-4"><span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-ink">{categoryLabels[article.category]}</span><span className="ml-2 text-[11px] text-white/80">{article.date}</span><span className="mt-2 block line-clamp-2 text-base font-bold leading-snug">{article.title}</span></span></Link>)}</div>
  </div>;
}

function LatestCard({ article }: { article: Article }) {
  return <Link href={`/articles/${article.slug}`} className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-white text-left transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"><div className="relative aspect-[1.55] overflow-hidden"><Image src={article.image} alt="" fill sizes="(min-width: 1280px) 250px, (min-width: 640px) 45vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-3"><div className="flex items-center justify-between gap-2"><span className="rounded-full bg-primary/40 px-2 py-0.5 text-[10px] font-semibold text-ink">{categoryLabels[article.category]}</span><span className="text-[10px] text-muted-foreground">{article.date}</span></div><h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-bold leading-snug text-ink">{article.title}</h3></div></Link>;
}

function PopularArticles() {
  return <section className="rounded-2xl border border-border bg-white p-4 shadow-[0_8px_22px_-18px_rgba(16,24,39,.4)]"><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-primary text-amber-700"><Crown className="size-4" /></span><h2 className="flex-1 text-base font-extrabold text-ink">บทความยอดนิยม</h2><span className="text-xs text-muted-foreground">ดูทั้งหมด →</span></div><div className="mt-3 divide-y divide-border/70">{[articles[4], articles[3], articles[2], articles[6], articles[1]].map((article, index) => <Link key={article.slug} href={`/articles/${article.slug}`} className="flex w-full items-center gap-2.5 py-2.5 text-left"><span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold", index < 2 ? "bg-amber-100 text-orange-600" : "bg-muted text-ink")}>{index + 1}</span><span className="relative size-14 shrink-0 overflow-hidden rounded-lg"><Image src={article.image} alt="" fill sizes="56px" className="object-cover" /></span><span className="min-w-0 flex-1"><span className="line-clamp-2 text-xs font-semibold leading-snug text-ink">{article.title}</span><span className="mt-1 flex gap-2 text-[10px] text-muted-foreground"><span>{article.date}</span><span className="inline-flex items-center gap-0.5"><Eye className="size-3" /> {article.views}</span></span></span></Link>)}</div></section>;
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }
  return <section className="relative overflow-hidden rounded-2xl border border-amber-200 bg-[linear-gradient(135deg,#fff7d7,#fff0b0)] p-5"><Mail className="size-8 text-amber-500" /><h2 className="mt-2 text-base font-extrabold text-ink">รับข่าวสารล่าสุดก่อนใคร</h2><p className="mt-1 text-xs text-slate-600">อัปเดตโปรโมชัน เกมใหม่ และบทความที่น่าสนใจส่งตรงถึงคุณ</p>{subscribed ? <p role="status" className="mt-4 rounded-xl bg-white/70 p-3 text-sm font-semibold text-emerald-700">สมัครรับข่าวสารสำเร็จ (ตัวอย่าง)</p> : <form onSubmit={submit} className="mt-4 flex gap-2 rounded-xl bg-white p-1"><input required type="email" aria-label="อีเมลสำหรับรับข่าวสาร" placeholder="กรอกอีเมลของคุณ" value={email} onChange={(event) => setEmail(event.target.value)} className="min-w-0 flex-1 px-2 text-xs outline-none" /><button type="submit" className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-ink">สมัครรับข่าวสาร</button></form>}<p className="mt-2 text-[10px] text-muted-foreground">ฟอร์มตัวอย่าง ยังไม่ส่งอีเมลจริง</p></section>;
}

export function ArticlesView() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(0);
  const filtered = useMemo(() => articles.filter((article) => (filter === "all" || article.category === filter) && (!query.trim() || `${article.title} ${article.summary} ${categoryLabels[article.category]}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))), [filter, query]);
  const pages = Math.max(1, Math.ceil(filtered.length / 4));
  const visible = filtered.slice(Math.min(page, pages - 1) * 4, Math.min(page, pages - 1) * 4 + 4);
  function changeFilter(next: Filter) { setFilter(next); setPage(0); }
  function changeQuery(next: string) { setQuery(next); setPage(0); }

  return <div className="min-h-screen bg-background">
    <Sidebar />
    <div className="lg:pl-66">
      <StoreHeader query={query} onSearch={changeQuery} />
      <ArticleHero query={query} setQuery={changeQuery} />
    <main className="space-y-5 px-4 py-5 sm:px-6 lg:px-8"><CategoryTabs active={filter} onChange={changeFilter} /><div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]"><div className="min-w-0 space-y-5">{filter === "all" && !query.trim() && <FeaturedArticles />}<section><div className="mb-3 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-coral text-white"><Flame className="size-4" /></span><h2 className="text-lg font-extrabold text-ink">{query.trim() || filter !== "all" ? "ผลการค้นหาและบทความ" : "บทความล่าสุด"}</h2><p className="ml-1 hidden text-xs text-muted-foreground sm:block">{filtered.length} บทความ</p><div className="ml-auto flex gap-1"><button type="button" aria-label="บทความหน้าก่อน" disabled={page === 0} onClick={() => setPage(page - 1)} className="grid size-8 place-items-center rounded-lg border border-border bg-white disabled:opacity-40"><ChevronLeft className="size-4" /></button><button type="button" aria-label="บทความหน้าถัดไป" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="grid size-8 place-items-center rounded-lg border border-border bg-white disabled:opacity-40"><ChevronRight className="size-4" /></button></div></div>{visible.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{visible.map((article) => <LatestCard key={article.slug} article={article} />)}</div> : <div className="rounded-2xl border border-border bg-white p-10 text-center text-sm text-muted-foreground">ไม่พบบทความที่ตรงกับคำค้นหา</div>}</section></div><aside className="space-y-4"><PopularArticles /><Newsletter /></aside></div><p className="text-center text-[11px] text-muted-foreground">เนื้อหาบทความในหน้านี้เป็นตัวอย่างสำหรับแสดง UI</p></main>
      <Footer />
    </div>
    <MobileTabBar onTopUp={() => router.push("/wallet")} />
  </div>;
}
