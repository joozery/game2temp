import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import { Card, CardTitle } from "@/components/ui/card";
import { games } from "@/lib/games";

const supported = games.filter((g) => ["rov", "freefire", "pubgm", "genshin", "mlbb", "valorant", "lol", "ragnarok"].includes(g.id));

export function SupportedGamesCard() {
  return (
    <Card className="p-4 sm:p-5">
      <CardTitle icon={Gamepad2} title="เกมยอดนิยมที่รองรับ">
        <Link href="/#games" className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground">ดูเกมทั้งหมด <ArrowRight className="size-3.5" /></Link>
      </CardTitle>
      <ul className="grid grid-cols-4 gap-3">
        {supported.map((g) => (
          <li key={g.id}>
            <Link href="/#games" className="group flex flex-col items-center gap-1.5 text-center text-[11px] text-muted-foreground transition hover:text-foreground">
              <span className="block size-16 overflow-hidden rounded-xl ring-1 ring-border"><Artwork name={g.id} /></span>
              <span className="line-clamp-1">{g.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
