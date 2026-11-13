import { Check } from "lucide-react";
import type { TreatmentBlocks as Blocks } from "@/content/pt";
import type { Locale } from "@/lib/routes";
import { Media } from "./Media";
import { getDict } from "@/content";
import { videoFor } from "@/content/media";
import { waMessages } from "@/lib/whatsapp";
import { VideoCard } from "./VideoCard";
import { ScrollSpy } from "./ScrollSpy";
import { RecoveryPlanner } from "./RecoveryPlanner";

/**
 * Os tratamentos da musculoesquelética, em três blocos com ritmos diferentes, para a página não ficar num só bloco de texto:
 * 1. Técnicas: a foto de um tratamento presa ao topo à esquerda, com o índice, e à direita a lista (nome, uma frase e
 *    onde se usa); a técnica que está a ser lida acende.
 * 2. Sessão Recovery: painel teal com o vídeo e a foto, os benefícios em etiquetas e as quatro sessões num seletor:
 *    a escolhida mostra o que inclui e dá o nome ao botão do WhatsApp.
 * 3. Desporto: dois cartões mist com foto, lado a lado (o percurso, a seguir, já é uma faixa mist).
 */
export function TreatmentBlocks({ data, locale, waLocation }: { data: Blocks; locale: Locale; waLocation: string }) {
  const { techniques: tq, recovery: rc, sport } = data;
  const t = getDict(locale);
  const common = t.common;
  const msg = waMessages(t);
  const video = rc.video ? videoFor(rc.video, locale) : null;

  return (
    <>
      {/* 1. Técnicas: o título e a introdução por cima; depois, a foto presa ao topo com o índice das técnicas e, à
          direita, as técnicas. A partir de 1024 px, a técnica que está a ser lida acende (as outras esbatem) e o índice
          acompanha-a; tocar no índice leva à técnica (components/ScrollSpy.tsx). */}
      <section id={tq.id} aria-labelledby={`${tq.id}-title`} className="bg-white pb-20 md:pb-36">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
            <h2 id={`${tq.id}-title`} data-reveal className="t-display lg:col-span-6">
              {tq.title}
            </h2>
            <p data-reveal className="max-w-[40ch] text-lg leading-relaxed text-ink lg:col-span-4 lg:col-start-9">
              {tq.intro}
            </p>
          </div>
          <ScrollSpy className="spy-list mt-12 grid gap-10 md:mt-16 md:gap-14 lg:grid-cols-12 lg:gap-x-6">
            <div data-reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
              <nav aria-label={tq.title} className="hidden lg:block">
                <ul className="flex flex-wrap gap-2">
                  {tq.items.map((it) => (
                    <li key={it.id}>
                      <a href={`#${it.id}`} data-spy-link={it.id} className="spy-chip inline-flex min-h-9 items-center rounded-full bg-ice px-3.5 text-[15px] font-semibold text-teal-dark">
                        {it.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-img)] bg-ice sm:max-w-[28rem] lg:mt-6 lg:aspect-auto lg:h-[min(calc(100svh-15rem),42rem)] lg:max-w-none">
                <Media id={tq.mediaId} locale={locale} cover sizes="(min-width: 1480px) 560px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ol className="divide-y divide-line border-y border-line">
                {tq.items.map((it, i) => (
                  <li key={it.id} id={it.id} data-spy className="spy-item scroll-mt-32 py-8 md:py-10">
                    <div data-reveal style={{ "--d": i } as React.CSSProperties}>
                      <h3 className="font-display text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] leading-[1.1] tracking-[-0.02em] text-ink">{it.name}</h3>
                      {it.full && <p className="mt-1.5 text-[15px] text-muted">{it.full}</p>}
                      <p className="mt-4 max-w-[52ch] leading-relaxed text-ink">{it.text}</p>
                      <p className="mt-5 text-[15px] font-medium text-teal-strong">{tq.usesLabel}</p>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {it.uses.map((u) => (
                          <li key={u} className="rounded-full bg-ice px-3 py-1 text-[14px] text-teal-dark">
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
              <p data-reveal className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-muted">
                {tq.note}
              </p>
            </div>
          </ScrollSpy>
        </div>
      </section>

      {/* 2. Sessão Recovery */}
      <section aria-labelledby={`${rc.id}-title`} className="bg-white pb-20 md:pb-36">
        <div className="container-x">
          <article id={rc.id} data-reveal className="on-dark rounded-[28px] bg-panel p-3 text-white md:rounded-[34px]">
            <div className="grid gap-3 lg:grid-cols-12">
              <div className="px-3 py-6 md:p-8 lg:col-span-6 lg:p-10 xl:p-12">
                <h2 id={`${rc.id}-title`} className="t-display">
                  {rc.title}
                </h2>
                <p className="mt-6 max-w-[48ch] text-lg leading-relaxed md:mt-8">{rc.text}</p>
                <h3 className="t-h3 mt-10 md:mt-12">{rc.benefitsTitle}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {rc.benefits.map((b) => (
                    <li key={b} className="rounded-full bg-white/12 px-3.5 py-1.5 text-[15px]">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:col-span-6">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] md:rounded-[22px] lg:aspect-auto">
                  {video ? (
                    <VideoCard video={video} labels={{ play: common.watchVideo, close: common.close }} bare className="absolute inset-0 h-full rounded-none" sizes="(min-width: 1480px) 340px, (min-width: 1024px) 24vw, 50vw" />
                  ) : (
                    <Media id={rc.mediaId} locale={locale} cover sizes="(min-width: 1480px) 340px, (min-width: 1024px) 24vw, 50vw" />
                  )}
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] md:rounded-[22px] lg:aspect-auto">
                  <Media id={rc.secondMediaId} locale={locale} cover sizes="(min-width: 1480px) 340px, (min-width: 1024px) 24vw, 50vw" />
                </div>
              </div>
            </div>

            <div className="px-3 pb-6 pt-4 md:px-8 md:pb-8 lg:px-10 lg:pb-10 xl:px-12 xl:pb-12">
              {/* As sessões num seletor: a escolhida mostra o que inclui e passa para o botão do WhatsApp */}
              <RecoveryPlanner
                plans={rc.plans.map((pl) => ({ ...pl, message: msg.service(`${rc.waTopic} (${pl.name})`) }))}
                parts={rc.parts}
                plansTitle={rc.plansTitle}
                partsTitle={rc.partsTitle}
                labels={rc.planner}
                waLocation={waLocation}
              />
            </div>
          </article>
        </div>
      </section>

      {/* 3. Desporto (escondido com `hidden` enquanto não houver fotos próprias) */}
      {!sport.hidden && (
      <section id={sport.id} aria-labelledby={`${sport.id}-title`} className="bg-white pb-20 md:pb-36">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
            <h2 id={`${sport.id}-title`} data-reveal className="t-display lg:col-span-6">
              {sport.title}
            </h2>
            <p data-reveal className="max-w-[38ch] text-lg leading-relaxed text-ink lg:col-span-4 lg:col-start-9">
              {sport.intro}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
            {sport.items.map((it, i) => (
              <article key={it.id} id={it.id} data-reveal style={{ "--d": i } as React.CSSProperties} className="overflow-hidden rounded-[var(--radius-img)] bg-mist">
                <div className="relative aspect-[3/2] overflow-hidden bg-ice">
                  <Media id={it.mediaId} locale={locale} cover sizes="(min-width: 1480px) 690px, (min-width: 768px) 48vw, 100vw" />
                </div>
                <div className="p-6 md:p-8 lg:p-10">
                  <h3 className="font-display text-[clamp(1.6rem,1.25rem+1vw,2.2rem)] leading-[1.08] tracking-[-0.02em] text-ink">{it.title}</h3>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-ink">{it.text}</p>
                  <ul className="mt-6 space-y-2.5">
                    {it.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed text-ink">
                        <Check aria-hidden className="mt-1 size-[18px] shrink-0 text-teal" strokeWidth={2.25} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
