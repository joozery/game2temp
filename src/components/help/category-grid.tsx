import { ArrowRight, Crown } from "lucide-react";
import { helpCategories, type HelpCategoryId } from "@/lib/help";
import { cn } from "@/lib/utils";

export function CategoryGrid({ active, onChange }: { active: HelpCategoryId | null; onChange: (id: HelpCategoryId | null) => void }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-primary text-ink"><Crown className="size-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold">เลือกหัวข้อที่ต้องการความช่วยเหลือ</h2>
          <p className="text-sm text-muted-foreground">คลิกเลือกหมวดหมู่เพื่อดูคำถามและวิธีการแก้ไขปัญหา</p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {helpCategories.map(({ id, label, text, icon: Icon, tone }) => {
          const selected = active === id;
          return (
            <li key={id}>
              <button
                onClick={() => onChange(selected ? null : id)}
                aria-pressed={selected}
                className={cn(
                  "group flex h-full w-full flex-col items-center rounded-xl border p-4 text-center transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected ? "border-primary bg-primary/20" : "border-border bg-card"
                )}
              >
                <span className={cn("grid size-12 place-items-center rounded-xl", tone)}><Icon className="size-6" /></span>
                <span className="mt-3 text-sm font-bold leading-tight">{label}</span>
                <span className="mt-1.5 text-xs leading-snug text-muted-foreground">{text}</span>
                <ArrowRight aria-hidden className={cn("mt-2 size-4 text-amber-500 transition", selected ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
