"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

/** `ratio` (ex.: "9/16") limita a largura no lightbox para a foto caber inteira no ecrã.
 *  `wide`: foto horizontal, ocupa duas colunas. `thumb` deve preencher o quadrado (Media com `cover`). */
type Item = { id: string; thumb: React.ReactNode; full: React.ReactNode; alt: string; ratio: string; wide?: boolean };

/** Grelha de instalações com lightbox acessível (teclado: ← → Esc).
 *  Quadrados 3:4 em 2 colunas (3 a partir de lg), todos alinhados; a foto horizontal acompanha a altura da linha. */
export function Gallery({ items, labels }: { items: Item[]; labels: { close: string; previous: string; next: string } }) {
  const [open, setOpen] = useState<number | null>(null);
  // Com 2 colunas e um número ímpar de lugares, a última foto ocupa a linha toda (3:2) para não deixar um buraco.
  const closesRow = items.reduce((n, it) => n + (it.wide ? 2 : 1), 0) % 2 === 1;
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

  const ctl = "flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20";

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((it, i) => (
          <li
            key={it.id}
            className={cn(
              "relative",
              it.wide
                ? "col-span-2 aspect-video lg:aspect-auto"
                : closesRow && i === items.length - 1
                  ? "col-span-2 aspect-[3/2] lg:col-span-1 lg:aspect-[3/4]"
                  : "aspect-[3/4]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={it.alt}
              className="group absolute inset-0 overflow-hidden rounded-[var(--radius-img)]"
            >
              <span className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">{it.thumb}</span>
            </button>
          </li>
        ))}
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
