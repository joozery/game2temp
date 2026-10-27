"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight, BadgePercent, BookOpen, ChevronRight, CircleHelp,
  Dices, Gamepad2, Headphones, History, Home, Newspaper,
  Package, ShieldCheck, ShoppingBag, Sparkles, Wallet, X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
  /** Palette tile behind the icon. */
  tone: string;
};

const tones = {
  sunshine: "bg-primary text-ink",
  coral: "bg-coral text-white",
  mint: "bg-mint text-ink",
  emerald: "bg-success text-white",
  pastel: "bg-section text-ink",
};

const shopLinks: NavItem[] = [
  { id: "home", icon: Home, label: "หน้าแรก", href: "#home", tone: tones.sunshine },
  { id: "games", icon: Gamepad2, label: "เติมเกม", href: "#games", tone: tones.coral },
  { id: "accounts", icon: ShoppingBag, label: "ซื้อไอดีเกม", href: "#accounts", tone: tones.mint },
  { id: "digital", icon: Package, label: "สินค้าดิจิทัล", href: "#digital", tone: tones.emerald },
  { id: "premium", icon: Sparkles, label: "แอปพรีเมียม", href: "#premium", tone: tones.coral },
  { id: "boxes", icon: Dices, label: "กล่องสุ่ม", href: "#promotions", tone: tones.pastel },
  { id: "promotions", icon: BadgePercent, label: "โปรโมชั่น", href: "#promotions", tone: tones.coral },
];

const accountLinks: NavItem[] = [
  { id: "history", icon: History, label: "ประวัติการสั่งซื้อ", href: "#", tone: tones.mint },
  { id: "wallet", icon: Wallet, label: "กระเป๋าเงิน", href: "#", tone: tones.emerald },
];

const exploreLinks: NavItem[] = [
  { id: "news", icon: Newspaper, label: "ข่าวสารและบทความ", href: "#news", tone: tones.sunshine },
  { id: "how", icon: BookOpen, label: "วิธีการเติมเกม", href: "#how", tone: tones.pastel },
  { id: "help", icon: CircleHelp, label: "ศูนย์ช่วยเหลือ", href: "#how", tone: tones.mint },
];

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "games", "accounts", "digital", "premium", "promotions", "news", "how", "reviews"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(() => {
      const above = sections
        .filter((element) => element.getBoundingClientRect().top <= 160)
        .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top);
      if (above[0]) setActive(above[0].id);
    }, { rootMargin: "-80px 0px -65% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return { active, setActive };
}

export function Brand() {
  return (
    <a href="#home" className="block min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="PK-TOPUP หน้าแรก">
      <Image
        src="/logo/logo.png"
        alt="PK-TOPUP"
        width={2073}
        height={758}
        sizes="224px"
        loading="eager"
        className="h-auto w-full object-contain"
      />
    </a>
  );
}

function NavGroup({ title, links, active, onNavigate }: {
  title: string;
  links: NavItem[];
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-3 px-3 text-[10px] font-medium tracking-wide text-muted-foreground">
        {title}<span className="h-px flex-1 bg-border" />
      </p>
      <ul className="space-y-1">
        {links.map(({ id, icon: Icon, label, href, tone }) => {
          const selected = active === id;
          return (
            <li key={id}>
              <a
                href={href}
                onClick={() => onNavigate(id)}
                aria-current={selected ? "location" : undefined}
                className={cn(
                  "group relative flex h-[43px] items-center gap-3 rounded-xl border px-3 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  selected
                    ? "border-primary/50 bg-primary/25 font-medium text-foreground"
                    : "border-transparent text-foreground/80 hover:bg-section/60 hover:text-foreground"
                )}
              >
                {selected && <span className="absolute -left-px top-3 bottom-3 w-[3px] rounded-full bg-primary shadow-[0_0_10px_#ffd54f88]" />}
                <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg transition-transform group-hover:scale-110", tone, selected && "shadow-sm ring-2 ring-card")}>
                  <Icon strokeWidth={selected ? 2.2 : 2} className="size-4" />
                </span>
                <span className="flex-1">{label}</span>
                {selected && <ChevronRight className="size-3.5 text-ink/60" />}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { active, setActive } = useActiveSection();
  const navigate = (id: string) => {
    setActive(id);
    onNavigate?.();
  };

  return (
    <div className="flex h-full min-h-0 flex-col border-r border-border bg-card text-foreground">
      <div className="shrink-0 px-5 pb-5 pt-6">
        <div className="flex items-center justify-between gap-2">
          <Brand />
          {onNavigate && (
            <button onClick={onNavigate} aria-label="ปิดเมนู" className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <nav aria-label="เมนูหลัก" className="no-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-3 pb-5">
        <NavGroup title="บริการของเรา" links={shopLinks} active={active} onNavigate={navigate} />
        <NavGroup title="บัญชีของฉัน" links={accountLinks} active={active} onNavigate={navigate} />
        <NavGroup title="สำรวจเพิ่มเติม" links={exploreLinks} active={active} onNavigate={navigate} />
      </nav>

      <div className="shrink-0 space-y-3 border-t border-border bg-background px-4 pb-4 pt-4">
        <a href="#games" onClick={onNavigate} className="group relative block overflow-hidden rounded-xl border border-primary/40 bg-section p-3.5 transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <div className="relative flex items-center gap-2.5">
            <div><p className="text-xs font-semibold text-foreground">สิทธิพิเศษสำหรับสมาชิก</p><p className="mt-0.5 text-[10px] text-muted-foreground">เติมคุ้มกว่า รับส่วนลดทุกวัน</p></div>
          </div>
          <span className="relative mt-3 flex items-center justify-between rounded-lg bg-primary px-3 py-2 text-[11px] font-semibold text-ink transition group-hover:bg-primary-hover">สมัครสมาชิกฟรี<ArrowUpRight className="size-3.5" /></span>
        </a>
        <a href="#reviews" onClick={onNavigate} className="group flex items-center gap-2.5 rounded-lg px-1 py-1.5 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="grid size-8 place-items-center rounded-lg bg-mint/40 text-success"><Headphones className="size-4" /></span>
          <div className="flex-1"><p className="text-[11px]">ต้องการความช่วยเหลือ?</p><p className="text-[9px] text-muted-foreground">ทีมงานพร้อมดูแลคุณ</p></div>
          <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground" />
        </a>
        <p className="flex items-center justify-between border-t border-border pt-3 text-[9px] text-muted-foreground"><span>© 2026 PK-TOPUP</span><span className="flex items-center gap-1"><ShieldCheck className="size-3" /> ปลอดภัย 100%</span></p>
      </div>
    </div>
  );
}

export function Sidebar() {
  return <aside aria-label="เมนูด้านข้าง" className="fixed inset-y-0 left-0 z-40 hidden w-66 lg:block"><SidebarContent /></aside>;
}
