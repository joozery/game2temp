export type AccountTag = "HOT" | "NEW";

export type GameAccount = {
  id: string;
  /** Key of `Artwork` / games list. */
  game: string;
  gameName: string;
  title: string;
  detail: string;
  price: number;
  tag?: AccountTag;
  /** Shown in the homepage "ไอดีเกมแนะนำ" strip. */
  featured?: boolean;
  specs: string[];
  stock: number;
};

export const accounts: GameAccount[] = [
  { id: "rov-1", game: "rov", gameName: "RoV", title: "ไอดี RoV", detail: "Rank Conqueror | สกิน 120+", price: 1290, tag: "HOT", featured: true, specs: ["Rank Conqueror", "สกิน 120+ ตัว", "ฮีโร่ครบทุกตัว", "ผูกอีเมลได้"], stock: 3 },
  { id: "genshin-1", game: "genshin", gameName: "Genshin Impact", title: "ไอดี Genshin Impact", detail: "AR 60 | ตัวละคร 5★ ครบ", price: 2490, tag: "NEW", featured: true, specs: ["AR 60", "ตัวละคร 5★ ครบ", "อาวุธ 5★ 12 ชิ้น", "เซิร์ฟเวอร์ Asia"], stock: 1 },
  { id: "freefire-1", game: "freefire", gameName: "Free Fire", title: "ไอดี Free Fire", detail: "ชุดหายาก | เพชรสุดคุ้ม", price: 1990, tag: "HOT", featured: true, specs: ["เลเวล 70+", "ชุดหายาก 40+", "ปืนอัปเกรดเต็ม", "ผูก Facebook"], stock: 2 },
  { id: "valorant-1", game: "valorant", gameName: "Valorant", title: "ไอดี Valorant", detail: "Rank Immortal | สกินครบ", price: 2990, featured: true, specs: ["Rank Immortal", "สกิน Vandal 15+", "เอเจนต์ครบ", "เซิร์ฟเวอร์ SEA"], stock: 1 },
  { id: "pubgm-1", game: "pubgm", gameName: "PUBG Mobile", title: "ไอดี PUBG Mobile", detail: "สกินระดับพรีเมียม", price: 1590, featured: true, specs: ["Tier Ace", "ชุด Mythic 8", "ปืนอัปเกรด 20+", "ผูกอีเมลได้"], stock: 4 },
  { id: "rov-2", game: "rov", gameName: "RoV", title: "ไอดี RoV เริ่มต้น", detail: "Rank Diamond | สกิน 40+", price: 490, specs: ["Rank Diamond", "สกิน 40+ ตัว", "ฮีโร่ 80+", "เหมาะมือใหม่"], stock: 8 },
  { id: "mlbb-1", game: "mlbb", gameName: "Mobile Legends", title: "ไอดี Mobile Legends", detail: "Mythic Glory | สกิน 150+", price: 1790, tag: "HOT", specs: ["Mythic Glory", "สกิน 150+ ตัว", "ฮีโร่ครบ", "Starlight หลายเซ็ต"], stock: 2 },
  { id: "genshin-2", game: "genshin", gameName: "Genshin Impact", title: "ไอดี Genshin Impact มือใหม่", detail: "AR 45 | ตัวละคร 5★ 6 ตัว", price: 990, specs: ["AR 45", "ตัวละคร 5★ 6 ตัว", "ปลดล็อกแผนที่ 80%", "เซิร์ฟเวอร์ Asia"], stock: 5 },
  { id: "lol-1", game: "lol", gameName: "League of Legends", title: "ไอดี League of Legends", detail: "Rank Platinum | สกิน 90+", price: 1190, specs: ["Rank Platinum", "สกิน 90+ ตัว", "แชมเปี้ยนครบ", "เซิร์ฟเวอร์ SEA"], stock: 3 },
  { id: "ragnarok-1", game: "ragnarok", gameName: "Ragnarok Origin", title: "ไอดี Ragnarok Origin", detail: "Lv. 120 | ชุดแฟชั่นครบ", price: 890, tag: "NEW", specs: ["Lv. 120", "ชุดแฟชั่น 30+", "ของแรร์ครบ", "เซิร์ฟเวอร์ไทย"], stock: 2 },
  { id: "freefire-2", game: "freefire", gameName: "Free Fire", title: "ไอดี Free Fire พรีเมียม", detail: "แรงค์ Heroic | บันเดิลครบ", price: 3490, specs: ["Heroic", "บันเดิลหายาก 60+", "ปืนมีวิวัฒนาการ", "ผูก Facebook"], stock: 1 },
  { id: "valorant-2", game: "valorant", gameName: "Valorant", title: "ไอดี Valorant สกินรวม", detail: "Rank Diamond | สกิน 30+", price: 1490, tag: "NEW", specs: ["Rank Diamond", "สกิน 30+ ชุด", "บัตรผ่านครบ", "เซิร์ฟเวอร์ SEA"], stock: 4 },
];

export const accountGames = [...new Map(accounts.map((a) => [a.game, a.gameName])).entries()].map(([id, name]) => ({ id, name }));
