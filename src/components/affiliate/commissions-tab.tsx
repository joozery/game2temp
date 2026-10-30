"use client";

import { useState } from "react";
import { Receipt } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { adjustments, baht, commissions, formatDate, levelMeta, SAMPLE_TODAY } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

const ranges = [
  { value: 0, label: "ทั้งหมด" },
  { value: 7, label: "7 วัน" },
  { value: 30, label: "30 วัน" },
];

const DAY = 86_400_000;

export function CommissionsTab() {
  const [days, setDays] = useState(0);
  const cutoff = days ? Date.parse(SAMPLE_TODAY) - days * DAY : -Infinity;

  const rows = [
    ...commissions.map((c) => ({ ...c, kind: "order" as const })),
    ...adjustments.map((a) => ({ ...a, kind: "adjust" as const })),
  ]
    .filter((row) => Date.parse(row.date) >= cutoff)
    .sort((a, b) => b.date.localeCompare(a.date));
  const total = rows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <Card>
      <CardTitle icon={Receipt} title="ประวัติค่าคอมมิชชัน">
        <div role="group" aria-label="กรองตามช่วงวันที่" className="flex gap-1 rounded-xl bg-muted p-1">
          {ranges.map((range) => (
            <button key={range.value} aria-pressed={days === range.value} onClick={() => setDays(range.value)} className={cn("rounded-lg px-3 py-1 text-xs font-medium transition", days === range.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{range.label}</button>
          ))}
        </div>
      </CardTitle>
      {rows.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">ไม่มีรายการในช่วงวันที่นี้</p>
      ) : (
        <ul className="divide-y divide-border/70">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3">
              <div className="min-w-0 flex-1">
                {row.kind === "order" ? (
                  <>
                    <p className="truncate text-sm font-medium">{row.item} <span className="text-muted-foreground">· {row.orderId}</span></p>
                    <p className="text-xs text-muted-foreground">{formatDate(row.date)} · {row.buyer} ({levelMeta[row.level].short}, {row.rate}%) · ยอดขาย {baht(row.sale)}</p>
                  </>
                ) : (
                  <>
                    <p className="truncate text-sm font-medium">ปรับคืนค่าคอม <span className="text-muted-foreground">· {row.orderId}</span></p>
                    <p className="text-xs text-muted-foreground">{formatDate(row.date)} · {row.note}</p>
                  </>
                )}
              </div>
              <p className={cn("text-sm font-semibold tabular-nums", row.amount < 0 ? "text-coral" : "text-success")}>{row.amount < 0 ? "−" : "+"}{baht(Math.abs(row.amount))}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 flex items-center justify-between rounded-xl bg-section px-4 py-3 text-sm"><span className="text-muted-foreground">รวมในช่วงที่เลือก</span><span className="font-bold tabular-nums">{baht(total)}</span></p>
    </Card>
  );
}
