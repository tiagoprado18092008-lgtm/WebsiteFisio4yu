import Image from "next/image";
import { cn } from "@/lib/cn";
import logo from "@/public/brand/logo.png";
import logoWhite from "@/public/brand/logo-white.png";

/** Logótipo oficial (PNG transparente). Trocar por SVG vetorial quando existir. */
export function Logo({ variant = "color", className, priority }: { variant?: "color" | "white"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={variant === "white" ? logoWhite : logo}
      alt="Fisio4you — Centro de Reabilitação"
      priority={priority}
      sizes="160px"
      className={cn("h-12 w-auto", className)}
    />
  );
}
