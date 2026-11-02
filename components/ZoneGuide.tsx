"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { btn } from "./Buttons";
import { WhatsAppIcon } from "./Icon";

export type Zone = {
  id: string;
  label: string;
  title: string;
  text: string;
  /** O que acontece em cada fase (avaliação, tratamento, autonomia). */
  steps: string[];
  common: string[];
  /** Zona deste serviço: o WhatsApp com a zona já escrita. */
  wa?: { href: string; location: string };
  /** Zona de outro serviço: não abre painel, leva à página dele (`service` é o nome curto, ao lado da zona). */
  other?: { href: string; service: string };
};

// Telemóvel e tablet: pílulas. A partir de 1024 px: um índice em letra grande, da cabeça aos pés.
const item =
  "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors lg:min-h-0 lg:w-full lg:rounded-none lg:px-0 lg:py-1 lg:text-left lg:font-display lg:text-[clamp(1.6rem,0.7rem+1.5vw,2.4rem)] lg:font-normal lg:leading-[1.15] lg:tracking-[-0.025em]";

/**
 * Tratamento por zona do corpo: escolhe-se a zona e o painel mostra o que se sente, as situações frequentes, as três
 * fases do tratamento ligadas por uma linha (que se desenha ao trocar de zona) e o WhatsApp com a zona escrita.
 * Telemóvel: pílulas por cima do painel, fases na vertical. A partir de 1024 px: índice à esquerda (3 de 12 colunas),
 * painel à direita; as fases ficam lado a lado a partir de 768 px.
 */
export function ZoneGuide({ zones, phases, listLabel, commonLabel, talk }: {
  zones: Zone[];
  phases: string[];
  listLabel: string;
  commonLabel: string;
  talk: string;
}) {
  const [open, setOpen] = useState(() => Math.max(0, zones.findIndex((z) => !z.other)));
  const z = zones[open];
  const last = z.steps.length - 1;

  return (
    <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:gap-x-6">
      <ul aria-label={listLabel} className="flex flex-wrap gap-2 lg:col-span-3 lg:flex-col lg:gap-1 lg:pt-2">
        {zones.map((zone, i) => {
          const dot = (on: boolean) => (
            <span aria-hidden className="hidden w-6 shrink-0 lg:block">
              <span
                className={cn(
                  "block size-2.5 rounded-full bg-teal transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  on ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              />
            </span>
          );
          return (
            <li key={zone.id}>
              {zone.other ? (
                <Link
                  href={zone.other.href}
                  className={cn(item, "group border border-ink/15 text-ink hover:border-ink lg:flex-wrap lg:gap-y-0 lg:border-0 lg:text-muted lg:hover:text-ink")}
                >
                  {dot(false)}
                  {zone.label}
                  {/* No índice grande, o serviço passa para a linha de baixo, alinhado com a palavra */}
                  <span className="text-[13px] font-medium text-muted lg:order-last lg:basis-full lg:pl-8 lg:font-sans lg:text-sm lg:leading-snug lg:tracking-normal">
                    {zone.other.service}
                  </span>
                  <ArrowUpRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:size-5" />
                </Link>
              ) : (
                <button
                  type="button"
                  aria-pressed={i === open}
                  aria-controls="zone-panel"
                  onClick={() => setOpen(i)}
                  className={cn(
                    item,
                    i === open
                      ? "bg-teal-strong text-white lg:bg-transparent lg:text-teal-strong"
                      : "bg-white text-ink hover:text-teal-strong lg:bg-transparent lg:text-muted lg:hover:text-ink",
                  )}
                >
                  {dot(i === open)}
                  {zone.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div id="zone-panel" aria-live="polite" className="rounded-[28px] bg-white p-6 sm:p-8 md:p-10 lg:col-span-9 lg:col-start-4 xl:p-14">
        <div key={z.id} className="bm-swap">
          <h3 className="font-display text-[clamp(2rem,1.3rem+2.4vw,3.6rem)] leading-[1.02] tracking-[-0.032em] text-ink">{z.title}</h3>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">{z.text}</p>

          <p className="mt-8 text-[15px] font-medium text-muted">{commonLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {z.common.map((c) => (
              <li key={c} className="rounded-full bg-ice px-3.5 py-1.5 text-[15px] text-teal-dark">
                {c}
              </li>
            ))}
          </ul>

          {/* As três fases, ligadas por uma linha: na vertical em telemóvel, lado a lado a partir de 768 px */}
          <ol className="mt-12 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-6">
            {z.steps.map((step, i) => (
              <li key={phases[i]} className="relative pl-8 md:pl-0 md:pt-9">
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-[0.4rem] size-3 rounded-full md:top-0",
                    i === last ? "bg-teal-strong" : "border-2 border-teal bg-white",
                  )}
                />
                {i < last && (
                  <span
                    aria-hidden
                    style={{ "--d": i } as React.CSSProperties}
                    className="zone-track absolute -bottom-[1.85rem] left-[5px] top-7 w-0.5 bg-teal/55 md:-right-4 md:bottom-auto md:left-5 md:top-[5px] md:h-0.5 md:w-auto"
                  />
                )}
                <h4 className="font-display text-xl font-medium tracking-[-0.015em] text-ink md:text-[1.375rem]">{phases[i]}</h4>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-grey">{step}</p>
              </li>
            ))}
          </ol>

          {z.wa && (
            <a
              href={z.wa.href}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              data-location={z.wa.location}
              className={cn(btn.whatsapp, "mt-12 md:mt-14")}
            >
              <WhatsAppIcon className="size-5 shrink-0" />
              {talk}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
