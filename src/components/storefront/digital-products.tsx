"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Package, ShoppingCart, Ticket } from "lucide-react";
import { digitalProducts, type DigitalProduct } from "@/lib/digital-products";
import { ChipGroup } from "@/components/ui/toggle-group";
import { Artwork } from "./artwork";
import { SectionHeading } from "./section-heading";
import type { CartItem } from "./product-catalog";

const products = digitalProducts;

function DigitalProductCard({ product, onAdd }: { product: DigitalProduct; onAdd: (item: CartItem) => void }) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition duration-200 hover:border-primary/60 hover:shadow-lg hover:shadow-black/[0.04]">
      <div className="relative aspect-[1.55] overflow-hidden">
        <Artwork name={product.id} />
        <span className="pointer-events-none absolute -right-6 -top-9 size-32 rounded-full border-[18px] border-white/[0.07]" />
        <span className="pointer-events-none absolute -bottom-10 -left-8 size-28 rounded-full border border-white/10" />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-md border border-white/15 bg-black/15 px-1.5 py-1 text-[8px] font-medium tracking-wider text-white backdrop-blur-sm"><Ticket className="size-2.5" aria-hidden /> DIGITAL CARD</span>
      </div>
      <div className="relative border-t border-dashed border-border px-3.5 pb-3.5 pt-3">
        <p className="mb-1 text-[10px] text-muted-foreground">{product.type}</p>
        <h3 className="min-h-10 text-sm font-semibold leading-5">{product.name}</h3>
        <div className="mt-3 flex items-end justify-between gap-2 border-t border-border/60 pt-3">
          <div><p className="text-[10px] text-muted-foreground">เริ่มต้น</p><p className="mt-0.5 text-lg font-semibold leading-none tracking-tight"><span className="mr-0.5 text-sm">฿</span>{product.price.toLocaleString("th-TH")}</p></div>
          <button type="button" aria-label={`เพิ่ม ${product.name} ลงตะกร้า`} onClick={() => onAdd({ name: product.name, price: product.price, art: product.id })} className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-ink transition hover:bg-coral hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><ShoppingCart className="size-4" /></button>
        </div>
      </div>
    </article>
  );
}

function DigitalCarousel({ items, onAdd }: { items: DigitalProduct[]; onAdd: (item: CartItem) => void }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ start: true, end: true, progress: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setState({ start: track.scrollLeft <= 2, end: max - track.scrollLeft <= 2, progress: max > 0 ? track.scrollLeft / max : 0 });
    };
    const resize = new ResizeObserver(update);
    resize.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => { resize.disconnect(); track.removeEventListener("scroll", update); };
  }, []);

  const slide = (direction: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const controlClass = "grid size-9 place-items-center rounded-full border border-border bg-card text-ink transition hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-card";

  return (
    <div aria-roledescription="carousel" aria-label="สินค้าดิจิทัล">
      <ul ref={trackRef} id="digital-products-track" tabIndex={0} aria-label="รายการสินค้าดิจิทัล เลื่อนเพื่อดูเพิ่มเติม" className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-2xl pb-2 pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {items.map((product) => <li key={product.id} className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)]"><DigitalProductCard product={product} onAdd={onAdd} /></li>)}
      </ul>
      <div className="mt-3 flex items-center gap-4">
        <span className="shrink-0 text-xs text-muted-foreground">{items.length} รายการ</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-border" aria-hidden><span className="absolute inset-y-0 rounded-full bg-primary transition-[left] motion-reduce:transition-none" style={{ width: state.start && state.end ? "100%" : "25%", left: `${Math.min(1, Math.max(0, state.progress)) * 75}%` }} /></div>
        <div className="flex gap-2">
          <button type="button" aria-label="เลื่อนสินค้าดิจิทัลก่อนหน้า" aria-controls="digital-products-track" disabled={state.start} onClick={() => slide(-1)} className={controlClass}><ChevronLeft className="size-4" /></button>
          <button type="button" aria-label="เลื่อนสินค้าดิจิทัลถัดไป" aria-controls="digital-products-track" disabled={state.end} onClick={() => slide(1)} className={controlClass}><ChevronRight className="size-4" /></button>
        </div>
      </div>
    </div>
  );
}

export function DigitalProducts({ query, onAdd }: { query: string; onAdd: (item: CartItem) => void }) {
  const [filter, setFilter] = useState("ทั้งหมด");
  const items = products.filter((product) => (filter === "ทั้งหมด" || product.type === filter) && product.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <section id="digital">
      <SectionHeading title="สินค้าดิจิทัล" icon={Package} href="/digital">
        <ChipGroup label="กรองสินค้าดิจิทัล" options={["ทั้งหมด", "บัตรเติมเกม", "ไอเทมเกม", "บริการเสริม"]} value={filter} onValueChange={setFilter} />
      </SectionHeading>
      {items.length ? <DigitalCarousel key={`${filter}:${query}`} items={items} onAdd={onAdd} /> : <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">ไม่พบสินค้าที่ค้นหา ลองเปลี่ยนหมวดหรือคำค้นหา</p>}
    </section>
  );
}
