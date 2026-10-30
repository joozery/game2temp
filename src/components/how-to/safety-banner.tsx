import { FileCheck2, Headphones, Lock, ShieldCheck, type LucideIcon } from "lucide-react";

const points: { icon: LucideIcon; label: string }[] = [
  { icon: Lock, label: "ไม่เก็บรหัสผ่าน" },
  { icon: FileCheck2, label: "ระบบอัตโนมัติ" },
  { icon: Headphones, label: "ทีมงานดูแล 24 ชม." },
];

export function SafetyBanner() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-section/70 p-4 sm:p-5 lg:flex-row lg:items-center">
      <div className="flex flex-1 items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-ink"><ShieldCheck className="size-8" /></span>
        <div>
          <h2 className="text-lg font-extrabold">ปลอดภัย มั่นใจได้ 100%</h2>
          <p className="text-sm text-muted-foreground">ข้อมูลของคุณจะถูกเข้ารหัสอย่างปลอดภัย ทุกการทำรายการได้รับการดูแลโดยทีมงานมืออาชีพ</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 rounded-xl bg-white/80 px-5 py-3 text-sm">
        {points.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2"><Icon className="size-4.5 text-ink" /> {label}</li>
        ))}
      </ul>
    </section>
  );
}
