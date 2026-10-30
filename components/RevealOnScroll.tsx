"use client";

import { useLayoutEffect } from "react";

/**
 * Entradas das secções: cada `[data-reveal]` sobe quando entra no ecrã, uma vez (`--d` atrasa em passos de 80 ms).
 * O que já está à vista quando a página abre fica logo visível, para não piscar; sem JavaScript, tudo aparece.
 * Os estados escondidos estão em globals.css, dentro de `prefers-reduced-motion: no-preference`.
 */
export function RevealOnScroll() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    for (const el of els) if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("is-in");
    root.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of els) if (!el.classList.contains("is-in")) io.observe(el);
    return () => {
      io.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);
  return null;
}
