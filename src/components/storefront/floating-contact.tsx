"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CircleHelp, Headset, Mail, MessageCircle, X, type LucideIcon } from "lucide-react";

const channels: { label: string; hint: string; href: string; icon: LucideIcon; tone: string; external?: boolean }[] = [
  { label: "แอดไลน์ @pk-topup", hint: "ตอบกลับไว ตลอด 24 ชม.", href: "https://line.me/R/ti/p/%40pk-topup", icon: MessageCircle, tone: "bg-success text-white", external: true },
  { label: "อีเมลหาเรา", hint: "support@pk-topup.com", href: "mailto:support@pk-topup.com", icon: Mail, tone: "bg-primary text-ink" },
  { label: "ศูนย์ช่วยเหลือ", hint: "คำถามที่พบบ่อยและวิธีใช้งาน", href: "/help#contact", icon: CircleHelp, tone: "bg-mint text-ink" },
];

/** Collapsed to a round button; tapping it pops the contact channels open above it. */
export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={root} className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id="floating-contact-panel"
            role="dialog"
            aria-label="ช่องทางติดต่อ"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-2 shadow-[0_18px_44px_-14px_rgba(16,24,39,.4)]"
          >
            <div className="px-3 pb-2 pt-2.5">
              <p className="text-sm font-bold">ติดต่อเรา 24 ชม.</p>
              <p className="text-[11px] text-muted-foreground">ทีมงานพร้อมช่วยเหลือทุกวัน</p>
            </div>
            <ul>
              {channels.map(({ label, hint, href, icon: Icon, tone, external }) => {
                const content = (
                  <>
                    <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${tone}`}><Icon className="size-[18px]" /></span>
                    <span className="min-w-0 flex-1 leading-tight"><span className="block truncate text-[13px] font-medium">{label}</span><span className="block truncate text-[11px] text-muted-foreground">{hint}</span></span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </>
                );
                const className = "flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
                return (
                  <li key={label}>
                    {href.startsWith("/") ? (
                      <Link href={href} onClick={() => setOpen(false)} className={className}>{content}</Link>
                    ) : (
                      <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className={className}>{content}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "ปิดช่องทางติดต่อ" : "ติดต่อเรา 24 ชั่วโมง"}
        aria-expanded={open}
        aria-controls="floating-contact-panel"
        onClick={() => setOpen((value) => !value)}
        className="group relative grid size-14 place-items-center overflow-hidden rounded-full border border-white/70 bg-gradient-to-br from-emerald-600 via-success to-emerald-500 text-white shadow-[0_12px_30px_-9px_rgba(0,120,83,.58)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-8px_rgba(0,120,83,.65)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "close" : "open"} initial={{ rotate: -60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 60, opacity: 0 }} transition={{ duration: 0.15 }}>
            {open ? <X className="size-6" strokeWidth={2.4} /> : <Headset className="size-6" strokeWidth={2.2} />}
          </motion.span>
        </AnimatePresence>
        {!open && <span aria-hidden className="absolute right-3 top-3 size-2.5 rounded-full bg-coral ring-2 ring-success" />}
      </button>
    </div>
  );
}
