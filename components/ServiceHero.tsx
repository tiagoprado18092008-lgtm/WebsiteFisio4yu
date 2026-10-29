import type { IconName } from "@/content";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { Breadcrumbs, type Crumb } from "./PageHero";

/**
 * Hero de cada serviço, de propósito diferente do da home (painel teal com a foto fundida): fundo claro, foto em
 * retrato emoldurada sobre um bloco na cor do serviço — teal escuro na musculoesquelética (desporto), "ice" na
 * dermatofuncional (pós-parto) —, o fisioterapeuta responsável identificado sobre a foto e os factos em cartões.
 * Em telemóvel: texto e botões, foto, factos.
 */
export function ServiceHero({ crumbs, title, sub, actions, media, facts, tone, specialist }: {
  crumbs: Crumb[];
  title: string;
  sub: string;
  actions: React.ReactNode;
  media: React.ReactNode;
  facts: { icon: IconName; text: string }[];
  tone: "panel" | "ice";
  specialist?: { name: string; role: string; avatar: React.ReactNode };
}) {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-6 md:pb-24 md:pt-10">
      {/* Bloco na cor do serviço atrás da foto, recolhido nas margens como os painéis do resto do site (só em desktop) */}
      <div
        aria-hidden
        className={cn("absolute inset-y-0 right-4 hidden w-[36%] rounded-[34px] lg:block", tone === "panel" ? "bg-panel" : "bg-ice")}
      />
      <div className="container-x relative">
        <Breadcrumbs crumbs={crumbs} />
        {/* Em desktop: texto e factos na coluna da esquerda, foto à direita a ocupar as duas linhas */}
        <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-x-16 lg:gap-y-12">
          <div className="hero-in lg:col-start-1 lg:row-start-1 lg:self-end">
            {/* "Musculoesquelética" é uma palavra longa: abaixo de 390 px o título encolhe para caber sem partir */}
            <h1 className="t-h1 max-w-2xl hyphens-auto max-[389px]:text-[2rem] max-[359px]:text-[1.75rem]">{title}</h1>
            <p className="t-lead mt-6 max-w-xl">{sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
          </div>
          <ul className="grid max-w-2xl gap-3 sm:grid-cols-2 lg:col-start-1 lg:row-start-2 lg:self-start">
            {facts.map((f) => (
              <li key={f.text} className="flex items-center gap-3 rounded-[18px] bg-mist px-4 py-3 text-[15px] leading-snug text-ink ring-1 ring-line/60">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-teal-strong ring-1 ring-line/70">
                  <Icon name={f.icon} className="size-[18px]" />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
          <div className="relative row-start-2 pb-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:ml-auto lg:w-full lg:max-w-[500px] lg:self-center lg:pb-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-34px_rgba(6,40,46,.55)] sm:aspect-[16/11] lg:aspect-[4/5]">
              {media}
            </div>
            {specialist && (
              <div className="absolute bottom-0 left-4 flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-[0_16px_34px_-18px_rgba(14,76,87,.55)] ring-1 ring-line/70 lg:-left-10 lg:bottom-10">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-ice">{specialist.avatar}</span>
                <span>
                  <span className="block text-[15px] font-semibold leading-tight text-ink">{specialist.name}</span>
                  <span className="block text-[13px] leading-tight text-muted">{specialist.role}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
