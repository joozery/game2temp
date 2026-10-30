"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { GameCard } from "@/components/games/game-card";
import { TopupDialog } from "@/components/topup-dialog";
import { catalogGames, type CatalogGame } from "@/lib/game-catalog";
import { SectionHeading } from "./section-heading";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  /** Chooses which catalog games appear and in what order. */
  pick: (games: CatalogGame[]) => CatalogGame[];
  /** List cards suit short rows (two items) better than a sparse four-column grid. */
  list?: boolean;
};

/** Homepage row of catalog games that opens the same top-up dialog as /games. */
export function GameShowcase({ id, title, subtitle, icon, pick, list = false }: Props) {
  const [active, setActive] = useState<CatalogGame | null>(null);
  const games = pick(catalogGames);
  if (!games.length) return null;

  return (
    <section id={id} className="scroll-mt-20">
      <SectionHeading title={title} subtitle={subtitle} icon={icon} href="/games" />
      <ul className={list ? "grid gap-4 md:grid-cols-2" : "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"}>
        {games.map((game) => <li key={game.id} className="min-w-0"><GameCard game={game} list={list} onOpen={() => setActive(game)} /></li>)}
      </ul>
      {active && <TopupDialog game={active} open onOpenChange={(open) => { if (!open) setActive(null); }} />}
    </section>
  );
}
