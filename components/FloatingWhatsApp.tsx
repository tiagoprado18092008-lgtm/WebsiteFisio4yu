"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "./Icon";

/**
 * Botão flutuante (tablet/desktop): aparece depois do hero e esconde-se enquanto um bloco
 * de marcação (`[data-hide-fab]`) está no ecrã, para não tapar o botão de WhatsApp desse bloco.
 */
export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [covered, setCovered] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
      setCovered(visible.size > 0);
    });
    document.querySelectorAll("[data-hide-fab]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", on);
      io.disconnect();
    };
  }, []);
  const show = scrolled && !covered;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp"
      data-location="floating"
      aria-label={label}
      tabIndex={show ? 0 : -1}
      className={cn(
        "fixed bottom-6 right-6 z-40 hidden size-16 items-center justify-center rounded-full bg-whatsapp text-[#06301a] shadow-[0_10px_30px_rgba(37,211,102,.35)] transition-all duration-300 hover:scale-105 md:flex",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppIcon className="size-8" />
    </a>
  );
}
