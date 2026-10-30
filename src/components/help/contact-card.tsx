import Image from "next/image";
import { ArrowRight, Clock, Mail, MessageCircle, MessagesSquare, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const channels: { icon: LucideIcon; title: string; text: string; action: string; href: string; tile: string }[] = [
  { icon: MessageCircle, title: "ติดต่อผ่าน LINE", text: "เร็วที่สุด และสะดวกที่สุด", action: "ทัก LINE", href: "#", tile: "bg-success text-white" },
  { icon: MessagesSquare, title: "แชทกับทีมงาน", text: "พูดคุยกับเจ้าหน้าที่โดยตรง", action: "เริ่มแชท", href: "#", tile: "bg-blue-500 text-white" },
  { icon: Mail, title: "ส่งอีเมล", text: "สำหรับเรื่องที่ต้องการรายละเอียด", action: "ส่งอีเมล", href: "mailto:support@pk-topup.com", tile: "bg-coral text-white" },
];

export function ContactCard() {
  return (
    <Card id="contact" className="scroll-mt-20 overflow-hidden bg-gradient-to-br from-section/70 to-card p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-extrabold leading-tight">ยังไม่ได้คำตอบ?<br />ติดต่อทีมงานของเรา</h2>
          <p className="mt-1.5 text-xs text-muted-foreground">ทีมงานพร้อมช่วยเหลือตลอด 24 ชั่วโมง ผ่านช่องทางต่าง ๆ</p>
        </div>
        <span className="relative -my-1 size-20 shrink-0 overflow-hidden rounded-full bg-primary/50 ring-4 ring-white"><Image src="/images/profile-mascot.png" alt="" width={600} height={600} className="absolute left-1/2 top-1 w-[150%] max-w-none -translate-x-1/2" /></span>
      </div>

      <ul className="mt-4 divide-y divide-border rounded-xl bg-card">
        {channels.map(({ icon: Icon, title, text, action, href, tile }) => (
          <li key={title} className="flex items-center gap-3 p-3">
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tile}`}><Icon className="size-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{title}</p>
              <p className="truncate text-xs text-muted-foreground">{text}</p>
            </div>
            <a href={href} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {action} <ArrowRight className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center gap-3 rounded-xl bg-primary/40 p-3">
        <span className="grid size-9 place-items-center rounded-lg bg-primary text-ink"><Clock className="size-5" /></span>
        <div className="flex-1">
          <p className="text-sm font-bold">เวลาให้บริการ</p>
          <p className="text-xs text-muted-foreground">ทีมงานพร้อมดูแลคุณตลอด 24 ชั่วโมง</p>
        </div>
        <div className="text-right"><p className="text-sm font-extrabold">24 ชั่วโมง</p><p className="text-[10px] text-muted-foreground">ทุกวัน ไม่มีวันหยุด</p></div>
      </div>
    </Card>
  );
}
