"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ChevronRight, Crown, Pencil, ShieldCheck } from "lucide-react";
import { ProfileAvatarImage } from "../profile-avatar-image";
import { user } from "@/lib/account";
import { useAccountProfile } from "@/lib/account-profile";

export function ProfileHero() {
  const accountProfile = useAccountProfile();
  return (
    <section aria-label="ข้อมูลสมาชิก" className="relative isolate overflow-hidden rounded-2xl bg-[#101d2e] text-white shadow-[0_12px_30px_-20px_rgba(16,24,39,.65)]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_61%_30%,rgba(255,197,58,.22),transparent_23%),radial-gradient(circle_at_42%_85%,rgba(18,161,183,.17),transparent_30%),linear-gradient(120deg,#0c1728,#1d293a)]" />
      <div aria-hidden className="absolute -right-10 -top-20 size-60 rounded-full border border-white/5" />
      <div className="relative z-10 grid min-h-[195px] gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_minmax(220px,30%)] lg:gap-4 lg:py-6">
        <div className="relative z-10 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <div className="relative size-[76px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffe67a] to-primary shadow-lg ring-2 ring-white/20 sm:size-[92px]"><ProfileAvatarImage alt={`รูปโปรไฟล์ของ ${accountProfile.name}`} sizes="(min-width: 640px) 92px, 76px" /></div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"><Crown className="size-4" /> สมาชิก {user.tier}</span>
              <h2 className="mt-2 truncate text-2xl font-bold tracking-tight">{accountProfile.name}</h2>
              <p className="text-sm text-white/65">@{user.username}</p>
            </div>
            <Link href="/settings" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-medium transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:ml-2"><Pencil className="size-3.5" /> แก้ไขโปรไฟล์</Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80"><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-cyan-300" /> สมาชิกตั้งแต่ {user.memberSince}</span><span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-emerald-400" /> ยืนยันตัวตนแล้ว</span></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center rounded-2xl bg-[#1e293b]/90 p-5 ring-1 ring-white/10">
          <div className="flex items-start justify-between gap-2"><div className="flex items-start gap-2"><Crown className="mt-0.5 size-4 text-primary" /><div><p className="text-xs text-white/65">ระดับสมาชิกปัจจุบัน</p><p className="text-sm font-semibold">{user.tier}</p></div></div><Link href="/settings" className="inline-flex shrink-0 items-center gap-1 text-[11px] hover:text-primary">ดูสิทธิพิเศษ <ChevronRight className="size-3" /></Link></div>
          <p className="mt-3 text-xs text-white/65">ยอดใช้จ่ายสะสม</p>
          <p className="text-2xl font-bold tabular-nums">฿{user.stats.spent.toLocaleString()} <span className="text-sm font-normal text-white/60">/ ฿25,000</span></p>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={user.tierProgress} aria-valuemin={0} aria-valuemax={100} aria-label="ความคืบหน้าระดับสมาชิก"><div className="h-full rounded-full bg-gradient-to-r from-primary to-[#ffe782]" style={{ width: `${user.tierProgress}%` }} /></div>
          <p className="mt-3 text-right text-[11px] text-white/80">อีก ฿{Math.max(0, 25000 - user.stats.spent).toLocaleString()} เพื่ออัปเกรดเป็น {user.nextTier}</p>
        </div>
      </div>
      <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="pointer-events-none absolute bottom-[-80px] left-[53%] z-0 hidden w-[265px] -translate-x-1/2 drop-shadow-[0_10px_22px_rgba(0,0,0,.4)] lg:block xl:w-[310px]" />
    </section>
  );
}
