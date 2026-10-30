import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Crown, Gift, Headphones, ShieldCheck, Zap } from "lucide-react";
import { BalanceCard } from "./wallet/balance-card";
import { TopUpCard } from "./wallet/topup-card";
import { TransactionList } from "./wallet/transaction-list";

function WalletHero() {
  return (
    <section className="relative isolate min-h-40 overflow-hidden rounded-2xl bg-gradient-to-r from-white via-[#fff8e4] to-[#ffdb68] px-5 py-5 sm:px-7 sm:py-6">
      <div aria-hidden className="absolute -right-14 -top-24 size-80 rounded-full bg-primary/45 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 right-0 h-10 w-2/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)]" />
      <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="pointer-events-none absolute -bottom-32 right-4 hidden w-72 drop-shadow-xl md:block" />
      <div className="relative z-10 max-w-xl">
        <nav aria-label="เส้นทางหน้าเว็บ" className="flex items-center gap-1.5 text-xs text-muted-foreground"><Link href="/" className="hover:text-foreground">หน้าแรก</Link><ChevronRight className="size-3.5" /><span className="text-foreground">กระเป๋าเงิน</span></nav>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">กระเป๋าเงิน</h1>
        <p className="mt-1 text-sm text-muted-foreground">เติมเงินเพื่อใช้ในการซื้อเกม ไอดีเกม และสินค้าดิจิทัล</p>
      </div>
    </section>
  );
}

function WalletPerks() {
  return (
    <section className="relative isolate flex min-h-[196px] overflow-hidden rounded-2xl border border-primary/35 bg-[#fff3be] p-5 xl:h-[196px]">
      <Image src="/images/wallet-perks-bg.png" alt="" fill sizes="(min-width: 1280px) 600px, 100vw" className="-z-10 object-cover object-center" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-white/65 via-white/35 to-transparent" />
      <div className="relative z-10 max-w-[72%] self-center sm:max-w-[68%]">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-[11px] font-semibold text-coral"><Gift className="size-3.5" /> เติมคุ้มกว่า</p>
        <h2 className="mt-2 text-lg font-extrabold tracking-tight sm:text-xl">เติมแล้วได้อะไรมากกว่า</h2>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] font-medium text-ink/80">
          <li className="inline-flex items-center gap-1"><Crown className="size-3.5 text-amber-600" /> รับโบนัสพิเศษ</li>
          <li className="inline-flex items-center gap-1"><Zap className="size-3.5 text-amber-600" /> ใช้งานได้ทันที</li>
          <li className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5 text-success" /> ปลอดภัย 100%</li>
        </ul>
      </div>
    </section>
  );
}

function HelpCard() {
  return (
    <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-sky-100 bg-sky-50 p-4 sm:p-5"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-600"><Headphones className="size-6" /></span><div className="min-w-0 flex-1"><h2 className="font-semibold">มีปัญหาการเติมเงิน?</h2><p className="text-xs text-muted-foreground">หากเติมเงินแล้วไม่ขึ้น สามารถติดต่อทีมงานได้ทันที</p></div><Link href="/help" className="inline-flex h-10 items-center gap-2 rounded-xl border border-sky-400 px-4 text-sm font-semibold text-sky-600 transition hover:bg-sky-100">ติดต่อทีมงาน <ArrowRight className="size-4" /></Link></section>
  );
}

export function WalletView() {
  return (
    <div className="space-y-5">
      <WalletHero />
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-5"><BalanceCard /><TopUpCard /></div>
        <div className="min-w-0 space-y-5"><WalletPerks /><TransactionList /><HelpCard /></div>
      </div>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><Check className="size-4 text-success" /> ข้อมูลการชำระเงินของคุณปลอดภัยด้วยระบบที่เชื่อถือได้</p>
    </div>
  );
}
