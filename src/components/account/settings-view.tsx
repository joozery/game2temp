import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CircleCheck, Coins, Crown, Gem, LockKeyhole, ShieldCheck } from "lucide-react";
import { DangerZone } from "./settings/danger-zone";
import { NotificationCard } from "./settings/notification-card";
import { ProfileForm } from "./settings/profile-form";
import { SecurityCard } from "./settings/security-card";
import { ConnectedAccountsCard } from "./settings/connected-accounts-card";

function SettingsHero() {
  return <div className="relative isolate min-h-[178px] rounded-2xl bg-[linear-gradient(105deg,#fffefb_12%,#fff4cf_60%,#ffe6a4_100%)] px-5 py-5 sm:px-7">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,rgba(255,193,48,.32),transparent_35%),radial-gradient(circle_at_97%_10%,rgba(255,255,255,.8),transparent_26%)]" />
    <div aria-hidden className="absolute -bottom-24 right-[12%] size-72 rounded-full border-[24px] border-white/35" />
    <div className="relative z-10 max-w-[58%] sm:max-w-[52%]">
      <nav aria-label="เส้นทางหน้าเว็บ" className="flex items-center gap-1.5 text-xs text-muted-foreground"><Link href="/" className="hover:text-foreground">หน้าแรก</Link><ChevronRight className="size-3.5" /><span className="font-semibold text-ink">ตั้งค่าบัญชี</span></nav>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">ตั้งค่าบัญชี</h1>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">จัดการข้อมูลบัญชี ความปลอดภัย และการแจ้งเตือนของคุณ</p>
    </div>
    <div aria-hidden className="absolute right-[29%] top-8 hidden size-10 rotate-[-16deg] place-items-center rounded-xl bg-amber-400/70 text-white shadow-lg sm:grid"><Coins className="size-6" /></div>
    <div aria-hidden className="absolute right-[10%] top-3 hidden size-9 rotate-[16deg] place-items-center rounded-xl bg-cyan-400/75 text-white shadow-lg sm:grid"><Gem className="size-5" /></div>
    <div aria-hidden className="absolute right-[26%] bottom-3 hidden size-12 rotate-[12deg] place-items-center rounded-xl bg-sky-400/80 text-white shadow-lg sm:grid"><LockKeyhole className="size-7" /></div>
    <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="pointer-events-none absolute -bottom-9 right-[7%] z-10 w-44 drop-shadow-[0_8px_14px_rgba(91,57,6,.25)] sm:-bottom-11 sm:right-[20%] sm:w-[230px]" />
    <div className="absolute bottom-10 right-5 z-20 hidden -rotate-6 rounded-2xl border border-white bg-white/90 px-5 py-3 text-center text-sm font-bold text-ink shadow-md xl:block"><ShieldCheck className="mb-1 inline-block size-5 text-emerald-500" /> บัญชีปลอดภัย<br />เล่นเกมได้สบายใจ <Crown className="inline size-4 text-amber-500" /></div>
  </div>;
}

export function SettingsView() {
  return <div className="space-y-4 sm:space-y-5">
    <SettingsHero />
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(340px,1fr)]">
      <div className="min-w-0 space-y-4"><ProfileForm /><NotificationCard /></div>
      <div className="min-w-0 space-y-4"><SecurityCard /><ConnectedAccountsCard /></div>
    </div>
    <DangerZone />
    <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><CircleCheck className="size-3.5 text-emerald-500" /> การตั้งค่าในหน้านี้เป็นตัวอย่าง UI</p>
  </div>;
}
