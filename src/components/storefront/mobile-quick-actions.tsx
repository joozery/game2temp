"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { BadgePercent, BookOpen, ChevronLeft, ChevronRight, CircleHelp, Dices, Gamepad2, Newspaper, Package, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";
import { staggerChild, staggerParent } from "@/components/effects/motion";

const actions: { label: string; href: string; icon: LucideIcon; tile: string; badge?: string }[] = [
  { label: "เติมเกม", href: "/games", icon: Gamepad2, tile: "from-primary to-primary-hover text-ink", badge: "HOT" },
  { label: "ไอดีเกม", href: "/accounts", icon: ShoppingBag, tile: "from-coral/80 to-coral text-white" },
  { label: "สินค้าดิจิทัล", href: "/digital", icon: Package, tile: "from-mint to-success text-white" },
  { label: "แอปพรีเมียม", href: "/premium", icon: Sparkles, tile: "from-coral to-primary text-white", badge: "NEW" },
  { label: "กล่องสุ่ม", href: "/boxes", icon: Dices, tile: "from-mint/70 to-mint text-ink" },
  { label: "โปรโมชั่น", href: "/promotions", icon: BadgePercent, tile: "from-coral to-coral/80 text-white", badge: "ลด" },
  { label: "ข่าวสาร", href: "/articles", icon: Newspaper, tile: "from-primary to-section text-ink" },
  { label: "วิธีเติมเกม", href: "/how-to", icon: BookOpen, tile: "from-section to-primary text-ink" },
  { label: "ช่วยเหลือ", href: "/help", icon: CircleHelp, tile: "from-mint to-mint/70 text-ink" },
];

/** App-style shortcut icons shown under the hero on phones and tablets; swipe, drag or use the arrows when they overflow. */
export function MobileQuickActions() {
  const scroller = useRef<HTMLElement>(null);
  const drag = useRef({ x: 0, left: 0, active: false, moved: false });
  const [edges, setEdges] = useState({ left: false, right: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const nudge = (direction: 1 | -1) => scroller.current?.scrollBy({ left: direction * 160, behavior: "smooth" });

  // Mouse drag-to-scroll; touch already scrolls natively.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !scroller.current) return;
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, active: true, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || !scroller.current) return;
    if (Math.abs(e.clientX - d.x) > 4) d.moved = true;
    if (d.moved) scroller.current.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = () => { drag.current.active = false; };

  const arrow = "absolute top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-md transition active:scale-90";

  return (
    <div className="relative -mt-4 lg:hidden">
      <motion.nav
        ref={scroller}
        aria-label="ทางลัด"
        variants={staggerParent}
        initial="hidden"
        animate="show"
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; } }}
        className="no-scrollbar flex scroll-px-2 snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain rounded-3xl border border-border bg-card px-2 py-4 shadow-sm"
      >
        {actions.map(({ label, href, icon: Icon, tile, badge }) => (
          <motion.a
            key={label}
            href={href}
            draggable={false}
            variants={staggerChild}
            whileTap={{ scale: 0.88 }}
            className="relative flex w-[76px] shrink-0 snap-start flex-col items-center gap-1.5 sm:flex-1"
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
      {edges.left && <button type="button" aria-label="เลื่อนไปทางซ้าย" onClick={() => nudge(-1)} className={`${arrow} left-1`}><ChevronLeft className="size-4" /></button>}
      {edges.right && <button type="button" aria-label="เลื่อนไปทางขวา" onClick={() => nudge(1)} className={`${arrow} right-1`}><ChevronRight className="size-4" /></button>}
    </div>
  );
}
