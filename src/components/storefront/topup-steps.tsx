import { CreditCard, Gamepad2, Gift, Package, Zap } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  { icon: Gamepad2, title: "เลือกเกม", text: "เลือกเกมที่ต้องการเติม" },
  { icon: Package, title: "เลือกแพ็กเกจ", text: "เลือกจำนวนและตรวจสอบราคา" },
  { icon: CreditCard, title: "ชำระเงิน", text: "PromptPay, TrueMoney, บัตรเครดิต" },
  { icon: Zap, title: "รับไอเทมทันที", text: "ระบบอัตโนมัติภายใน 1 นาที" },
];

export function TopupSteps() {
  return (
    <section id="how">
      <SectionHeading title="วิธีการเติมเกม ง่ายๆ ใน 4 ขั้นตอน" icon={Gift} />
      <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-yellow-200 to-primary text-ink">
              <Icon className="size-6" aria-hidden />
            </span>
            <div className="relative z-10">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
            <b aria-hidden className="absolute -right-1 -top-3 text-6xl font-black italic text-muted">{index + 1}</b>
          </li>
        ))}
      </ol>
    </section>
  );
}
