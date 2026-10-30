"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Check, ChevronLeft, ChevronRight, ClipboardList, Clock3, PackageOpen, Search, Undo2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { OrderThumb } from "./order-thumb";
import { orders, type Order, type OrderStatus } from "@/lib/account";
import { cn } from "@/lib/utils";

type StatusFilter = OrderStatus | "all";

const statusOptions: { value: StatusFilter; label: string; icon: typeof ClipboardList; tone: string }[] = [
  { value: "all", label: "ทั้งหมด", icon: ClipboardList, tone: "bg-amber-100 text-amber-600" },
  { value: "success", label: "สำเร็จแล้ว", icon: Check, tone: "bg-emerald-100 text-emerald-600" },
  { value: "pending", label: "กำลังดำเนินการ", icon: Clock3, tone: "bg-orange-100 text-orange-500" },
  { value: "refunded", label: "คืนเงินแล้ว", icon: Undo2, tone: "bg-sky-100 text-sky-600" },
  { value: "failed", label: "ไม่สำเร็จ", icon: X, tone: "bg-red-100 text-red-500" },
];

const statusStyle: Record<OrderStatus, { label: string; className: string; icon: typeof Check }> = {
  success: { label: "สำเร็จแล้ว", className: "bg-emerald-50 text-emerald-600", icon: Check },
  pending: { label: "กำลังดำเนินการ", className: "bg-amber-50 text-amber-600", icon: Clock3 },
  failed: { label: "ไม่สำเร็จ", className: "bg-red-50 text-red-500", icon: X },
  refunded: { label: "คืนเงินแล้ว", className: "bg-sky-50 text-sky-600", icon: Undo2 },
};

const monthNumbers: Record<string, string> = { "ม.ค.": "01", "ก.พ.": "02", "มี.ค.": "03", "เม.ย.": "04", "พ.ค.": "05", "มิ.ย.": "06", "ก.ค.": "07", "ส.ค.": "08", "ก.ย.": "09", "ต.ค.": "10", "พ.ย.": "11", "ธ.ค.": "12" };

function orderISODate(date: string) {
  const match = date.match(/^(\d{1,2})\s+(\S+)\s+(\d{4})/);
  if (!match) return "";
  const month = monthNumbers[match[2]];
  return month ? `${Number(match[3]) - 543}-${month}-${match[1].padStart(2, "0")}` : "";
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, className, icon: Icon } = statusStyle[status];
  return <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold", className)}><Icon className="size-3.5" strokeWidth={3} />{label}</span>;
}

function OrderProduct({ order }: { order: Order }) {
  return <div className="flex min-w-0 items-center gap-3"><OrderThumb art={order.art} name={order.game} /><div className="min-w-0"><p className="truncate text-sm font-semibold">{order.game}</p><p className="truncate text-xs text-muted-foreground">{order.item.replace(order.game, "").trim() || order.item}</p></div></div>;
}

