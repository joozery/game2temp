import Link from "next/link";
import { Banknote, Headphones, Info } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { agent, baht, formatDate, payouts, totals } from "@/lib/affiliate";

export function PayoutsTab() {
  const eligible = totals.available >= agent.minWithdraw;
  const remaining = Math.max(agent.minWithdraw - totals.available, 0);
  const progress = Math.min(100, (totals.available / agent.minWithdraw) * 100);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.1fr]">
      <Card>
        <CardTitle icon={Banknote} title="ยอดถอนขั้นต่ำ" />
        <p className="text-sm text-muted-foreground">ถอนได้ครั้งละไม่น้อยกว่า <b className="text-foreground">{baht(agent.minWithdraw)}</b> และไม่เกินยอดพร้อมจ่าย</p>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></div>
        <p className="mt-2 flex justify-between text-xs text-muted-foreground"><span>ยอดพร้อมจ่าย {baht(totals.available)}</span><span>{eligible ? "ขอรับเงินได้แล้ว" : `อีก ${baht(remaining)} ถึงขั้นต่ำ`}</span></p>
        <div className="mt-4 flex gap-3 rounded-xl bg-sky-50 p-4 text-sm text-sky-900">
          <Info className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">ขั้นตอนการรับเงิน</p>
            <ol className="mt-1 list-decimal space-y-0.5 pl-4 text-xs">
              <li>ยอดถึงขั้นต่ำ แล้วติดต่อผู้ดูแลระบบเพื่อขอรับเงิน</li>
              <li>ผู้ดูแลตรวจสอบยอดและโอนเงินให้ด้วยตนเอง (ไม่มีการโอนอัตโนมัติ)</li>
              <li>ผู้ดูแลบันทึกการจ่าย ระบบหักยอดคงเหลือและเพิ่มรายการในประวัติ</li>
            </ol>
          </div>
        </div>
        <Link href="/help" className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-ink transition hover:bg-primary-hover"><Headphones className="size-4" /> ติดต่อผู้ดูแลเพื่อขอรับเงิน</Link>
      </Card>

      <Card>
        <CardTitle icon={Banknote} title="ประวัติการรับเงิน" />
        {payouts.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">ยังไม่มีประวัติการรับเงิน</p>
        ) : (
          <ul className="divide-y divide-border/70">
            {payouts.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1"><p className="text-sm font-medium">{p.method}</p><p className="text-xs text-muted-foreground">{formatDate(p.date)} · {p.note}</p></div>
                <p className="text-sm font-semibold tabular-nums">{baht(p.amount)}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
