import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["placehold.co","picsum.photos","api.qrserver.com"], // ✅ เพิ่ม hostname ที่อนุญาต
  },
};

export default nextConfig;
