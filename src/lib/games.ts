export type Category = "mobile" | "pc" | "card";

export type Package = {
  id: string;
  amount: number;
  bonus?: number;
  price: number;
};

export type Game = {
  id: string;
  name: string;
  publisher: string;
  category: Category;
  currency: string;
  gradient: string;
  hot?: boolean;
  packages: Package[];
};

export const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "mobile", label: "เกมมือถือ" },
  { value: "pc", label: "เกม PC" },
  { value: "card", label: "บัตรเติมเงิน" },
];

const tiers = (currency: string, base: number[][]): Package[] =>
  base.map(([amount, price, bonus], i) => ({
    id: `${currency}-${i}`,
    amount,
    price,
    bonus,
  }));

export const games: Game[] = [
  {
    id: "rov",
    name: "RoV",
    publisher: "Garena",
    category: "mobile",
    currency: "คูปอง",
    gradient: "from-amber-500 to-rose-600",
    hot: true,
    packages: tiers("rov", [[24, 25], [120, 119, 5], [240, 235, 15], [600, 579, 50], [1200, 1149, 120], [2400, 2290, 300]]),
  },
  {
    id: "freefire",
    name: "Free Fire",
    publisher: "Garena",
    category: "mobile",
    currency: "เพชร",
    gradient: "from-orange-500 to-red-600",
    hot: true,
    packages: tiers("ff", [[100, 35], [310, 99, 10], [520, 165, 20], [1060, 330, 60], [2180, 659, 150], [5600, 1650, 500]]),
  },
  {
    id: "pubgm",
    name: "PUBG Mobile",
    publisher: "Tencent",
    category: "mobile",
    currency: "UC",
    gradient: "from-yellow-500 to-amber-700",
    packages: tiers("uc", [[60, 35], [325, 175, 25], [660, 350, 60], [1800, 880, 200], [3850, 1750, 500]]),
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    publisher: "HoYoverse",
    category: "mobile",
    currency: "Genesis Crystal",
    gradient: "from-sky-500 to-indigo-600",
    hot: true,
    packages: tiers("gi", [[60, 35], [300, 179, 30], [980, 549, 110], [1980, 1099, 260], [3280, 1799, 600], [6480, 3590, 1600]]),
  },
  {
    id: "mlbb",
    name: "Mobile Legends",
    publisher: "Moonton",
    category: "mobile",
    currency: "Diamonds",
    gradient: "from-blue-500 to-cyan-600",
    packages: tiers("ml", [[86, 59], [172, 115], [257, 169, 10], [706, 449, 40], [2195, 1349, 150]]),
  },
  {
    id: "ragnarok",
    name: "Ragnarok Origin",
    publisher: "Gravity",
    category: "mobile",
    currency: "Nyan Berry",
    gradient: "from-amber-400 to-yellow-700",
    packages: tiers("ro", [[60, 35], [300, 169, 20], [980, 529, 80], [1980, 1049, 200], [3280, 1729, 450]]),
  },
  {
    id: "valorant",
    name: "Valorant",
    publisher: "Riot Games",
    category: "pc",
    currency: "VP",
    gradient: "from-rose-500 to-red-700",
    hot: true,
    packages: tiers("vp", [[475, 159], [1000, 319], [2050, 639, 100], [3650, 1099, 250], [5350, 1599, 450]]),
  },
  {
    id: "lol",
    name: "League of Legends",
    publisher: "Riot Games",
    category: "pc",
    currency: "RP",
    gradient: "from-teal-500 to-emerald-700",
    packages: tiers("rp", [[575, 159], [1380, 369], [2800, 739, 100], [4500, 1149, 250]]),
  },
  {
    id: "steam",
    name: "Steam Wallet",
    publisher: "Valve",
    category: "card",
    currency: "บาท",
    gradient: "from-slate-500 to-slate-800",
    packages: tiers("steam", [[100, 105], [200, 209], [500, 519], [1000, 1035]]),
  },
  {
    id: "truemoney",
    name: "TrueMoney",
    publisher: "Ascend",
    category: "card",
    currency: "บาท",
    gradient: "from-orange-400 to-orange-600",
    packages: tiers("tm", [[50, 50], [90, 90], [150, 150], [300, 300], [500, 500], [1000, 1000]]),
  },
  {
    id: "playstation",
    name: "PlayStation Store",
    publisher: "Sony",
    category: "card",
    currency: "บาท",
    gradient: "from-blue-600 to-indigo-800",
    packages: tiers("psn", [[300, 315], [500, 525], [1000, 1045], [2000, 2085]]),
  },
];
