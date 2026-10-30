import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { getDict } from "@/content";
import { media, videoFor } from "@/content/media";
import { fullAddress, site } from "@/content/site";
import { href, type Locale, type ServiceKey } from "@/lib/routes";
import { waLink, waMessages } from "@/lib/whatsapp";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { Breadcrumbs } from "../PageHero";
import { Media } from "../Media";
import { CallButton, WhatsAppButton } from "../Buttons";
import { WhatsAppIcon } from "../Icon";
import { JsonLd } from "../JsonLd";
import { VideoButton } from "../VideoCard";
import { DiastasisExplorer } from "../DiastasisExplorer";
import { Composer } from "../Composer";
import { RevealOnScroll } from "../RevealOnScroll";

type Row = { main: string; sub: string; action?: { href: string; label: string; wa?: string } };

/** Linha da lista de situações: só espaço entre linhas; as que têm ação são um link inteiro. */
function ConditionRow({ row }: { row: Row }) {
  const cells = (
    <>
      <span className="col-start-1 row-start-1 font-medium text-ink">{row.main}</span>
      <span className="col-span-2 row-start-2 text-grey sm:col-span-1 sm:col-start-2 sm:row-start-1">{row.sub}</span>
      {row.action && (
        <span className="col-start-2 row-start-1 inline-flex items-center gap-1.5 justify-self-end whitespace-nowrap text-[15px] font-semibold text-teal-strong sm:col-start-3">
          {row.action.wa && <WhatsAppIcon className="size-4 shrink-0" />}
          {row.action.label}
          <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}
    </>
  );
  const grid = "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)_7.5rem]";
  if (!row.action) return <div className={grid}>{cells}</div>;
  const link = cn(grid, "group -mx-3 rounded-[14px] px-3 transition-colors hover:bg-mist");
  return row.action.wa ? (
    <a href={row.action.href} target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location={row.action.wa} className={link}>
      {cells}
    </a>
  ) : (
    <Link href={row.action.href} className={link}>
      {cells}
    </Link>
  );
}

/** Escada de frases do percurso: cada fase começa duas colunas mais à direita. */
const stairs = ["lg:col-start-1", "lg:col-start-3", "lg:col-start-5", "lg:col-start-7"];

/**
 * Página de cada serviço, curta e feita de fotos dos tratamentos:
 * o nome em cartaz com uma foto do serviço no lugar de uma palavra → outra foto do serviço, larga → situações →
 * (musculoesquelética) os três recursos, só com foto, nome e uma linha · (dermatofuncional) o esquema da diástase →
 * o percurso em quatro frases → quem acompanha → (musculoesquelética) a frase do mural → perguntas fechadas →
 * o outro serviço → a mensagem de WhatsApp montada pelo visitante.
 */
export function ServicePage({ locale, service }: { locale: Locale; service: ServiceKey }) {
  const t = getDict(locale);
  const s = t.services[service];
  const sp = t.servicePage;
  const p = s.page;
  const msg = waMessages(t);
  const wa = msg.service(s.name);
  const url = href(locale, `service:${service}`);
  const crumbs = [
    { name: t.common.home, href: href(locale, "home") },
    { name: t.nav.services, href: href(locale, "services") },
    { name: s.name, href: url },
  ];
  const [titleFirst, ...titleRest] = s.heroTitle.split(" ");
  const slot = media[p.heroSlot];
  const specialist = t.team.find((m) => m.media === s.specialist);
  const modules = s.modules ?? [];
  const videoLabels = { play: t.common.watchVideo, close: t.common.close };
  const conditionsTitle = s.forWho.title.split(" ");
  const hours = `${t.hours.weekdays}, ${site.hours[0].opens.replace(":", "h")}–${site.hours[0].closes.replace(":", "h")}`;
  // Tons alternados: o percurso fica claro quando vem a seguir ao esquema da diástase (mist)
  const stepsTone = s.explainer ? "bg-white" : "bg-mist";
  const personTone = s.explainer ? "bg-mist" : "bg-white";

  // Situações: na musculoesquelética, as zonas do corpo (cada uma abre o WhatsApp); na dermatofuncional, as indicações
  const rows: Row[] = s.bodyMap
    ? t.home.bodyMap.regions.map((r) => ({
        main: r.label,
        sub: r.common.join(", "),
        action:
          r.service === service
            ? { href: waLink(msg.problem(r.waTopic)), label: sp.write, wa: `servico-${service}-zona-${r.id}` }
            : { href: href(locale, `service:${r.service}`), label: sp.seeService },
      }))
    : s.forWho.items.map((i) => ({ main: i.title, sub: i.text }));

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(locale, s.name, s.meta.description, url),
          faqJsonLd(s.faq),
          breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href }))),
        ]}
      />
      <RevealOnScroll />

      {/* O nome em cartaz, com uma foto do serviço no lugar de uma palavra; outra foto do serviço abre larga por baixo */}
      <section className="bg-white pb-24 pt-6 md:pb-36 md:pt-10">
        <div className="container-x">
          <div className="svc-in">
            <Breadcrumbs crumbs={crumbs} />
            <h1 className="t-poster mt-10 md:mt-16" style={{ "--i": 1 } as React.CSSProperties}>
              {titleFirst}{" "}
              {slot?.src && (
                <span aria-hidden className="t-slot bg-ice">
                  <Image src={slot.src} alt="" fill priority sizes="(min-width: 640px) 320px, 100vw" className="object-cover" style={{ objectPosition: slot.position }} />
                </span>
              )}{" "}
              {titleRest.join(" ")}
            </h1>
            <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-12 lg:items-end lg:gap-x-6" style={{ "--i": 2 } as React.CSSProperties}>
              <p className="max-w-[34rem] text-lg leading-relaxed text-ink md:text-xl lg:col-span-7">{p.lead}</p>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <WhatsAppButton message={wa} location={`servico-${service}`} label={t.common.whatsappCta} />
                <CallButton location={`servico-${service}`} label={t.common.phoneDisplay} note={t.common.phoneNote} />
              </div>
            </div>
          </div>
          <div className="svc-shutter relative mt-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-ice md:mt-16 md:aspect-[2/1]">
            <div className="svc-settle absolute inset-0">
              <div className="svc-drift absolute inset-0">
                <Media id={p.heroWide} locale={locale} cover priority sizes="(min-width: 1480px) 1400px, 100vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Situações: título e introdução à esquerda, a lista à direita */}
      <section id="situacoes" aria-labelledby="situacoes-title" className="bg-white pb-24 md:pb-36">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <h2 id="situacoes-title" data-reveal className="t-display">
              <span className="block">{conditionsTitle.slice(0, -1).join(" ")}</span>
              <span className="block">{conditionsTitle.at(-1)}</span>
            </h2>
            <p data-reveal className="mt-6 max-w-[34ch] text-lg leading-relaxed text-ink">
              {s.forWho.intro}
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:pt-3">
            <ul>
              {rows.map((row, i) => (
                <li key={`${row.main}-${row.sub}`} data-reveal style={{ "--d": i } as React.CSSProperties}>
                  <ConditionRow row={row} />
                </li>
              ))}
            </ul>
            {/* Com poucas linhas (dermatofuncional), uma foto do serviço por baixo, encostada à direita */}
            {p.conditionsPhoto && (
              <div data-reveal className="relative ml-auto mt-10 aspect-[4/5] w-[70%] overflow-hidden rounded-[var(--radius-img)] bg-ice sm:w-1/2">
                <Media id={p.conditionsPhoto} locale={locale} cover sizes="(min-width: 1024px) 28vw, 70vw" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Musculoesquelética: os três recursos, cada um com a sua foto, o nome e uma linha */}
      {s.includes && modules.length > 0 && (
        <section id="espaco" aria-labelledby="espaco-title" className="bg-white pb-24 md:pb-36">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
              <h2 id="espaco-title" data-reveal className="t-display lg:col-span-6">
                {s.includes.title}
              </h2>
              <p data-reveal className="max-w-[38ch] text-lg leading-relaxed text-ink lg:col-span-4 lg:col-start-9">
                {s.includes.intro}
              </p>
            </div>
            <div className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-6 md:mt-16 lg:gap-x-8">
              {modules.map((m, i) => (
                <article key={m.id} id={m.id} aria-labelledby={`${m.id}-title`} data-reveal style={{ "--d": i } as React.CSSProperties}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-ice sm:aspect-[4/5]">
                    <Media id={m.mediaId} locale={locale} cover sizes="(min-width: 640px) 33vw, 100vw" />
                  </div>
                  <h3 id={`${m.id}-title`} className="t-statement mt-6">
                    {m.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-grey">{m.summary}</p>
                  {m.note && <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.note}</p>}
                  {m.video && <VideoButton className="mt-5" video={videoFor(m.video, locale)} label={videoFor(m.video, locale).name} labels={videoLabels} />}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dermatofuncional: o esquema da diástase por fases */}
      {s.explainer && (
        <section id="diastase" aria-labelledby="diastase-title" className="bg-mist py-24 md:py-36">
          <div className="container-x">
            <DiastasisExplorer
              stages={s.explainer.stages}
              stagesLabel={s.explainer.stagesLabel}
              legend={s.explainer.legend}
              header={
                <div>
                  <h2 id="diastase-title" className="t-display">
                    {s.explainer.title}
                  </h2>
                  <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink">{s.explainer.intro}</p>
                </div>
              }
            />
          </div>
        </section>
      )}

      {/* Percurso: uma frase por fase, em escada, com uma linha de explicação */}
      <section id="como-funciona" aria-labelledby="percurso-title" className={cn("py-24 md:py-36", stepsTone)}>
        <div className="container-x">
          <h2 id="percurso-title" data-reveal className="t-statement text-muted">
            {s.how.title}
          </h2>
          <ol className="mt-12 grid gap-12 md:mt-20 md:gap-14 lg:grid-cols-12 lg:gap-x-6">
            {s.how.steps.map((st, i) => (
              <li
                key={st.title}
                data-reveal
                style={{ "--d": i, paddingInlineStart: `calc(${i} * 6vw)` } as React.CSSProperties}
                className={cn("lg:col-end-13 lg:!ps-0", stairs[i])}
              >
                <h3 className={cn("t-display", i === s.how.steps.length - 1 && "text-teal-strong")}>{st.line}</h3>
                <p className="mt-3 max-w-[38ch] leading-relaxed text-grey">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quem acompanha: o retrato grande e, ao lado, o nome e uma frase */}
      {specialist && (
        <section id="fisioterapeuta" aria-labelledby="pessoa-title" className={cn("py-24 md:py-36", personTone)}>
          <div className="container-x grid items-center gap-10 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-cols-12 lg:gap-x-6">
            <div data-reveal className="relative aspect-[4/5] w-[75%] overflow-hidden rounded-[var(--radius-img)] bg-ice sm:w-full lg:col-span-4 lg:col-start-2">
              <Media id={specialist.media} locale={locale} cover sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 75vw" />
            </div>
            <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className="lg:col-span-5 lg:col-start-7">
              <h2 id="pessoa-title" className="t-display">
                {specialist.name}
              </h2>
              <p className="mt-3 text-lg font-medium text-teal-strong">{specialist.role}</p>
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-ink">
                {specialist.name} {p.person.bio}
              </p>
              <Link href={`${href(locale, "about")}#equipa`} className="link mt-8 inline-flex min-h-11 items-center">
                {sp.meetTeam}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* A frase do mural da entrada, espalhada de margem a margem */}
      {p.motto && (
        <figure className="bg-ice py-28 md:py-36">
          {/* Duas linhas com as palavras encostadas às margens; a entrelinha larga faz das distâncias pausas */}
          <blockquote className="container-x font-display text-[clamp(1.5rem,7vw,3.4rem)] font-medium leading-[1.45] tracking-[-0.04em] text-teal-dark md:text-[min(7vw,7.5rem)]">
            <p>
              {p.motto.lines.map((words) => (
                <span key={words.join(" ")} className="block text-justify [text-align-last:justify]">
                  {words.join(" ")}
                </span>
              ))}
            </p>
          </blockquote>
          <figcaption className="container-x mt-12 flex flex-col gap-1 text-[15px] text-teal-dark md:mt-16 md:flex-row md:justify-between md:text-lg">
            <span>{p.motto.by[0]}</span>
            <span className="self-center md:self-auto">{p.motto.by[1]}</span>
            <span className="self-end md:self-auto">{p.motto.by[2]}</span>
          </figcaption>
        </figure>
      )}

      {/* Perguntas: só as perguntas à vista; a resposta abre ao tocar */}
      {s.faq.length > 0 && (
        <section id="perguntas" aria-labelledby="faq-title" className="bg-white py-24 md:py-36">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-x-6">
            <h2 id="faq-title" data-reveal className="t-statement text-muted lg:col-span-4">
              {sp.faq}
            </h2>
            <div data-reveal className="space-y-2 lg:col-span-8">
              {s.faq.map((f) => (
                <details key={f.q} className="group rounded-[18px] transition-colors open:bg-mist hover:bg-mist">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 px-4 py-4 md:px-6">
                    <span className="font-display text-xl leading-snug tracking-[-0.015em] text-ink md:text-2xl">{f.q}</span>
                    <Plus aria-hidden className="size-6 shrink-0 text-teal-strong transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-[60ch] px-4 pb-6 leading-relaxed text-ink md:px-6">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* O outro serviço: só o nome, grande */}
      <section aria-labelledby="related-title" className="bg-white pb-24 md:pb-36">
        <div className="container-x grid gap-4 lg:grid-cols-12 lg:items-baseline lg:gap-x-6">
          <h2 id="related-title" className="t-statement text-muted lg:col-span-4">
            {sp.related}
          </h2>
          {s.related.map((k) => (
            <Link key={k} href={href(locale, `service:${k}`)} data-reveal className="group inline-flex items-baseline gap-3 lg:col-span-8">
              <span className="t-display text-ink transition-colors group-hover:text-teal-strong">{t.services[k].name}</span>
              <ArrowRight aria-hidden className="size-7 shrink-0 self-center text-teal-strong transition-transform duration-300 group-hover:translate-x-1.5 md:size-9" />
            </Link>
          ))}
        </div>
      </section>

      <Composer
        copy={p.composer}
        question={sp.question}
        location={`servico-${service}-mensagem`}
        labels={{
          send: sp.send,
          or: sp.or,
          phone: `${t.common.call} ${t.common.phoneDisplay}`,
          phoneNote: t.common.phoneNote,
          visit: `${fullAddress} · ${hours}`,
        }}
      />
    </>
  );
}
