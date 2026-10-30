import type { Metadata } from "next";
import { ProfileView } from "@/components/account/profile-view";

export const metadata: Metadata = { title: "โปรไฟล์ — PK-TOPUP" };

export default function ProfilePage() {
  return <ProfileView />;
}
