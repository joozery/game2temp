export type ArticleCategory = "news" | "updates" | "events" | "promos" | "guides" | "reviews";
export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  date: string;
  image: string;
  views: string;
  body: string[];
};

export const categoryLabels: Record<ArticleCategory, string> = {
  news: "ข่าวสารเกม",
  updates: "อัปเดตแพตช์",
  events: "กิจกรรม",
  promos: "โปรโมชั่น",
  guides: "ไกด์ & เทคนิค",
  reviews: "รีวิวเกม",
};

export const articles: Article[] = [
  {
    slug: "free-fire-new-season",
    title: "Free Fire อัปเดตแพตช์ใหม่ ตัวละครใหม่และระบบสุดพิเศษ",
    summary: "พบกับไอเดียการเล่น ข่าวเกม และกิจกรรมที่น่าสนใจ พร้อมรายละเอียดสำหรับเกมเมอร์ทุกคน",
    category: "updates", date: "28 ต.ค. 2569", image: "/images/games/freefire.jpg", views: "12.5K",
    body: ["สำรวจสิ่งที่ควรตรวจสอบเมื่อมีแพตช์ใหม่ ทั้งการปรับสมดุล ตัวละคร และของรางวัลจากกิจกรรม", "ก่อนเติมไอเทมในเกม ควรตรวจสอบรหัสผู้เล่น เซิร์ฟเวอร์ และรายละเอียดแพ็กเกจให้ตรงกับบัญชีของคุณ"],
  },
  {
    slug: "genshin-exploration",
    title: "Genshin Impact: สำรวจพื้นที่ใหม่และกิจกรรมสุดพิเศษ",
    summary: "รวมสิ่งที่น่าสนใจสำหรับผู้เล่นที่อยากเตรียมตัวก่อนเริ่มการผจญภัยครั้งต่อไป",
    category: "news", date: "26 ต.ค. 2569", image: "/images/games/genshin.jpg", views: "8.3K",
    body: ["เตรียมทีม ตัวละคร และทรัพยากรให้พร้อมก่อนออกสำรวจพื้นที่ใหม่", "ติดตามประกาศจากช่องทางทางการของเกมสำหรับรายละเอียดกิจกรรมและกำหนดการล่าสุด"],
  },
  {
    slug: "pubg-mobile-beginners",
    title: "10 เทคนิคเอาชีวิตรอดใน PUBG Mobile สำหรับผู้เล่นใหม่",
    summary: "เริ่มต้นให้มั่นใจด้วยวิธีเลือกจุดลง ฝึกการเคลื่อนที่ และจัดการอุปกรณ์",
    category: "guides", date: "24 ต.ค. 2569", image: "/images/games/pubgm-cover.png", views: "6.1K",
    body: ["เลือกจุดลงที่มีอุปกรณ์เพียงพอและไม่แออัดเกินไป เพื่อให้มีเวลาฝึกพื้นฐาน", "ฟังเสียงรอบตัว ใช้ที่กำบัง และสื่อสารกับเพื่อนร่วมทีมอย่างสม่ำเสมอ"],
  },
  {
    slug: "rov-weekly-picks",
    title: "RoV โปรโมชั่นพิเศษ เติมคูปองรับโบนัสเพิ่ม",
    summary: "เช็กวิธีเลือกแพ็กเกจให้เหมาะกับแผนการเล่นและงบประมาณ",
    category: "promos", date: "29 ต.ค. 2569", image: "/images/games/rov.jpg", views: "7.2K",
    body: ["เปรียบเทียบจำนวนคูปอง ราคา และเงื่อนไขโบนัสก่อนตัดสินใจ", "อ่านรายละเอียดโปรโมชันให้ครบถ้วน โดยเฉพาะระยะเวลาและข้อกำหนดการรับสิทธิ์"],
  },
  {
    slug: "free-fire-event-guide",
    title: "Free Fire กิจกรรมใหม่ รับสกินฟรียกเซ็ต",
    summary: "รวมแนวทางติดตามกิจกรรมและเตรียมตัวรับของรางวัลในเกม",
    category: "events", date: "30 ต.ค. 2569", image: "/images/games/freefire.jpg", views: "9.8K",
    body: ["ตรวจสอบกติกาและช่วงเวลาจัดกิจกรรมจากประกาศในเกมเสมอ", "วางแผนภารกิจรายวันเพื่อไม่พลาดรางวัลที่ต้องการ"],
  },
  {
    slug: "genshin-team-review",
    title: "รีวิวแนวทางจัดทีม Genshin Impact สำหรับมือใหม่",
    summary: "ทำความเข้าใจบทบาทตัวละครและวิธีจัดทีมที่เล่นได้สนุกขึ้น",
    category: "reviews", date: "23 ต.ค. 2569", image: "/images/games/genshin.jpg", views: "4.9K",
    body: ["เริ่มจากตัวละครที่มีอยู่ แล้วเลือกบทบาทสร้างความเสียหาย สนับสนุน และรักษาให้สมดุล", "ทดลองรูปแบบทีมที่เข้ากับสไตล์การเล่นของคุณ ไม่จำเป็นต้องตามกระแสทุกครั้ง"],
  },
  {
    slug: "mobile-legends-topup",
    title: "วิธีเติมเกม Mobile Legends ให้ถูกบัญชี",
    summary: "เช็ก Player ID และ Zone ID ให้ถูกต้องก่อนชำระเงิน",
    category: "guides", date: "21 ต.ค. 2569", image: "/images/games/mlbb.png", views: "5.4K",
    body: ["เปิดหน้าโปรไฟล์ในเกมเพื่อคัดลอก Player ID และ Zone ID โดยตรง", "ตรวจสอบชื่อผู้เล่นที่แสดงก่อนยืนยันรายการทุกครั้ง"],
  },
  {
    slug: "valorant-skin-review",
    title: "รีวิวสกิน Valorant: เลือกแบบไหนให้คุ้ม",
    summary: "มองทั้งดีไซน์ เอฟเฟกต์ และความถนัดก่อนเลือกสกินที่ชอบ",
    category: "reviews", date: "18 ต.ค. 2569", image: "/images/games/valorant.png", views: "4.2K",
    body: ["สกินที่เหมาะที่สุดขึ้นอยู่กับความชอบส่วนตัวและงบประมาณ", "ลองดูตัวอย่างภาพและเสียงจากแหล่งทางการก่อนซื้อ"],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/** Same-category articles first, topped up with the rest. */
export const relatedArticles = (article: Article, limit = 3) =>
  [...articles.filter((a) => a.slug !== article.slug)]
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, limit);
