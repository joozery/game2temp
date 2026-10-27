import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PK-TOPUP — เติมเกมไว ปลอดภัย 100%",
    short_name: "PK-TOPUP",
    description: "เติมเกม ซื้อไอดีเกม และสินค้าดิจิทัล ครบ จบ ในที่เดียว",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf5",
    theme_color: "#fffdf5",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
