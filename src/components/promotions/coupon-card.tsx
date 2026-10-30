"use client";

import { useRef, useState } from "react";
import { Check, Copy, Ticket } from "lucide-react";
import type { Coupon } from "@/lib/promotions";
import { cn } from "@/lib/utils";

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
    } catch {
      // Clipboard can be blocked; the code stays visible so it can be copied by hand.
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <li className="relative flex overflow-hidden rounded-xl border border-dashed border-amber-300 bg-gradient-to-r from-section/70 to-card">
      <span aria-hidden className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-background ring-1 ring-amber-300" />
      <span aria-hidden className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-background ring-1 ring-amber-300" />
      <div className="flex min-w-0 flex-1 items-center gap-3 p-4 pl-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-ink"><Ticket className="size-5" /></span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{coupon.title}</p>
          <p className="truncate text-xs text-muted-foreground">{coupon.text}</p>
          <p className="mt-1 text-[11px] text-coral">{coupon.until}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-center justify-center gap-1.5 border-l border-dashed border-amber-300 px-4">
        <code className="rounded-md bg-card px-2 py-0.5 text-sm font-extrabold tracking-wider">{coupon.code}</code>
        <button
          onClick={copy}
          className={cn("inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", copied ? "bg-success text-white" : "bg-primary text-ink hover:bg-primary-hover")}
        >
          {copied ? <><Check className="size-3.5" /> คัดลอกแล้ว</> : <><Copy className="size-3.5" /> คัดลอก</>}
        </button>
      </div>
    </li>
  );
}
