"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave com inércia (Lenis): a página abranda devagar depois de parar a roda do rato.
 * Só no rato/trackpad (o toque mantém o scroll nativo) e desligado com "reduzir movimento".
 * Para quando algo bloqueia o scroll da página (menu mobile, galeria) via `body.style.overflow`.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -96 } });
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    const sync = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
