import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Crown, Headset, Mail } from "lucide-react";
import { ProfileHero } from "./profile/profile-hero";
import { RecentOrdersCard } from "./profile/recent-orders-card";
import { StatsRow } from "./profile/stats-row";
import { WalletCard } from "./profile/wallet-card";
import { user } from "@/lib/account";

function PromoBanner() {
  return (
    <Link
      href="/#games"
      aria-label="เติมเกมง่าย ปลอดภัย 100% — ไปหน้าเติมเกม"
      className="block aspect-[2.35/1] min-w-0 overflow-hidden rounded-2xl border border-primary/30 bg-[#fff2b5] bg-[url('/exam/cover.png')] bg-cover bg-center shadow-[0_3px_14px_-10px_rgba(16,24,39,.25)] transition hover:brightness-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:aspect-[2073/758]"
    />
  );
}

function MembershipCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-[#fff5cd] to-[#fffaf0] p-5">
      <div className="relative z-10 flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-full bg-primary text-ink"><Crown className="size-6" /></span>
        <div className="flex-1"><p className="text-xs text-muted-foreground">ระดับสมาชิก</p><h2 className="text-lg font-bold">{user.tier}</h2></div>
        <Link href="/settings" className="inline-flex items-center gap-1 rounded-full border border-primary/60 bg-white/60 px-3 py-1.5 text-xs font-semibold transition hover:bg-white">สิทธิพิเศษ <ChevronRight className="size-3.5" /></Link>
      </div>
      <div className="relative z-10 mt-5 flex items-end justify-between text-xs"><span className="text-muted-foreground">ยอดใช้จ่ายสะสม</span><span className="font-semibold tabular-nums">฿{user.stats.spent.toLocaleString()} <span className="font-normal text-muted-foreground">/ ฿25,000</span></span></div>
      <div className="relative z-10 mt-2 h-2.5 overflow-hidden rounded-full bg-[#f1e4b9]" role="progressbar" aria-valuenow={user.tierProgress} aria-valuemin={0} aria-valuemax={100} aria-label="ความคืบหน้าระดับสมาชิก"><div className="h-full rounded-full bg-gradient-to-r from-primary to-amber-400" style={{ width: `${user.tierProgress}%` }} /></div>
      <p className="relative z-10 mt-3 text-xs">อีก ฿{Math.max(0, 25000 - user.stats.spent).toLocaleString()} เพื่ออัปเกรดเป็น {user.nextTier}</p>
      <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="pointer-events-none absolute -bottom-14 -right-9 size-36 opacity-70" />
    </section>
  );
}

function ContactCard() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-coral/10 text-coral"><Headset className="size-5" /></span><div><h2 className="font-semibold">ช่องทางติดต่อ</h2><p className="text-xs text-muted-foreground">หากมีคำถามหรือพบปัญหา</p></div></div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href="/help" className="rounded-lg bg-success px-3 py-2 text-center text-xs font-semibold text-white transition hover:brightness-95">ศูนย์ช่วยเหลือ</Link>
        <a href="mailto:support@pk-topup.com" className="inline-flex items-center justify-center gap-1 rounded-lg bg-coral/10 px-3 py-2 text-xs font-semibold text-coral transition hover:bg-coral/20"><Mail className="size-3.5" /> ติดต่อเรา</a>
      </div>
    </section>
  );
}

export function ProfileView() {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <nav aria-label="เส้นทางหน้าเว็บ" className="flex items-center gap-1.5 text-xs text-muted-foreground"><Link href="/" className="hover:text-foreground">หน้าแรก</Link><ChevronRight className="size-3.5" /><span className="text-foreground">บัญชีของฉัน</span></nav>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">บัญชีของฉัน</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">จัดการข้อมูลบัญชีและรายการต่าง ๆ ของคุณได้ที่นี่</p>
      </div>
      <ProfileHero />
      <StatsRow />
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,335px)]">
        <div className="min-w-0 space-y-4"><PromoBanner /><RecentOrdersCard /></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><WalletCard /><MembershipCard /><ContactCard /></div>
      </div>
    </div>
  );
}
