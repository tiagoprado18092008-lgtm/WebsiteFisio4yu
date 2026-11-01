import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 90: fotos dos cartões «Também na Fisio4you» (components/pages/ServicePage.tsx); o resto fica a 75
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
  poweredByHeader: false,
  // Sem o botão "N" do Next.js no canto em desenvolvimento (no site publicado nunca aparece)
  devIndicators: false,
};

export default nextConfig;
