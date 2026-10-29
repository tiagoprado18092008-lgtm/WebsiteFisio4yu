"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

type Photo = { id: string; node: React.ReactNode };

/** Faixa de fotos que desliza devagar para a direita, sem fim: a lista vai duplicada e a cópia fica escondida dos leitores de ecrã.
 *  Pára com o rato por cima ou com o botão de pausa; com "reduzir movimento" fica parada e percorre-se à mão. */
export function PhotoStrip({ photos, labels }: { photos: Photo[]; labels: { pause: string; play: string } }) {
  const [paused, setPaused] = useState(false);
  const list = (copy?: boolean) => (
    <ul aria-hidden={copy || undefined} className={cn("flex shrink-0 gap-3 pr-3", copy && "marquee-copy")}>
      {photos.map((p) => (
        <li key={p.id} className="relative aspect-[3/4] w-[clamp(200px,19vw,340px)] shrink-0 overflow-hidden rounded-[22px] bg-mist">
          {p.node}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative" data-paused={paused}>
      <div className="marquee-track flex w-max" style={{ "--marquee-duration": `${photos.length * 9}s` } as React.CSSProperties}>
        {list()}
        {list(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? labels.play : labels.pause}
        className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/90 text-teal-dark shadow-sm ring-1 ring-black/5 backdrop-blur transition-colors hover:bg-white motion-reduce:hidden md:bottom-4 md:right-4"
      >
        {paused ? <Play className="ml-0.5 size-4 fill-current" aria-hidden /> : <Pause className="size-4 fill-current" aria-hidden />}
      </button>
    </div>
  );
}
