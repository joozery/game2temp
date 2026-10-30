import type { Rarity } from "@/lib/boxes";

export const rarityStyle: Record<Rarity, { tile: string; label: string; text: string }> = {
  common: { tile: "border-slate-300 bg-slate-100", label: "ทั่วไป", text: "text-slate-600" },
  rare: { tile: "border-sky-300 bg-sky-100", label: "หายาก", text: "text-sky-600" },
  epic: { tile: "border-fuchsia-300 bg-fuchsia-100", label: "หายากมาก", text: "text-fuchsia-600" },
  legendary: { tile: "border-amber-400 bg-amber-100", label: "ตำนาน", text: "text-amber-600" },
};
