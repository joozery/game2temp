import type { Metadata } from "next";
import { SettingsView } from "@/components/account/settings-view";

export const metadata: Metadata = { title: "ตั้งค่าบัญชี — PK-TOPUP" };

export default function SettingsPage() {
  return <SettingsView />;
}
