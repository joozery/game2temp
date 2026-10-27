"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Gamepad2 } from "lucide-react";
import { games } from "@/lib/games";
import { Artwork } from "./artwork";

const popularIds = ["rov", "freefire", "pubgm", "genshin", "valorant", "ragnarok", "mlbb", "lol"];

export function PopularGames() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => setEdges({
      start: track.scrollLeft <= 2,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    });
    const resize = new ResizeObserver(update);
    resize.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      resize.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, []);

  const slide = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const nextCard = card?.nextElementSibling as HTMLElement | null;
    const distance = card && nextCard ? nextCard.offsetLeft - card.offsetLeft : track.clientWidth;
    track.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section aria-labelledby="popular-games-title" aria-roledescription="carousel">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="popular-games-title" className="flex items-center gap-2.5 text-lg font-semibold sm:text-xl">
          <Gamepad2 className="size-6 shrink-0 text-ink" aria-hidden />
          หมวดเกมยอดนิยม
        </h2>
        <a href="#games" className="flex shrink-0 items-center gap-2 text-xs font-medium transition hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm">
          เกมทั้งหมด <ArrowRight className="size-3.5" aria-hidden />
        </a>
      </div>
      <div className="relative">
        <ul
          ref={trackRef}
          id="popular-games-track"
          aria-label="เกมยอดนิยม เลื่อนเพื่อดูเกมเพิ่มเติม"
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-md py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {popularIds.map((id, index) => {
            const game = games.find((entry) => entry.id === id);
            if (!game) return null;
            return (
              <li key={id} aria-posinset={index + 1} aria-setsize={popularIds.length} className="-mr-6 w-36 shrink-0 snap-start last:mr-0 sm:w-[calc((100%+72px)/4)] lg:w-[calc((100%+96px)/5)] xl:w-[calc((100%+120px)/6)]">
                <a href="#games" aria-label={`เติมเกม ${game.name}`} className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <div className="relative h-32 overflow-hidden rounded-md bg-section transition duration-200 group-hover:brightness-110 sm:h-36" style={{ clipPath: "polygon(22% 0, 100% 0, 78% 100%, 0 100%)" }}>
                    <Artwork name={id} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    <span className="absolute inset-x-3 bottom-2.5 text-center text-[11px] font-semibold leading-tight text-white drop-shadow-md sm:text-xs">
                      {game.name}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          aria-label="เลื่อนดูเกมก่อนหน้า"
          aria-controls="popular-games-track"
          disabled={edges.start}
          onClick={() => slide(-1)}
          className="absolute -left-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-ink shadow-md transition hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-0 sm:size-9"
        ><ChevronLeft className="size-4" /></button>
        <button
          type="button"
          aria-label="เลื่อนดูเกมถัดไป"
          aria-controls="popular-games-track"
          disabled={edges.end}
          onClick={() => slide(1)}
          className="absolute -right-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-white text-ink shadow-md transition hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-0 sm:size-9"
        ><ChevronRight className="size-4" /></button>
      </div>
    </section>
  );
}
