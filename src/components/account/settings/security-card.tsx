"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, KeyRound, Laptop2, LogOut, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Flow = "password" | "devices" | "logout";

const titles: Record<Flow, string> = {
  password: "เปลี่ยนรหัสผ่าน",
  devices: "อุปกรณ์ที่เข้าสู่ระบบ",
  logout: "ออกจากระบบทุกอุปกรณ์",
};

export function SecurityCard() {
  const [flow, setFlow] = useState<Flow | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function openFlow(next: Flow) {
    setFlow(next);
    setSuccess(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  }

  function completePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentPassword || newPassword.length < 8) {
      setError("กรุณากรอกรหัสตัวอย่างปัจจุบัน และรหัสใหม่อย่างน้อย 8 ตัวอักษร");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("รหัสใหม่และรหัสยืนยันไม่ตรงกัน");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(true);
  }

  return <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-[0_3px_16px_-12px_rgba(112,74,8,.3)] sm:p-6">
    <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-sky-100 text-blue-600"><ShieldCheck className="size-5" /></span><div><h2 className="text-lg font-bold text-ink">ความปลอดภัย</h2><p className="text-xs text-muted-foreground">ดูแลความปลอดภัยของบัญชี</p></div></div>
    <div className="mt-4 divide-y divide-border/70">
      <div className="flex items-center gap-3 py-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-ink"><KeyRound className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">รหัสผ่าน</p><p className="text-xs text-muted-foreground">เปลี่ยนรหัสผ่านของคุณ</p></div><button type="button" onClick={() => openFlow("password")} className="h-9 shrink-0 rounded-lg border border-border px-3 text-xs font-semibold transition hover:bg-muted">เปลี่ยนรหัสผ่าน</button></div>
      <div className="flex items-center gap-3 py-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-ink"><Laptop2 className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">อุปกรณ์ที่เข้าสู่ระบบ</p><p className="text-xs text-muted-foreground">จัดการอุปกรณ์ที่เข้าสู่ระบบบัญชี</p></div><button type="button" onClick={() => openFlow("devices")} className="h-9 shrink-0 rounded-lg border border-border px-3 text-xs font-semibold transition hover:bg-muted">ดูอุปกรณ์</button></div>
      <div className="flex items-center gap-3 py-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-500"><LogOut className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">ออกจากระบบทุกอุปกรณ์</p><p className="text-xs text-muted-foreground">ออกจากระบบในอุปกรณ์ทั้งหมด</p></div><button type="button" onClick={() => openFlow("logout")} className="h-9 shrink-0 rounded-lg border border-rose-300 px-3 text-xs font-semibold text-rose-500 transition hover:bg-rose-50">ออกจากระบบ</button></div>
    </div>
    <Dialog open={flow !== null} onOpenChange={(open) => { if (!open) setFlow(null); }}><DialogContent>
      <p className="text-xs font-semibold text-coral">โหมดทดสอบ · ไม่เปลี่ยนบัญชีจริง</p>
      <DialogTitle className="mt-1">{flow ? titles[flow] : "ความปลอดภัย"}</DialogTitle>
      <DialogDescription className="mt-1">{success ? "ขั้นตอนตัวอย่างเสร็จสมบูรณ์" : "ทดลองลำดับการใช้งานก่อนเชื่อมต่อระบบบัญชีจริง"}</DialogDescription>
      {success ? <div className="mt-6 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="size-9" /></span><p className="mt-3 font-bold">{flow === "password" ? "ตรวจสอบรหัสตัวอย่างสำเร็จ" : flow === "devices" ? "จำลองออกจากอุปกรณ์อื่นแล้ว" : "จำลองออกจากระบบแล้ว"}</p><p className="mt-1 text-xs text-muted-foreground">ไม่มีการเปลี่ยนรหัสผ่าน เซสชัน หรือความปลอดภัยของบัญชีจริง</p><button type="button" onClick={() => setFlow(null)} className="mt-5 h-10 w-full rounded-xl bg-primary text-sm font-bold text-ink">เสร็จสิ้น</button></div> : <>
        {flow === "password" && <form onSubmit={completePassword} className="mt-5 space-y-3"><p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900">กรุณาใช้รหัสสมมติสำหรับทดลอง อย่าใส่รหัสผ่านจริง</p><label className="block text-xs font-medium">รหัสปัจจุบัน (ตัวอย่าง)<input type="password" autoComplete="off" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border px-3 text-sm" /></label><label className="block text-xs font-medium">รหัสใหม่ (อย่างน้อย 8 ตัวอักษร)<input type="password" autoComplete="off" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border px-3 text-sm" /></label><label className="block text-xs font-medium">ยืนยันรหัสใหม่<input type="password" autoComplete="off" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-border px-3 text-sm" /></label>{error && <p role="alert" className="text-xs text-rose-600">{error}</p>}<button type="submit" className="h-10 w-full rounded-xl bg-primary text-sm font-bold text-ink">ทดลองเปลี่ยนรหัสผ่าน</button></form>}
        {flow === "devices" && <div className="mt-5"><div className="flex items-center gap-3 rounded-xl border border-border p-4"><Laptop2 className="size-6 text-blue-600" /><div><p className="text-sm font-semibold">เบราว์เซอร์นี้</p><p className="text-xs text-muted-foreground">อุปกรณ์ปัจจุบัน · ข้อมูลตัวอย่าง</p></div><span className="ml-auto rounded-full bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">ปัจจุบัน</span></div><p className="mt-3 text-xs text-muted-foreground">ระบบจริงจะแสดงอุปกรณ์ทั้งหมดที่เข้าสู่ระบบและให้ยกเลิกแต่ละเซสชัน</p><button type="button" onClick={() => setSuccess(true)} className="mt-4 h-10 w-full rounded-xl bg-primary text-sm font-bold text-ink">จำลองออกจากอุปกรณ์อื่น</button></div>}
        {flow === "logout" && <div className="mt-5"><p className="rounded-xl bg-rose-50 p-4 text-sm">ในระบบจริง การยืนยันจะออกจากระบบทุกอุปกรณ์และต้องเข้าสู่ระบบใหม่</p><button type="button" onClick={() => setSuccess(true)} className="mt-4 h-10 w-full rounded-xl bg-rose-500 text-sm font-bold text-white">จำลองออกจากระบบทุกอุปกรณ์</button></div>}
      </>}
    </DialogContent></Dialog>
  </section>;
}
