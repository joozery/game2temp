"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CircleHelp } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "ใช้เวลาในการเติมเกมนานแค่ไหน?", a: "ส่วนใหญ่ได้รับไอเทมภายใน 1 นาทีหลังชำระเงินสำเร็จ ในบางช่วงที่เซิร์ฟเวอร์เกมหนาแน่นอาจใช้เวลาเพิ่มเล็กน้อย" },
  { q: "ถ้าเติมแล้วไม่ได้รับของ ต้องทำอย่างไร?", a: "ตรวจสอบสถานะที่หน้าประวัติการสั่งซื้อก่อน หากยังไม่ได้รับของ ติดต่อทีมงานพร้อมแจ้งเลขที่คำสั่งซื้อ เราจะตรวจสอบให้ทันที" },
  { q: "สามารถเติมให้คนอื่นได้ไหม?", a: "ได้ เพียงกรอก UID ของผู้รับให้ถูกต้องและตรวจสอบชื่อผู้เล่นก่อนยืนยันการสั่งซื้อ" },
  { q: "มีค่าธรรมเนียมเพิ่มเติมหรือไม่?", a: "ไม่มีค่าธรรมเนียมแอบแฝง ราคาที่แสดงตอนยืนยันคำสั่งซื้อคือราคาที่ต้องชำระจริง" },
];

export function FaqCard() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Card className="p-4 sm:p-5">
      <CardTitle icon={CircleHelp} title="คำถามที่พบบ่อย">
        <Link href="/articles" className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground">ดูทั้งหมด <ArrowRight className="size-3.5" /></Link>
      </CardTitle>
      <ul className="space-y-2">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className="rounded-xl border border-border">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {f.q}
                <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && <p className="px-3.5 pb-3 text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
