import type { Metadata } from "next";
import { BoxesPage } from "@/components/boxes/boxes-page";

export const metadata: Metadata = {
  title: "กล่องสุ่ม — PK-TOPUP",
  description: "เปิดกล่องสุ่มลุ้นรางวัลมากมาย เพชร บัตรเติมเงิน แอปพรีเมียม และไอดีเกม",
};

export default function Boxes() {
  return <BoxesPage />;
}
