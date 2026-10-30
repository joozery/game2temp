import Image from "next/image";
import { Artwork, hasBrandArt } from "@/components/storefront/artwork";
import { cn } from "@/lib/utils";

const premium = new Set(["netflix", "spotify", "youtube", "disney", "canva", "capcut", "chatgpt", "prime", "apple-music"]);

/** Square product thumbnail for game art, brand cards and premium-app logos. */
export function OrderThumb({ art, name, className }: { art: string; name: string; className?: string }) {
  return (
    <div className={cn("relative size-12 shrink-0 overflow-hidden rounded-xl bg-section ring-1 ring-border", hasBrandArt(art) && "[&_span]:hidden [&_svg]:size-6", className)}>
      {premium.has(art) ? (
        <Image src={`/images/premium/${art}.webp`} alt={name} fill sizes="64px" className="object-cover" />
      ) : (
        <Artwork name={art} />
      )}
    </div>
  );
}
