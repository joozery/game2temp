import Link from "next/link";
import { ArrowUpRight, Check, ClipboardList, Clock3, X } from "lucide-react";
import { orders, user } from "@/lib/account";

const pending = orders.filter((order) => order.status === "pending").length;
const cancelled = orders.filter((order) => order.status === "failed").length;
const stats = [
  { label: "คำสั่งซื้อทั้งหมด", value: user.stats.orders, icon: ClipboardList, tone: "bg-sky-100 text-sky-600" },
  { label: "สำเร็จแล้ว", value: user.stats.orders - pending - cancelled, icon: Check, tone: "bg-emerald-100 text-success" },
  { label: "กำลังดำเนินการ", value: pending, icon: Clock3, tone: "bg-amber-100 text-amber-600" },
  { label: "ยกเลิก", value: cancelled, icon: X, tone: "bg-red-100 text-coral" },
];

export function StatsRow() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <li key={label} className="flex min-w-0 items-center gap-2 rounded-2xl border border-border bg-card px-3 py-4 shadow-[0_3px_14px_-10px_rgba(16,24,39,.3)] sm:gap-3 sm:px-4">
          <span className={`grid size-9 shrink-0 place-items-center rounded-xl sm:size-11 ${tone}`}><Icon className="size-4 sm:size-5" strokeWidth={2.7} /></span>
          <div className="min-w-0 flex-1"><p className="text-[11px] leading-tight text-muted-foreground sm:text-xs">{label}</p><p className="mt-1 text-xl font-bold tabular-nums leading-none">{value}<span className="ml-1 text-[10px] font-normal text-muted-foreground">รายการ</span></p></div>
          <Link href="/orders" aria-label={`ดู${label}`} className="hidden shrink-0 text-muted-foreground hover:text-foreground xl:block"><ArrowUpRight className="size-4" /></Link>
        </li>
      ))}
    </ul>
  );
}
