import type { Metadata } from "next";
import { AffiliateView } from "@/components/affiliate/affiliate-view";

export const metadata: Metadata = { title: "ตัวแทนแนะนำ — PK-TOPUP" };

export default function AffiliatePage() {
  return <AffiliateView />;
}
