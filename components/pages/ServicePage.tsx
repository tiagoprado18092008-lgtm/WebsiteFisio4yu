import Link from "next/link";
import { Snowflake } from "lucide-react";
import { getDict } from "@/content";
import { videoFor } from "@/content/media";
import { href, type Locale, type ServiceKey } from "@/lib/routes";
import { waLink, waMessages } from "@/lib/whatsapp";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { Section, SectionTitle } from "../Section";
import { ServiceHero } from "../ServiceHero";
import { Media } from "../Media";
import { JourneySteps } from "../JourneySteps";
import { Faq } from "../Faq";
import { CtaTriad } from "../CtaTriad";
import { CallButton, WhatsAppButton } from "../Buttons";
import { IconList, ServiceRow, TeamMember } from "../Cards";
import { JsonLd } from "../JsonLd";
import { SectionNav } from "../SectionNav";
import { VideoButton } from "../VideoCard";
import { BodyMap } from "../BodyMap";
import { DiastasisExplorer } from "../DiastasisExplorer";
import { SignsChecklist } from "../SignsChecklist";

/** Cor do hero de cada serviço: o desporto no teal escuro, o pós-parto num tom claro. */
const heroTone: Record<ServiceKey, "panel" | "ice"> = { msk: "panel", dermato: "ice" };

/**
 * Página de cada serviço. As secções próprias de cada um vêm do conteúdo:
 * musculoesquelética → mapa do corpo (`bodyMap`) e recursos (`modules`);
 * dermatofuncional → esquema da diástase (`explainer`) e lista de sinais (`signs`).
 */
