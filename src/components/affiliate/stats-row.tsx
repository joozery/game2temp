import { Banknote, CircleDollarSign, HandCoins, ShoppingBag, Users, type LucideIcon } from "lucide-react";
import { baht, totals } from "@/lib/affiliate";

const stats: { label: string; value: string; icon: LucideIcon; tone: string; hint?: string }[] = [
  { label: "ยอดพร้อมจ่าย", value: baht(totals.available), icon: Banknote, tone: "bg-success text-white", hint: "ไม่มีการพักยอด" },
  { label: "ค่าคอมสะสม", value: baht(totals.earned + totals.adjusted), icon: CircleDollarSign, tone: "bg-primary text-ink" },
  { label: "จ่ายแล้ว", value: baht(totals.paid), icon: HandCoins, tone: "bg-mint text-ink" },
  { label: "ยอดขายจากสาย", value: baht(totals.sales), icon: ShoppingBag, tone: "bg-coral text-white" },
  { label: "สมาชิกในสาย", value: `${totals.members} คน`, icon: Users, tone: "bg-section text-ink" },
];

export function StatsRow() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {stats.map(({ label, value, icon: Icon, tone, hint }, index) => (
        <li key={label} className={`rounded-2xl border border-border bg-card p-4 ${index === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
          <span className={`grid size-9 place-items-center rounded-xl ${tone}`}><Icon className="size-[18px]" /></span>
          <p className="mt-3 text-xs text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-lg font-bold tabular-nums">{value}</p>
          {hint && <p className="text-[11px] text-success">{hint}</p>}
        </li>
      ))}
    </ul>
  );
}
