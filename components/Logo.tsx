import Image from "next/image";
import { cn } from "@/lib/cn";
import logo from "@/public/brand/logo.png";
import logoWhite from "@/public/brand/logo-white.png";

/** Logótipo oficial "fisio4you · Rehab & Performance" (PNG transparente gerado por scripts/logo.mjs a partir do JPG
 *  enviado pelo cliente a 13/11/2026). Trocar por SVG vetorial quando existir.
 *  Qualidade 90: a 75 o "Rehab & Performance" fica com as letras finas a esborratar. */
export function Logo({ variant = "color", className, priority, sizes = "160px" }: { variant?: "color" | "white"; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <Image
      src={variant === "white" ? logoWhite : logo}
      alt="Fisio4you — Rehab & Performance"
      priority={priority}
      quality={90}
      sizes={sizes}
      className={cn("h-12 w-auto", className)}
    />
  );
}