function OrderDetails({ order, onClose }: { order: Order | null; onClose: () => void }) {
  return (
    <Dialog open={order !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogTitle>รายละเอียดคำสั่งซื้อ #{order?.id}</DialogTitle>
        <DialogDescription>ตรวจสอบสินค้า สถานะ และข้อมูลการชำระเงิน</DialogDescription>
        {order && <div className="mt-5 space-y-4">
          <div className="rounded-xl bg-muted/50 p-3"><OrderProduct order={order} /></div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm">
            <dt className="text-muted-foreground">เลขที่คำสั่งซื้อ</dt><dd className="text-right font-medium">#{order.id}</dd>
            <dt className="text-muted-foreground">วันที่สั่งซื้อ</dt><dd className="text-right">{order.date}</dd>
            {order.uid && <><dt className="text-muted-foreground">UID</dt><dd className="text-right">{order.uid}</dd></>}
            <dt className="text-muted-foreground">ชำระโดย</dt><dd className="text-right">{order.method}</dd>
            <dt className="text-muted-foreground">จำนวนเงิน</dt><dd className="text-right font-bold">฿{order.price.toLocaleString()}</dd>
            <dt className="text-muted-foreground">สถานะ</dt><dd className="text-right"><StatusBadge status={order.status} /></dd>
          </dl>
        </div>}
      </DialogContent>
    </Dialog>
  );
}

export function OrdersView() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const categories = useMemo(() => [...new Set(orders.map((order) => order.game))], []);
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return orders.filter((order) =>
      (status === "all" || order.status === status) &&
      (category === "all" || order.game === category) &&
      (!date || orderISODate(order.date) === date) &&
      (!q || `${order.id} ${order.item} ${order.game} ${order.uid ?? ""}`.toLocaleLowerCase().includes(q))
    );
  }, [status, category, date, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const changeStatus = (next: StatusFilter) => { setStatus(next); setPage(1); };

  return (
    <div className="space-y-5">
      <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-white via-[#fffaf0] to-[#ffedb3] px-5 py-5 sm:px-7 sm:py-6">
        <div aria-hidden className="absolute -right-12 -top-24 size-80 rounded-full bg-primary/30 blur-3xl" />
        <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="pointer-events-none absolute -bottom-24 right-4 hidden w-72 opacity-95 drop-shadow-xl md:block" />
        <div className="relative z-10 max-w-2xl">
          <nav aria-label="เส้นทางหน้าเว็บ" className="flex items-center gap-1.5 text-xs text-muted-foreground"><Link href="/" className="hover:text-foreground">หน้าแรก</Link><ChevronRight className="size-3.5" /><span className="text-foreground">ประวัติการสั่งซื้อ</span></nav>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">ประวัติการสั่งซื้อ</h1>
          <p className="mt-1 text-sm text-muted-foreground">ตรวจสอบสถานะการสั่งซื้อ และรายละเอียดคำสั่งซื้อทั้งหมดของคุณ</p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {statusOptions.map(({ value, label, icon: Icon, tone }) => {
          const count = value === "all" ? orders.length : orders.filter((order) => order.status === value).length;
          const active = status === value;
          return <button key={value} type="button" onClick={() => changeStatus(value)} aria-pressed={active} className={cn("flex min-w-0 items-center gap-3 rounded-2xl border bg-white px-4 py-4 text-left shadow-[0_3px_14px_-10px_rgba(16,24,39,.25)] transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", active ? "border-primary ring-1 ring-primary/50" : "border-border")}><span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", tone)}><Icon className="size-5" strokeWidth={2.6} /></span><span className="min-w-0"><span className="block truncate text-xs text-muted-foreground">{label}</span><span className="mt-0.5 block text-xl font-bold tabular-nums leading-none">{count}<span className="ml-1 text-[10px] font-normal text-muted-foreground">รายการ</span></span></span></button>;
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(155px,.8fr)_minmax(155px,.8fr)_minmax(175px,1fr)]">
        <label className="relative block"><span className="sr-only">ค้นหาคำสั่งซื้อ</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="ค้นหาจากชื่อสินค้า, UID, เลขที่คำสั่งซื้อ..." className="h-11 w-full rounded-xl border border-border bg-white py-2 pl-4 pr-10 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30" /><Search className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /></label>
        <label className="relative"><span className="sr-only">ประเภทสินค้า</span><select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} className="h-11 w-full appearance-none rounded-xl border border-border bg-white px-3 pr-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"><option value="all">ทุกประเภท</option>{categories.map((game) => <option key={game} value={game}>{game}</option>)}</select><ChevronRight className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground" /></label>
        <label className="relative"><span className="sr-only">สถานะคำสั่งซื้อ</span><select value={status} onChange={(event) => changeStatus(event.target.value as StatusFilter)} className="h-11 w-full appearance-none rounded-xl border border-border bg-white px-3 pr-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"><option value="all">ทุกสถานะ</option>{statusOptions.filter((option) => option.value !== "all").map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronRight className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground" /></label>
        <label className="relative flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30"><CalendarDays className="size-4 shrink-0 text-muted-foreground" /><span className="sr-only">เลือกช่วงวันที่</span><input type="date" value={date} onChange={(event) => { setDate(event.target.value); setPage(1); }} className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none" /></label>
      </div>

      <section aria-label="รายการคำสั่งซื้อ" className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_3px_14px_-10px_rgba(16,24,39,.25)]">
        {visible.length ? <>
          <div className="hidden overflow-x-auto xl:block"><table className="w-full table-fixed text-left text-sm"><thead className="bg-[#f5f6f8] text-xs text-muted-foreground"><tr><th className="w-[4%] px-4 py-3 font-medium">#</th><th className="w-[22%] px-3 py-3 font-medium">ข้อมูลสินค้า</th><th className="w-[20%] px-3 py-3 font-medium">UID / รายละเอียด</th><th className="w-[12%] px-3 py-3 font-medium">จำนวนเงิน</th><th className="w-[16%] px-3 py-3 font-medium">สถานะ</th><th className="w-[14%] px-3 py-3 font-medium">วันที่สั่งซื้อ</th><th className="w-[12%] px-3 py-3 font-medium">จัดการ</th></tr></thead><tbody className="divide-y divide-border">{visible.map((order, index) => <tr key={order.id} className="hover:bg-muted/25"><td className="px-4 py-3 text-xs text-muted-foreground">{(page - 1) * pageSize + index + 1}</td><td className="px-3 py-2"><OrderProduct order={order} /></td><td className="px-3 py-2 text-xs text-muted-foreground"><p className="truncate">{order.uid ? `UID: ${order.uid}` : order.method}</p><p className="truncate">{order.item.replace(order.game, "").trim() || order.item}</p></td><td className="px-3 py-2 font-bold tabular-nums">฿{order.price.toLocaleString()}</td><td className="px-3 py-2"><StatusBadge status={order.status} /></td><td className="px-3 py-2 text-xs text-muted-foreground">{order.date}</td><td className="px-3 py-2"><button type="button" onClick={() => setSelectedOrder(order)} className="whitespace-nowrap rounded-xl border border-border px-3 py-2 text-xs font-medium transition hover:border-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">ดูรายละเอียด</button></td></tr>)}</tbody></table></div>
          <ul className="divide-y divide-border xl:hidden">{visible.map((order) => <li key={order.id} className="p-4"><div className="flex items-start justify-between gap-3"><OrderProduct order={order} /><span className="shrink-0 text-sm font-bold tabular-nums">฿{order.price.toLocaleString()}</span></div><div className="mt-3 flex flex-wrap items-center justify-between gap-2"><span className="text-xs text-muted-foreground">#{order.id} · {order.date}</span><StatusBadge status={order.status} /></div><button type="button" onClick={() => setSelectedOrder(order)} className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-xs font-medium transition hover:bg-muted">ดูรายละเอียด</button></li>)}</ul>
        </> : <div className="flex flex-col items-center px-4 py-16 text-center"><PackageOpen className="size-10 text-muted-foreground/50" /><p className="mt-3 text-sm font-medium">ไม่พบคำสั่งซื้อที่ตรงกับเงื่อนไข</p><p className="mt-1 text-xs text-muted-foreground">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p></div>}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground"><label className="flex items-center gap-2">แสดง <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="h-9 rounded-lg border border-border bg-white px-2 font-medium text-foreground outline-none"><option value={5}>5</option><option value={10}>10</option><option value={20}>20</option></select> รายการต่อหน้า</label><div className="flex items-center gap-1"><span className="mr-2 hidden sm:inline">{filtered.length} รายการ</span><button type="button" aria-label="หน้าก่อนหน้า" disabled={page === 1} onClick={() => setPage(page - 1)} className="grid size-9 place-items-center rounded-lg border border-border bg-white text-foreground disabled:opacity-40"><ChevronLeft className="size-4" /></button>{Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" onClick={() => setPage(index + 1)} aria-current={page === index + 1 ? "page" : undefined} className={cn("grid size-9 place-items-center rounded-lg border text-sm font-semibold", page === index + 1 ? "border-primary bg-primary text-ink" : "border-border bg-white text-foreground")}>{index + 1}</button>)}<button type="button" aria-label="หน้าถัดไป" disabled={page === pageCount} onClick={() => setPage(page + 1)} className="grid size-9 place-items-center rounded-lg border border-border bg-white text-foreground disabled:opacity-40"><ChevronRight className="size-4" /></button></div></div>
      <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}
