"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { WhatsAppButton } from "./Buttons";

type Plan = { name: string; parts: string[]; message: string };
type Part = { key: string; title: string; text: string };

const ease = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/**
 * As sessões Recovery como um seletor: tocar numa sessão marca-a e, por baixo, «O que pode incluir» mostra o que entra
 * nela (com visto) e o que fica de fora (esbatido). O botão do WhatsApp leva o nome da sessão escolhida, na etiqueta e
 * na mensagem. As sessões são botões com `aria-pressed`; a mudança é anunciada num `aria-live` discreto.
 */
export function RecoveryPlanner({ plans, parts, plansTitle, partsTitle, labels, waLocation }: {
  plans: Plan[];
  parts: Part[];
  plansTitle: string;
  partsTitle: string;
  labels: { included: string; excluded: string; cta: string; summary: string };
  waLocation: string;
}) {
  const [sel, setSel] = useState(0);
  const plan = plans[sel];
  const partName = (k: string) => parts.find((p) => p.key === k)?.title ?? k;
  const fill = (s: string) =>
    s.replace("{p}", plan.name).replace("{n}", String(plan.parts.length)).replace("{t}", String(parts.length));

  return (
    <>
      <h3 className="t-h3">{plansTitle}</h3>
      <ul className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {plans.map((pl, i) => {
          const on = i === sel;
          return (
            <li key={pl.name} className="flex">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setSel(i)}
                className={cn(
                  "group flex w-full flex-col rounded-[16px] p-4 text-left transition-[background-color,color,box-shadow,translate] sm:rounded-[18px] md:p-6",
                  ease,
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white",
                  on
                    ? "bg-white text-ink"
                    : "bg-white/[0.07] text-white ring-1 ring-inset ring-white/15 hover:bg-white/[0.13] hover:ring-white/30 [@media(hover:hover)]:hover:-translate-y-1",
                )}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-[1.15rem] leading-tight tracking-[-0.015em] sm:text-[1.45rem]">{pl.name}</span>
                  {/* O círculo marca a escolhida; nas outras é um aro vazio */}
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full transition-[background-color,border-color]",
                      ease,
                      on ? "bg-teal-strong text-white" : "border border-white/45",
                    )}
                  >
                    {on && <Check className="size-3.5" strokeWidth={3} />}
                  </span>
                </span>
                <span className={cn("mt-4 block border-t pt-4 sm:mt-5 sm:pt-5", on ? "border-line" : "border-white/15")}>
                  <span className="block space-y-2 sm:space-y-2.5">
                    {pl.parts.map((k) => (
                      <span key={k} className="flex gap-2 text-[14px] leading-snug sm:gap-2.5 sm:text-[15px]">
                        <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", on ? "text-teal" : "text-white/70")} strokeWidth={2.5} />
                        {partName(k)}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="t-h3">{partsTitle}</h3>
        <p aria-live="polite" className="text-[15px] text-white/80">
          {fill(labels.summary)}
        </p>
      </div>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {parts.map((p) => {
          const inPlan = plan.parts.includes(p.key);
          return (
            <div
              key={p.key}
              className={cn(
                "rounded-[18px] p-5 transition-[background-color,opacity,box-shadow]",
                ease,
                inPlan ? "bg-white/[0.1] ring-1 ring-inset ring-white/25" : "opacity-45 ring-1 ring-inset ring-white/10",
              )}
            >
              <dt className="flex items-center gap-2.5 font-medium">
                <span
                  aria-hidden
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors",
                    ease,
                    inPlan ? "bg-white text-teal-dark" : "border border-white/40 text-white/70",
                  )}
                >
                  {inPlan ? <Check className="size-3.5" strokeWidth={3} /> : <Minus className="size-3.5" strokeWidth={2.5} />}
                </span>
                {p.title}
                <span className="sr-only">({inPlan ? labels.included : labels.excluded})</span>
              </dt>
              <dd className="mt-2 leading-relaxed text-white/85">{p.text}</dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-10 md:mt-12">
        <WhatsAppButton message={plan.message} location={waLocation} label={fill(labels.cta)} />
      </div>
    </>
  );
}
