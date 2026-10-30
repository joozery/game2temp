import { statusMeta, type OrderStatus } from "@/lib/account";
import { cn } from "@/lib/utils";

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const { label, className: tone } = statusMeta[status];
  return <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", tone, className)}>{label}</span>;
}
