"use client";

import { Bell, LockKeyhole, Megaphone, ShoppingCart, Wallet, type LucideIcon } from "lucide-react";
import { saveSettingsPreferences, useSettingsPreferences, type NotificationTopic } from "@/lib/settings-preferences";

const rows: { key: NotificationTopic; label: string; detail: string; icon: LucideIcon; tone: string }[] = [
  { key: "orders", label: "แจ้งเตือนคำสั่งซื้อ", detail: "แจ้งเมื่อมีการสั่งซื้อสำเร็จ / เปลี่ยนสถานะ", icon: ShoppingCart, tone: "bg-orange-50 text-orange-500" },
  { key: "promos", label: "โปรโมชั่นและข่าวสาร", detail: "รับข้อมูลโปรโมชั่น เกมใหม่ และสิทธิพิเศษ", icon: Megaphone, tone: "bg-amber-50 text-orange-500" },
  { key: "wallet", label: "เติมเงินและเครดิต", detail: "แจ้งเมื่อเติมเงินสำเร็จ หรือได้รับเครดิต", icon: Wallet, tone: "bg-emerald-50 text-emerald-600" },
  { key: "security", label: "ความปลอดภัยของบัญชี", detail: "แจ้งเตือนการเข้าสู่ระบบ และกิจกรรมที่สำคัญ", icon: LockKeyhole, tone: "bg-emerald-50 text-teal-600" },
];

function NotificationSwitch({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return <button type="button" role="switch" aria-label={label} aria-checked={checked} onClick={onChange} className={`relative h-6 w-11 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${checked ? "bg-primary" : "bg-border"}`}><span className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : ""}`} /></button>;
}

export function NotificationCard() {
  const preferences = useSettingsPreferences();
  const notify = preferences.notifications;

  function toggle(topic: NotificationTopic) {
    saveSettingsPreferences({
      ...preferences,
      notifications: { ...notify, [topic]: !notify[topic] },
    });
  }

  return <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-[0_3px_16px_-12px_rgba(112,74,8,.3)] sm:p-6">
    <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-orange-500"><Bell className="size-5" /></span><div><h2 className="text-lg font-bold text-ink">การแจ้งเตือน</h2><p className="text-xs text-muted-foreground">เปิดหรือปิดประเภทที่ต้องการแสดงตรงกระดิ่ง</p></div></div>
    <div className="mt-3 divide-y divide-border/70">{rows.map(({ key, label, detail, icon: Icon, tone }) => <div key={key} className="flex items-center gap-3 py-3"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}><Icon className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{label}</p><p className="text-xs text-muted-foreground">{detail}</p></div><NotificationSwitch checked={notify[key]} label={`${label} ที่กระดิ่ง`} onChange={() => toggle(key)} /></div>)}</div>
    <p className="mt-2 text-[11px] text-muted-foreground">บันทึกตัวเลือกในเบราว์เซอร์นี้อัตโนมัติ</p>
  </section>;
}
