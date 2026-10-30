"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { StoreHeader } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Sidebar } from "@/components/storefront/sidebar";
import { MobileTabBar } from "@/components/storefront/mobile-tab-bar";
import { MotionProvider } from "@/components/effects/motion";

/** Same chrome as the storefront (sidebar, header, tab bar, footer) around account pages. */
export function AccountShell({ children, hero, wide = false }: { children: React.ReactNode; hero?: React.ReactNode; wide?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const accountPage = ["/profile", "/orders", "/wallet", "/settings"].includes(pathname);
  return (
    <MotionProvider>
      <div className="min-h-screen">
        <Sidebar />
        <div className="lg:pl-66">
          <StoreHeader accountMode={accountPage} />
          {hero}
          <main className={`mx-auto space-y-6 px-4 pb-10 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pb-12 ${wide ? "max-w-none" : accountPage ? "max-w-[1320px]" : "max-w-[1100px]"}`}>{children}</main>
          <Footer />
        </div>
        <MobileTabBar onTopUp={() => router.push("/wallet")} />
      </div>
    </MotionProvider>
  );
}
