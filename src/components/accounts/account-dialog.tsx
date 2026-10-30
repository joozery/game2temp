"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { GameAccount } from "@/lib/accounts";

export function AccountDialog({ account: a, onClose }: { account: GameAccount; onClose: () => void }) {
  const [done, setDone] = useState(false);

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-14 text-success" />
            <DialogTitle className="mt-4 text-xl">บันทึกตัวอย่างคำสั่งซื้อแล้ว</DialogTitle>
            <DialogDescription className="mt-2">{a.title} — ฿{a.price.toLocaleString()} นี่คือตัวอย่าง UI ยังไม่มีการชำระเงินหรือส่งมอบไอดีจริง</DialogDescription>
            <Button className="mt-6 w-full" onClick={onClose}>ตกลง</Button>
          </div>
        ) : (
          <>
            <div className="-mx-6 -mt-6 aspect-[2] overflow-hidden rounded-t-2xl"><Artwork name={a.game} /></div>
            <p className="mt-4 text-xs font-medium text-muted-foreground">{a.gameName}</p>
            <DialogTitle className="text-xl">{a.title}</DialogTitle>
            <DialogDescription className="mt-1">{a.detail}</DialogDescription>

            <ul className="mt-4 grid grid-cols-2 gap-2">
              {a.specs.map((s) => (
                <li key={s} className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-sm"><CheckCircle2 className="size-4 shrink-0 text-success" /> {s}</li>
              ))}
            </ul>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /> รับประกัน 7 วัน หากไอดีมีปัญหาเปลี่ยนให้ใหม่หรือคืนเงิน</p>
              <p className="flex items-center gap-2"><Zap className="size-4 text-amber-500" /> ส่งมอบข้อมูลไอดีทันทีหลังชำระเงิน</p>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <div><p className="text-xs text-muted-foreground">ราคา</p><strong className="text-2xl">฿{a.price.toLocaleString()}</strong></div>
              <Button size="lg" className="ml-auto flex-1 sm:flex-none" onClick={() => setDone(true)}>ซื้อเลย</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
