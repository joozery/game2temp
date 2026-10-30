import type { Metadata } from "next";
import { WalletView } from "@/components/account/wallet-view";

export const metadata: Metadata = { title: "กระเป๋าเงิน — PK-TOPUP" };

export default function WalletPage() {
  return <WalletView />;
}
