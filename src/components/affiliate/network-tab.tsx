import { Users } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { baht, formatDate, levelMeta, referrals } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

export function NetworkTab() {
  return (
    <Card>
      <CardTitle icon={Users} title="สมาชิกในสายแนะนำ" />
      <ul className="divide-y divide-border/70">
        {referrals.map((member) => (
          <li key={member.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3">
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold", member.level === 1 ? "bg-primary text-ink" : "bg-mint text-ink")}>{member.name[0]}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{member.name} <span className="ml-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">{levelMeta[member.level].short}</span></p>
              <p className="text-xs text-muted-foreground">สมัครผ่าน {member.via} · {formatDate(member.joined)}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-semibold tabular-nums text-success">{baht(member.commission)}</p>
              <p className="text-[11px] text-muted-foreground">{member.orders} ออเดอร์ · ยอดขาย {baht(member.sales)}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-xl bg-section px-4 py-3 text-xs text-muted-foreground">แสดงเฉพาะสมาชิกภายในชั้นที่มีสิทธิ์รับค่าคอม (ชั้น 1–2) ข้อมูลส่วนตัวถูกย่อชื่อเพื่อความเป็นส่วนตัว</p>
    </Card>
  );
}
