"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type Area = {
  key: string;
  name: string;
  what: string;
  treats: string[];
  by: string;
  /** Foto, já feita no servidor (`<Media cover>`). */
  photo: React.ReactNode;
  /** Botão ou link no fim do painel aberto. */
  action: React.ReactNode;
};

const ease = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/**
 * As duas áreas da clínica em painéis: um aberto, o outro fechado só com o nome. Tocar no fechado abre-o e fecha o
 * outro. No painel aberto, o texto nunca fica por cima da foto: assenta no teal liso e a foto fica inteira ao lado
 * (ou por cima, em telemóvel), sem véu. Só o fechado tem a foto a toda a área, escurecida, com o nome em baixo.
 * - Telemóvel: um por cima do outro; aberto, foto em cima e texto por baixo; fechado, uma faixa.
 * - 768 px: continuam um por cima do outro; aberto, texto à esquerda e foto à direita (como um cartão).
 * - 1280 px: lado a lado, 64% / 36%; no aberto, texto (56%) e foto (44%). O texto tem logo a largura final (cqi da
 *   linha), por isso não muda de linha enquanto o painel cresce: vai sendo destapado.
 */
export function ServiceAreas({ areas, initial = 0, treatsLabel }: {
  areas: Area[];
  initial?: number;
  treatsLabel: string;
}) {
  const [open, setOpen] = useState(initial);
  return (
    <div className="flex flex-col gap-3 [container-type:inline-size] xl:flex-row">
      {areas.map((a, i) => {
        const isOpen = i === open;
        const id = `area-${a.key}`;
        return (
          <article
            key={a.key}
            aria-labelledby={`${id}-name`}
            className={cn(
              "on-dark group relative isolate flex flex-col justify-end overflow-hidden rounded-[var(--radius-img)] bg-panel text-white transition-[min-height,flex-basis] xl:min-h-[40rem] xl:shrink-0",
              ease,
              isOpen ? "md:min-h-[32rem] xl:basis-[calc(64cqi-0.375rem)]" : "min-h-28 md:min-h-32 xl:basis-[calc(36cqi-0.375rem)]",
            )}
          >
            {/* A foto: aberta, em cima (telemóvel) ou à direita; fechada, o painel todo */}
            <div
              className={cn(
                "absolute right-0 top-0 -z-10 overflow-hidden transition-[width,height]",
                ease,
                isOpen
                  ? "h-[min(110vw,26rem)] w-full sm:h-[30rem] md:h-full md:w-[42%] xl:w-[44%]"
                  : "h-full w-full",
              )}
            >
              <div className={cn("absolute inset-0 transition-transform", ease, !isOpen && "scale-105 group-hover:scale-100")}>{a.photo}</div>
              {/* Fechado: escurecido, com o teal a subir do fundo para o nome; aclara um pouco com o cursor */}
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 bg-[linear-gradient(0deg,var(--f4y-panel)_0%,rgba(29,90,100,.75)_45%,rgba(14,76,87,.45)_100%)] transition-opacity",
                  ease,
                  isOpen ? "opacity-0" : "group-hover:opacity-80",
                )}
              />
            </div>
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/55 transition-[opacity,transform,background-color,color] md:right-6 md:top-6",
                ease,
                isOpen ? "scale-75 opacity-0" : "group-hover:bg-white group-hover:text-teal-dark",
              )}
            >
              <Plus className="size-5" />
            </span>

            {/* O texto: aberto, assenta no teal liso por baixo ou ao lado da foto */}
            <div
              className={cn(
                "flex flex-col p-5 transition-[padding] md:w-[58%] md:p-10 xl:w-[calc(35.8cqi-0.21rem)] xl:p-11",
                ease,
                isOpen ? "pt-[calc(min(110vw,26rem)+1.5rem)] sm:pt-[calc(30rem+2rem)] md:pt-10 xl:pt-11" : "",
              )}
            >
              <h3 id={`${id}-name`} className="pr-14 font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] leading-[1.04] tracking-[-0.03em] md:pr-0">
                {/* Fechado, o botão cobre o painel todo; aberto, não, para não tapar o botão de baixo */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-detail`}
                  onClick={() => setOpen(i)}
                  className={cn("text-left", isOpen ? "cursor-default" : "after:absolute after:inset-0")}
                >
                  {a.name}
                </button>
              </h3>
              <div
                id={`${id}-detail`}
                inert={!isOpen}
                className={cn("grid transition-[grid-template-rows,opacity]", ease, isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] opacity-0")}
              >
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-[34ch] text-lg leading-relaxed text-white/90 md:mt-5">{a.what}</p>
                  <p className="mt-7 text-[15px] font-medium text-white/75">{treatsLabel}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {a.treats.map((t) => (
                      <li key={t} className="rounded-full bg-white/12 px-3.5 py-1.5 text-[15px] ring-1 ring-inset ring-white/15">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-col items-start gap-4">
                    {a.action}
                    <p className="text-[15px] text-white/80">{a.by}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
