"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { MotionProvider, useSectionReveal } from "@/components/effects/motion";
import { Community } from "./community";
import { StoreHeader } from "./header";
import { Footer } from "./footer";
import { HeroBanner } from "./hero-banner";
import { PopularGames, ProductCatalog, type CartItem } from "./product-catalog";
import { Promotions } from "./promotions";
import { Sidebar } from "./sidebar";
import { MobileQuickActions } from "./mobile-quick-actions";
import { MobileTabBar } from "./mobile-tab-bar";

export function Storefront() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = (message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  };

  const add = (item: CartItem) => {
    setCart((c) => [...c, item]);
    showToast(`เพิ่ม ${item.name} ลงตะกร้าแล้ว`);
  };

  useSectionReveal();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <MotionProvider>
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-66">
        <StoreHeader query={query} onSearch={setQuery} cartCount={cart.length} onCart={() => setShowCart(true)} />
        <main className="mx-auto max-w-[1480px] space-y-8 px-4 pb-10 pt-4 sm:px-6 sm:pt-6 lg:space-y-12 lg:px-8 lg:pb-12">
          <HeroBanner />
          <MobileQuickActions />
          <PopularGames />
          <Promotions />
          <ProductCatalog query={query} onAdd={add} />
          <Community />
        </main>
        <Footer />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-[60] flex justify-center px-4 lg:bottom-6">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast}
              role="status"
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="shine flex items-center gap-2.5 rounded-xl bg-ink px-5 py-3.5 text-sm text-white shadow-2xl"
            >
              <motion.span initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.1, type: "spring" }}>
                <CheckCircle2 className="size-5 text-primary" />
              </motion.span>
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MobileTabBar onTopUp={() => showToast("ระบบเติมเงินจะเปิดให้บริการเร็ว ๆ นี้")} />

      <Sheet open={showCart} onOpenChange={setShowCart}>
        <SheetContent side="auto" className="px-5 pt-5 lg:p-6">
          <SheetTitle className="text-xl font-semibold">ตะกร้าสินค้า ({cart.length})</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">ตรวจสอบรายการก่อนชำระเงิน</SheetDescription>

          {cart.length ? (
            <ul className="mt-6 flex-1 divide-y divide-border overflow-y-auto">
              {cart.map((item, i) => (
                <li key={`${item.name}-${i}`} className="flex items-center justify-between gap-3 py-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">฿{item.price.toLocaleString()}</p>
                  </div>
                  <button
                    aria-label={`ลบ ${item.name}`}
                    onClick={() => setCart((c) => c.filter((_, n) => n !== i))}
                    className="grid size-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-coral/10 hover:text-coral"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingCart className="size-12 text-border" />
              <p className="mt-3 text-sm">ยังไม่มีสินค้าในตะกร้า</p>
            </div>
          )}

          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">ยอดรวม</span>
              <span className="text-2xl font-bold">฿{total.toLocaleString()}</span>
            </div>
            <Button size="lg" className="mt-4 w-full" disabled={!cart.length}>
              ชำระเงิน
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">ตัวอย่าง UI — ยังไม่เชื่อมต่อระบบชำระเงิน</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
    </MotionProvider>
  );
}
