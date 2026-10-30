import type { Metadata } from "next";
import { AccountShell } from "@/components/account/account-shell";
import { HowToHero } from "@/components/how-to/how-to-hero";
import { HowToView } from "@/components/how-to/how-to-view";

export const metadata: Metadata = {
  title: "วิธีการเติมเกม — PK-TOPUP",
  description: "เติมเกมง่าย ๆ ไม่กี่ขั้นตอน รวดเร็ว ปลอดภัย ได้รับไอเทมทันที",
};

export default function HowToPage() {
  return (
    <AccountShell wide hero={<HowToHero />}>
      <HowToView />
    </AccountShell>
  );
}
