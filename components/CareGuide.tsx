"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { CareGuide as Guide, CareGuideItem, CarePoint } from "@/content/pt";
import { cn } from "@/lib/cn";
import { btn } from "./Buttons";

// O mesmo índice do tratamento por zona (ZoneGuide): pílulas em telemóvel e tablet; a partir de 1024 px, uma lista em
// letra grande (um pouco mais pequena, porque há nomes de tratamentos longos).
const item =
  "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors lg:min-h-0 lg:w-full lg:rounded-none lg:px-0 lg:py-1.5 lg:text-left lg:font-display lg:text-[clamp(1.35rem,0.6rem+1.2vw,2rem)] lg:font-normal lg:leading-[1.15] lg:tracking-[-0.025em]";

/** Seletor segmentado (como as fases do esquema da diástase): uma pílula por opção, a escolhida a teal. */
function Segmented({ label, options, value, onChange, controls }: {
  label: string;
  options: string[];
  value: number;
  onChange: (i: number) => void;
  controls: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-[22px] bg-white p-1">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          aria-pressed={i === value}
          aria-controls={controls}
          onClick={() => onChange(i)}
          className={cn(
            "min-h-11 rounded-[18px] px-4 text-[15px] font-semibold transition-colors",
            i === value ? "bg-teal-strong text-white" : "text-teal-dark hover:bg-mist",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Points({ points, cols }: { points: CarePoint[]; cols?: boolean }) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-3", cols && "sm:grid-cols-2")}>
      {points.map((p) => {
        const key = typeof p === "string" ? p : p.title;
        return (
          <li key={key} className="flex gap-3 leading-relaxed">
            <Check aria-hidden className="mt-1 size-[18px] shrink-0 text-teal" strokeWidth={2.25} />
            {typeof p === "string" ? (
              <span className="text-ink">{p}</span>
            ) : (
              <span>
                <span className="block font-medium text-ink">{p.title}</span>
                <span className="block text-grey">{p.text}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * O painel de um tratamento, por camadas: título e uma frase → as fases do protocolo (ligadas por uma linha) ou as
 * variantes num seletor → os benefícios (com seletor quando há mais de um grupo) → as zonas → «Saber mais»,
 * que abre o resto do texto do cliente. Os seletores voltam ao início ao trocar de tratamento (`key` no painel).
 */
function Panel({ t, labels }: { t: CareGuideItem; labels: { more: string; less: string } }) {
  const uid = useId();
  const [opt, setOpt] = useState(0);
  const [grp, setGrp] = useState(0);
  const [more, setMore] = useState(false);
  const o = t.options?.items[opt];
  const g = t.groups?.items[grp];
  const steps = t.steps?.items ?? [];
  const last = steps.length - 1;

  return (
    <div className="bm-swap">
      <h3 className="font-display text-[clamp(2rem,1.3rem+2.4vw,3.6rem)] leading-[1.02] tracking-[-0.032em] text-ink">{t.title}</h3>
      <p className="mt-4 text-lg font-medium leading-snug text-teal-strong">{t.tagline}</p>
      <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">{t.summary}</p>

      {/* Fases do protocolo, ligadas por uma linha: na vertical em telemóvel, lado a lado a partir de 768 px */}
      {t.steps && (
        <div className="mt-12">
          <h4 className="t-h3">{t.steps.title}</h4>
          <ol className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((st, i) => (
              <li key={st.title} className="relative pl-8 md:pl-0 md:pt-9">
                <span aria-hidden className={cn("absolute left-0 top-[0.4rem] size-3 rounded-full md:top-0", i === last ? "bg-teal-strong" : "border-2 border-teal bg-white")} />
                {i < last && (
                  <span
                    aria-hidden
                    style={{ "--d": i } as React.CSSProperties}
                    className="zone-track absolute -bottom-[1.85rem] left-[5px] top-7 w-0.5 bg-teal/55 md:-right-4 md:bottom-auto md:left-5 md:top-[5px] md:h-0.5 md:w-auto"
                  />
                )}
                <p className="font-display text-xl font-medium tracking-[-0.015em] text-ink md:text-[1.375rem]">{st.title}</p>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-grey">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Variantes do tratamento: um seletor e um cartão branco com a escolhida */}
      {t.options && o && (
        <div className="mt-12">
          <h4 className="t-h3">{t.options.title}</h4>
          <div className="mt-4">
            <Segmented label={t.options.title} options={t.options.items.map((x) => x.label)} value={opt} onChange={setOpt} controls={`${uid}-opt`} />
          </div>
          <div id={`${uid}-opt`} className="mt-3 rounded-[22px] bg-white p-6 md:p-8">
            <div key={o.label} className="bm-swap">
              <p className="font-display text-[clamp(1.4rem,1.15rem+0.8vw,1.85rem)] leading-[1.1] tracking-[-0.02em] text-ink">{o.title}</p>
              {o.tagline && <p className="mt-2 font-medium text-teal-strong">{o.tagline}</p>}
              <p className="mt-4 max-w-[60ch] leading-relaxed text-ink">{o.text}</p>
              {o.points && (
                <div className="mt-5">
                  <Points points={o.points} cols />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Benefícios: com mais de um grupo, um seletor troca a lista */}
      {t.groups && g && (
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <h4 className="t-h3">{t.groups.title}</h4>
            {t.groups.items.length > 1 && (
              <Segmented label={t.groups.title} options={t.groups.items.map((x) => x.label)} value={grp} onChange={setGrp} controls={`${uid}-grp`} />
            )}
          </div>
          <div id={`${uid}-grp`} className="mt-6">
            <div key={g.label} className="bm-swap">
              {g.intro && <p className="mb-5 max-w-[60ch] leading-relaxed text-ink">{g.intro}</p>}
              <Points points={g.points} cols />
            </div>
          </div>
        </div>
      )}

      {t.chips && (
        <div className="mt-12">
          <h4 className="t-h3">{t.chips.title}</h4>
          {t.chips.intro && <p className="mt-2 text-[15px] text-muted">{t.chips.intro}</p>}
          {/* Etiquetas só de leitura: com contorno, para não parecerem botões */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {t.chips.items.map((c) => (
              <li key={c} className="rounded-full border border-teal/30 px-3.5 py-1.5 text-[15px] text-teal-dark">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {t.note && <p className="mt-8 max-w-[60ch] text-[15px] leading-relaxed text-muted">{t.note}</p>}

      {t.more.length > 0 && (
        <div className="mt-12">
          <button type="button" aria-expanded={more} aria-controls={`${uid}-more`} onClick={() => setMore((m) => !m)} className={cn(btn.outline, "group")}>
            {more ? labels.less : labels.more}
            <ChevronDown aria-hidden className={cn("size-4 shrink-0 transition-transform duration-300", more && "rotate-180")} />
          </button>
        </div>
      )}

      {/* «Saber mais»: o resto do texto do cliente, que abre por baixo */}
      <div
        id={`${uid}-more`}
        inert={!more}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          more ? "grid-rows-[1fr]" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-2 md:gap-x-10">
            {t.more.map((m) => (
              <div key={m.title}>
                <h4 className="t-h3">{m.title}</h4>
                {m.text.map((p) => (
                  <p key={p} className="mt-3 max-w-[56ch] leading-relaxed text-ink">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Guia dos tratamentos da dermatofuncional, com a mesma lógica do tratamento por zona da musculoesquelética: escolhe-se
 * o tratamento no índice e o painel ao lado mostra-o por camadas. Telemóvel: pílulas por cima do painel. A partir de
 * 1024 px: índice à esquerda (3 de 12 colunas) e painel à direita.
 * Ligações com `#id` de um tratamento (ex.: da página Fisioterapia) abrem esse tratamento e trazem o guia ao ecrã.
 */
export function CareGuide({ guide }: { guide: Guide }) {
  const [open, setOpen] = useState(0);
  const t = guide.items[open];
  const next = guide.items[(open + 1) % guide.items.length];
  const panelRef = useRef<HTMLDivElement>(null);
  const smooth = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

  useEffect(() => {
    const show = (i: number, scroll: boolean, behavior: ScrollBehavior = "auto") => {
      setOpen(i);
      const sec = document.getElementById("tratamentos");
      if (scroll && sec) window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 96, behavior });
    };
    const fromHash = () => {
      const i = guide.items.findIndex((x) => x.id === decodeURIComponent(location.hash.slice(1)));
      if (i >= 0) show(i, true);
    };
    // Ligações na mesma página (ex.: «O que tratamos»): abrem o tratamento e descem até ao guia a deslizar, mesmo
    // quando o `#id` já está na barra de endereço (aí o browser não dispara `hashchange`)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      const i = guide.items.findIndex((x) => x.id === id);
      if (i < 0) return;
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
      show(i, true, smooth());
    };
    // Na chegada à página, espera um frame para o layout assentar antes de medir
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, [guide.items]);

  // «A seguir»: abre o tratamento seguinte e, se o topo do painel já saiu do ecrã, sobe até ele
  const goNext = () => {
    setOpen((o) => (o + 1) % guide.items.length);
    const top = panelRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollTo({ top: top + window.scrollY - 112, behavior: smooth() });
  };

  return (
    <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:gap-x-6">
      <ul aria-label={guide.listLabel} className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:col-span-3 lg:flex-col lg:gap-1 lg:self-start lg:pt-2">
        {guide.items.map((x, i) => (
          <li key={x.id}>
            <button
              type="button"
              aria-pressed={i === open}
              aria-controls="care-panel"
              onClick={() => setOpen(i)}
              className={cn(
                item,
                i === open
                  ? "bg-teal-strong text-white lg:bg-transparent lg:text-teal-strong"
                  : "bg-mist text-ink hover:text-teal-strong lg:bg-transparent lg:text-muted lg:hover:text-ink",
              )}
            >
              <span aria-hidden className="hidden w-6 shrink-0 lg:block">
                <span
                  className={cn(
                    "block size-2.5 rounded-full bg-teal transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    i === open ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                />
              </span>
              {x.label}
            </button>
          </li>
        ))}
      </ul>

      <div ref={panelRef} className="scroll-mt-28 rounded-[28px] bg-mist p-6 sm:p-8 md:p-10 lg:col-span-9 lg:col-start-4 xl:p-14">
        <div id="care-panel" aria-live="polite">
          <Panel key={t.id} t={t} labels={{ more: guide.moreLabel, less: guide.lessLabel }} />
        </div>
        {/* O tratamento seguinte, para se percorrer o guia sem voltar ao índice */}
        <div className="mt-12 flex justify-end border-t border-line pt-6 md:mt-14 md:pt-8">
          <button
            type="button"
            onClick={goNext}
            aria-controls="care-panel"
            className="card-hover group inline-flex min-h-11 items-center gap-3 text-right font-display text-[clamp(1.15rem,1rem+0.5vw,1.5rem)] leading-tight tracking-[-0.015em] text-teal-strong"
          >
            <span className="card-title">{guide.nextLabel.replace("{t}", next.label)}</span>
            <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-strong text-white transition-[background-color,translate] duration-300 group-hover:translate-x-1 group-hover:bg-teal-dark">
              <ArrowRight className="size-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
