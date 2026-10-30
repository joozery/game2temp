/** `image` is an `Artwork` key, an absolute /public path, or the generic "coupon" / "giftcard" tiles. */
export type Prize = { name: string; value: number; odds: number; image: string };

export type MysteryBox = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  /** Hue rotation applied to the shared box artwork so each tier looks different. */
  hue: number;
  accent: string;
  prizes: Prize[];
};

// Sample odds for the UI demo — odds in each box add up to 100.
export const boxes: MysteryBox[] = [
  {
    id: "bronze", name: "กล่องทองแดง", price: 29, tagline: "ลองเสี่ยงโชคเบา ๆ ได้ของแน่นอน", hue: 120, accent: "bg-amber-700 text-white",
    prizes: [
      { name: "คูปองส่วนลด 5%", value: 15, odds: 40, image: "coupon" },
      { name: "Free Fire 20 เพชร", value: 20, odds: 30, image: "freefire" },
      { name: "Garena Shells ฿50", value: 50, odds: 20, image: "garena" },
      { name: "RoV 60 คูปอง", value: 60, odds: 9, image: "rov" },
      { name: "Spotify Premium 1 เดือน", value: 69, odds: 1, image: "/images/premium/spotify.webp" },
    ],
  },
  {
    id: "silver", name: "กล่องเงิน", price: 99, tagline: "ลุ้นของรางวัลคุ้มกว่าราคากล่อง", hue: 200, accent: "bg-slate-500 text-white",
    prizes: [
      { name: "Free Fire 100 เพชร", value: 35, odds: 35, image: "freefire" },
      { name: "คูปองส่วนลด 10%", value: 50, odds: 30, image: "coupon" },
      { name: "TrueMoney ฿100", value: 100, odds: 20, image: "truemoney" },
      { name: "Netflix Premium 1 เดือน", value: 99, odds: 10, image: "/images/premium/netflix.webp" },
      { name: "RoV 600 คูปอง", value: 579, odds: 5, image: "rov" },
    ],
  },
  {
    id: "gold", name: "กล่องทอง", price: 299, tagline: "ของรางวัลระดับพรีเมียม โอกาสแจ็กพอตสูง", hue: 0, accent: "bg-amber-500 text-ink",
    prizes: [
      { name: "Steam Wallet ฿300", value: 300, odds: 35, image: "steam" },
      { name: "Genshin 980 Crystal", value: 549, odds: 25, image: "genshin" },
      { name: "ChatGPT Plus 1 เดือน", value: 590, odds: 20, image: "/images/premium/chatgpt.webp" },
      { name: "PUBG 1800 UC", value: 880, odds: 15, image: "pubgm" },
      { name: "ไอดี RoV Conqueror", value: 1290, odds: 5, image: "rov" },
    ],
  },
  {
    id: "legend", name: "กล่องตำนาน", price: 990, tagline: "กล่องสุดยอด ลุ้นไอดีแรงค์สูงและบัตรมูลค่าสูง", hue: 300, accent: "bg-fuchsia-600 text-white",
    prizes: [
      { name: "Steam Wallet ฿1,000", value: 1000, odds: 40, image: "steam" },
      { name: "Genshin 3280 Crystal", value: 1799, odds: 30, image: "genshin" },
      { name: "ไอดี Valorant Immortal", value: 2990, odds: 20, image: "valorant" },
      { name: "ไอดี Genshin AR 60", value: 2490, odds: 8, image: "genshin" },
      { name: "Gift Card ฿5,000", value: 5000, odds: 2, image: "giftcard" },
    ],
  },
];

/** Weighted random pick; `random` is injectable for testing. */
export function drawPrize(box: MysteryBox, random = Math.random()): Prize {
  let acc = 0;
  for (const prize of box.prizes) {
    acc += prize.odds;
    if (random * 100 < acc) return prize;
  }
  return box.prizes[box.prizes.length - 1];
}

export type Rarity = "common" | "rare" | "epic" | "legendary";

/** Rarity follows how unlikely a prize is inside its box. */
export const rarityOf = (prize: Prize): Rarity => (prize.odds <= 5 ? "legendary" : prize.odds <= 10 ? "epic" : prize.odds <= 25 ? "rare" : "common");
