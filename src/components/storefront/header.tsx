"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell, ChevronDown, History, LogOut, Plus, Search,
  Settings, ShoppingCart, User, Wallet, X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const initialNotifications = [
  { id: 1, title: "โปรเติม RoV ลด 20%", text: "ใช้โค้ด PK20 ได้ถึงสิ้นเดือนนี้", time: "5 นาทีที่แล้ว", unread: true },
  { id: 2, title: "คำสั่งซื้อ #10293 สำเร็จ", text: "Free Fire 310 เพชร เข้าบัญชีแล้ว", time: "2 ชม. ที่แล้ว", unread: true },
  { id: 3, title: "ยินดีต้อนรับสู่ PK-TOPUP", text: "รับส่วนลดสมาชิกใหม่ 5%", time: "เมื่อวาน", unread: false },
];

const quickTags = ["RoV", "Free Fire", "Genshin Impact", "Valorant"];

const iconButton =
  "relative grid size-10 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted data-[state=open]:text-foreground";

function SearchField({
  query,
  onSearch,
  inputRef,
  className,
}: {
  query: string;
  onSearch: (value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "group flex h-10 items-center gap-2.5 rounded-xl border border-border bg-muted/60 px-3.5 transition-colors focus-within:border-primary focus-within:bg-card focus-within:ring-2 focus-within:ring-primary/25",
        className
      )}
    >
      <Search className="size-4 shrink-0 text-muted-foreground group-focus-within:text-amber-500" />
      <input
        ref={inputRef}
        aria-label="ค้นหาเกมหรือสินค้า"
        placeholder="ค้นหาเกม ไอดี หรือสินค้า..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
      />
      {query ? (
        <button aria-label="ล้างการค้นหา" onClick={() => onSearch("")} className="rounded-md p-0.5 text-muted-foreground hover:text-foreground">
          <X className="size-3.5" />
        </button>
      ) : (
        <kbd className="hidden rounded-md border border-border bg-card px-1.5 font-sans text-[10px] text-muted-foreground sm:block">/</kbd>
      )}
    </label>
  );
}

export function StoreHeader({
  query,
  onSearch,
  cartCount,
  onCart,
}: {
  query: string;
  onSearch: (value: string) => void;
  cartCount: number;
  onCart: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [notifications, setNotifications] = useState(initialNotifications);
  const unread = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "")) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 text-foreground backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        {/* App-style greeting on small screens; the menu itself lives in the bottom tab bar. */}
        <div className="min-w-0 leading-tight md:hidden">
          <p className="text-[11px] text-muted-foreground">สวัสดี 👋 ยินดีต้อนรับกลับมา</p>
          <p className="truncate text-base font-semibold">Nattapong</p>
        </div>

        <div className="hidden min-w-0 flex-1 items-center gap-4 md:flex">
          <SearchField query={query} onSearch={onSearch} inputRef={inputRef} className="w-full max-w-md" />
          <div className="hidden items-center gap-1.5 2xl:flex">
            <span className="text-[11px] text-muted-foreground">ยอดนิยม:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearch(tag)}
                className="rounded-lg px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <div className="mr-1.5 hidden h-10 items-center gap-2.5 rounded-xl border border-primary/40 bg-primary/10 pl-3 pr-1 sm:flex">
            <Wallet className="size-4 text-amber-600" />
            <span className="leading-none">
              <span className="block text-[10px] text-muted-foreground">ยอดเงินคงเหลือ</span>
              <span className="mt-0.5 block text-[13px] font-semibold tabular-nums text-foreground">฿1,250.00</span>
            </span>
            <button className="shine ml-1 flex h-8 items-center gap-1 rounded-lg bg-primary px-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white">
              <Plus className="size-3.5" /> เติมเงิน
            </button>
          </div>

          <Popover>
            <PopoverTrigger className={iconButton} aria-label={`การแจ้งเตือน ${unread} รายการใหม่`}>
              <Bell className="size-[19px]" strokeWidth={1.8} />
              {unread > 0 && (
                <span className="absolute right-2 top-2 flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-coral ring-2 ring-white" />
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-[min(20rem,calc(100vw-2rem))] p-0">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="text-sm font-semibold">
                  การแจ้งเตือน
                  {unread > 0 && <span className="ml-2 rounded-md bg-coral/10 px-1.5 py-0.5 text-[10px] text-coral">{unread} ใหม่</span>}
                </p>
                <button
                  disabled={!unread}
                  onClick={() => setNotifications((list) => list.map((n) => ({ ...n, unread: false })))}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                >
                  อ่านทั้งหมด
                </button>
              </div>
              <ul className="p-1.5">
                {notifications.map((n) => (
                  <li key={n.id} className="flex gap-3 rounded-xl px-2.5 py-2.5 hover:bg-muted">
                    <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.unread ? "bg-primary" : "bg-border")} />
                    <div className="min-w-0">
                      <p className={cn("text-sm", n.unread && "font-medium")}>{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.text}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground/70">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          <button className={iconButton} aria-label={`ตะกร้าสินค้า ${cartCount} รายการ`} onClick={onCart}>
            {/* Re-keyed on count so the cart wiggles each time something is added. */}
            <motion.span
              key={cartCount}
              initial={cartCount ? { rotate: -14, scale: 1.15 } : false}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 12 }}
            >
              <ShoppingCart className="size-[19px]" strokeWidth={1.8} />
            </motion.span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, y: -6 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 15 }}
                  className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-ink shadow-[0_0_10px_#ffd54faa]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <span className="mx-1.5 hidden h-6 w-px bg-border sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl p-1 pr-1.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted md:pr-2.5">
              <span className="relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 text-sm font-bold text-ink">
                N
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-success ring-2 ring-white" />
              </span>
              <span className="hidden text-left leading-tight md:block">
                <span className="block text-[13px] font-medium">Nattapong</span>
              </span>
              <ChevronDown className="hidden size-3.5 text-muted-foreground md:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-1.5">
              <div className="mb-1 rounded-xl bg-ink p-3 text-white">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 font-bold text-ink">N</span>
                  <p className="min-w-0 truncate text-sm font-semibold">Nattapong S.</p>
                </div>
              </div>
              <DropdownMenuItem className="sm:hidden"><Wallet /> ยอดเงิน ฿1,250.00</DropdownMenuItem>
              <DropdownMenuItem><User /> โปรไฟล์</DropdownMenuItem>
              <DropdownMenuItem><History /> ประวัติการสั่งซื้อ</DropdownMenuItem>
              <DropdownMenuItem><Settings /> ตั้งค่าบัญชี</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-coral [&_svg]:!text-coral"><LogOut /> ออกจากระบบ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex gap-2 px-4 pb-3 sm:px-6 md:hidden">
        <SearchField query={query} onSearch={onSearch} className="h-11 flex-1 rounded-2xl" />
        <button
          aria-label="ยอดเงิน ฿1,250.00 แตะเพื่อเติมเงิน"
          className="shine flex h-11 shrink-0 items-center gap-1.5 rounded-2xl bg-ink px-3 text-[13px] font-semibold text-primary transition-transform active:scale-95 sm:hidden"
        >
          <Wallet className="size-4" />
          ฿1,250
          <span className="grid size-5 place-items-center rounded-md bg-primary text-ink">
            <Plus className="size-3" />
          </span>
        </button>
      </div>
    </header>
  );
}
