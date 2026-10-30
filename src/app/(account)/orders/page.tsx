import type { Metadata } from "next";
import { OrdersView } from "@/components/account/orders-view";

export const metadata: Metadata = { title: "ประวัติการสั่งซื้อ — PK-TOPUP" };

export default function OrdersPage() {
  return <OrdersView />;
}
