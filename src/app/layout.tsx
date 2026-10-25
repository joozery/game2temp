import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PK-TOPUP — เติมเกมไว ปลอดภัย 100%",
  description: "เว็บเติมเกมออนไลน์ เติมเพชร เติมคูปอง ได้รับทันทีตลอด 24 ชั่วโมง",
  applicationName: "PK-TOPUP",
  appleWebApp: { capable: true, title: "PK-TOPUP", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${kanit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
