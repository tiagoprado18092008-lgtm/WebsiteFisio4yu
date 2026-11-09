import { Check } from "lucide-react";
import type { TreatmentBlocks as Blocks } from "@/content/pt";
import type { Locale } from "@/lib/routes";
import { WhatsAppButton } from "./Buttons";
import { Media } from "./Media";
import { getDict } from "@/content";
import { videoFor } from "@/content/media";
import { VideoCard } from "./VideoCard";

/**
 * Os tratamentos da musculoesquelética, em três blocos com ritmos diferentes, para a página não ficar num só bloco de texto:
 * 1. Técnicas: a foto de um tratamento presa ao topo à esquerda e, à direita, uma lista com filetes (nome, uma frase e onde se usa).
 * 2. Sessão Recovery: painel teal com as duas fotos (banheira de gelo e pressoterapia), os quatro planos em cartões
 *    com o que cada um inclui, as técnicas numa grelha curta e os benefícios em etiquetas.
 * 3. Desporto: dois cartões mist com foto, lado a lado (o percurso, a seguir, já é uma faixa mist).
 */
export function TreatmentBlocks({ data, locale, waMessage, waLocation }: { data: Blocks; locale: Locale; waMessage: string; waLocation: string }) {
  const { techniques: tq, recovery: rc, sport } = data;
  const common = getDict(locale).common;
  const video = rc.video ? videoFor(rc.video, locale) : null;
  const partName = (k: string) => rc.parts.find((p) => p.key === k)?.title ?? k;

  return (
    <>
      {/* 1. Técnicas */}
      <section id={tq.id} aria-labelledby={`${tq.id}-title`} className="bg-white pb-24 md:pb-36">
        <div className="container-x grid gap-10 md:gap-14 lg:grid-cols-12 lg:gap-x-6">
          <div data-reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <h2 id={`${tq.id}-title`} className="t-display">
              {tq.title}
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-ink">{tq.intro}</p>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[var(--radius-img)] bg-ice sm:max-w-[28rem] lg:max-w-none">
              <Media id={tq.mediaId} locale={locale} cover sizes="(min-width: 1480px) 560px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="divide-y divide-line border-y border-line">
              {tq.items.map((it, i) => (
                <li key={it.id} id={it.id} data-reveal style={{ "--d": i } as React.CSSProperties} className="grid gap-x-6 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] md:py-10">
                  <span aria-hidden className="font-display text-lg tabular-nums text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] leading-[1.1] tracking-[-0.02em] text-ink">{it.name}</h3>
                    {it.full && <p className="mt-1.5 text-[15px] text-muted">{it.full}</p>}
                    <p className="mt-4 max-w-[52ch] leading-relaxed text-ink">{it.text}</p>
                    <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.06em] text-muted">{tq.usesLabel}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
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
        </div>
      </section>

      {/* 2. Sessão Recovery */}
      <section aria-labelledby={`${rc.id}-title`} className="bg-white pb-24 md:pb-36">
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
              <h3 className="t-h3">{rc.plansTitle}</h3>
              <ul className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                {rc.plans.map((pl) => (
                  <li key={pl.name} className="flex flex-col rounded-[16px] bg-white p-4 text-ink sm:rounded-[18px] md:p-6">
                    <p className="font-display text-[1.15rem] leading-tight tracking-[-0.015em] sm:text-[1.45rem]">{pl.name}</p>
                    <ul className="mt-4 space-y-2 border-t border-line pt-4 sm:mt-5 sm:space-y-2.5 sm:pt-5">
                      {pl.parts.map((k) => (
                        <li key={k} className="flex gap-2 text-[14px] leading-snug sm:gap-2.5 sm:text-[15px]">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={2.5} />
                          {partName(k)}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <h3 className="t-h3 mt-12">{rc.partsTitle}</h3>
              <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {rc.parts.map((p) => (
                  <div key={p.key}>
                    <dt className="font-medium">{p.title}</dt>
                    <dd className="mt-1 leading-relaxed text-white/85">{p.text}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 md:mt-12">
                <WhatsAppButton message={waMessage} location={waLocation} label={rc.cta} />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. Desporto */}
      <section id={sport.id} aria-labelledby={`${sport.id}-title`} className="bg-white pb-24 md:pb-36">
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
    </>
  );
}
