"use client";

import { Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/account";
import { OrderThumb } from "../order-thumb";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderCard({ order: o }: { order: Order }) {
  return (
    <li className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/60 sm:p-5">
      <div className="flex items-start gap-3.5">
        <OrderThumb art={o.art} name={o.game} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p className="font-medium">{o.item}</p>
            <OrderStatusBadge status={o.status} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">#{o.id} · {o.date}</p>
        </div>
        <p className="shrink-0 text-lg font-bold tabular-nums">฿{o.price.toLocaleString()}</p>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3.5 text-xs text-muted-foreground">
        <span>ชำระโดย <b className="font-medium text-foreground">{o.method}</b></span>
        {o.uid && <span>UID <b className="font-medium text-foreground">{o.uid}</b></span>}
        <span className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigator.clipboard?.writeText(o.id)}><Copy /> คัดลอกเลขที่</Button>
          {o.status !== "pending" && <Button size="sm"><RotateCcw /> ซื้อซ้ำ</Button>}
        </span>
      </div>
    </li>
  );
}
