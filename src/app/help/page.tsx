import type { Metadata } from "next";
import { HelpPage } from "@/components/help/help-page";

export const metadata: Metadata = {
  title: "ศูนย์ช่วยเหลือ — PK-TOPUP",
  description: "รวมคำถามที่พบบ่อย วิธีการใช้งาน และวิธีแก้ไขปัญหา ตลอด 24 ชั่วโมง",
};

export default function Help() {
  return <HelpPage />;
}
