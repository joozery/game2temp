"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Plan, PremiumApp } from "@/lib/premium-apps";

export function PremiumDialog({ app, plan, onClose }: { app: PremiumApp; plan: Plan; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const personal = app.access === "บัญชีส่วนตัว";

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-14 text-success" />
            <DialogTitle className="mt-4 text-xl">บันทึกตัวอย่างคำสั่งซื้อแล้ว</DialogTitle>
            <DialogDescription className="mt-2">{app.name} {plan.months} เดือน — ฿{plan.price.toLocaleString()} นี่คือตัวอย่าง UI ยังไม่มีการชำระเงินหรือส่งบัญชีจริง</DialogDescription>
            <Button className="mt-6 w-full" onClick={onClose}>ตกลง</Button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <div className="relative -mx-6 -mt-6 aspect-[2.2] overflow-hidden rounded-t-2xl bg-section">
              <Image src={`/images/premium/${app.id}.webp`} alt="" fill sizes="640px" className="object-cover" />
            </div>
            <p className="mt-4 text-xs font-medium text-muted-foreground">{app.category} · {app.access}</p>
            <DialogTitle className="text-xl">{app.name} · {plan.months} เดือน</DialogTitle>
            <DialogDescription className="mt-1">{app.tagline}</DialogDescription>

            {personal && (
              <div className="mt-4">
                <label htmlFor="premium-email" className="mb-1.5 block text-sm font-medium">อีเมลสำหรับรับสิทธิ์</label>
                <Input id="premium-email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            )}
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><Zap className="size-4 text-amber-500" /> ได้รับภายใน 5 นาทีหลังชำระเงิน</p>
              <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /> รับประกันตลอดอายุการใช้งาน</p>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <div><p className="text-xs text-muted-foreground">ยอดชำระ</p><strong className="text-2xl">฿{plan.price.toLocaleString()}</strong></div>
              <Button type="submit" size="lg" className="ml-auto flex-1 sm:flex-none">ซื้อเลย</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
