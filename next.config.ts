import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  // Sem o botão "N" do Next.js no canto em desenvolvimento (no site publicado nunca aparece)
  devIndicators: false,
};

export default nextConfig;
