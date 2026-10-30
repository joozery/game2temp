import { ArrowRight, Calculator, Network } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { agent } from "@/lib/affiliate";

const rows = [
  { buyer: "B ซึ่งสมัครผ่าน A", gets: ["A"] },
  { buyer: "C ซึ่งสมัครผ่าน B", gets: ["B", "A"] },
  { buyer: "D ซึ่งสมัครผ่าน C", gets: ["C", "B"] },
];

export function HowItWorks() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card>
        <CardTitle icon={Network} title="ใครได้ค่าคอมเมื่อมีการเติมเกม" />
        <p className="text-sm text-muted-foreground">รองรับสายแนะนำ 3 ชั้น (นับรวมผู้แนะนำต้นสาย) จ่ายย้อนหลังสูงสุด 2 ชั้นต่อคำสั่งซื้อ</p>
        <table className="mt-3 w-full text-sm">
          <thead><tr className="border-b border-border text-left text-xs text-muted-foreground"><th className="py-2 font-medium">สมาชิกที่เติมเกมสำเร็จ</th><th className="py-2 font-medium">ผู้มีสิทธิ์รับค่าคอม</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.buyer} className="border-b border-border/60 last:border-0">
                <td className="py-2.5">{row.buyer}</td>
                <td className="py-2.5"><span className="inline-flex items-center gap-1.5 font-medium">{row.gets.join(" และ ")}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-muted-foreground">ผู้แนะนำที่อยู่นอกระยะย้อนหลัง 2 ชั้นจะไม่ได้รับค่าคอมจากรายการนั้น</p>
      </Card>

      <Card>
        <CardTitle icon={Calculator} title="คำนวณค่าคอมมิชชันอย่างไร" />
        <div className="rounded-xl border-l-4 border-primary bg-section px-4 py-3 text-sm">
          <p className="text-xs font-semibold text-muted-foreground">สูตรคำนวณ</p>
          <p className="mt-1 font-medium">ค่าคอมแต่ละชั้น = กำไรของคำสั่งซื้อ × เปอร์เซ็นต์ของชั้นนั้น ÷ 100</p>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          {([1, 2] as const).map((level, i) => (
            <span key={level} className="flex items-center gap-2">
              {i > 0 && <ArrowRight className="size-3.5 text-muted-foreground" />}
              <span className="rounded-lg bg-primary/25 px-2.5 py-1 font-semibold">ชั้น {level} · {agent.rates[level]}%</span>
            </span>
          ))}
        </div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          <li>คิดจากกำไรของคำสั่งซื้อที่เติมเกมสำเร็จเท่านั้น ซื้อซ้ำได้ค่าคอมทุกครั้ง</li>
          <li>ถ้าคำสั่งซื้อไม่มีกำไรหรือขาดทุน จะไม่เกิดค่าคอม</li>
          <li>การเติมเงินเข้า Wallet อย่างเดียวไม่นำมาคิดค่าคอม</li>
          <li>เปลี่ยนต้นทุนหรืออัตราค่าคอมภายหลัง ไม่กระทบรายการเดิม</li>
          <li>ยกเลิกหรือคืนเงิน ระบบจะบันทึกการปรับคืนค่าคอมจากรายการเดิม</li>
        </ul>
      </Card>
    </div>
  );
}
