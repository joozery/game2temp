"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSignedIn } from "@/lib/auth";
import { StoreHeader } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { Sidebar } from "@/components/storefront/sidebar";
import { MobileTabBar } from "@/components/storefront/mobile-tab-bar";
import { MotionProvider } from "@/components/effects/motion";

/** Same chrome as the storefront (sidebar, header, tab bar, footer) around account pages. */
export function AccountShell({ children, hero, wide = false }: { children: React.ReactNode; hero?: React.ReactNode; wide?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const accountPage = ["/profile", "/orders", "/wallet", "/settings", "/affiliate"].includes(pathname);
  const signedIn = useSignedIn();
  const blocked = accountPage && !signedIn;

  useEffect(() => {
    if (blocked) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [blocked, router, pathname]);

  return (
    <MotionProvider>
      <div className="min-h-screen">
        <Sidebar />
        <div className="lg:pl-66">
          <StoreHeader accountMode={accountPage} />
          {hero}
          <main className={`mx-auto space-y-6 px-4 pb-10 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pb-12 ${wide ? "max-w-none" : accountPage ? "max-w-[1320px]" : "max-w-[1100px]"}`}>{blocked ? null : children}</main>
          <Footer />
        </div>
        <MobileTabBar onTopUp={() => router.push("/wallet")} />
      </div>
    </MotionProvider>
  );
}
