"use client";

import { useEffect, useRef } from "react";

/**
 * Uma frase grande que acende palavra a palavra com o scroll: as palavras começam a `muted` e passam à cor final
 * (`ink`, ou `teal-strong` na parte destacada) à medida que a frase atravessa o ecrã, de 85% a 40% da altura.
 * Sem JavaScript, ou com "reduzir movimento", a frase fica logo com as cores finais (o CSS está em globals.css,
 * «Frase que acende»).
 */
export function ScrollWords({ parts, className, id }: { parts: { text: string; accent?: boolean }[]; className?: string; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = [...el.querySelectorAll<HTMLElement>("[data-w]")];
    el.dataset.wordsReady = "";
    let frame = 0;
    let lit = -1;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.45)));
      const n = Math.round(p * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach((w, i) => w.toggleAttribute("data-lit", i < n));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <h2 ref={ref} id={id} className={className}>
      {parts.map((part, pi) =>
        part.text
          .split(/(\s+)/)
          .filter(Boolean)
          .map((w, wi) =>
            /^\s+$/.test(w) ? (
              w
            ) : (
              <span key={`${pi}-${wi}`} data-w className={part.accent ? "word-accent" : undefined}>
                {w}
              </span>
            ),
          ),
      )}
    </h2>
  );
}
