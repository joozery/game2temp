import type { Metadata } from "next";
import { DigitalPage } from "@/components/digital/digital-page";

export const metadata: Metadata = {
  title: "สินค้าดิจิทัล — PK-TOPUP",
  description: "บัตรเติมเกม บัตรของขวัญ และสินค้าดิจิทัล ได้รับโค้ดทันทีหลังชำระเงิน",
};

export default function Digital() {
  return <DigitalPage />;
}
