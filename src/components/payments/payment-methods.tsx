import Image from "next/image";
import { Landmark, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type MethodId = "promptpay" | "truemoney" | "bank" | "card";
export type PaymentMethod = { id: MethodId; label: string; detail: string; image?: string; icon?: LucideIcon; tone?: string };

export const methods: PaymentMethod[] = [
  { id: "promptpay", label: "PromptPay QR Code", detail: "สแกนจ่ายผ่านแอปธนาคาร", image: "/paymenticon/icon-thaiqr.png" },
  { id: "truemoney", label: "TrueMoney Wallet", detail: "ชำระสะดวก รวดเร็ว", image: "/paymenticon/true.png" },
  { id: "bank", label: "ธนาคารไทย", detail: "โอนผ่านบัญชีธนาคาร", icon: Landmark, tone: "bg-blue-500 text-white" },
  { id: "card", label: "บัตรเครดิต / เดบิต", detail: "Visa, Mastercard, JCB", image: "/images/payments/credit-card.png" },
];

export function MethodIcon({ method }: { method: PaymentMethod }) {
  const Icon = method.icon;
  return <span className={cn("relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg", method.tone)}>
    {method.image ? <Image src={method.image} alt="" width={method.id === "promptpay" ? 76 : 40} height={method.id === "promptpay" ? 76 : 40} className={method.id === "promptpay" ? "absolute left-1/2 top-1/2 size-[76px] max-w-none -translate-x-1/2 -translate-y-1/2" : "size-10 object-contain"} /> : Icon ? <Icon className="size-5" /> : null}
  </span>;
}
