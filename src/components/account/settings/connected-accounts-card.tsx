"use client";

import { useState } from "react";
import { Check, CheckCircle2, Link2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { saveSettingsPreferences, useSettingsPreferences } from "@/lib/settings-preferences";

type Provider = "line" | "google";
const providerNames: Record<Provider, string> = { line: "LINE", google: "Google" };

export function ConnectedAccountsCard() {
  const preferences = useSettingsPreferences();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [action, setAction] = useState<"connect" | "disconnect">("connect");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function openFlow(next: Provider) {
    setProvider(next);
    setAction(preferences.connections[next] ? "disconnect" : "connect");
    setSuccess(false);
    setError("");
  }

  function completeFlow() {
    if (!provider) return;
    const connected = action === "connect";
    if (!saveSettingsPreferences({
      ...preferences,
      connections: { ...preferences.connections, [provider]: connected },
    })) {
      setError("ไม่สามารถบันทึกสถานะตัวอย่างในเบราว์เซอร์นี้ได้");
      return;
    }
    setSuccess(true);
  }

  return <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-[0_3px_16px_-12px_rgba(112,74,8,.3)] sm:p-6">
    <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-sky-100 text-blue-600"><Link2 className="size-5" /></span><div><h2 className="text-lg font-bold text-ink">การเชื่อมต่ออื่น ๆ</h2><p className="text-xs text-muted-foreground">จัดการสถานะการเชื่อมต่อในโหมดตัวอย่าง</p></div></div>
    <div className="mt-4 divide-y divide-border/70">
      <div className="flex items-center gap-3 py-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#06c755] text-[10px] font-extrabold text-white">LINE</span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">เชื่อมต่อ LINE</p><p className="text-xs text-muted-foreground">{preferences.connections.line ? "สถานะเชื่อมต่อ (ตัวอย่าง)" : "รับการแจ้งเตือนผ่าน LINE"}</p></div><button type="button" onClick={() => openFlow("line")} className={`h-9 shrink-0 rounded-lg border px-3 text-xs font-semibold transition ${preferences.connections.line ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "border-border hover:bg-muted"}`}>{preferences.connections.line ? <><Check className="mr-1 inline size-3.5" /> จัดการ</> : "เชื่อมต่อ"}</button></div>
      <div className="flex items-center gap-3 py-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-white text-xl font-bold"><span className="bg-[conic-gradient(#4285f4_0_25%,#34a853_25%_45%,#fbbc05_45%_65%,#ea4335_65%_85%,#4285f4_85%)] bg-clip-text text-transparent">G</span></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">เชื่อมต่อ Google</p><p className="text-xs text-muted-foreground">{preferences.connections.google ? "สถานะเชื่อมต่อ (ตัวอย่าง)" : "ใช้บัญชี Google ในการเข้าสู่ระบบ"}</p></div><button type="button" onClick={() => openFlow("google")} className={`h-9 shrink-0 rounded-lg border px-3 text-xs font-semibold transition ${preferences.connections.google ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "border-border hover:bg-muted"}`}>{preferences.connections.google ? <><Check className="mr-1 inline size-3.5" /> จัดการ</> : "เชื่อมต่อ"}</button></div>
    </div>
    <Dialog open={provider !== null} onOpenChange={(open) => { if (!open) setProvider(null); }}><DialogContent>
      <p className="text-xs font-semibold text-coral">โหมดทดสอบ · ไม่เชื่อมบัญชีจริง</p>
      <DialogTitle className="mt-1">{provider ? `${action === "connect" ? "เชื่อมต่อ" : "ยกเลิกการเชื่อมต่อ"} ${providerNames[provider]}` : "การเชื่อมต่อบัญชี"}</DialogTitle>
      <DialogDescription className="mt-1">{success ? "ขั้นตอนตัวอย่างเสร็จสมบูรณ์" : "ตรวจสอบก่อนเปลี่ยนสถานะตัวอย่างในเบราว์เซอร์นี้"}</DialogDescription>
      {success ? <div className="mt-6 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="size-9" /></span><p className="mt-3 font-bold">{action === "connect" ? "เชื่อมต่อสำเร็จ (ตัวอย่าง)" : "ยกเลิกการเชื่อมต่อแล้ว (ตัวอย่าง)"}</p><p className="mt-1 text-xs text-muted-foreground">ไม่มีการเข้าสู่ระบบหรือส่งข้อมูลให้ {provider ? providerNames[provider] : "ผู้ให้บริการ"}</p><button type="button" onClick={() => setProvider(null)} className="mt-5 h-10 w-full rounded-xl bg-primary text-sm font-bold text-ink">เสร็จสิ้น</button></div> : <>
        <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4"><p className="text-sm font-semibold">{provider ? providerNames[provider] : "บัญชีภายนอก"}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{action === "connect" ? "ในระบบจริง ระบบจะพาไปยืนยันตัวตนและอนุญาตสิทธิ์กับผู้ให้บริการ แล้วกลับมายืนยันผลการเชื่อมต่อ" : "ในระบบจริง การยกเลิกจะถอนสิทธิ์ที่เชื่อมกับบัญชีนี้"}</p></div>
        {error && <p role="alert" className="mt-3 text-xs text-rose-600">{error}</p>}
        <div className="mt-5 flex gap-2"><button type="button" onClick={() => setProvider(null)} className="h-10 flex-1 rounded-xl border border-border text-sm font-semibold">ยกเลิก</button><button type="button" onClick={completeFlow} className={`h-10 flex-1 rounded-xl text-sm font-bold ${action === "connect" ? "bg-primary text-ink" : "bg-rose-500 text-white"}`}>{action === "connect" ? "จำลองการเชื่อมต่อ" : "ยืนยันยกเลิก (ตัวอย่าง)"}</button></div>
      </>}
    </DialogContent></Dialog>
  </section>;
}
