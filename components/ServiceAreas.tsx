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
  /** Foto de fundo, já feita no servidor (`<Media cover>`). */
  photo: React.ReactNode;
  /** Botão ou link no fim do painel aberto. */
  action: React.ReactNode;
};

const ease = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
// Em coluna, a foto fica só na parte de cima e o texto assenta no teal por baixo (assim não tapa as caras);
// lado a lado, a foto ocupa o painel todo.
const photoArea = "absolute inset-x-0 top-0 -z-10 h-96 md:h-[26rem] lg:bottom-0 lg:h-auto";

/**
 * As duas áreas da clínica em painéis com foto: um aberto, o outro fechado só com o nome. Tocar no fechado abre-o e
 * fecha o outro. Telemóvel e tablet: um por cima do outro (o fechado é uma faixa). A partir de 1024 px: lado a lado,
 * 64% / 36% da largura. O texto do painel aberto tem logo a largura final (cqi da linha), por isso não muda de linha
 * enquanto o painel cresce: vai sendo destapado.
 */
export function ServiceAreas({ areas, initial = 0, eyebrow, treatsLabel }: {
  areas: Area[];
  initial?: number;
  eyebrow: string;
  treatsLabel: string;
}) {
  const [open, setOpen] = useState(initial);
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:[container-type:inline-size]">
      {areas.map((a, i) => {
        const isOpen = i === open;
        const id = `area-${a.key}`;
        return (
          <article
            key={a.key}
            aria-labelledby={`${id}-name`}
            className={cn(
              "on-dark group relative isolate flex flex-col justify-end overflow-hidden rounded-[var(--radius-img)] bg-panel text-white transition-[min-height,flex-basis] lg:min-h-[40rem] lg:shrink-0",
              ease,
              // Em coluna, o painel aberto é alto para a cara ficar acima do texto
              isOpen ? "min-h-[42rem] md:min-h-[38rem] lg:basis-[calc(64cqi-0.375rem)]" : "min-h-28 lg:basis-[calc(36cqi-0.375rem)]",
            )}
          >
            <div className={cn(photoArea, "transition-transform", ease, !isOpen && "scale-105")}>{a.photo}</div>
            {/* Teal em baixo para o texto; o painel fechado fica mais escuro e aclara um pouco com o cursor */}
            <div aria-hidden className={cn(photoArea, "bg-[linear-gradient(0deg,var(--f4y-panel)_0%,rgba(29,90,100,.88)_32%,rgba(29,90,100,0)_72%)]")} />
            <div aria-hidden className={cn("absolute inset-0 -z-10 bg-teal-dark/60 transition-opacity", ease, isOpen ? "opacity-0" : "group-hover:opacity-75")} />
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/55 transition-[opacity,transform,background-color] md:right-6 md:top-6",
                ease,
                isOpen ? "scale-75 opacity-0" : "group-hover:bg-white group-hover:text-teal-dark",
              )}
            >
              <Plus className="size-5" />
            </span>

            <div className="p-5 md:p-8 lg:w-[calc(64cqi-0.375rem)] lg:p-10">
              <p className="text-[15px] font-medium text-white/80">{eyebrow}</p>
              <h3 id={`${id}-name`} className="t-statement mt-1 pr-14 lg:pr-0">
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
                  <p className="mt-4 max-w-[34ch] text-lg leading-relaxed">{a.what}</p>
                  <p className="mt-6 text-sm font-semibold text-white/80">{treatsLabel}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {a.treats.map((t) => (
                      <li key={t} className="rounded-full bg-white/15 px-3.5 py-1.5 text-[15px] backdrop-blur-sm">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    {a.action}
                    <p className="text-[15px] text-white/85">{a.by}</p>
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
