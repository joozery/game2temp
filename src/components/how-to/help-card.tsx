import { Headphones, Mail, MessageCircle, MessagesSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

export function HelpCard() {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/40 text-ink"><Headphones className="size-6" /></span>
        <div>
          <h2 className="text-lg font-bold">ต้องการความช่วยเหลือ?</h2>
          <p className="text-xs text-muted-foreground">หากพบปัญหาในการเติมเกม หรือต้องการสอบถาม ทีมงานพร้อมช่วยเหลือตลอด 24 ชั่วโมง</p>
        </div>
      </div>
      <a href="#" className="shine mt-4 flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-ink transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <MessageCircle className="size-4" /> ติดต่อทีมงานผ่าน LINE
      </a>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <a href="#" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium transition hover:bg-muted"><MessagesSquare className="size-4" /> แชทกับทีมงาน</a>
        <a href="mailto:support@pk-topup.com" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium transition hover:bg-muted"><Mail className="size-4" /> ส่งอีเมล</a>
      </div>
    </Card>
  );
}
