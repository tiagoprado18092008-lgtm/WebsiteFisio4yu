import type { IconName } from "@/content";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { Breadcrumbs, type Crumb } from "./PageHero";

/**
 * Hero de cada serviço: painel arredondado na cor do serviço — teal escuro na musculoesquelética (desporto),
 * "ice" claro na dermatofuncional (pós-parto) —, texto e ações à esquerda, foto encaixada à direita e factos no fundo.
 * Em telemóvel o texto e os botões vêm primeiro; a foto fica por baixo.
 */
export function ServiceHero({ crumbs, title, sub, actions, media, facts, tone }: {
  crumbs: Crumb[];
  title: string;
  sub: string;
  actions: React.ReactNode;
  media: React.ReactNode;
  facts: { icon: IconName; text: string }[];
  tone: "panel" | "ice";
}) {
  const dark = tone === "panel";
  return (
    <section className="px-2 pb-6 pt-2 md:px-4 md:pt-3">
      <div
        className={cn(
          "grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] md:rounded-[34px] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]",
          dark ? "on-dark bg-panel text-white" : "bg-ice text-ink",
        )}
      >
        <div className="flex flex-col px-4 pb-8 pt-5 sm:px-6 md:px-12 md:pb-12 md:pt-9 lg:min-h-[min(calc(100svh-8rem),780px)]">
          <Breadcrumbs crumbs={crumbs} onDark={dark} />
          <div className="hero-in mt-9 md:mt-14 lg:my-auto lg:py-10">
            {/* "Musculoesquelética" é uma palavra longa: abaixo de 390 px o título encolhe para caber sem partir */}
            <h1 className="t-h1 max-w-2xl hyphens-auto max-[389px]:text-[2rem] max-[359px]:text-[1.75rem]">{title}</h1>
            <p className={cn("mt-6 max-w-xl text-lg leading-relaxed md:text-xl", dark ? "text-white/90" : "text-grey")}>{sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
          </div>
          <ul
            className={cn(
              "mt-10 grid gap-x-6 gap-y-3 border-t pt-5 text-[15px] sm:grid-cols-2",
              dark ? "border-white/25 text-white/90" : "border-teal-dark/15 text-ink",
            )}
          >
            {facts.map((f) => (
              <li key={f.text} className="flex items-start gap-2.5">
                <Icon name={f.icon} className={cn("mt-0.5 size-[18px] shrink-0", dark ? "text-ice" : "text-teal-strong")} />
                {f.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-2 mb-2 aspect-[4/3] overflow-hidden rounded-[22px] sm:aspect-[16/10] md:mx-3 md:mb-3 md:rounded-[26px] lg:my-3 lg:ml-0 lg:aspect-auto">
          {media}
        </div>
      </div>
    </section>
  );
}
