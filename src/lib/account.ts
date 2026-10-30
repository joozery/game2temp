// Mock account data — replace with real API calls once auth/payment is connected.

export const user = {
  name: "Nattapong S.",
  username: "nattapong",
  email: "nattapong@example.com",
  phone: "081-234-5678",
  memberSince: "มี.ค. 2569",
  balance: 1250,
  bonusCredit: 50,
  points: 1840,
  tier: "Gold",
  nextTier: "Platinum",
  tierProgress: 72,
  pointsToNext: 710,
  stats: { orders: 24, spent: 18450, saved: 1320 },
};

export const savedIds = [
  { id: "rov", game: "RoV", art: "rov", uid: "5829104", note: "เซิร์ฟเวอร์ไทย" },
  { id: "freefire", game: "Free Fire", art: "freefire", uid: "129384756", note: "ไอดีหลัก" },
  { id: "genshin", game: "Genshin Impact", art: "genshin", uid: "812345678", note: "Asia" },
];

export type OrderStatus = "success" | "pending" | "failed" | "refunded";

export const statusMeta: Record<OrderStatus, { label: string; className: string }> = {
  success: { label: "สำเร็จ", className: "bg-success/15 text-success" },
  pending: { label: "รอดำเนินการ", className: "bg-primary/30 text-ink" },
  failed: { label: "ไม่สำเร็จ", className: "bg-coral/15 text-coral" },
  refunded: { label: "คืนเงินแล้ว", className: "bg-muted text-muted-foreground" },
};

export type Order = {
  id: string;
  item: string;
  game: string;
  art: string;
  uid?: string;
  price: number;
  status: OrderStatus;
  method: string;
  date: string;
};

export const orders: Order[] = [
  { id: "10311", item: "Free Fire 310 เพชร (+10)", game: "Free Fire", art: "freefire", uid: "129384756", price: 99, status: "pending", method: "PromptPay", date: "30 ต.ค. 2569 · 14:20" },
  { id: "10293", item: "Free Fire 310 เพชร (+10)", game: "Free Fire", art: "freefire", uid: "129384756", price: 99, status: "success", method: "PromptPay", date: "30 ต.ค. 2569 · 10:05" },
  { id: "10288", item: "RoV 600 คูปอง (+50)", game: "RoV", art: "rov", uid: "5829104", price: 579, status: "success", method: "TrueMoney", date: "28 ต.ค. 2569 · 21:42" },
  { id: "10270", item: "Netflix Premium 1 เดือน", game: "แอปพรีเมียม", art: "netflix", price: 159, status: "success", method: "ยอดเงินคงเหลือ", date: "25 ต.ค. 2569 · 18:10" },
  { id: "10251", item: "Genshin Impact 980 Genesis Crystal (+110)", game: "Genshin Impact", art: "genshin", uid: "812345678", price: 549, status: "failed", method: "บัตรเครดิต", date: "22 ต.ค. 2569 · 09:31" },
  { id: "10244", item: "Genshin Impact 980 Genesis Crystal (+110)", game: "Genshin Impact", art: "genshin", uid: "812345678", price: 549, status: "refunded", method: "บัตรเครดิต", date: "22 ต.ค. 2569 · 09:35" },
  { id: "10198", item: "Spotify Premium 1 เดือน", game: "แอปพรีเมียม", art: "spotify", price: 89, status: "success", method: "PromptPay", date: "15 ต.ค. 2569 · 12:00" },
  { id: "10172", item: "RoV 240 คูปอง (+15)", game: "RoV", art: "rov", uid: "5829104", price: 235, status: "success", method: "PromptPay", date: "9 ต.ค. 2569 · 20:18" },
];

export type Transaction = { id: number; label: string; amount: number; date: string; credit: boolean; method?: string };

export const transactions: Transaction[] = [
  { id: 1, label: "เติมเงินเข้ากระเป๋า", amount: 500, date: "28 ต.ค. 2569 · 21:30", credit: true, method: "PromptPay" },
  { id: 2, label: "ซื้อ Netflix Premium", amount: 159, date: "25 ต.ค. 2569 · 18:10", credit: false },
  { id: 3, label: "คืนเงินคำสั่งซื้อ #10244", amount: 549, date: "22 ต.ค. 2569 · 09:40", credit: true },
  { id: 4, label: "ซื้อ Spotify Premium", amount: 89, date: "15 ต.ค. 2569 · 12:00", credit: false },
  { id: 5, label: "เติมเงินเข้ากระเป๋า", amount: 1000, date: "12 ต.ค. 2569 · 19:02", credit: true, method: "TrueMoney" },
  { id: 6, label: "เติม RoV 240 คูปอง", amount: 235, date: "9 ต.ค. 2569 · 20:18", credit: false },
];

export const paymentMethods = ["PromptPay", "TrueMoney", "บัตรเครดิต"];
export const topUpAmounts = [100, 300, 500, 1000];
