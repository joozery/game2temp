import Image from "next/image";
import { ArrowUp, Clock3, Headset, Mail, MessageCircle, ShieldCheck, Zap, type LucideIcon } from "lucide-react";

const highlights: { icon: LucideIcon; title: string; text: string; tile: string }[] = [
  { icon: Zap, title: "ได้รับทันที", text: "ระบบอัตโนมัติภายใน 1 นาที", tile: "bg-primary text-ink" },
  { icon: ShieldCheck, title: "ปลอดภัย 100%", text: "ชำระเงินผ่านช่องทางที่เชื่อถือได้", tile: "bg-success text-white" },
  { icon: Clock3, title: "เปิดบริการ 24 ชม.", text: "เติมได้ทุกวัน ไม่มีวันหยุด", tile: "bg-mint text-ink" },
  { icon: Headset, title: "แอดมินดูแลตลอด", text: "ตอบกลับไว ช่วยเหลือทุกปัญหา", tile: "bg-coral text-white" },
];

const columns = [
  {
    title: "บริการของเรา",
    links: [
      { label: "เติมเกม", href: "#games" },
      { label: "ซื้อไอดีเกม", href: "#accounts" },
      { label: "สินค้าดิจิทัล", href: "#digital" },
      { label: "แอปพรีเมียม", href: "#premium" },
      { label: "โปรโมชั่น", href: "#promotions" },
    ],
  },
  {
    title: "ช่วยเหลือ",
    links: [
      { label: "วิธีการเติมเกม", href: "#how" },
      { label: "ข่าวสารและบทความ", href: "#news" },
      { label: "รีวิวจากลูกค้า", href: "#reviews" },
      { label: "ศูนย์ช่วยเหลือ", href: "#how" },
    ],
  },
  {
    title: "นโยบาย",
    links: [
      { label: "เงื่อนไขการให้บริการ", href: "#" },
      { label: "นโยบายความเป็นส่วนตัว", href: "#" },
      { label: "นโยบายการคืนเงิน", href: "#" },
    ],
  },
];

const payments = ["PromptPay", "TrueMoney", "VISA", "Mastercard"];

const linkClass =
  "rounded text-sm text-muted-foreground transition-colors hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1480px] px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8 lg:pb-8">
      <ul className="grid gap-3 rounded-3xl bg-mint/30 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-4">
        {highlights.map(({ icon: Icon, title, text, tile }) => (
          <li key={title} className="flex items-center gap-3 rounded-2xl bg-card/70 p-3.5">
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tile}`}>
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-semibold leading-tight">{title}</p>
              <p className="truncate text-xs text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative mt-4 overflow-hidden rounded-3xl bg-section text-foreground">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/50 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-mint/40 blur-3xl" />

        <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.3fr_2fr] lg:p-10">
          <div className="max-w-sm">
            <a href="#home" aria-label="PK-TOPUP หน้าแรก" className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Image src="/logo/logo.png" alt="PK-TOPUP" width={2073} height={758} sizes="176px" className="h-auto w-44" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              เว็บเติมเกมออนไลน์ เติมเพชร เติมคูปอง ราคาคุ้ม ได้รับทันทีตลอด 24 ชั่วโมง
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#"
                className="shine inline-flex h-10 items-center gap-2 rounded-xl bg-success px-4 text-sm font-semibold text-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <MessageCircle className="size-4" /> แอดไลน์ @pk-topup
              </a>
              <a
                href="mailto:support@pk-topup.com"
                aria-label="ส่งอีเมลหาทีมงาน"
                className="grid size-10 place-items-center rounded-xl border border-ink/15 bg-card text-foreground transition hover:border-coral hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="ลิงก์ท้ายเว็บ" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
                <span aria-hidden className="mt-2 block h-0.5 w-6 rounded-full bg-coral" />
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={linkClass}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="relative flex flex-col gap-4 border-t border-ink/10 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <ul className="flex flex-wrap gap-2" aria-label="ช่องทางการชำระเงิน">
            {payments.map((name) => (
              <li key={name} className="rounded-lg bg-card px-2.5 py-1 text-[11px] font-semibold tracking-wide text-foreground">
                {name}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 PK-TOPUP สงวนลิขสิทธิ์</p>
            <a
              href="#home"
              className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              กลับขึ้นด้านบน
              <span className="grid size-6 place-items-center rounded-md bg-primary text-ink transition-transform group-hover:-translate-y-0.5">
                <ArrowUp className="size-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
