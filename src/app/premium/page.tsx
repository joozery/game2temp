import type { Metadata } from "next";
import { PremiumPage } from "@/components/premium/premium-page";

export const metadata: Metadata = {
  title: "แอปพรีเมียม — PK-TOPUP",
  description: "Netflix, Spotify, YouTube Premium, ChatGPT และแอปพรีเมียมอื่น ๆ ราคาคุ้ม รับประกันตลอดอายุ",
};

export default function Premium() {
  return <PremiumPage />;
}
