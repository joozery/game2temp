"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BadgePercent, Gamepad2, Home, LayoutGrid, Plus, Wallet, type LucideIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar";

type Tab = { id: string; label: string; icon: LucideIcon; href: string; sections: string[] };

const leftTabs: Tab[] = [
  { id: "home", label: "หน้าแรก", icon: Home, href: "#home", sections: ["home"] },
  { id: "games", label: "เติมเกม", icon: Gamepad2, href: "#games", sections: ["games", "accounts", "digital"] },
];
const rightTabs: Tab[] = [
  { id: "promo", label: "โปรโมชั่น", icon: BadgePercent, href: "#promotions", sections: ["promotions"] },
];
const allTabs = [...leftTabs, ...rightTabs];

/** Picks the tab whose sections are nearest above the fold as the user scrolls. */
function useActiveTab() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = allTabs.flatMap((t) => t.sections);
    const onScroll = () => {
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = allTabs.find((t) => t.sections.includes(id))!.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

function TabLink({ tab, active }: { tab: Tab; active: boolean }) {
  const Icon = tab.icon;
  return (
    <a
      href={tab.href}
      aria-current={active ? "page" : undefined}
      className="relative flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium transition-transform active:scale-90"
    >
      {active && (
        <motion.span
          layoutId="tab-pill"
          className="absolute top-1 h-8 w-14 rounded-full bg-primary/15"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <Icon className={cn("relative size-[22px] transition-colors", active ? "text-amber-600" : "text-muted-foreground")} strokeWidth={active ? 2.2 : 1.8} />
      <span className={cn("relative", active ? "text-foreground" : "text-muted-foreground")}>{tab.label}</span>
    </a>
  );
}

export function MobileTabBar({ onTopUp }: { onTopUp: () => void }) {
  const active = useActiveTab();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="เมนูแอป"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto flex max-w-lg items-end px-2">
          {leftTabs.map((tab) => (
            <TabLink key={tab.id} tab={tab} active={active === tab.id} />
          ))}

          <div className="flex flex-1 justify-center">
            <motion.button
              onClick={onTopUp}
              whileTap={{ scale: 0.9 }}
              className="-mt-9 flex flex-col items-center gap-1 pb-1.5 text-[11px] font-semibold text-foreground"
            >
              <span className="relative grid size-[74px] place-items-center">
                {/* Rotating palette halo behind the button. */}
                <span aria-hidden className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--primary),var(--coral),var(--mint),var(--primary))] opacity-90 blur-[1px]" />
                <span className="shine glow-pulse relative grid size-[66px] place-items-center rounded-full bg-gradient-to-br from-primary to-[#ffb300] text-ink shadow-xl shadow-primary/50 ring-4 ring-background">
                  <Wallet className="relative z-[2] size-7" strokeWidth={2.2} />
                </span>
                <span aria-hidden className="absolute right-0.5 top-0.5 z-[3] grid size-5 place-items-center rounded-full bg-coral text-white ring-2 ring-background">
                  <Plus className="size-3" strokeWidth={3} />
                </span>
              </span>
              เติมเงิน
            </motion.button>
          </div>

          {rightTabs.map((tab) => (
            <TabLink key={tab.id} tab={tab} active={active === tab.id} />
          ))}

          <button
            onClick={() => setMenuOpen(true)}
            className="relative flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium text-muted-foreground transition-transform active:scale-90"
          >
            <LayoutGrid className="size-[22px]" strokeWidth={1.8} />
            เมนู
          </button>
        </div>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" hideClose className="w-72 bg-ink">
          <SheetTitle className="sr-only">เมนู</SheetTitle>
          <SidebarContent onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
