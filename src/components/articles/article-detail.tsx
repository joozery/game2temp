import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, ChevronRight, Eye } from "lucide-react";
import { categoryLabels, relatedArticles, type Article } from "@/lib/articles";

export function ArticleDetail({ article }: { article: Article }) {
  const related = relatedArticles(article);

  return (
    <div className="space-y-5">
      <nav aria-label="เส้นทาง" className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="shrink-0 transition hover:text-foreground">หน้าแรก</Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <Link href="/articles" className="shrink-0 transition hover:text-foreground">ข่าวสารและบทความ</Link>
        <ChevronRight className="size-3.5 shrink-0" />
        <span className="truncate font-medium text-foreground">{article.title}</span>
      </nav>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_16px_36px_-28px_rgba(16,24,39,.35)]">
          <div className="relative flex min-h-[320px] flex-col justify-end overflow-hidden p-5 text-white sm:min-h-[400px] sm:p-8 lg:min-h-[440px]">
            <Image src={article.image} alt="" fill priority sizes="(min-width: 1280px) 1000px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
            <div className="relative z-10 max-w-[800px]">
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold text-ink">{categoryLabels[article.category]}</span>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight drop-shadow-sm sm:text-4xl lg:text-[42px]">{article.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/85">
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" /> {article.date}</span>
                <span className="inline-flex items-center gap-1.5"><Eye className="size-4" /> {article.views} ครั้ง</span>
              </div>
            </div>
          </div>

          <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
            <div className="max-w-[850px]">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">ภาพรวมบทความ</p>
              <p className="mt-3 border-l-4 border-primary pl-4 text-base font-semibold leading-relaxed text-ink sm:text-lg">{article.summary}</p>
              <div className="mt-8 border-t border-border pt-7">
                <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink"><span className="grid size-9 place-items-center rounded-xl bg-primary/30 text-amber-700"><BookOpen className="size-5" /></span> รายละเอียด</h2>
                <div className="mt-5 space-y-5 text-[15px] leading-8 text-slate-700">
                  {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              <p className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800">บทความนี้เป็นเนื้อหาตัวอย่างสำหรับแสดง UI โปรดตรวจสอบข่าวและกำหนดการจริงจากช่องทางทางการของเกม</p>
              <Link href="/articles" className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-primary hover:bg-primary/10">
                <ArrowLeft className="size-4" /> กลับไปหน้าบทความ
              </Link>
            </div>
          </div>
        </article>

        <aside className="space-y-4 xl:sticky xl:top-20">
          <section className="rounded-3xl border border-border bg-card p-5 shadow-[0_16px_36px_-28px_rgba(16,24,39,.35)]">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-ink"><BookOpen className="size-5" /></span>
              <h2 className="text-lg font-extrabold text-ink">บทความที่เกี่ยวข้อง</h2>
            </div>
            <div className="mt-4 divide-y divide-border/70">
              {related.map((item) => (
                <Link key={item.slug} href={`/articles/${item.slug}`} className="group flex gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted"><Image src={item.image} alt="" fill sizes="80px" className="object-cover transition duration-300 group-hover:scale-105" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-amber-700">{categoryLabels[item.category]}</span>
                    <span className="mt-1 block line-clamp-2 text-sm font-bold leading-snug text-ink transition group-hover:text-amber-700">{item.title}</span>
                    <span className="mt-1 block text-[11px] text-muted-foreground">{item.date}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <Link href="/articles" className="group flex items-center justify-between gap-3 rounded-3xl border border-amber-200 bg-[linear-gradient(135deg,#fff9e5,#ffe69a)] p-5 text-ink transition hover:border-primary hover:shadow-md">
            <span><span className="block text-base font-extrabold">ข่าวสารและบทความ</span><span className="mt-1 block text-xs text-amber-900/75">ดูข่าวเกม ไกด์ และเรื่องน่าอ่านเพิ่มเติม</span></span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary transition group-hover:translate-x-1"><ArrowRight className="size-5" /></span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
