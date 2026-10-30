import Image from "next/image";
import { cn } from "@/lib/cn";
import logo from "@/public/brand/logo.png";
import logoWhite from "@/public/brand/logo-white.png";

/** Logótipo oficial (PNG transparente). Trocar por SVG vetorial quando existir.
 *  Qualidade 90: a 75 o "Centro de Reabilitação" fica com as letras finas a esborratar. */
export function Logo({ variant = "color", className, priority, sizes = "160px" }: { variant?: "color" | "white"; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <Image
      src={variant === "white" ? logoWhite : logo}
      alt="Fisio4you — Centro de Reabilitação"
      priority={priority}
      quality={90}
      sizes={sizes}
      className={cn("h-12 w-auto", className)}
    />
  );
}
