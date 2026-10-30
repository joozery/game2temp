import { Gamepad2 } from "lucide-react";
import { Artwork } from "@/components/storefront/artwork";
import { Card } from "@/components/ui/card";
import { savedIds } from "@/lib/account";

export function SavedIdsCard() {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-mint/30 text-ink"><Gamepad2 className="size-5" /></span>
        <div>
          <h2 className="font-semibold sm:text-lg">ไอดีเกมที่บันทึกไว้</h2>
          <p className="text-xs text-muted-foreground">{savedIds.length} เกมในบัญชีของคุณ</p>
        </div>
      </div>
      <ul className="space-y-2">
        {savedIds.map((game) => (
          <li key={game.id} className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-2.5">
            <div className="size-10 shrink-0 overflow-hidden rounded-lg"><Artwork name={game.art} /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{game.game}</p>
              <p className="truncate text-xs text-muted-foreground">UID {game.uid} · {game.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
