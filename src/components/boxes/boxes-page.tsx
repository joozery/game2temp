import { Dices, Gift, ShieldCheck, Zap } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { GamesHero } from "@/components/games/games-hero";
import { boxes } from "@/lib/boxes";
import { BoxCard } from "./box-card";

const pills = [
  { icon: Gift, label: "ได้รางวัลทุกกล่อง", tone: "text-coral" },
  { icon: ShieldCheck, label: "แสดงโอกาสโปร่งใส", tone: "text-success" },
  { icon: Zap, label: "รับของทันที", tone: "text-amber-500" },
];

export function BoxesPage() {
  return (
    <AccountShell
      wide
      hero={<GamesHero title="กล่อง" accent="สุ่ม" subtitle="เปิดกล่อง ลุ้นรางวัลมากมาย ได้ของแน่นอนทุกกล่อง" pills={pills} bubble={["เปิดกล่องลุ้นโชค", "ได้รางวัลทุกกล่อง"]} />}
    >
      <section aria-label="กล่องสุ่ม">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-ink"><Dices className="size-6" /></span>
          <div>
            <h2 className="text-xl font-extrabold">เลือกกล่องที่ใช่</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">ราคาสูง ยิ่งลุ้นรางวัลมูลค่าสูง</p>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {boxes.map((b) => <li key={b.id}><BoxCard box={b} /></li>)}
        </ul>
      </section>

    </AccountShell>
  );
}
