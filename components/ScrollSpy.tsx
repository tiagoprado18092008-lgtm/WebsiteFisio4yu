"use client";

import { useEffect, useRef } from "react";

/**
 * Segue o scroll dentro de um bloco: os filhos com `data-spy` ganham estado quando passam a linha do meio do ecrã.
 * - `mode="active"`: só um fica `data-active` (o que está a ler); os índices com `data-spy-link="<id>"` acompanham-no.
 * - `mode="seen"`: cada um fica `data-seen` quando passa a linha, e assim fica (as frases do percurso acendem).
 * O bloco só ganha `data-spy-ready` com JavaScript, por isso sem ele o conteúdo fica todo à vista (o CSS está em
 * globals.css, «Seguir o scroll»). Com "reduzir movimento", o estado muda na mesma, mas sem transições.
 */
export function ScrollSpy({ mode = "active", className, children }: { mode?: "active" | "seen"; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-spy]")];
    if (items.length === 0) return;
    const links = [...root.querySelectorAll<HTMLElement>("[data-spy-link]")];
    root.dataset.spyReady = "";

    const setActive = (el: HTMLElement) => {
      for (const it of items) it.toggleAttribute("data-active", it === el);
      for (const l of links) {
        const on = l.dataset.spyLink === el.id;
        l.toggleAttribute("data-active", on);
        if (on) l.setAttribute("aria-current", "true");
        else l.removeAttribute("aria-current");
      }
    };
    if (mode === "active") setActive(items[0]);

    // Uma faixa fina a 45% da altura do ecrã: o item que a atravessa é o que está a ser lido
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (mode === "active") setActive(el);
          else el.setAttribute("data-seen", "");
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    items.forEach((it) => io.observe(it));

    // No modo `seen`, o que já ficou para trás (ao chegar a meio da página por uma âncora) acende logo
    if (mode === "seen") {
      const mid = window.innerHeight * 0.46;
      for (const it of items) if (it.getBoundingClientRect().top < mid) it.setAttribute("data-seen", "");
    }
    return () => io.disconnect();
  }, [mode]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
