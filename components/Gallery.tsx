"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** `ratio` (ex.: "9/16") limita a largura no lightbox para a foto caber inteira no ecrã. */
type Item = { id: string; thumb: React.ReactNode; full: React.ReactNode; alt: string; ratio: string };

/** Grelha de instalações com lightbox acessível (teclado: ← → Esc). */
export function Gallery({ items, labels }: { items: Item[]; labels: { close: string; previous: string; next: string } }) {
  const [open, setOpen] = useState<number | null>(null);
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
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {items.map((it, i) => (
          <li key={it.id} className="break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} aria-label={it.alt} className="block w-full overflow-hidden rounded-[var(--radius-img)]">
              {it.thumb}
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
