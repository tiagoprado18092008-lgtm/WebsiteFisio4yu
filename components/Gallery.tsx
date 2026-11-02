"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

/** `ratio` (ex.: "9/16") limita a largura no lightbox para a foto caber inteira no ecrã.
 *  `thumb` deve preencher o contentor (Media com `cover`). */
type Item = { id: string; thumb: React.ReactNode; full: React.ReactNode; alt: string; ratio: string };

// Larguras da faixa: a partir de lg, `flex-grow` de cada painel (o que tem o cursor ou o foco cresce para 6);
// abaixo de lg, dois por linha a 60/40 e depois 40/60, para os recortes continuarem desiguais.
const grow = [4, 2, 3, 2];
const crop = "group relative block w-full overflow-hidden rounded-[var(--radius-img)]";
const zoom = "absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none";

/** Instalações com lightbox acessível (teclado: ← → Esc). `intro` fica à esquerda da primeira foto;
 *  as restantes formam uma faixa de painéis desiguais por baixo. */
export function Gallery({ intro, items, labels }: { intro: React.ReactNode; items: Item[]; labels: { close: string; previous: string; next: string } }) {
  const [open, setOpen] = useState<number | null>(null);
  // Sem legendas por baixo das fotos (a pedido do cliente): o nome de cada espaço fica só no texto alternativo
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  const [feature, ...band] = items;
  const ctl = "flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20";

  return (
    <>
      <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col justify-between gap-10">{intro}</div>
        {/* Em desktop a foto acompanha a altura do texto, para as duas colunas acabarem juntas */}
        <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <button type="button" onClick={() => setOpen(0)} aria-label={feature.alt} className={cn(crop, "aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[28rem]")}>
            <span className={zoom}>{feature.thumb}</span>
          </button>
        </div>
      </div>

      {/* Até lg a foto do ginásio e a faixa formam um só mosaico, com o mesmo espaço entre todas as fotos */}
      <ul className="mt-3 flex flex-wrap gap-3 sm:mt-4 sm:gap-4 lg:mt-20 lg:flex-nowrap">
        {band.map((it, j) => {
          const wide = j % 2 === Math.floor(j / 2) % 2;
          return (
            <li
              key={it.id}
              style={{ "--g": grow[j % grow.length] } as React.CSSProperties}
              className={cn(
                "min-w-0 transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none lg:basis-0 lg:grow-[var(--g)] lg:hover:grow-[6] lg:focus-within:grow-[6]",
                wide ? "basis-[calc(60%-6px)] sm:basis-[calc(60%-8px)]" : "basis-[calc(40%-6px)] sm:basis-[calc(40%-8px)]",
              )}
            >
              <div data-reveal style={{ "--d": j } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => setOpen(j + 1)}
                  aria-label={it.alt}
                  className={cn(crop, "h-[clamp(15rem,42svh,26rem)] lg:h-[clamp(26rem,66svh,40rem)]")}
                >
                  <span className={zoom}>{it.thumb}</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={items[open].alt} className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4">
          <button type="button" autoFocus onClick={() => setOpen(null)} aria-label={labels.close} className={ctl + " absolute right-4 top-4"}>
            <X className="size-6" aria-hidden />
          </button>
          <button type="button" onClick={() => go(-1)} aria-label={labels.previous} className={ctl + " absolute left-4"}>
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <div className="w-full overflow-hidden rounded-[var(--radius-img)]" style={{ maxWidth: `min(56rem, calc(86svh * ${items[open].ratio}))` }}>
            {items[open].full}
          </div>
          <button type="button" onClick={() => go(1)} aria-label={labels.next} className={ctl + " absolute right-4"}>
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
