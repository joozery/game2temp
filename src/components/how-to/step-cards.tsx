import { Check, ChevronRight, Info, MousePointer2 } from "lucide-react";
import { MethodIcon, methods } from "@/components/payments/payment-methods";
import { Artwork } from "@/components/storefront/artwork";

/** Small illustrative mock for each step; purely decorative. */
const previews = [
  <div key="1" className="relative flex gap-2 rounded-xl bg-white p-3 shadow-sm">
    {["rov", "pubgm", "freefire"].map((g) => <div key={g} className="size-14 overflow-hidden rounded-lg"><Artwork name={g} /></div>)}
    <MousePointer2 className="absolute -bottom-2 right-5 size-7 fill-white text-ink" />
  </div>,
  <div key="2" className="w-full rounded-xl bg-white p-3 shadow-sm">
    <div className="flex items-center gap-2.5">
      <div className="size-10 shrink-0 overflow-hidden rounded-lg"><Artwork name="genshin" /></div>
      <div className="min-w-0 flex-1 rounded-lg border border-border px-2.5 py-1.5 text-xs">
        <span className="block text-[10px] text-muted-foreground">UID</span>123456789
      </div>
      <span className="grid size-6 place-items-center rounded-full bg-success text-white"><Check className="size-3.5" /></span>
    </div>
    <p className="mt-2.5 flex items-center gap-1.5 text-[10px] text-muted-foreground"><Info className="size-3" /> ตรวจสอบข้อมูลก่อนยืนยัน</p>
  </div>,
  <ul key="3" className="grid w-full grid-cols-2 gap-1.5">
    {methods.map((m) => (
      <li key={m.id} className="flex flex-col items-center gap-1 rounded-lg bg-white py-2 text-center text-[10px] shadow-sm">
        <MethodIcon method={m} />{m.id === "promptpay" ? "PromptPay" : m.id === "truemoney" ? "TrueMoney" : m.id === "bank" ? "ธนาคารไทย" : "บัตรเครดิต"}
      </li>
    ))}
  </ul>,
  <div key="4" className="w-full rounded-xl bg-white p-3 text-[11px] shadow-sm">
    <div className="flex items-center gap-2.5">
      <div className="size-10 shrink-0 overflow-hidden rounded-lg"><Artwork name="freefire" /></div>
      <span className="flex-1 font-semibold">เพชร 310</span><b>฿89.00</b>
    </div>
    <dl className="mt-2 space-y-1 border-t border-border pt-2 text-muted-foreground">
      <div className="flex justify-between"><dt>UID</dt><dd className="text-foreground">123456789</dd></div>
      <div className="flex justify-between"><dt>ช่องทางชำระเงิน</dt><dd className="text-foreground">PromptPay</dd></div>
    </dl>
    <span className="mt-2.5 flex h-8 items-center justify-center rounded-lg bg-primary font-bold text-ink">ยืนยันการสั่งซื้อ</span>
  </div>,
  <div key="5" className="flex flex-col items-center gap-2">
    <span className="grid size-16 place-items-center rounded-full bg-primary text-ink shadow-lg shadow-primary/40"><Check className="size-9" strokeWidth={3} /></span>
    <span className="text-sm font-bold">เติมสำเร็จ!</span>
  </div>,
];

const steps = [
  { title: "เลือกเกม", text: "เลือกเกมที่ต้องการเติม และเลือกสินค้าหรือแพ็กเกจ" },
  { title: "กรอกข้อมูล", text: "กรอก UID หรือข้อมูลตามที่เกมกำหนดให้ถูกต้อง" },
  { title: "เลือกช่องทางชำระเงิน", text: "เลือกช่องทางชำระเงินที่สะดวกสำหรับคุณ" },
  { title: "ยืนยันการสั่งซื้อ", text: "ตรวจสอบรายละเอียด และกดชำระเงิน" },
  { title: "เติมสำเร็จ", text: "ได้รับไอเทมทันที และแจ้งเตือนผ่านระบบ" },
];

export function StepCards() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex flex-col rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-base font-bold text-ink">{i + 1}</span>
            <h2 className="font-bold leading-tight">{step.title}</h2>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
          <div className="mt-4 flex flex-1 items-center justify-center rounded-xl bg-section/50 p-3">{previews[i]}</div>
          {i < steps.length - 1 && (
            <span aria-hidden className="absolute -right-3.5 top-1/2 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full bg-card text-amber-500 shadow lg:grid">
              <ChevronRight className="size-4" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
