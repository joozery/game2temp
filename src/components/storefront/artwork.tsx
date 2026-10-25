import { CircleDollarSign, Flame, Gamepad2, Hexagon, Wallet, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Official game artwork; source pages and asset URLs live in public/images/games/sources.json.
const gameArt: Record<string, { file: string; label: string; position?: string; size?: string; background?: string }> = {
  rov: { file: "rov.jpg", label: "RoV — Capheny", position: "61% 35%" },
  freefire: { file: "freefire.jpg", label: "Free Fire", position: "70% 35%" },
  pubgm: { file: "pubgm-cover.png", label: "PUBG Mobile", position: "center 30%" },
  genshin: { file: "genshin.jpg", label: "Genshin Impact", position: "52% 35%" },
  valorant: { file: "valorant.png", label: "Valorant — Reyna & Raze", position: "center 20%", background: "#62293e" },
  ragnarok: { file: "ragnarok-character.png", label: "Ragnarok Origin", position: "center 20%", size: "auto 170%", background: "#516651" },
  mlbb: { file: "mlbb.png", label: "Mobile Legends: Bang Bang", position: "center 20%" },
  lol: { file: "lol.png", label: "League of Legends — Akali", position: "center 35%", size: "auto 145%", background: "#183c3e" },
};

const brands: Record<string, { label: string; Icon: LucideIcon; className: string }> = {
  razer: { label: "GOLD", Icon: CircleDollarSign, className: "from-emerald-800 to-emerald-950 text-amber-300" },
  garena: { label: "Garena", Icon: Flame, className: "from-red-600 to-red-900 text-white" },
  truemoney: { label: "TrueMoney", Icon: Wallet, className: "from-orange-400 to-orange-600 text-white" },
  playstation: { label: "PlayStation", Icon: Gamepad2, className: "from-blue-600 to-indigo-900 text-white" },
  steam: { label: "STEAM", Icon: Hexagon, className: "from-slate-600 to-slate-900 text-white" },
  xbox: { label: "XBOX", Icon: Gamepad2, className: "from-green-600 to-green-900 text-white" },
};

export function hasBrandArt(name: string) {
  return name in brands;
}

/** Fits the correct official game art inside cards of different proportions. */
export function Artwork({ name, className }: { name: string; className?: string }) {
  const brand = brands[name];
  if (brand) {
    const { Icon, label } = brand;
    return (
      <div
        role="img"
        aria-label={label}
        className={cn("flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br", brand.className, className)}
      >
        <Icon className="size-9" strokeWidth={1.8} aria-hidden />
        <span className="text-[11px] font-semibold tracking-wide">{label}</span>
      </div>
    );
  }

  const art = gameArt[name];
  if (!art) return <div className={cn("grid size-full place-items-center bg-ink text-primary", className)}><Gamepad2 aria-label="เกม" /></div>;

  return (
    <div
      role="img"
      aria-label={art.label}
      className={cn("relative size-full overflow-hidden bg-ink", className)}
      style={{ backgroundColor: art.background }}
    >
      <span
        className="absolute inset-0 block bg-no-repeat transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url("/images/games/${art.file}")`,
          backgroundSize: art.size ?? "cover",
          backgroundPosition: art.position ?? "center",
        }}
      />
    </div>
  );
}
