"use client";

import { useState } from "react";
import { CheckCircle2, Zap } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { DigitalProduct } from "@/lib/digital-products";
import { cn } from "@/lib/utils";

export function DigitalDialog({ product: p, onClose }: { product: DigitalProduct; onClose: () => void }) {
  const [amount, setAmount] = useState(p.amounts[0]);
  const [done, setDone] = useState(false);

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-14 text-success" />
            <DialogTitle className="mt-4 text-xl">บันทึกตัวอย่างคำสั่งซื้อแล้ว</DialogTitle>
            <DialogDescription className="mt-2">{p.name} ฿{amount.toLocaleString()} นี่คือตัวอย่าง UI ยังไม่มีการชำระเงินหรือส่งโค้ดจริง</DialogDescription>
            <Button className="mt-6 w-full" onClick={onClose}>ตกลง</Button>
          </div>
        ) : (
          <>
            <div className="-mx-6 -mt-6 aspect-[2.2] overflow-hidden rounded-t-2xl"><Artwork name={p.id} /></div>
            <p className="mt-4 text-xs font-medium text-muted-foreground">{p.type}</p>
            <DialogTitle className="text-xl">{p.name}</DialogTitle>
            <DialogDescription className="mt-1">{p.desc}</DialogDescription>

            <p className="mb-2 mt-5 text-sm font-medium">เลือกมูลค่าบัตร</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {p.amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  aria-pressed={amount === a}
                  className={cn("h-11 rounded-xl border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", amount === a ? "border-primary bg-primary text-ink" : "border-border bg-muted/50 hover:border-primary")}
                >
                  ฿{a.toLocaleString()}
                </button>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Zap className="size-4 text-amber-500" /> ได้รับโค้ดทันทีหลังชำระเงิน</p>

            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <div><p className="text-xs text-muted-foreground">ยอดชำระ</p><strong className="text-2xl">฿{amount.toLocaleString()}</strong></div>
              <Button size="lg" className="ml-auto flex-1 sm:flex-none" onClick={() => setDone(true)}>ซื้อเลย</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
