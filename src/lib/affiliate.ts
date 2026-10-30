// Mock affiliate data — replace with real API calls once the member/order backend is connected.
// Scope: docs/Twelve_Systems_Affiliate_Scope.pdf (3 levels counting the top referrer, commission paid 2 levels up).

export const agent = {
  status: "active" as "active" | "suspended",
  code: "NATTAPONG",
  /** Percent of the order's profit, per level above the buyer. Set by the admin back office. */
  rates: { 1: 8, 2: 3 } as Record<Level, number>,
  /** Minimum amount per withdrawal, set by the admin back office. */
  minWithdraw: 100,
};

export type Level = 1 | 2;

export const levelMeta: Record<Level, { label: string; short: string }> = {
  1: { label: "ผู้ที่คุณแนะนำโดยตรง", short: "ชั้น 1" },
  2: { label: "ผู้ที่ถูกแนะนำต่อจากชั้น 1", short: "ชั้น 2" },
};

export type Referral = { id: string; name: string; level: Level; via: string; joined: string; orders: number; sales: number; commission: number };

type RawCommission = { id: string; date: string; orderId: string; buyer: string; level: Level; item: string; sale: number; profit: number; refunded?: boolean };

// `profit` is store-internal: it feeds the calculation but is never shown to the agent.
const raw: RawCommission[] = [
  { id: "c1", date: "2026-10-29", orderId: "#10311", buyer: "มินตรา พ.", level: 1, item: "RoV 1,000 คูปอง", sale: 1000, profit: 120 },
  { id: "c2", date: "2026-10-28", orderId: "#10305", buyer: "ธนา ว.", level: 2, item: "Free Fire 1,080 เพชร", sale: 890, profit: 98 },
  { id: "c3", date: "2026-10-26", orderId: "#10290", buyer: "สมชาย ก.", level: 1, item: "Netflix Premium 1 เดือน", sale: 329, profit: 49 },
  { id: "c4", date: "2026-10-22", orderId: "#10267", buyer: "ปราง ส.", level: 2, item: "Genshin 6,480 Crystals", sale: 1790, profit: 215 },
  { id: "c5", date: "2026-10-19", orderId: "#10241", buyer: "สมชาย ก.", level: 1, item: "Valorant 2,050 VP", sale: 690, profit: 76 },
  { id: "c6", date: "2026-10-14", orderId: "#10198", buyer: "มินตรา พ.", level: 1, item: "Roblox 800 Robux", sale: 420, profit: 55, refunded: true },
  { id: "c7", date: "2026-10-09", orderId: "#10163", buyer: "ธนา ว.", level: 2, item: "RoV 500 คูปอง", sale: 505, profit: 61 },
  { id: "c8", date: "2026-09-27", orderId: "#10052", buyer: "สมชาย ก.", level: 1, item: "Free Fire 520 เพชร", sale: 450, profit: 52 },
];

export type Commission = Omit<RawCommission, "profit"> & { rate: number; amount: number };

export const commissions: Commission[] = raw.map(({ profit, ...row }) => {
  const rate = agent.rates[row.level];
  const amount = Math.round((profit * rate) / 100 * 100) / 100;
  return { ...row, rate, amount };
});

/** Refunds do not delete the original credit; they add an offsetting adjustment. */
export const adjustments = commissions
  .filter((c) => c.refunded)
  .map((c) => ({ id: `${c.id}-adj`, date: "2026-10-15", orderId: c.orderId, note: `ปรับคืนค่าคอมจากการคืนเงินคำสั่งซื้อ ${c.orderId}`, amount: -c.amount }));

export const referrals: Referral[] = [
  { id: "m1", name: "สมชาย ก.", level: 1, via: "คุณ", joined: "2026-08-12" },
  { id: "m2", name: "มินตรา พ.", level: 1, via: "คุณ", joined: "2026-09-03" },
  { id: "m3", name: "ธนา ว.", level: 2, via: "สมชาย ก.", joined: "2026-09-20" },
  { id: "m4", name: "ปราง ส.", level: 2, via: "มินตรา พ.", joined: "2026-10-05" },
  { id: "m5", name: "วีระ ล.", level: 1, via: "คุณ", joined: "2026-10-27" },
].map((member) => {
  const rows = commissions.filter((c) => c.buyer === member.name && !c.refunded);
  return { ...member, level: member.level as Level, orders: rows.length, sales: rows.reduce((sum, c) => sum + c.sale, 0), commission: rows.reduce((sum, c) => sum + c.amount, 0) };
});

export type Payout = { id: string; date: string; amount: number; method: string; note: string };

/** Payouts are recorded by an admin after transferring the money manually — there is no automatic transfer. */
export const payouts: Payout[] = [
  { id: "p1", date: "2026-10-05", amount: 20, method: "โอนผ่านพร้อมเพย์", note: "รอบเดือนกันยายน · อ้างอิงสลิป TX-0931" },
];

const sum = (values: number[]) => Math.round(values.reduce((a, b) => a + b, 0) * 100) / 100;

export const totals = (() => {
  const earned = sum(commissions.map((c) => c.amount));
  const adjusted = sum(adjustments.map((a) => a.amount));
  const paid = sum(payouts.map((p) => p.amount));
  return {
    earned,
    adjusted,
    paid,
    available: sum([earned, adjusted, -paid]),
    sales: sum(commissions.filter((c) => !c.refunded).map((c) => c.sale)),
    members: referrals.length,
  };
})();

export const baht = (value: number) => `฿${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  return `${day} ${months[month - 1]} ${year + 543}`;
};

/** The sample "today" the date filters count back from, so the mock data always lands in range. */
export const SAMPLE_TODAY = "2026-10-30";

// --- Referral capture at sign-up -------------------------------------------------------------
const REFERRER_KEY = "pk-topup-referrer";

export type ReferrerOutcome = "recorded" | "self" | "already" | "invalid";

/** A member is bound to one referrer for good; self-referral and unknown codes are rejected. */
export function recordReferrer(code: string): ReferrerOutcome {
  const value = code.trim().toUpperCase();
  if (!/^[A-Z0-9]{3,20}$/.test(value)) return "invalid";
  if (value === agent.code) return "self";
  try {
    if (window.localStorage.getItem(REFERRER_KEY)) return "already";
    window.localStorage.setItem(REFERRER_KEY, value);
  } catch {
    // Private mode: nothing to bind to, the backend would own this anyway.
  }
  return "recorded";
}
