import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["placehold.co","picsum.photos"], // ✅ เพิ่ม hostname ที่อนุญาต
  },
};

export default nextConfig;
