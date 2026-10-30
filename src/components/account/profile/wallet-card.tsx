import Link from "next/link";
import { ArrowDownToLine, ArrowRight, CreditCard, History, Plus, Wallet } from "lucide-react";
import { user } from "@/lib/account";

const actions = [
  { label: "เติมเงิน", href: "/wallet", icon: Plus, tone: "bg-mint/30 text-ink" },
  { label: "รายการเงิน", href: "/wallet", icon: ArrowDownToLine, tone: "bg-coral/10 text-coral" },
  { label: "ประวัติ", href: "/orders", icon: History, tone: "bg-[#f7edf4] text-ink" },
  { label: "ตั้งค่าบัญชี", href: "/settings", icon: CreditCard, tone: "bg-sky-100 text-sky-700" },
];

export function WalletCard() {
  return (
    <section className="rounded-2xl border border-border bg-white p-4 shadow-[0_3px_14px_-10px_rgba(16,24,39,.25)] sm:p-5">
      <div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-primary/35 text-ink"><Wallet className="size-5" /></span><h2 className="font-bold">กระเป๋าเงินของฉัน</h2></div>
      <div className="mt-4 flex items-end justify-between gap-2"><div><p className="text-xs text-muted-foreground">ยอดเงินคงเหลือ</p><p className="mt-0.5 text-3xl font-bold tabular-nums tracking-tight">฿{user.balance.toLocaleString()}<span className="text-lg text-muted-foreground">.00</span></p></div><Link href="/wallet" className="inline-flex h-10 shrink-0 items-center gap-1 rounded-xl bg-primary px-3.5 text-xs font-bold text-ink transition hover:bg-primary-hover"><Plus className="size-4" /> เติมเงิน</Link></div>
      <div className="mt-5 grid grid-cols-4 gap-2">{actions.map(({ label, href, icon: Icon, tone }) => <Link key={label} href={href} className="group flex min-w-0 flex-col items-center gap-1.5 text-center text-[10px] text-ink transition hover:text-coral"><span className={`grid size-10 place-items-center rounded-xl transition group-hover:scale-105 ${tone}`}><Icon className="size-5" /></span><span className="truncate">{label}</span></Link>)}</div>
      <Link href="/wallet" className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs font-medium text-ink/70 transition hover:text-ink">ดูกระเป๋าเงินทั้งหมด <ArrowRight className="size-4" /></Link>
    </section>
  );
}
