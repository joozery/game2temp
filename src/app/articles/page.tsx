import type { Metadata } from "next";
import { ArticlesView } from "@/components/articles/articles-view";

export const metadata: Metadata = {
  title: "ข่าวสารและบทความ — PK-TOPUP",
  description: "รวมข่าวสารเกม ไกด์การเล่น และบทความสำหรับเกมเมอร์",
};

export default function ArticlesPage() {
  return <ArticlesView />;
}