export function ServicePage({ locale, service }: { locale: Locale; service: ServiceKey }) {
  const t = getDict(locale);
  const s = t.services[service];
  const sp = t.servicePage;
  const msg = waMessages(t);
  const wa = msg.service(s.name);
  const url = href(locale, `service:${service}`);
  const crumbs = [
    { name: t.common.home, href: href(locale, "home") },
    { name: t.nav.services, href: href(locale, "services") },
    { name: s.name, href: url },
  ];
  const modules = s.modules ?? [];
  const bm = t.home.bodyMap;
  const nav = [
    { id: "para-quem", label: sp.forWho },
    ...(s.bodyMap ? [{ id: "onde-doi", label: sp.where }] : []),
    ...(s.explainer ? [{ id: "diastase", label: s.explainer.nav }] : []),
    ...modules.map((m) => ({ id: m.id, label: m.nav })),
    ...(s.signs ? [{ id: "sinais", label: s.signs.nav }] : []),
    { id: "como-funciona", label: sp.how },
    { id: "perguntas", label: sp.faqShort },
  ];
  const videoLabels = { play: t.common.watchVideo, close: t.common.close };
  const specialist = t.team.find((m) => m.media === s.specialist);
  const specialistVideo = specialist?.video ? videoFor(specialist.video, locale) : null;
  const moduleNav = Object.fromEntries(modules.map((m) => [m.id, m.nav]));
  const dark = heroTone[service] === "panel";
  // Fundos alternados ao longo da página
  let n = 0;
  const tone = () => (n++ % 2 === 0 ? "light" : "mist") as "light" | "mist";

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(locale, s.name, s.meta.description, url),
          faqJsonLd(s.faq),
          breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href }))),
        ]}
      />
      <ServiceHero
        tone={heroTone[service]}
        crumbs={crumbs}
        title={s.heroTitle}
        sub={s.heroSub}
        facts={s.facts}
        actions={
          <>
            <WhatsAppButton message={wa} location={`servico-${service}`} label={t.common.whatsappCta} />
            <CallButton location={`servico-${service}`} label={t.common.phoneDisplay} note={t.common.phoneNote} variant={dark ? "onDark" : "outline"} />
          </>
        }
        media={<Media id={s.mediaId} locale={locale} cover priority sizes="(min-width: 1024px) 45vw, 100vw" />}
      />

      {/* Navegação interna fixa, com a secção visível marcada */}
      <SectionNav label={sp.onThisPage} items={nav} />

      {/* Para quem é */}
      <Section tone={tone()} id="para-quem" labelledBy="forwho">
        <SectionTitle title={s.forWho.title} intro={s.forWho.intro} id="forwho" />
        <div className="mt-12">
          <IconList items={s.forWho.items} cols={3} />
        </div>
      </Section>

      {/* Mapa do corpo: cada zona abre o WhatsApp já com a zona escrita */}
      {s.bodyMap && (
        <Section tone={tone()} id="onde-doi" labelledBy="onde-doi-title">
          <SectionTitle title={bm.title} intro={bm.intro} id="onde-doi-title" />
          <div className="mt-12 md:mt-16">
            <BodyMap
              initial="joelho"
              labels={{ list: bm.listLabel, common: bm.commonLabel, talk: bm.talk, see: bm.see }}
              regions={bm.regions.map((r) => ({
                id: r.id,
                x: r.x,
                y: r.y,
                label: r.label,
                title: r.title,
                text: r.text,
                common: r.common,
                waHref: waLink(msg.problem(r.waTopic)),
                // Zonas deste serviço levam à secção certa desta página; as outras, à página do outro serviço
                serviceHref: r.service === service ? `#${r.anchor ?? "como-funciona"}` : href(locale, `service:${r.service}`, r.anchor),
              }))}
            />
          </div>
          {modules.some((m) => m.id === "recuperacao") && (
            <p className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6 md:mt-16">
              <Snowflake className="size-5 shrink-0 text-teal-strong" aria-hidden />
              <span className="font-semibold">{bm.recovery.title}</span>
              <span className="text-grey">{bm.recovery.text}</span>
              <Link href="#recuperacao" className="link inline-flex min-h-11 items-center">
                {bm.recovery.link}
              </Link>
            </p>
          )}
        </Section>
      )}

      {/* Diástase abdominal: esquema por fases + como avaliamos */}
      {s.explainer && (
        <Section tone={tone()} id="diastase" labelledBy="diastase-title">
          <DiastasisExplorer
            stages={s.explainer.stages}
            stagesLabel={s.explainer.stagesLabel}
            legend={s.explainer.legend}
            header={<SectionTitle title={s.explainer.title} intro={s.explainer.intro} id="diastase-title" />}
            footer={
              <div className="border-t border-line pt-8">
                <h3 className="t-h3">{s.explainer.assessTitle}</h3>
                <ul className="mt-4 space-y-3">
                  {s.explainer.assess.map((a) => (
                    <li key={a} className="flex gap-3 text-grey">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal-strong" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        </Section>
      )}

      {/* Recursos incluídos (ecografia, ginásio, recuperação) */}
      {modules.map((m, i) => {
        const mv = m.video ? videoFor(m.video, locale) : null;
        return (
          <Section key={m.id} id={m.id} tone={tone()} labelledBy={`${m.id}-title`}>
            <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
              <div className={cn("overflow-hidden rounded-[var(--radius-img)] md:sticky md:top-40", i % 2 === 1 && "md:order-last")}>
                <Media id={m.mediaId} locale={locale} sizes="(min-width: 768px) 45vw, 100vw" />
              </div>
              <div>
                <h2 id={`${m.id}-title`} className="t-h1">
                  {m.title}
                </h2>
                <p className="t-lead mt-6">{m.text}</p>
                {mv && <VideoButton video={mv} label={mv.name} labels={videoLabels} className="mt-8" />}
                <div className="mt-10">
                  <IconList items={m.points} />
                </div>
                {m.items && m.items.length > 0 && (
                  <div className="mt-12">
                    {m.itemsTitle && <h3 className="t-h3">{m.itemsTitle}</h3>}
                    <dl className="mt-4 divide-y divide-line border-y border-line">
                      {m.items.map((it) => (
                        <div key={it.title} className="py-4">
                          <dt className="font-semibold">{it.title}</dt>
                          <dd className="mt-1 text-grey">{it.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
                {m.note && <p className="mt-8 border-t border-line pt-5 text-[15px] text-grey">{m.note}</p>}
              </div>
            </div>
          </Section>
        );
      })}

      {/* Sinais: a seleção vai escrita na mensagem de WhatsApp */}
      {s.signs && (
        <Section tone={tone()} id="sinais" labelledBy="sinais-title">
          <SectionTitle title={s.signs.title} intro={s.signs.intro} id="sinais-title" />
          <div className="mt-12">
            <SignsChecklist
              items={s.signs.items}
              baseMessage={wa}
              location={`servico-${service}-sinais`}
              labels={{
                legend: s.signs.title,
                countOne: s.signs.countOne,
                countMany: s.signs.countMany,
                none: s.signs.none,
                noneHint: s.signs.noneHint,
                messageIntro: s.signs.messageIntro,
                send: s.signs.send,
                fallback: t.common.whatsappCta,
                note: s.signs.note,
              }}
            />
          </div>
        </Section>
      )}

      {/* O que nos distingue + quem está à frente do serviço (com vídeo) */}
      <Section tone={tone()} id="fisioterapeuta" labelledBy="distinct">
        <div className={cn("grid gap-12", specialist && "items-center lg:grid-cols-[1fr_1.15fr] lg:gap-20")}>
          <div>
            <SectionTitle title={s.distinct.title} intro={s.distinct.text} id="distinct" />
            {/* Com recursos próprios (ecografia, ginásio, recuperação), os pontos já estão detalhados acima */}
            {modules.length === 0 && (
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {s.distinct.points.map((p) => (
                  <li key={p} className="flex items-center gap-4 py-4 text-lg">
                    <span className="size-2 shrink-0 rounded-full bg-teal" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {specialist && (
            <TeamMember
              locale={locale}
              mediaId={specialist.media}
              name={specialist.name}
              role={specialist.role}
              focus={specialist.focus}
              video={specialistVideo && <VideoButton video={specialistVideo} label={specialistVideo.caption} labels={videoLabels} />}
            />
          )}
        </div>
      </Section>

      {/* Como funciona */}
      <Section tone={tone()} id="como-funciona" labelledBy="how">
        <JourneySteps
          id="how"
          title={s.how.title}
          intro={s.how.intro}
          linksLabel={sp.inStep}
          cta={<WhatsAppButton message={wa} location={`servico-${service}-percurso`} label={t.common.whatsappCta} />}
          steps={s.how.steps.map((st) => ({
            ...st,
            links: st.uses?.filter((id) => moduleNav[id]).map((id) => ({ label: moduleNav[id], href: `#${id}` })),
          }))}
        />
      </Section>

      {/* Perguntas + duração */}
      <Section tone={tone()} id="perguntas" labelledBy="faq">
        <div className="grid gap-14 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <h2 id="faq" className="t-h2">
              {sp.faq}
            </h2>
            <div className="mt-10 border-t border-line pt-6">
              <h3 className="t-h3">{s.duration.title}</h3>
              <p className="mt-2 text-grey">{s.duration.text}</p>
            </div>
            <WhatsAppButton message={wa} location={`servico-${service}-faq`} label={t.common.whatsappCta} className="mt-8" />
          </div>
          <Faq items={s.faq} />
        </div>
      </Section>

      {/* Outro serviço */}
      <Section tone={tone()} labelledBy="related">
        <h2 id="related" className="text-[15px] font-medium text-teal-strong">
          {sp.related}
        </h2>
        <div className="mt-6">
          {s.related.map((k) => (
            <ServiceRow
              key={k}
              locale={locale}
              mediaId={t.services[k].mediaId}
              title={t.services[k].name}
              text={t.services[k].short}
              href={href(locale, `service:${k}`)}
              cta={t.common.learnMore}
              includesLabel={t.home.featured.includesLabel}
              includes={t.services[k].modules?.map((m) => ({ label: m.title, text: m.summary, href: href(locale, `service:${k}`, m.id) }))}
            />
          ))}
        </div>
      </Section>

      <CtaTriad locale={locale} waMessage={wa} location={`servico-${service}-cta`} />
    </>
  );
}
