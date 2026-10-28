"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "./Icon";

export type BodyRegion = {
  id: string;
  x: number;
  y: number;
  label: string;
  title: string;
  text: string;
  common: string[];
  waHref: string;
  serviceHref: string;
};

type Labels = { list: string; common: string; talk: string; see: string };

/* Silhueta frontal (viewBox 200×440): desenha-se a metade esquerda e espelha-se, num único contorno. */
type Pt = [number, number];
type Seg = { c1: Pt; c2: Pt; p: Pt };
const start: Pt = [100, 58];
const half: Seg[] = [
  { c1: [96, 58], c2: [91, 58], p: [91, 58] },
  { c1: [91, 66], c2: [90, 72], p: [88, 76] },
  { c1: [80, 80], c2: [64, 82], p: [56, 88] },
  { c1: [47, 94], c2: [45, 104], p: [44, 116] },
  { c1: [42, 140], c2: [40, 156], p: [39, 170] },
  { c1: [38, 190], c2: [34, 210], p: [31, 228] },
  { c1: [29, 238], c2: [28, 250], p: [33, 254] },
  { c1: [38, 257], c2: [41, 250], p: [41, 242] },
  { c1: [43, 226], c2: [48, 206], p: [51, 188] },
  { c1: [53, 172], c2: [55, 150], p: [58, 132] },
  { c1: [60, 124], c2: [63, 120], p: [66, 122] },
  { c1: [66, 140], c2: [67, 160], p: [70, 176] },
  { c1: [71, 190], c2: [66, 204], p: [64, 214] },
  { c1: [61, 230], c2: [63, 250], p: [66, 270] },
  { c1: [69, 292], c2: [71, 306], p: [72, 318] },
  { c1: [73, 330], c2: [71, 346], p: [72, 362] },
  { c1: [73, 378], c2: [74, 392], p: [75, 400] },
  { c1: [70, 408], c2: [64, 414], p: [68, 418] },
  { c1: [74, 421], c2: [86, 421], p: [90, 416] },
  { c1: [91, 410], c2: [89, 404], p: [89, 398] },
  { c1: [89, 380], c2: [92, 362], p: [91, 340] },
  { c1: [90, 326], c2: [92, 318], p: [93, 306] },
  { c1: [95, 286], c2: [97, 262], p: [97, 246] },
  { c1: [97, 236], c2: [99, 232], p: [100, 232] },
];
const fmt = ([x, y]: Pt) => `${x} ${y}`;
const mirror = ([x, y]: Pt): Pt => [200 - x, y];
const silhouette = (() => {
  let d = `M${fmt(start)}`;
  for (const s of half) d += ` C${fmt(s.c1)} ${fmt(s.c2)} ${fmt(s.p)}`;
  // volta pelo lado direito, em sentido inverso
  for (let i = half.length - 1; i >= 0; i--) {
    const from = i > 0 ? half[i - 1].p : start;
    d += ` C${fmt(mirror(half[i].c2))} ${fmt(mirror(half[i].c1))} ${fmt(mirror(from))}`;
  }
  return d + "Z";
})();

function Figure({ regions, active, onSelect }: { regions: BodyRegion[]; active: string; onSelect: (id: string) => void }) {
  return (
    <svg viewBox="0 0 200 440" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <radialGradient id="bm-halo">
          <stop offset="0%" stopColor="var(--f4y-cyan)" stopOpacity=".38" />
          <stop offset="100%" stopColor="var(--f4y-cyan)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="33" r="22" fill="#fff" stroke="#c4d7dc" strokeWidth="1.5" />
      <path d={silhouette} fill="#fff" stroke="#c4d7dc" strokeWidth="1.5" strokeLinejoin="round" />
      {/* leitura anatómica discreta: clavículas, linha média, rótulas */}
      <g fill="none" stroke="#dde8eb" strokeWidth="1.2" strokeLinecap="round">
        <path d="M70 90 Q85 94 97 92 M130 90 Q115 94 103 92" />
        <path d="M100 98 L100 212" strokeDasharray="1 5" />
        <path d="M77 312 q5 -5 10 0 M113 312 q5 -5 10 0" />
      </g>
      {active === "coluna" && (
        <path d="M100 84 L100 214" stroke="var(--f4y-teal)" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 6" opacity=".7" />
      )}

      {regions.map((r) => {
        const on = r.id === active;
        return (
          <g key={r.id} className="group cursor-pointer" onClick={() => onSelect(r.id)}>
            <circle cx={r.x} cy={r.y} r="18" fill="transparent" />
            {on && (
              <>
                <circle cx={r.x} cy={r.y} r="30" fill="url(#bm-halo)" />
                <circle cx={r.x} cy={r.y} r="7" fill="var(--f4y-cyan)" className="pulse" />
              </>
            )}
            <circle
              cx={r.x}
              cy={r.y}
              r={on ? 7.5 : 5}
              fill={on ? "var(--f4y-teal-strong)" : "#fff"}
              stroke="var(--f4y-teal)"
              strokeWidth={on ? 3 : 2}
              className="transition-all duration-200 group-hover:fill-[var(--f4y-ice)]"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function BodyMap({ regions, labels, initial }: { regions: BodyRegion[]; labels: Labels; initial: string }) {
  const [active, setActive] = useState(initial);
  const r = regions.find((x) => x.id === active) ?? regions[0];

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-20">
      {/* Mobile: zonas → figura → detalhe. Desktop: figura à esquerda, zonas e detalhe à direita. */}
      <div className="relative mx-auto aspect-[200/440] w-full max-w-[170px] md:row-span-2 md:max-w-[260px] lg:max-w-[300px]">
        <div aria-hidden className="absolute inset-[-6%_-18%] rounded-full bg-[radial-gradient(closest-side,var(--f4y-ice),transparent)]" />
        <div className="relative h-full">
          <Figure regions={regions} active={active} onSelect={setActive} />
        </div>
      </div>

      <div className="-order-1 md:order-none md:self-end">
        <ul aria-label={labels.list} className="flex flex-wrap gap-2">
          {regions.map((x) => (
            <li key={x.id}>
              <button
                type="button"
                aria-pressed={x.id === active}
                aria-controls="bodymap-detail"
                onClick={() => setActive(x.id)}
                className={cn(
                  "min-h-11 rounded-[var(--radius-btn)] border px-4 text-[15px] font-medium transition-colors",
                  x.id === active ? "border-teal-strong bg-teal-strong text-white" : "border-line bg-white text-ink hover:border-teal hover:text-teal-strong",
                )}
              >
                {x.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:self-start">
        <div
          id="bodymap-detail"
          aria-live="polite"
          className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(14,76,87,.45)] ring-1 ring-line md:p-9"
        >
          <div key={r.id} className="bm-swap">
            <h3 className="t-h2">{r.title}</h3>
            <p className="t-lead mt-4 max-w-2xl">{r.text}</p>
            <p className="mt-7 text-sm font-semibold text-muted">{labels.common}</p>
            <ul className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {r.common.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-ink">
                  <Check className="mt-1 size-4 shrink-0 text-teal-strong" strokeWidth={2.5} aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-7">
              <a
                href={r.waHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp"
                data-location={`mapa-${r.id}`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[var(--radius-btn)] bg-whatsapp px-5 text-[15px] font-semibold text-[#05301a] hover:bg-[#1fc15c] sm:w-auto"
              >
                <WhatsAppIcon className="size-5" />
                {labels.talk}
              </a>
              <Link href={r.serviceHref} className="link">
                {labels.see}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
