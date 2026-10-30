"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Info, Users, Wallet, Receipt, LayoutDashboard, type LucideIcon } from "lucide-react";
import { agent } from "@/lib/affiliate";
import { cn } from "@/lib/utils";
import { CommissionsTab } from "./commissions-tab";
import { HowItWorks } from "./how-it-works";
import { LinkCard } from "./link-card";
import { NetworkTab } from "./network-tab";
import { PayoutsTab } from "./payouts-tab";
import { StatsRow } from "./stats-row";

const tabs: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "ภาพรวม", icon: LayoutDashboard },
  { id: "network", label: "สายแนะนำ", icon: Users },
  { id: "commissions", label: "ค่าคอมมิชชัน", icon: Receipt },
  { id: "payouts", label: "การรับเงิน", icon: Wallet },
];

function Hero() {
  return (
    <section className="relative isolate min-h-40 overflow-hidden rounded-2xl bg-gradient-to-r from-white via-[#fff8e4] to-[#ffdb68] px-5 py-5 sm:px-7 sm:py-6">
      <div aria-hidden className="absolute -right-14 -top-24 size-80 rounded-full bg-primary/45 blur-3xl" />
      <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="pointer-events-none absolute -bottom-32 right-4 hidden w-72 drop-shadow-xl md:block" />
      <div className="relative z-10 max-w-xl">
        <nav aria-label="เส้นทางหน้าเว็บ" className="flex items-center gap-1.5 text-xs text-muted-foreground"><Link href="/" className="hover:text-foreground">หน้าแรก</Link><ChevronRight className="size-3" /><span>ตัวแทนแนะนำ</span></nav>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">ตัวแทนแนะนำและค่าคอมมิชชัน</h1>
        <p className="mt-1 text-sm text-muted-foreground">แชร์ลิงก์แนะนำ รับค่าคอมจากกำไรของรายการเติมเกม ซื้อซ้ำได้ค่าคอมทุกครั้ง ไม่มีการพักยอด</p>
      </div>
    </section>
  );
}

export function AffiliateView() {
  const [tab, setTab] = useState("overview");

  if (agent.status !== "active") {
    return (
      <div className="space-y-5">
        <Hero />
        <p className="flex items-start gap-3 rounded-2xl border border-coral/30 bg-coral/10 p-5 text-sm text-coral"><Info className="mt-0.5 size-4 shrink-0" />สิทธิ์การเป็นตัวแทนของคุณถูกระงับ กรุณาติดต่อผู้ดูแลระบบ</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Hero />
      <LinkCard />
      <StatsRow />
      <div role="tablist" aria-label="หัวข้อตัวแทน" className="no-scrollbar flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={cn("flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </div>
      {tab === "overview" && <HowItWorks />}
      {tab === "network" && <NetworkTab />}
      {tab === "commissions" && <CommissionsTab />}
      {tab === "payouts" && <PayoutsTab />}
    </div>
  );
}
