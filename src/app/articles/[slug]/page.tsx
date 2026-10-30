import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AccountShell } from "@/components/account/account-shell";
import { ArticleDetail } from "@/components/articles/article-detail";
import { articles, getArticle } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? { title: `${article.title} — PK-TOPUP`, description: article.summary } : {};
}

async function ArticleContent({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <ArticleDetail article={article} />;
}

function ArticleFallback() {
  return <div aria-label="กำลังโหลดบทความ" className="grid animate-pulse gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div className="space-y-4"><div className="h-4 w-52 rounded bg-muted" /><div className="h-[420px] rounded-3xl bg-muted" /><div className="h-48 rounded-3xl bg-muted" /></div>
    <div className="hidden h-96 rounded-3xl bg-muted xl:block" />
  </div>;
}

export default function ArticlePage({ params }: Props) {
  return (
    <AccountShell wide>
      <Suspense fallback={<ArticleFallback />}>
        <ArticleContent params={params} />
      </Suspense>
    </AccountShell>
  );
}
