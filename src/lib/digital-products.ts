export type DigitalType = "บัตรเติมเกม" | "ไอเทมเกม" | "บริการเสริม";

export type DigitalProduct = {
  /** Key of the brand card in `Artwork`. */
  id: string;
  name: string;
  type: DigitalType;
  desc: string;
  /** Denominations in baht; the first one is the "from" price. */
  amounts: number[];
  price: number;
  hot?: boolean;
};

const product = (p: Omit<DigitalProduct, "price">): DigitalProduct => ({ ...p, price: p.amounts[0] });

export const digitalTypes: DigitalType[] = ["บัตรเติมเกม", "ไอเทมเกม", "บริการเสริม"];

export const digitalProducts: DigitalProduct[] = [
  product({ id: "razer", name: "Razer Gold", type: "บัตรเติมเกม", desc: "เติมได้หลายร้อยเกมทั่วโลก", amounts: [100, 200, 500, 1000], hot: true }),
  product({ id: "garena", name: "Garena Shells", type: "บัตรเติมเกม", desc: "เติม RoV, Free Fire และเกม Garena", amounts: [50, 100, 300, 500], hot: true }),
  product({ id: "truemoney", name: "TrueMoney", type: "บริการเสริม", desc: "บัตรเงินสดทรูมันนี่", amounts: [50, 100, 300, 500] }),
  product({ id: "playstation", name: "PlayStation Card", type: "บัตรเติมเกม", desc: "เติม PlayStation Store", amounts: [300, 500, 1000] }),
  product({ id: "steam", name: "Steam Wallet", type: "ไอเทมเกม", desc: "เติมกระเป๋า Steam ซื้อเกมและไอเทม", amounts: [300, 500, 1000], hot: true }),
  product({ id: "xbox", name: "Xbox Gift Card", type: "บัตรเติมเกม", desc: "เติม Xbox และ Microsoft Store", amounts: [300, 500, 1000] }),
];
