"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Distância ao topo ao saltar para uma âncora (igual ao `scroll-padding-top` de globals.css). */
const ANCHOR_OFFSET = 96;
/** Posição de scroll da âncora, medida na página real (não no estado interno do Lenis). */
const anchorTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;

/**
 * Scroll suave com inércia (Lenis): a página abranda devagar depois de parar a roda do rato.
 * Só no rato/trackpad (o toque mantém o scroll nativo) e desligado com "reduzir movimento".
 * Para quando algo bloqueia o scroll da página (menu mobile, galeria) via `body.style.overflow`.
 *
 * Links: a inércia pára no clique. Sem isto, um link para outra página carregado enquanto a página ainda
 * desliza deixava o Lenis a arrastar a página nova para longe da âncora (ex.: /servicos/...#ginasio).
 * Âncoras na mesma página deslizam com o Lenis; pelo teclado (Enter) ficam nativas, para o foco seguir o salto.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    const sync = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    // Fase de captura: corre antes do <Link> do Next, que ignora o clique se o evitarmos aqui
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;

      // Pára a inércia já (sem salto: fica onde está)
      lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true });

      if (url.pathname !== location.pathname || !url.hash || e.detail === 0) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(anchorTop(el));
      if (url.hash !== location.hash) history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      observer.disconnect();
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Página nova: atualizar as medidas (altura diferente) e garantir a chegada à âncora pedida
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.resize();
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(anchorTop(el), { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
