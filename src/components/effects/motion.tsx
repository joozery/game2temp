"use client";

import { useEffect } from "react";
import { animate, inView, stagger } from "motion";
import { MotionConfig, motion, type HTMLMotionProps } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Honour the OS "reduce motion" setting for every motion component below it. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({
  delay = 0,
  y = 28,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease }}
      {...props}
    />
  );
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/**
 * Scroll-reveals every `section` inside `rootSelector`, staggering the cards of any grid within it.
 * Works on markup we don't own, so section components need no motion wrappers of their own.
 */
export function useSectionReveal(rootSelector = "main") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("section")).filter(
      (el) => el.id !== "home" && el.getBoundingClientRect().top > window.innerHeight
    );
    const cardsOf = (el: Element) => el.querySelectorAll<HTMLElement>(".grid > *, ol > li");

    sections.forEach((el) => {
      el.style.opacity = "0";
      cardsOf(el).forEach((card) => (card.style.opacity = "0"));
    });

    const stops = sections.map((el) =>
      inView(
        el,
        () => {
          animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: 0.6, ease });
          const cards = cardsOf(el);
          if (cards.length) {
            animate(cards, { opacity: [0, 1], y: [20, 0], scale: [0.97, 1] }, { duration: 0.5, ease, delay: stagger(0.06, { startDelay: 0.15 }) });
          }
        },
        { margin: "0px 0px -80px 0px" }
      )
    );
    return () => stops.forEach((stop) => stop());
  }, [rootSelector]);
}
