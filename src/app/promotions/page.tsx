import type { Metadata } from "next";
import { PromotionsPage } from "@/components/promotions/promotions-page";

export const metadata: Metadata = {
  title: "โปรโมชั่น — PK-TOPUP",
  description: "โปรโมชั่นเติมเกม ส่วนลด และโค้ดพิเศษ อัปเดตทุกสัปดาห์",
};

export default function Promotions() {
  return <PromotionsPage />;
}
