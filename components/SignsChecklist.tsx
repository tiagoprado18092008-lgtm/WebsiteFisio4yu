"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { btn } from "./Buttons";
import { WhatsAppIcon } from "./Icon";

type Labels = {
  legend: string;
  countOne: string;
  countMany: string;
  none: string;
  noneHint: string;
  messageIntro: string;
  send: string;
  fallback: string;
  note: string;
};

/**
 * Situações para selecionar: a seleção segue escrita na mensagem de WhatsApp, para o utente não ter de explicar tudo.
 * Nada é guardado no site; a mensagem só sai se a pessoa a enviar no WhatsApp.
 */
export function SignsChecklist({ items, labels, baseMessage, location }: {
  items: string[]; labels: Labels; baseMessage: string; location: string;
}) {
  const [picked, setPicked] = useState<number[]>([]);
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i].sort((a, b) => a - b)));
  const message = picked.length ? `${baseMessage}\n\n${labels.messageIntro}\n${picked.map((i) => `- ${items[i]}`).join("\n")}` : baseMessage;
  const count = !picked.length ? labels.none : picked.length === 1 ? labels.countOne : labels.countMany.replace("{n}", String(picked.length));

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
      <fieldset>
        <legend className="sr-only">{labels.legend}</legend>
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((it, i) => {
            const on = picked.includes(i);
            return (
              <li key={it}>
                <label
                  className={cn(
                    "flex h-full min-h-20 cursor-pointer items-start gap-4 rounded-[22px] bg-white p-5 transition-shadow",
                    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-strong",
                    on ? "ring-2 ring-teal-strong" : "ring-1 ring-line hover:ring-teal/60",
                  )}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(i)} />
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors",
                      on ? "border-teal-strong bg-teal-strong text-white" : "border-[#b9cdd2] bg-white text-transparent",
                    )}
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="leading-snug text-ink">{it}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="on-dark self-start rounded-[28px] bg-panel p-6 text-white md:p-7 lg:sticky lg:top-40">
        <div aria-live="polite">
          <p className="font-display text-2xl leading-tight tracking-tight">{count}</p>
          {/* O que vai seguir na mensagem */}
          {picked.length ? (
            <ul className="mt-4 space-y-2 border-t border-white/20 pt-4 text-[15px] leading-snug text-white/85">
              {picked.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-ice" strokeWidth={2.5} aria-hidden />
                  {items[i]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[15px] text-white/85">{labels.noneHint}</p>
          )}
        </div>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp"
          data-location={location}
          className={cn(btn.whatsapp, "mt-6 w-full text-center leading-tight")}
        >
          <WhatsAppIcon className="size-5 shrink-0" />
          {picked.length ? labels.send : labels.fallback}
        </a>
        <p className="mt-4 text-sm leading-relaxed text-white/80">{labels.note}</p>
      </div>
    </div>
  );
}
