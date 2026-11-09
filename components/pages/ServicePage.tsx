import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { getDict } from "@/content";
import type { ServiceChapter, ServiceModule } from "@/content/pt";
import { href, serviceKeys, type Locale, type ServiceKey } from "@/lib/routes";
import { waLink, waMessages } from "@/lib/whatsapp";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { Breadcrumbs } from "../PageHero";
import { Media } from "../Media";
import { btn, WhatsAppButton } from "../Buttons";
import { WhatsAppIcon } from "../Icon";
import { JsonLd } from "../JsonLd";
import { DiastasisExplorer } from "../DiastasisExplorer";
import { RevealOnScroll } from "../RevealOnScroll";
import { ServiceAreas } from "../ServiceAreas";
import { ChapterBlock, RecoveryPanel, ServiceAbout } from "../ServiceChapters";
import { ZoneGuide, type Zone } from "../ZoneGuide";
import { TreatmentBlocks } from "../TreatmentBlocks";
import { CareGuide } from "../CareGuide";

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
 * Página de cada serviço, completa e feita de fotos dos tratamentos:
 * o nome em cartaz e uma frase → uma foto do serviço, larga → o que é o serviço →
 * (musculoesquelética) o tratamento zona a zona · (dermatofuncional) as situações e o esquema da diástase →
 * (com `page.areas`) as duas áreas da clínica em painéis com foto → os capítulos do serviço (a crioterapia num painel teal) →
 * o percurso em quatro frases → quem acompanha → perguntas fechadas → o outro serviço.
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
  const specialist = t.team.find((m) => m.media === s.specialist);
  const chapters: (ServiceChapter | ServiceModule)[] = p.chapters ?? s.modules?.filter((m) => !m.noChapter) ?? [];
  const conditionsTitle = s.forWho.title.split(" ");
  // Índice do topo: os capítulos, pela ordem da página (a diástase vem antes deles)
  const tr = p.treatments;
  const care = p.care;
  const diastasisLink = s.explainer ? [{ href: "#diastase", label: s.explainer.nav }] : [];
  const links = care
    ? [
        ...diastasisLink,
        { href: "#tratamentos", label: care.nav },
        { href: "#como-funciona", label: sp.howNav },
        ...(s.faq.length > 0 ? [{ href: "#perguntas", label: sp.faqNav }] : []),
      ]
    : [
        ...diastasisLink,
        ...(tr
          ? [tr.techniques, tr.recovery, tr.sport].map((b) => ({ href: `#${b.id}`, label: b.nav }))
          : chapters.map((c) => ({ href: `#${c.id}`, label: c.nav }))),
      ];

  // Musculoesquelética: o tratamento por zona do corpo; cada zona abre o WhatsApp, e a de outro serviço leva à página dele
  const bm = t.home.bodyMap;
  const zones: Zone[] = bm.regions.map((r) => ({
    id: r.id,
    label: r.label,
    title: r.title,
    text: r.text,
    steps: r.steps ?? [],
    common: r.common,
    ...(r.service === service
      ? { wa: { href: waLink(msg.problem(r.waTopic)), location: `servico-${service}-zona-${r.id}` } }
      : { other: { href: href(locale, `service:${r.service}`), service: sp.areas.items[r.service].name } }),
  }));

  // Dermatofuncional: a tabela das `conditions`; cada linha abre o WhatsApp
  const rows: Row[] = (s.conditions ?? []).map((c) => ({
    main: c.label,
    sub: c.common.join(", "),
    action: { href: waLink(msg.problem(c.waTopic)), label: sp.write, wa: `servico-${service}-zona-${c.id}` },
  }));
  const conditionList = (
    <ul>
      {rows.map((row, i) => (
        <li key={`${row.main}-${row.sub}`} data-reveal style={{ "--d": i } as React.CSSProperties}>
          <ConditionRow row={row} />
        </li>
      ))}
    </ul>
  );

  // As duas áreas: abre na do serviço da página (com o botão de marcar); a outra leva à sua página
  const areas = serviceKeys.map((k) => {
    const a = sp.areas.items[k];
    return {
      key: k,
      name: a.name,
      what: a.what,
      treats: a.treats,
      by: a.by,
      photo: <Media key={k} id={a.mediaId} locale={locale} cover sizes="(min-width: 1480px) 900px, (min-width: 1024px) 64vw, 100vw" />,
      action:
        k === service ? (
          <WhatsAppButton key={k} message={wa} location={`servico-${service}-areas`} label={t.common.whatsappCta} />
        ) : (
          <Link key={k} href={href(locale, `service:${k}`)} className={cn(btn.onDark, "group/link")}>
            {sp.seeService}
            <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        ),
    };
  });

  // As duas áreas da clínica: painéis com foto, um aberto e o outro fechado; tocar no fechado troca-os.
  // Na musculoesquelética vem a seguir à faixa mist do tratamento por zona (por isso tem espaço em cima); na
  // dermatofuncional (`care`) vem depois do guia dos tratamentos, para não os adiar.
  const areasSection = p.areas && (
    <section id="areas" aria-labelledby="areas-title" className={cn("bg-white pb-24 md:pb-36", s.bodyMap && "pt-24 md:pt-36")}>
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <h2 id="areas-title" data-reveal className="t-display lg:col-span-6">
            {sp.areas.title}
          </h2>
          <p data-reveal className="max-w-[38ch] text-lg leading-relaxed text-ink lg:col-span-4 lg:col-start-9">
            {sp.areas.intro}
          </p>
        </div>
        <div data-reveal className="mt-12 md:mt-16">
          <ServiceAreas areas={areas} initial={serviceKeys.indexOf(service)} eyebrow={sp.areas.eyebrow} treatsLabel={sp.areas.treats} />
        </div>
      </div>
    </section>
  );

  // Dermatofuncional: o esquema da diástase por fases e, por baixo, como é avaliada
  const diastasis = s.explainer && (
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
        <div data-reveal className="mt-16 md:mt-24">
          <h3 className="t-statement">{s.explainer.assessTitle}</h3>
          <ul className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            {s.explainer.assess.map((a) => (
              <li key={a} className="flex gap-3">
                <Check aria-hidden className="mt-1 size-5 shrink-0 text-teal" strokeWidth={2.25} />
                <p className="leading-relaxed text-ink">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );

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

      {/* O nome em cartaz e uma frase; a foto do serviço abre larga por baixo. Com `heroBeside` (dermatofuncional), a
          foto fica inteira, sem recorte nem deriva: por baixo da frase em telemóvel e, a partir de 1024 px, numa coluna
          à direita, com o título assente no fundo da foto. Sem botões no topo: o contacto fica no header e na barra fixa. */}
      <section className="bg-white pb-24 pt-6 md:pb-36 md:pt-10">
        {!p.heroBeside ? (
          <div className="container-x">
            <div className="svc-in">
              <Breadcrumbs crumbs={crumbs} />
              <h1 className="t-poster mt-10 md:mt-16" style={{ "--i": 1 } as React.CSSProperties}>
                {s.heroTitle}
              </h1>
              <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink md:mt-12 md:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
                {p.lead}
              </p>
            </div>
            <div className="svc-shutter relative mt-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-img)] bg-ice md:mt-16 md:aspect-[2/1]">
              <div className="svc-settle absolute inset-0">
                <div className="svc-drift absolute inset-0">
                  <Media id={p.heroWide} locale={locale} cover priority sizes="(min-width: 1480px) 1400px, 100vw" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-x grid gap-12 md:gap-16 lg:grid-cols-12 lg:gap-x-6">
            <div className="svc-in flex flex-col lg:col-span-8">
              <Breadcrumbs crumbs={crumbs} />
              {/* O título mede-se pela coluna (cqi), para a palavra mais longa caber inteira ao lado da foto */}
              <div className="mt-10 md:mt-16 lg:mt-auto lg:pt-16 lg:[container-type:inline-size]" style={{ "--i": 1 } as React.CSSProperties}>
                <h1 className="t-poster lg:text-[min(11.5cqi,9.25rem)]">{s.heroTitle}</h1>
                <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink md:mt-10 md:text-xl">{p.lead}</p>
              </div>
            </div>
            <div className="svc-shutter relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-img)] bg-ice sm:max-w-[28rem] lg:col-span-4 lg:max-w-none">
              <div className="svc-settle absolute inset-0">
                <Media id={p.heroWide} locale={locale} cover priority sizes="(min-width: 1480px) 460px, (min-width: 1024px) 31vw, (min-width: 640px) 448px, 100vw" />
              </div>
            </div>
          </div>
        )}
      </section>

      <ServiceAbout
        statement={p.about.statement}
        text={p.about.text}
        listTitle={p.about.listTitle}
        list={p.about.list ?? s.forWho.items}
        links={links}
        linksLabel={sp.onThisPage}
      />

      {/* Situações. Com o mapa do corpo (musculoesquelética): o tratamento zona a zona, numa faixa mist, com o título e
          a introdução por cima. Com foto (dermatofuncional): a foto à esquerda, da altura do bloco, e à direita o título
          e a tabela das situações; em telemóvel, título → foto → tabela. */}
      {(s.bodyMap || rows.length > 0) && (
      <section
        id="situacoes"
        aria-labelledby="situacoes-title"
        className={cn(s.bodyMap ? "bg-mist py-24 md:py-36" : "bg-white pb-24 md:pb-36")}
      >
        {s.bodyMap ? (
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
              <h2 id="situacoes-title" data-reveal className="t-display lg:col-span-6">
                {bm.title}
              </h2>
              <p data-reveal className="max-w-[38ch] text-lg leading-relaxed text-ink lg:col-span-4 lg:col-start-9">
                {bm.intro}
              </p>
            </div>
            <div data-reveal className="mt-12 md:mt-16">
              <ZoneGuide zones={zones} phases={bm.phases} listLabel={bm.listLabel} commonLabel={bm.commonLabel} talk={bm.talk} />
            </div>
          </div>
        ) : (
          // A foto é mais alta do que o texto: a sobra vai para a 2.ª linha, e a tabela fica logo a seguir à introdução
          <div className="container-x grid gap-10 md:gap-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-10">
            <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
              <h2 id="situacoes-title" data-reveal className="t-display">
                <span className="block">{conditionsTitle.slice(0, -1).join(" ")}</span>
                <span className="block">{conditionsTitle.at(-1)}</span>
              </h2>
              <p data-reveal className="mt-6 max-w-[38ch] text-lg leading-relaxed text-ink">
                {s.forWho.intro}
              </p>
            </div>
            {p.conditionsPhoto && (
              <div
                data-reveal
                className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-img)] bg-ice sm:max-w-[28rem] lg:sticky lg:top-28 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-start"
              >
                <Media id={p.conditionsPhoto} locale={locale} cover sizes="(min-width: 1480px) 560px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw" />
              </div>
            )}
            <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2">{conditionList}</div>
          </div>
        )}
      </section>
      )}

      {!care && areasSection}

      {/* Dermatofuncional: o esquema da diástase por fases e, por baixo, como é avaliada (antes do guia dos tratamentos) */}
      {diastasis}

      {/* Os capítulos do serviço: foto e texto, com os lados a alternar; o capítulo com `panel` (a crioterapia) vai num painel teal */}
      {/* Musculoesquelética: os tratamentos enviados pelo cliente, em três blocos, no lugar dos capítulos */}
      {tr && <TreatmentBlocks data={tr} locale={locale} waMessage={msg.service(tr.recovery.waTopic)} waLocation={`servico-${service}-recovery`} />}

      {/* Dermatofuncional: os tratamentos enviados pelo cliente, em blocos, com o esquema da diástase a seguir ao pós-parto */}
      {/* Dermatofuncional: os tratamentos enviados pelo cliente, num guia interativo (índice e painel, como o tratamento
          por zona da musculoesquelética). Fundo branco com o painel mist, porque o esquema da diástase, antes, é mist. */}
      {care && (
        <section id="tratamentos" aria-labelledby="tratamentos-title" className="bg-white py-24 md:py-36">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
              <h2 id="tratamentos-title" data-reveal className="t-display lg:col-span-6">
                {care.title}
              </h2>
              <p data-reveal className="max-w-[38ch] text-lg leading-relaxed text-ink lg:col-span-4 lg:col-start-9">
                {care.intro}
              </p>
            </div>
            <div data-reveal className="mt-12 md:mt-16">
              <CareGuide guide={care} service={service} waTemplate={t.wa.service} />
            </div>
          </div>
        </section>
      )}
      {care && areasSection}

      {!tr && !care && s.includes && chapters.length > 0 && (
        <section id="espaco" aria-labelledby="espaco-title" className={cn("bg-white pb-24 md:pb-36", s.explainer && "pt-24 md:pt-36")}>
          <div className="container-x">
            <h2 id="espaco-title" data-reveal className="t-statement text-muted">
              {s.includes.title}
            </h2>
            <p data-reveal className="mt-3 max-w-[52ch] leading-relaxed text-grey">
              {s.includes.intro}
            </p>
            <div className="mt-12 space-y-24 md:mt-20 md:space-y-36">
              {chapters.map((c, i) =>
                "panel" in c && c.panel ? (
                  <RecoveryPanel key={c.id} module={c} locale={locale} waMessage={msg.service(c.panel.waTopic)} waLocation={`servico-${service}-${c.id}`} />
                ) : (
                  <ChapterBlock key={c.id} chapter={c} locale={locale} flip={i % 2 === 1} />
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* Percurso: uma frase por fase, em escada, com a explicação e o que inclui; a duração fica no canto livre da escada */}
      <section id="como-funciona" aria-labelledby="percurso-title" className="bg-mist py-24 md:py-36">
        <div className="container-x">
          <h2 id="percurso-title" data-reveal className="t-statement text-muted">
            {s.how.title}
          </h2>
          {s.how.intro && (
            <p data-reveal className="mt-3 max-w-[52ch] leading-relaxed text-grey">
              {s.how.intro}
            </p>
          )}
          <div className="mt-12 grid gap-12 md:mt-20 md:gap-14 lg:grid-cols-12 lg:gap-x-6">
            <ol className="contents">
              {s.how.steps.map((st, i) => (
                <li
                  key={st.title}
                  data-reveal
                  style={{ "--d": i, paddingInlineStart: `calc(${i} * 6vw)` } as React.CSSProperties}
                  className={cn("lg:col-end-13 lg:!ps-0", stairs[i])}
                >
                  <h3 className={cn("t-display", i === s.how.steps.length - 1 && "text-teal-strong")}>{st.line}</h3>
                  {st.details ? (
                    <ul className="mt-4 max-w-[46ch] space-y-2">
                      {st.details.map((d) => (
                        <li key={d} className="flex gap-3 text-lg leading-relaxed text-ink">
                          <Check aria-hidden className="mt-1.5 size-[18px] shrink-0 text-teal" strokeWidth={2.25} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 max-w-[42ch] text-lg leading-relaxed text-ink">{st.text}</p>
                  )}
                </li>
              ))}
            </ol>
            {s.duration.text && (
              <div data-reveal className="lg:col-span-5 lg:col-start-1 lg:row-start-4 lg:self-end">
                <h3 className="t-h3">{s.duration.title}</h3>
                <p className="mt-2 max-w-[42ch] leading-relaxed text-grey">{s.duration.text}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quem acompanha: o retrato grande e, ao lado, o nome e uma frase */}
      {specialist && (
        <section id="fisioterapeuta" aria-labelledby="pessoa-title" className="bg-white py-24 md:py-36">
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

      {/* O outro serviço: um cartão com a foto de um tratamento dessa área, o nome e o que trata.
          Telemóvel: foto 4:5 em cima, texto no teal por baixo. A partir de 768 px: texto à esquerda e a foto à direita,
          vertical (5 de 12 colunas), para se ver a cena inteira (as fotos são 3:4). */}
      <section aria-labelledby="related-title" className="bg-white pb-24 md:pb-36">
        <div className="container-x">
          <h2 id="related-title" data-reveal className="t-statement text-muted">
            {sp.related}
          </h2>
          {s.related.map((k) => {
            const r = t.services[k];
            const a = sp.areas.items[k];
            return (
              // `data-reveal` num invólucro: no próprio cartão, a transição da entrada ganharia à de levantar
              <div key={k} data-reveal className="mt-8 md:mt-10">
                <Link
                  href={href(locale, `service:${k}`)}
                  className="on-dark card-hover card-lift group grid overflow-hidden rounded-[var(--radius-img)] bg-panel text-white md:grid-cols-12"
                >
                  <div className="card-photo relative aspect-[4/5] overflow-hidden md:order-2 md:col-span-5 md:aspect-auto md:min-h-[30rem] lg:min-h-[40rem]">
                    <Media id={r.page.relatedPhoto} locale={locale} cover quality={90} sizes="(min-width: 1480px) 580px, (min-width: 768px) 42vw, 100vw" />
                  </div>
                  <div className="flex flex-col justify-end p-6 md:col-span-7 md:p-10 lg:p-12">
                    <h3 className="font-display text-[clamp(2rem,1.2rem+2vw,3rem)] leading-[1.02] tracking-[-0.03em]">
                      <span className="card-title">{r.name}</span>
                    </h3>
                    <p className="mt-5 max-w-[34ch] text-lg leading-relaxed text-white/90">{a.what}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {a.treats.map((item) => (
                        <li key={item} className="rounded-full bg-white/15 px-3.5 py-1.5 text-[15px]">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <span className={cn(btn.onPanel, "group-hover:bg-white group-hover:text-teal-dark")}>
                        {sp.seeService}
                        <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="text-[15px] text-white/85">{a.by}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
