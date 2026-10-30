"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function DangerZone() {
  const [open, setOpen] = useState(false);

  return <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/70 p-4 sm:p-5">
    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-500"><Trash2 className="size-5" /></span>
    <div className="min-w-0 flex-1"><h2 className="text-base font-bold text-ink">จัดการบัญชี</h2><p className="text-xs text-muted-foreground">หากคุณต้องการปิดหรือลบบัญชี โปรดอ่านรายละเอียดให้ครบถ้วนก่อนดำเนินการ</p></div>
    <button type="button" onClick={() => setOpen(true)} className="h-10 shrink-0 rounded-xl border border-rose-400 px-5 text-sm font-semibold text-rose-500 transition hover:bg-rose-100">ปิดบัญชี</button>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogTitle>จัดการบัญชี</DialogTitle><DialogDescription className="mt-2">หน้านี้เป็นตัวอย่าง UI ยังไม่เชื่อมต่อระบบบัญชี จึงยังไม่สามารถปิดหรือลบบัญชีได้</DialogDescription><button type="button" onClick={() => setOpen(false)} className="mt-5 h-10 w-full rounded-xl bg-primary text-sm font-bold text-ink">เข้าใจแล้ว</button></DialogContent></Dialog>
  </section>;
}
