import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { orders } from "@/lib/account";
import { OrderThumb } from "../order-thumb";
import { OrderStatusBadge } from "../orders/order-status-badge";

export function RecentOrdersCard() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_3px_14px_-10px_rgba(16,24,39,.25)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5"><h2 className="flex items-center gap-2.5 text-base font-bold"><span className="grid size-8 place-items-center rounded-lg bg-coral text-white"><Gift className="size-4" /></span>คำสั่งซื้อล่าสุด</h2><Link href="/orders" className="inline-flex items-center gap-1 text-xs font-medium hover:text-coral">ดูทั้งหมด <ArrowRight className="size-3.5" /></Link></div>
      <div className="hidden grid-cols-[32px_minmax(120px,1.5fr)_minmax(105px,1fr)_85px_100px_84px] gap-2 bg-[#f5f6f8] px-4 py-2 text-[11px] font-medium text-muted-foreground md:grid lg:grid-cols-[24px_minmax(105px,1.5fr)_minmax(95px,1fr)_70px_90px_80px] xl:grid-cols-[32px_minmax(120px,1.5fr)_minmax(105px,1fr)_85px_100px_84px] sm:px-5"><span>#</span><span>สินค้า</span><span>รายละเอียด</span><span>จำนวนเงิน</span><span>สถานะ</span><span>วันที่สั่งซื้อ</span></div>
      <ul className="divide-y divide-border px-4 sm:px-5">
        {orders.slice(0, 5).map((order, index) => (
          <li key={order.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-3 md:grid-cols-[32px_minmax(120px,1.5fr)_minmax(105px,1fr)_85px_100px_84px] md:gap-2 lg:grid-cols-[24px_minmax(105px,1.5fr)_minmax(95px,1fr)_70px_90px_80px] xl:grid-cols-[32px_minmax(120px,1.5fr)_minmax(105px,1fr)_85px_100px_84px]">
            <span className="hidden text-xs text-muted-foreground md:block">{index + 1}</span>
            <div className="flex min-w-0 items-center gap-2.5"><OrderThumb art={order.art} name={order.game} /><div className="min-w-0"><p className="truncate text-xs font-semibold">{order.game}</p><p className="truncate text-[11px] text-muted-foreground">{order.item.replace(order.game, "").trim()}</p></div></div>
            <p className="hidden min-w-0 truncate text-[11px] text-muted-foreground md:block">{order.uid ? `UID: ${order.uid}` : order.method}</p>
            <p className="text-right text-xs font-bold tabular-nums md:text-left">฿{order.price.toLocaleString()}</p>
            <div className="col-start-2 row-start-2 justify-self-end md:col-auto md:row-auto md:justify-self-start"><OrderStatusBadge status={order.status} /></div>
            <p className="col-start-1 row-start-2 text-[11px] text-muted-foreground md:col-auto md:row-auto">{order.date}</p>
          </li>
        ))}
      </ul>
      <Link href="/orders" className="flex items-center justify-center gap-1.5 border-t border-border px-4 py-3 text-xs font-medium transition hover:bg-muted/50 md:hidden">ดูรายการทั้งหมด <ArrowRight className="size-3.5" /></Link>
    </section>
  );
}
