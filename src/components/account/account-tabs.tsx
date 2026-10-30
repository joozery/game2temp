"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Settings, User, Wallet, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/profile", label: "โปรไฟล์", icon: User },
  { href: "/orders", label: "ประวัติการสั่งซื้อ", icon: History },
  { href: "/wallet", label: "กระเป๋าเงิน", icon: Wallet },
  { href: "/settings", label: "ตั้งค่าบัญชี", icon: Settings },
];

export function AccountTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="บัญชีของฉัน" className="no-scrollbar flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-4" /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
