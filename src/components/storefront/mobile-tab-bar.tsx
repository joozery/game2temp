"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BadgePercent, Gamepad2, Home, LayoutGrid, Wallet, type LucideIcon } from "lucide-react";
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
              aria-label="เติมเงิน"
              className="shine glow-pulse -mt-6 mb-1 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-yellow-300 to-primary text-ink shadow-lg shadow-primary/40 ring-4 ring-white"
            >
              <Wallet className="relative z-[2] size-6" />
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
        <SheetContent side="left" hideClose className="w-72 bg-[#11151c]">
          <SheetTitle className="sr-only">เมนู</SheetTitle>
          <SidebarContent onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
