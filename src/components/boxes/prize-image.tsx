import Image from "next/image";
import { Gift, Ticket } from "lucide-react";
import { Artwork, hasBrandArt } from "@/components/storefront/artwork";
import { cn } from "@/lib/utils";

/** Square prize thumbnail: product art, premium logo, or a generic coupon / gift-card tile. */
export function PrizeImage({ image, name, className }: { image: string; name: string; className?: string }) {
  const generic = image === "coupon" ? { Icon: Ticket, tone: "from-coral to-rose-500" } : image === "giftcard" ? { Icon: Gift, tone: "from-amber-400 to-orange-500" } : null;

  return (
    <div className={cn("relative size-16 shrink-0 overflow-hidden rounded-xl bg-section ring-1 ring-black/10", hasBrandArt(image) && "[&_span]:hidden [&_svg]:size-7", className)}>
      {generic ? (
        <div className={cn("grid size-full place-items-center bg-gradient-to-br text-white", generic.tone)}><generic.Icon className="size-1/2" /></div>
      ) : image.startsWith("/") ? (
        <Image src={image} alt={name} fill sizes="96px" className="object-cover" />
      ) : (
        <Artwork name={image} />
      )}
    </div>
  );
}
