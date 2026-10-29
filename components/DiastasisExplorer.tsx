"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Stage = { label: string; title: string; text: string };
type Legend = { muscle: string; linea: string; gap: string };

/*
 * Esquema frontal da parede abdominal (viewBox 300×380, centro em x=150): os dois retos do abdómen,
 * a linha alba ao meio e, nas fases 2 e 3, a distância entre os retos. Uma geometria por fase, pela ordem do conteúdo:
 * antes da gravidez → na gravidez → depois do parto. Só `transform`, `fill` e `opacity` mudam (transições em globals.css).
 */
const CX = 150;
const geometry = [
  { gap: 6, muscle: 1, torso: 1, linea: "#8fbfc8", measure: 0 },
  { gap: 46, muscle: 0.86, torso: 1.12, linea: "#d9ecef", measure: 1 },
  { gap: 26, muscle: 0.95, torso: 1.03, linea: "#c2dfe4", measure: 1 },
];

const torso = "M60 24 C66 86 76 118 74 152 C72 204 52 252 56 300 C60 334 100 356 150 362 C200 356 240 334 244 300 C248 252 228 204 226 152 C224 118 234 86 240 24";
// Reto esquerdo com a margem interna em x=0 (o direito é o mesmo, espelhado): mais largo em cima, estreito junto ao púbis
const rectus = "M0 50 L0 332 Q0 342 -9 340 L-22 334 Q-28 330 -29 320 C-34 272 -42 226 -45 192 C-48 146 -51 92 -49 64 Q-48 50 -35 48 L-6 48 Q0 48 0 50 Z";
const intersections = "M-3 108 Q-24 113 -47 106 M-3 160 Q-24 165 -46 158 M-3 210 Q-22 214 -44 208";

function Figure({ stage }: { stage: number }) {
  const g = geometry[stage];
  const side = (dir: 1 | -1) => ({ transform: `translate(${CX + (dir * g.gap) / 2}px, 0px) scaleX(${dir * -g.muscle})` });
  return (
    <svg viewBox="0 0 300 380" className="mx-auto h-auto w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[340px]" aria-hidden>
      <defs>
        <linearGradient id="dx-muscle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--f4y-teal)" }} />
          <stop offset="1" style={{ stopColor: "var(--f4y-cyan)" }} />
        </linearGradient>
        <linearGradient id="dx-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Tronco: alarga na gravidez */}
      <g className="dx-move" style={{ transform: `translate(${CX}px, 0px) scaleX(${g.torso}) translate(${-CX}px, 0px)` }}>
        <path d={`${torso}Z`} fill="var(--f4y-mist)" />
        <path d={torso} fill="none" stroke="#c4d7dc" strokeWidth="1.5" />
        {/* Leitura anatómica discreta: margens das costelas e pregas das virilhas */}
        <g fill="none" stroke="#d3e1e5" strokeWidth="1.5" strokeLinecap="round">
          <path d="M150 40 Q114 62 82 100 M150 40 Q186 62 218 100" />
          <path d="M72 270 Q100 300 132 340 M228 270 Q200 300 168 340" />
        </g>
      </g>

      {/* Linha alba: estica e alarga */}
      <rect
        x="-0.5"
        y="48"
        width="1"
        height="290"
        className="dx-move"
        style={{ transform: `translate(${CX}px, 0px) scaleX(${g.gap})`, fill: g.linea }}
      />

      {/* Retos do abdómen */}
      {([-1, 1] as const).map((dir) => (
        <g key={dir} className="dx-move" style={side(dir)}>
          <path d={rectus} fill="url(#dx-muscle)" />
          <path d={intersections} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}

      <circle cx={CX} cy="222" r="4.5" fill="none" stroke="#7f9ba2" strokeWidth="1.5" />

      {/* Distância entre os retos */}
      <g className="dx-fade" style={{ opacity: g.measure }} fill="var(--f4y-teal-dark)">
        <rect x="-0.5" y="-1" width="1" height="2" className="dx-move" style={{ transform: `translate(${CX}px, 176px) scaleX(${g.gap})` }} />
        {([-1, 1] as const).map((dir) => (
          <rect key={dir} x="-1" y="-7" width="2" height="14" rx="1" className="dx-move" style={{ transform: `translate(${CX + (dir * g.gap) / 2}px, 176px)` }} />
        ))}
      </g>

      {/* O tronco continua para cima: o topo desvanece */}
      <rect x="0" y="0" width="300" height="46" fill="url(#dx-fade)" />
    </svg>
  );
}

/**
 * Explicação interativa da diástase abdominal: o esquema muda com a fase escolhida e o texto acompanha.
 * Telemóvel: título → fases → esquema → texto → `footer` (o esquema fica logo abaixo dos botões que o mudam).
 * Desktop: esquema fixo à esquerda, o resto à direita.
 */
export function DiastasisExplorer({ stages, stagesLabel, legend, header, footer }: {
  stages: Stage[];
  stagesLabel: string;
  legend: Legend;
  header: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const [stage, setStage] = useState(0);
  const current = stages[stage];
  return (
    <div className="grid gap-x-20 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-y-8">
      <div className="lg:col-start-2">{header}</div>

      <div role="group" aria-label={stagesLabel} className="grid grid-cols-3 gap-1 rounded-[22px] bg-white p-1 ring-1 ring-line lg:col-start-2">
        {stages.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={i === stage}
            aria-controls="dx-detail"
            onClick={() => setStage(i)}
            className={cn(
              "min-h-12 rounded-[18px] px-2 py-2 text-sm font-semibold leading-tight transition-colors md:text-[15px]",
              i === stage ? "bg-teal-strong text-white" : "text-ink hover:bg-mist hover:text-teal-strong",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <figure className="rounded-[28px] bg-white px-5 pb-6 pt-8 ring-1 ring-line md:px-8 lg:sticky lg:top-40 lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:self-start">
        <Figure stage={stage} />
        <figcaption>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-grey">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-3 rounded-[4px] bg-[linear-gradient(180deg,var(--f4y-teal),var(--f4y-cyan))]" />
              {legend.muscle}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-3 w-1.5 rounded-sm bg-[#8fbfc8]" />
              {legend.linea}
            </li>
            <li className={cn("flex items-center gap-2 transition-opacity", stage === 0 && "opacity-40")}>
              <span aria-hidden className="relative h-3 w-4 border-x-2 border-teal-dark">
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-teal-dark" />
              </span>
              {legend.gap}
            </li>
          </ul>
        </figcaption>
      </figure>

      <div id="dx-detail" aria-live="polite" className="min-h-[9.5rem] border-l-2 border-teal pl-5 md:min-h-[8rem] lg:col-start-2">
        <div key={stage} className="bm-swap">
          <h3 className="t-h3">{current.title}</h3>
          <p className="mt-2 max-w-xl text-lg leading-relaxed text-grey">{current.text}</p>
        </div>
      </div>

      {footer && <div className="lg:col-start-2">{footer}</div>}
    </div>
  );
}
