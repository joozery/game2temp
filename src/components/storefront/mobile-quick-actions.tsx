"use client";

import { motion } from "motion/react";
import { BookOpen, Dices, Gamepad2, Package, ShoppingBag, type LucideIcon } from "lucide-react";
import { staggerChild, staggerParent } from "@/components/effects/motion";

const actions: { label: string; href: string; icon: LucideIcon; tile: string; badge?: string }[] = [
  { label: "เติมเกม", href: "#games", icon: Gamepad2, tile: "from-amber-300 to-orange-500", badge: "HOT" },
  { label: "ไอดีเกม", href: "#accounts", icon: ShoppingBag, tile: "from-sky-400 to-indigo-500" },
  { label: "บัตรเติมเงิน", href: "#digital", icon: Package, tile: "from-mint to-success" },
  { label: "กล่องสุ่ม", href: "#promotions", icon: Dices, tile: "from-fuchsia-400 to-violet-600", badge: "NEW" },
  { label: "วิธีเติม", href: "#how", icon: BookOpen, tile: "from-coral to-rose-600" },
];

/** App-style shortcut icons shown under the hero on phones and tablets. */
export function MobileQuickActions() {
  return (
    <motion.nav
      aria-label="ทางลัด"
      variants={staggerParent}
      initial="hidden"
      animate="show"
      className="-mt-4 grid grid-cols-5 gap-1 rounded-3xl border border-border bg-card px-2 py-4 shadow-sm lg:hidden"
    >
      {actions.map(({ label, href, icon: Icon, tile, badge }) => (
        <motion.a
          key={label}
          href={href}
          variants={staggerChild}
          whileTap={{ scale: 0.88 }}
          className="relative flex flex-col items-center gap-1.5"
        >
          <span className={`relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md ${tile}`}>
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
