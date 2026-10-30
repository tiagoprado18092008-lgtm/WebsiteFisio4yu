"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ServiceComposer } from "@/content";
import { waLink } from "@/lib/whatsapp";
import { btn, CallButton } from "./Buttons";
import { WhatsAppIcon } from "./Icon";

type Labels = { send: string; or: string; phone: string; phoneNote: string; visit: string };

/** Escolha dentro da frase: o `<select>` nativo (bom com o polegar) com a largura da opção escolhida. */
function Choice({ label, options, value, onChange }: { label: string; options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <span className="relative inline-block">
      {/* A opção escolhida, invisível, dá a largura; o select fica por cima a ocupar exatamente esse espaço */}
      <span aria-hidden className="invisible whitespace-pre border-b-2 border-transparent pr-[1.05em]">
        {options[value]}
      </span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 size-full cursor-pointer appearance-none rounded-none border-b-2 border-white/50 bg-transparent p-0 pr-[1.05em] leading-[inherit] text-inherit transition-colors hover:border-white focus-visible:border-white [&>option]:bg-white [&>option]:text-ink"
      >
        {options.map((o, i) => (
          <option key={o} value={i}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-0 top-1/2 size-[0.8em] -translate-y-1/2" strokeWidth={2.25} />
    </span>
  );
}

/**
 * Bloco final das páginas de serviço: a pergunta partida nas duas margens do painel e, entre elas, a mensagem de
 * WhatsApp como uma frase que o visitante completa ({a} e {b}). O que se vê é exatamente o que segue na mensagem.
 * Sem JavaScript, o link leva a frase com as primeiras opções.
 */
export function Composer({ copy, question, labels, location }: { copy: ServiceComposer; question: [string, string]; labels: Labels; location: string }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const message = `${copy.sentence.replace("{a}", copy.a.options[a]).replace("{b}", copy.b.options[b])} ${copy.close}`;
  const parts = copy.sentence.split(/(\{a\}|\{b\})/);

  return (
    <section aria-labelledby="marcar-title" data-hide-fab className="on-dark bg-panel text-white">
      <h2 id="marcar-title" className="sr-only">
        {question.join(" ")}
      </h2>
      <div className="container-x flex min-h-[100svh] flex-col justify-between py-8 md:min-h-[92svh] md:py-10">
        <p aria-hidden className="t-poster text-center">
          {question[0]}
        </p>
        <div className="mx-auto w-full max-w-4xl py-14 text-center md:py-20">
          <p className="t-statement">
            {parts.map((p, i) =>
              p === "{a}" ? (
                <Choice key={i} label={copy.a.label} options={copy.a.options} value={a} onChange={setA} />
              ) : p === "{b}" ? (
                <Choice key={i} label={copy.b.label} options={copy.b.options} value={b} onChange={setB} />
              ) : (
                <span key={i}>{p}</span>
              ),
            )}{" "}
            <span className="text-white/75">{copy.close}</span>
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              data-location={location}
              className={`${btn.whatsapp} w-full px-7 text-base sm:w-auto`}
            >
              <WhatsAppIcon className="size-5 shrink-0" />
              {labels.send}
            </a>
            <span className="text-lg text-white/75">{labels.or}</span>
            <CallButton location={location} label={labels.phone} note={labels.phoneNote} variant="onPanel" className="w-full px-7 text-base sm:w-auto" />
          </div>
          {/* Nota legal do telefone logo por baixo dos botões, junto ao número */}
          <p className="mt-3 text-sm text-white/80">{labels.phoneNote}</p>
          <p className="mt-8 text-[15px] text-white/80">{labels.visit}</p>
        </div>
        <p aria-hidden className="t-poster text-center">
          {question[1]}
        </p>
      </div>
    </section>
  );
}
