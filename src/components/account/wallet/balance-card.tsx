import Link from "next/link";
import { ArrowRight, Gift, Wallet } from "lucide-react";
import { user } from "@/lib/account";

export function BalanceCard() {
  return (
    <section aria-label="ยอดเงินในกระเป๋า" className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffe88e] via-[#ffdc66] to-[#ffc94f] p-4 shadow-[0_10px_24px_-18px_rgba(153,105,0,.5)] sm:p-5 xl:h-[196px]">
      <div aria-hidden className="absolute -right-10 -top-20 size-72 rounded-full bg-white/30 blur-2xl" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,transparent_65%,rgba(255,255,255,.2)_65%,rgba(255,255,255,.2)_73%,transparent_73%)]" />
      <div className="relative z-10 flex items-center gap-4"><span className="grid size-16 place-items-center rounded-2xl bg-white/70 text-amber-600 shadow-sm"><Wallet className="size-8" /></span><div><p className="text-sm font-semibold text-ink/70">ยอดเงินคงเหลือ</p><p className="mt-0.5 text-3xl font-extrabold tabular-nums tracking-tight sm:text-4xl">฿{user.balance.toLocaleString()}<span className="text-2xl">.00</span></p></div></div>
      <div className="relative z-10 mt-5 grid gap-3 rounded-xl bg-white/80 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center"><div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-lg bg-success/15 text-success"><Wallet className="size-5" /></span><div><p className="text-xs text-muted-foreground">เงินที่สามารถใช้ได้</p><p className="font-bold tabular-nums">฿{user.balance.toLocaleString()}.00</p></div></div><div className="flex items-center gap-2.5 sm:border-l sm:border-border sm:pl-4"><span className="grid size-9 place-items-center rounded-lg bg-coral/10 text-coral"><Gift className="size-5" /></span><div><p className="text-xs text-muted-foreground">โบนัสเครดิต</p><p className="font-bold tabular-nums">฿{user.bonusCredit.toLocaleString()}.00</p></div></div><Link href="#transactions" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary/30 px-3 text-xs font-semibold transition hover:bg-primary/60">ประวัติการใช้งาน <ArrowRight className="size-4" /></Link></div>
    </section>
  );
}
