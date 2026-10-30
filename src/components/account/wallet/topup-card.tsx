"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Plus, QrCode, ShieldCheck, Wallet } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { MethodIcon, methods, type MethodId } from "@/components/payments/payment-methods";
import { cn } from "@/lib/utils";

type TopUp = { method: MethodId; amount: number };
type Step = "review" | "payment" | "success";

const amounts = [50, 100, 300, 500, 1000];
const steps: Step[] = ["review", "payment", "success"];

export function TopUpCard() {
  const [method, setMethod] = useState<MethodId>("promptpay");
  const [amount, setAmount] = useState(300);
  const [custom, setCustom] = useState(false);
  const [topUp, setTopUp] = useState<TopUp | null>(null);
  const [step, setStep] = useState<Step>("review");
  const [completedAt, setCompletedAt] = useState("");
  const selectedMethod = methods.find((item) => item.id === topUp?.method) ?? methods[0];

  function openTopUp() {
    if (amount < 20) return;
    setTopUp({ method, amount });
    setStep("review");
    setCompletedAt("");
  }

  function completeDemo() {
    setCompletedAt(new Date().toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" }));
    setStep("success");
  }

  return <section className="rounded-2xl border border-border bg-white p-4 shadow-[0_3px_14px_-10px_rgba(16,24,39,.25)] sm:p-5">
    <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-primary text-ink"><Wallet className="size-5" /></span><div><h2 className="text-lg font-bold">เติมเงินเข้ากระเป๋า</h2><p className="text-xs text-muted-foreground">เลือกช่องทางการชำระเงินที่สะดวกสำหรับคุณ</p></div></div><span className="hidden shrink-0 rounded-lg bg-coral/10 px-2.5 py-1.5 text-[11px] font-semibold text-coral sm:inline-flex">ทดลองขั้นตอนเติมเงิน</span></div>

    <fieldset className="mt-5"><legend className="mb-3 text-sm font-semibold">ช่องทางการชำระเงิน</legend><div className="grid gap-3 sm:grid-cols-2">{methods.map((item) => <button key={item.id} type="button" onClick={() => setMethod(item.id)} aria-pressed={method === item.id} className={cn("flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", method === item.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-white")}><MethodIcon method={item} /><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold sm:text-sm">{item.label}</span><span className="block truncate text-[11px] text-muted-foreground">{item.detail}</span></span><span className={cn("grid size-5 shrink-0 place-items-center rounded-full border", method === item.id ? "border-primary bg-primary text-ink" : "border-border text-transparent")}><Check className="size-3" strokeWidth={3} /></span></button>)}</div></fieldset>

    <fieldset className="mt-6"><legend className="mb-3 text-sm font-semibold">เลือกจำนวนเงิน</legend><div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{amounts.map((value) => <button key={value} type="button" onClick={() => { setAmount(value); setCustom(false); }} aria-pressed={!custom && amount === value} className={cn("relative flex h-14 flex-col items-center justify-center rounded-xl border text-sm font-bold transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", !custom && amount === value ? "border-primary bg-primary/60 text-ink" : "border-border bg-white")}>{value === 300 && <span className="absolute -top-2 rounded-full bg-coral px-2 py-0.5 text-[10px] font-semibold text-white">ยอดนิยม</span>}{value.toLocaleString()}<span className="text-[10px] font-normal text-muted-foreground">บาท</span></button>)}<button type="button" onClick={() => { setCustom(true); setAmount(0); }} aria-pressed={custom} className={cn("flex h-14 items-center justify-center gap-1 rounded-xl border text-xs font-medium transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", custom ? "border-primary bg-primary/60" : "border-border bg-white text-muted-foreground")}><Plus className="size-4" /> ระบุจำนวน</button></div>{custom && <label className="mt-3 block text-xs text-muted-foreground">จำนวนเงินที่ต้องการเติม<input autoFocus type="number" min={20} inputMode="numeric" value={amount || ""} onChange={(event) => setAmount(Math.max(0, Number(event.target.value) || 0))} placeholder="ขั้นต่ำ 20 บาท" className="mt-1.5 h-11 w-full rounded-xl border border-border px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" /></label>}</fieldset>

    <button type="button" disabled={amount < 20} onClick={openTopUp} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-ink shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"><QrCode className="size-5" /> ตรวจสอบรายการเติมเงิน ฿{amount.toLocaleString()}</button>
    <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><ShieldCheck className="size-4 text-success" /> โหมดทดสอบ — ยังไม่เชื่อมต่อระบบชำระเงินจริง</p>

    <Dialog open={topUp !== null} onOpenChange={(open) => { if (!open) setTopUp(null); }}><DialogContent>{topUp && <>
      <div className="pr-6"><p className="text-xs font-semibold text-coral">โหมดทดสอบ · ไม่มีการเรียกเก็บเงินจริง</p><DialogTitle className="mt-1">{step === "review" ? "ตรวจสอบรายการเติมเงิน" : step === "payment" ? "ขั้นตอนชำระเงิน" : "เติมเงินสำเร็จ (ตัวอย่าง)"}</DialogTitle><DialogDescription className="mt-1">{step === "review" ? "ตรวจสอบช่องทางและยอดเงินก่อนดำเนินการ" : step === "payment" ? "ทดลองขั้นตอนชำระเงินสำหรับช่องทางที่เลือก" : "รายการตัวอย่างเสร็จสมบูรณ์ ไม่มีการเพิ่มยอดเงินจริง"}</DialogDescription></div>
      <ol className="mt-5 grid grid-cols-3 gap-2" aria-label="ขั้นตอนการเติมเงิน">{(["ตรวจสอบ", "ชำระเงิน", "สำเร็จ"] as const).map((label, index) => <li key={label} className={cn("rounded-lg px-2 py-2 text-center text-[11px] font-semibold sm:text-xs", index <= steps.indexOf(step) ? "bg-primary/40 text-ink" : "bg-muted text-muted-foreground")}>{index + 1}. {label}</li>)}</ol>
      {step === "success" && <div className="mt-6 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success"><CheckCircle2 className="size-9" /></span><p className="mt-3 text-lg font-bold">ชำระเงินสำเร็จ (ตัวอย่าง)</p><p className="mt-1 text-sm text-muted-foreground">ขั้นตอนนี้เป็นการจำลอง ไม่มีรายการชำระเงินจริง</p></div>}
      {step === "payment" && <div className="mt-5 rounded-xl border border-primary/50 bg-primary/10 p-4"><div className="flex items-center gap-3"><MethodIcon method={selectedMethod} /><div><p className="text-sm font-bold">{selectedMethod.label}</p><p className="text-xs text-muted-foreground">{selectedMethod.detail}</p></div></div><p className="mt-3 text-sm leading-relaxed">{topUp.method === "promptpay" ? "ในระบบจริง หน้านี้จะแสดง QR สำหรับสแกนชำระเงิน พร้อมรอตรวจสอบยอดจากผู้ให้บริการ" : topUp.method === "truemoney" ? "ในระบบจริง ระบบจะพาไปยืนยันการชำระเงินกับ TrueMoney แล้วรอผลการทำรายการ" : topUp.method === "bank" ? "ในระบบจริง หน้านี้จะแสดงข้อมูลบัญชีและตรวจสอบยอดโอนก่อนเติมเครดิต" : "ในระบบจริง ระบบจะเปิดหน้าชำระเงินที่ปลอดภัยของผู้ให้บริการบัตร"}</p><p className="mt-2 text-xs font-medium text-coral">ไม่มี QR, บัญชีรับโอน หรือลิงก์ชำระเงินจริงในโหมดทดสอบ</p></div>}
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 rounded-xl bg-muted/50 p-4 text-sm"><dt className="text-muted-foreground">ช่องทาง</dt><dd className="text-right font-medium">{selectedMethod.label}</dd><dt className="text-muted-foreground">จำนวนเงิน</dt><dd className="text-right font-bold tabular-nums">฿{topUp.amount.toLocaleString()}</dd><dt className="text-muted-foreground">สถานะ</dt><dd className="text-right">{step === "success" ? "สำเร็จ (ตัวอย่าง)" : step === "payment" ? "รอจำลองการชำระเงิน" : "รอตรวจสอบ"}</dd>{step === "success" && <><dt className="text-muted-foreground">เวลา</dt><dd className="text-right">{completedAt}</dd></>}</dl>
      {step === "review" && <button type="button" onClick={() => setStep("payment")} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-ink transition hover:bg-primary-hover">ดำเนินการต่อ <ArrowRight className="size-4" /></button>}
      {step === "payment" && <div className="mt-5 flex gap-2"><button type="button" onClick={() => setStep("review")} className="flex h-11 items-center justify-center gap-1 rounded-xl border border-border px-4 text-sm font-semibold"><ArrowLeft className="size-4" /> ย้อนกลับ</button><button type="button" onClick={completeDemo} className="flex h-11 flex-1 items-center justify-center rounded-xl bg-primary px-3 text-sm font-bold text-ink transition hover:bg-primary-hover">จำลองการชำระสำเร็จ</button></div>}
      {step === "success" && <button type="button" onClick={() => setTopUp(null)} className="mt-5 h-11 w-full rounded-xl bg-primary text-sm font-bold text-ink transition hover:bg-primary-hover">กลับไปหน้ากระเป๋าเงิน</button>}
    </>}</DialogContent></Dialog>
  </section>;
}
