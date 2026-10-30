"use client";

import { motion } from "motion/react";
import { BookOpen, Dices, Gamepad2, Package, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";
import { staggerChild, staggerParent } from "@/components/effects/motion";

const actions: { label: string; href: string; icon: LucideIcon; tile: string; badge?: string }[] = [
  { label: "เติมเกม", href: "#games", icon: Gamepad2, tile: "from-primary to-primary-hover text-ink", badge: "HOT" },
  { label: "ไอดีเกม", href: "/accounts", icon: ShoppingBag, tile: "from-coral/80 to-coral text-white" },
  { label: "บัตรเติมเงิน", href: "/digital", icon: Package, tile: "from-mint to-success text-white" },
  { label: "แอปพรีเมียม", href: "/premium", icon: Sparkles, tile: "from-coral to-primary text-white", badge: "NEW" },
  { label: "กล่องสุ่ม", href: "/boxes", icon: Dices, tile: "from-mint/70 to-mint text-ink" },
  { label: "วิธีเติม", href: "/how-to", icon: BookOpen, tile: "from-section to-primary text-ink" },
];

/** App-style shortcut icons shown under the hero on phones and tablets. */
export function MobileQuickActions() {
  return (
    <motion.nav
      aria-label="ทางลัด"
      variants={staggerParent}
      initial="hidden"
      animate="show"
      className="-mt-4 grid grid-cols-3 gap-x-1 gap-y-4 rounded-3xl sm:grid-cols-6 border border-border bg-card px-2 py-4 shadow-sm lg:hidden"
    >
      {actions.map(({ label, href, icon: Icon, tile, badge }) => (
        <motion.a
          key={label}
          href={href}
          variants={staggerChild}
          whileTap={{ scale: 0.88 }}
          className="relative flex flex-col items-center gap-1.5"
        >
          <span className={`relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br shadow-md ${tile}`}>
            <Icon className="size-6" />
            {badge && (
              <span className="absolute -right-2 -top-1.5 rounded-full bg-coral px-1.5 text-[8px] font-bold leading-4 text-white ring-2 ring-card">
                {badge}
              </span>
            )}
          </span>
          <span className="text-center text-[11px] font-medium leading-tight">{label}</span>
        </motion.a>
      ))}
    </motion.nav>
  );
}
