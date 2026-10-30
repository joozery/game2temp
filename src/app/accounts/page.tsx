import type { Metadata } from "next";
import { AccountsPage } from "@/components/accounts/accounts-page";

export const metadata: Metadata = {
  title: "ซื้อไอดีเกม — PK-TOPUP",
  description: "ไอดีเกมคุณภาพ ตรวจสอบแล้ว ปลอดภัย รับประกันหลังการขาย ส่งมอบทันที",
};

export default function Accounts() {
  return <AccountsPage />;
}
