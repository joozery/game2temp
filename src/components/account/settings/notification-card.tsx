"use client";

import { Bell, LockKeyhole, Megaphone, ShoppingCart, Wallet, type LucideIcon } from "lucide-react";
import { saveSettingsPreferences, useSettingsPreferences, type NotificationChannel, type NotificationTopic } from "@/lib/settings-preferences";

const rows: { key: NotificationTopic; label: string; detail: string; icon: LucideIcon; tone: string }[] = [
  { key: "orders", label: "แจ้งเตือนคำสั่งซื้อ", detail: "แจ้งเมื่อมีการสั่งซื้อสำเร็จ / เปลี่ยนสถานะ", icon: ShoppingCart, tone: "bg-orange-50 text-orange-500" },
  { key: "promos", label: "โปรโมชั่นและข่าวสาร", detail: "รับข้อมูลโปรโมชั่น เกมใหม่ และสิทธิพิเศษ", icon: Megaphone, tone: "bg-amber-50 text-orange-500" },
  { key: "wallet", label: "เติมเงินและเครดิต", detail: "แจ้งเมื่อเติมเงินสำเร็จ หรือได้รับเครดิต", icon: Wallet, tone: "bg-emerald-50 text-emerald-600" },
  { key: "security", label: "ความปลอดภัยของบัญชี", detail: "แจ้งเตือนการเข้าสู่ระบบ และกิจกรรมที่สำคัญ", icon: LockKeyhole, tone: "bg-emerald-50 text-teal-600" },
];

function ChannelSwitch({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink"><button type="button" role="switch" aria-label={label} aria-checked={checked} onClick={onChange} className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-primary" : "bg-border"}`}><span className={`absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-4" : ""}`} /></button>{label.split(" ")[0]}</div>;
}

export function NotificationCard() {
  const preferences = useSettingsPreferences();
  const notify = preferences.notifications;

  function toggle(topic: NotificationTopic, channel: NotificationChannel) {
    saveSettingsPreferences({
      ...preferences,
      notifications: { ...notify, [topic]: { ...notify[topic], [channel]: !notify[topic][channel] } },
    });
  }

  return <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-[0_3px_16px_-12px_rgba(112,74,8,.3)] sm:p-6">
    <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-orange-500"><Bell className="size-5" /></span><div><h2 className="text-lg font-bold text-ink">การแจ้งเตือน</h2><p className="text-xs text-muted-foreground">เลือกช่องทางและประเภทการแจ้งเตือนที่ต้องการรับ</p></div></div>
    <div className="mt-3 divide-y divide-border/70">{rows.map(({ key, label, detail, icon: Icon, tone }) => <div key={key} className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 py-3 sm:grid-cols-[40px_minmax(0,1fr)_auto]"><span className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon className="size-5" /></span><div className="min-w-0"><p className="text-sm font-semibold">{label}</p><p className="text-xs text-muted-foreground">{detail}</p></div><div className="col-start-2 flex items-center gap-4 sm:col-start-auto"><ChannelSwitch checked={notify[key].email} label={`อีเมล ${label}`} onChange={() => toggle(key, "email")} /><ChannelSwitch checked={notify[key].line} label={`LINE ${label}`} onChange={() => toggle(key, "line")} /></div></div>)}</div>
    <p className="mt-2 text-[11px] text-muted-foreground">บันทึกตัวเลือกในเบราว์เซอร์นี้อัตโนมัติ · ยังไม่ได้เชื่อมต่อบริการส่งข้อความ</p>
  </section>;
}
