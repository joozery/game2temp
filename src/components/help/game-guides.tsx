import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gamepad2 } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import { games } from "@/lib/games";

const ids = ["freefire", "rov", "pubgm", "genshin", "mlbb", "valorant"];
const guides = ids.map((id) => games.find((g) => g.id === id)).filter((g) => g !== undefined);

export function GameGuides() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-ink text-primary"><Gamepad2 className="size-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold">คู่มือการเติมเกมยอดนิยม</h2>
          <p className="text-sm text-muted-foreground">เลือกดูวิธีการเติมเกมตามเกมที่คุณต้องการ</p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7">
        {guides.map((g) => (
          <li key={g.id}>
            <Link href="/how-to" className="group block overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="relative aspect-[1.6] overflow-hidden"><Artwork name={g.id} /><span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-white/90 text-ink shadow"><ArrowUpRight className="size-3.5" /></span></div>
              <div className="p-3">
                <p className="text-sm font-bold leading-tight">{g.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">วิธีการเติมเกม</p>
              </div>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/#games" className="flex h-full min-h-32 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-muted/50 p-3 text-center transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowRight className="size-5 text-muted-foreground" />
            <span className="text-sm font-bold">ดูทั้งหมด</span>
            <span className="text-xs text-muted-foreground">ทุกเกม</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
