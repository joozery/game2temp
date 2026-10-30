"use client";

import { useState } from "react";
import { ChevronDown, SearchX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { helpCategories, helpFaqs, type HelpCategoryId } from "@/lib/help";
import { cn } from "@/lib/utils";

const PREVIEW = 7;

export function FaqList({ query, category, onReset }: { query: string; category: HelpCategoryId | null; onReset: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = helpFaqs.filter((f) => (!category || f.category === category) && (!q || `${f.q} ${f.a}`.toLowerCase().includes(q)));
  const filtering = !!category || !!q;
  const visible = filtering || showAll ? filtered : filtered.slice(0, PREVIEW);
  const title = category ? helpCategories.find((c) => c.id === category)?.label : "คำถามที่พบบ่อย";

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-primary/40 text-lg font-extrabold text-amber-700" aria-hidden>?</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-extrabold">{title}</h2>
          <p className="text-xs text-muted-foreground">{filtering ? `พบ ${filtered.length} คำถาม` : "รวมคำถามยอดนิยมที่ลูกค้าสอบถามเข้ามามากที่สุด"}</p>
        </div>
        {!filtering && filtered.length > PREVIEW && (
          <button onClick={() => setShowAll(!showAll)} className="shrink-0 text-xs font-medium text-muted-foreground transition hover:text-foreground">
            {showAll ? "ย่อรายการ" : "ดูคำถามทั้งหมด →"}
          </button>
        )}
      </div>

      {visible.length ? (
        <ul className="space-y-2">
          {visible.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <li key={f.id} className="rounded-xl border border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/30 text-[11px] font-bold text-amber-700">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{f.q}</span>
                  <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && <p className="px-3 pb-3.5 pl-[3.25rem] text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-10 text-center text-muted-foreground">
          <SearchX className="size-10 text-border" />
          <p className="mt-2 text-sm">ไม่พบคำถามที่ตรงกับเงื่อนไข</p>
          <button onClick={onReset} className="mt-3 text-xs font-semibold text-foreground underline underline-offset-4">ล้างการค้นหา</button>
        </div>
      )}
    </Card>
  );
}
