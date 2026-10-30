import { orders, type OrderStatus } from "@/lib/account";
import { cn } from "@/lib/utils";

export type OrderFilter = OrderStatus | "all";

const filters: { value: OrderFilter; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "success", label: "สำเร็จ" },
  { value: "pending", label: "รอดำเนินการ" },
  { value: "failed", label: "ไม่สำเร็จ" },
  { value: "refunded", label: "คืนเงิน" },
];

export function OrderFilters({ value, onChange }: { value: OrderFilter; onChange: (v: OrderFilter) => void }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="กรองตามสถานะ">
      {filters.map((f) => {
        const count = f.value === "all" ? orders.length : orders.filter((o) => o.status === f.value).length;
        const active = value === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            aria-pressed={active}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "border-primary bg-primary text-ink" : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
            <span className={cn("rounded-full px-1.5 text-[11px]", active ? "bg-ink/10" : "bg-muted")}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}
