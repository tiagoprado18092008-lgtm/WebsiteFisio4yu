import { Check } from "lucide-react";
import { getDict } from "@/content";
import type { ServiceChapter, ServiceModule } from "@/content/pt";
import { videoFor } from "@/content/media";
import type { Locale } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { WhatsAppButton } from "./Buttons";
import { Media } from "./Media";
import { VideoButton } from "./VideoCard";

/**
 * Lista com visto: título e uma frase; em duas colunas a partir de 640 px, e com um número ímpar de itens o último
 * ocupa a linha toda. Em superfícies escuras (`onDark`), tudo a branco.
 */
function CheckList({ items, onDark }: { items: { title: string; text: string }[]; onDark?: boolean }) {
  return (
    <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
      {items.map((it) => (
        <li key={it.title} className="flex gap-3">
          <Check aria-hidden className={cn("mt-0.5 size-5 shrink-0", onDark ? "text-white" : "text-teal")} strokeWidth={2.25} />
          <div>
            <p className={cn("font-medium", onDark ? "text-white" : "text-ink")}>{it.title}</p>
            <p className={cn("mt-1 leading-relaxed", onDark ? "text-white/85" : "text-grey")}>{it.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * O que é o serviço, logo a seguir à foto do topo: uma frase grande com o nome a teal e, por baixo, os parágrafos e o
 * índice da página à esquerda e a lista com visto à direita.
 */
export function ServiceAbout({ statement, text, listTitle, list, links, linksLabel }: {
  statement: [string, string, string];
  text: string[];
  listTitle: string;
  list: { title: string; text: string }[];
  links: { href: string; label: string }[];
  linksLabel: string;
}) {
  return (
    <section id="sobre-o-servico" aria-labelledby="sobre-title" className="bg-white pb-24 md:pb-36">
      <div className="container-x">
        <h2 id="sobre-title" data-reveal className="t-display max-w-[26ch]">
          {statement[0]}
          <span className="text-teal-strong">{statement[1]}</span>
          {statement[2]}
        </h2>
        <div className="mt-12 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <div data-reveal className="lg:col-span-5">
            {text.map((p) => (
              <p key={p} className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink first:mt-0">
                {p}
              </p>
            ))}
            <nav aria-label={linksLabel} className="mt-8">
              <p className="text-[15px] font-medium text-muted">{linksLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="inline-flex min-h-11 items-center rounded-full bg-ice px-4 text-[15px] font-semibold text-teal-dark transition-colors hover:bg-[#d3e8ec]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className="lg:col-span-6 lg:col-start-7">
            <h3 className="t-statement">{listTitle}</h3>
            <div className="mt-8">
              <CheckList items={list} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Um capítulo do serviço. Com foto: foto 4:5 presa ao topo (`sticky`) e texto ao lado, com os lados trocados de um
 * capítulo para o seguinte (`flip`). Sem foto: o título à esquerda e o conteúdo à direita.
 */
export function ChapterBlock({ chapter, locale, flip }: { chapter: ServiceChapter; locale: Locale; flip?: boolean }) {
  const { id, title, text, mediaId, points, note } = chapter;
  const body = (
    <>
      <p className="max-w-[52ch] text-lg leading-relaxed text-ink">{text}</p>
      <div className="mt-8 md:mt-10">
        <CheckList items={points} />
      </div>
      {note && <p className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-muted">{note}</p>}
    </>
  );
  if (!mediaId) {
    return (
      <article id={id} aria-labelledby={`${id}-title`} className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
        <h3 id={`${id}-title`} data-reveal className="t-display lg:col-span-5">
          {title}
        </h3>
        <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className="lg:col-span-7">
          {body}
        </div>
      </article>
    );
  }
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="grid gap-8 md:gap-12 lg:grid-cols-12 lg:gap-x-6">
      <div
        data-reveal
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-img)] bg-ice sm:max-w-[28rem] lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none lg:self-start",
          flip && "lg:order-2 lg:col-start-8",
        )}
      >
        <Media id={mediaId} locale={locale} cover sizes="(min-width: 1480px) 560px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw" />
      </div>
      <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className={cn("lg:col-span-6 lg:self-center", flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7")}>
        <h3 id={`${id}-title`} className="t-display">
          {title}
        </h3>
        <div className="mt-6 md:mt-8">{body}</div>
      </div>
    </article>
  );
}

/**
 * A crioterapia em destaque: painel teal (o único do corpo da página), com o texto à esquerda e duas fotos à direita.
 * Em telemóvel: banheira de gelo → texto → pressoterapia. Termina a pedir a marcação, como os outros blocos teal.
 */
export function RecoveryPanel({ module: m, locale, waMessage, waLocation }: { module: ServiceModule; locale: Locale; waMessage: string; waLocation: string }) {
  const t = getDict(locale);
  const panel = m.panel;
  if (!panel || !m.mediaId) return null;
  const contra = m.items?.[0];
  const video = m.video ? videoFor(m.video, locale) : null;
  return (
    <article
      id={m.id}
      aria-labelledby={`${m.id}-title`}
      data-reveal
      className="on-dark grid gap-3 rounded-[28px] bg-panel p-3 text-white md:rounded-[34px] lg:grid-cols-12 lg:grid-rows-[3fr_2fr]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] sm:aspect-[4/3] md:rounded-[22px] lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:aspect-auto">
        <Media id={m.mediaId} locale={locale} cover sizes="(min-width: 1480px) 560px, (min-width: 1024px) 38vw, 100vw" />
      </div>

      <div className="px-3 py-6 md:p-8 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:p-10 xl:p-12">
        <h3 id={`${m.id}-title`} className="t-display">
          {m.title}
        </h3>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed md:mt-8">{m.text}</p>
        <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-white/90">{panel.moreText}</p>

        <h4 className="t-h3 mt-10 md:mt-12">{panel.sessionTitle}</h4>
        <ol className="mt-5 grid gap-6 sm:grid-cols-3">
          {panel.session.map((st) => (
            <li key={st.title}>
              <p className="font-medium">{st.title}</p>
              <p className="mt-1 leading-relaxed text-white/85">{st.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-8 md:mt-12">
          <div>
            <h4 className="t-h3">{panel.indicatedTitle}</h4>
            <ul className="mt-4 space-y-2.5">
              {panel.indicated.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {contra && (
            <div>
              <h4 className="t-h3">{contra.title}</h4>
              <p className="mt-4 leading-relaxed text-white/85">{contra.text}</p>
            </div>
          )}
        </div>

        <h4 className="t-h3 mt-10 md:mt-12">{panel.alsoTitle}</h4>
        <div className="mt-5">
          <CheckList items={m.points} onDark />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
          <WhatsAppButton message={waMessage} location={waLocation} label={panel.cta} />
          {video && <VideoButton video={video} label={video.name} labels={{ play: t.common.watchVideo, close: t.common.close }} />}
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] md:rounded-[22px] lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:aspect-auto">
        <Media id={panel.secondMediaId} locale={locale} cover sizes="(min-width: 1480px) 560px, (min-width: 1024px) 38vw, 100vw" />
      </div>
    </article>
  );
}
