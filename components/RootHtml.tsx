import type { Viewport } from "next";
import { bricolage, publicSans } from "@/lib/fonts";
import { SmoothScroll } from "./SmoothScroll";
import "@/app/globals.css";

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export function RootHtml({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${bricolage.variable} ${publicSans.variable}`}>
      <body className="antialiased">
        {/* Google Tag Manager é carregado em components/Consent.tsx só após consentimento (ID em content/site.ts). */}
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
