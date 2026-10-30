export type Plan = { months: number; price: number };
export type PremiumApp = {
  id: string;
  name: string;
  tagline: string;
  category: "ดูหนัง & ซีรีส์" | "ฟังเพลง" | "AI & ทำงาน";
  access: "บัญชีส่วนตัว" | "จอแชร์";
  badge?: "ขายดี" | "ใหม่";
  plans: Plan[];
};

// Sample prices until the real price list arrives.
export const apps: PremiumApp[] = [
  { id: "netflix", name: "Netflix Premium", tagline: "4K Ultra HD ดูได้ทุกอุปกรณ์", category: "ดูหนัง & ซีรีส์", access: "จอแชร์", badge: "ขายดี", plans: [{ months: 1, price: 99 }, { months: 3, price: 279 }, { months: 12, price: 990 }] },
  { id: "youtube", name: "YouTube Premium", tagline: "ไม่มีโฆษณา เล่นเบื้องหลังได้", category: "ดูหนัง & ซีรีส์", access: "บัญชีส่วนตัว", badge: "ขายดี", plans: [{ months: 1, price: 59 }, { months: 3, price: 169 }, { months: 12, price: 590 }] },
  { id: "disney", name: "Disney+ Hotstar", tagline: "Marvel, Pixar, Star Wars ครบ", category: "ดูหนัง & ซีรีส์", access: "จอแชร์", plans: [{ months: 1, price: 79 }, { months: 3, price: 219 }, { months: 12, price: 790 }] },
  { id: "prime", name: "Prime Video", tagline: "ซีรีส์ออริจินัล พากย์ไทย", category: "ดูหนัง & ซีรีส์", access: "จอแชร์", plans: [{ months: 1, price: 69 }, { months: 3, price: 189 }] },
  { id: "spotify", name: "Spotify Premium", tagline: "ฟังเพลงไม่มีโฆษณา ดาวน์โหลดได้", category: "ฟังเพลง", access: "บัญชีส่วนตัว", badge: "ขายดี", plans: [{ months: 1, price: 69 }, { months: 3, price: 199 }, { months: 12, price: 690 }] },
  { id: "apple-music", name: "Apple Music", tagline: "เสียง Lossless และ Spatial Audio", category: "ฟังเพลง", access: "บัญชีส่วนตัว", plans: [{ months: 1, price: 59 }, { months: 3, price: 169 }] },
  { id: "chatgpt", name: "ChatGPT Plus", tagline: "ใช้งานโมเดลล่าสุด เร็วกว่าเดิม", category: "AI & ทำงาน", access: "บัญชีส่วนตัว", badge: "ใหม่", plans: [{ months: 1, price: 590 }, { months: 3, price: 1690 }] },
  { id: "canva", name: "Canva Pro", tagline: "เทมเพลตพรีเมียม ลบพื้นหลังได้", category: "AI & ทำงาน", access: "บัญชีส่วนตัว", plans: [{ months: 1, price: 59 }, { months: 12, price: 390 }] },
  { id: "capcut", name: "CapCut Pro", tagline: "ตัดต่อวิดีโอ เอฟเฟกต์ครบ ไม่มีลายน้ำ", category: "AI & ทำงาน", access: "บัญชีส่วนตัว", plans: [{ months: 1, price: 129 }, { months: 12, price: 990 }] },
];

export const premiumCategories = ["ดูหนัง & ซีรีส์", "ฟังเพลง", "AI & ทำงาน"] as const;

/** Percent saved against buying the shortest plan repeatedly. */
export function saving(app: PremiumApp, plan: Plan) {
  const base = app.plans[0];
  const full = (base.price / base.months) * plan.months;
  return Math.round((1 - plan.price / full) * 100);
}
