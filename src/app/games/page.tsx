import type { Metadata } from "next";
import { GamesPage } from "@/components/games/games-page";

export const metadata: Metadata = {
  title: "เติมเกม — PK-TOPUP",
  description: "เติมเกมสุดคุ้ม รวดเร็ว ปลอดภัย ได้รับไอเทมทันที ครบทุกเกมฮิต",
};

export default function Games() {
  return <GamesPage />;
}
