import { getDict } from "@/content";
import { videoFor } from "@/content/media";
import { href, type Locale, type ServiceKey } from "@/lib/routes";
import { waMessages } from "@/lib/whatsapp";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { Section, SectionTitle } from "../Section";
import { PageHero } from "../PageHero";
import { Media } from "../Media";
import { JourneySteps } from "../JourneySteps";
import { Faq } from "../Faq";
import { CtaTriad } from "../CtaTriad";
import { CallButton, WhatsAppButton } from "../Buttons";
import { IconList, ServiceRow } from "../Cards";
import { JsonLd } from "../JsonLd";
import { SectionNav } from "../SectionNav";
import { VideoButton } from "../VideoCard";

export function ServicePage({ locale, service }: { locale: Locale; service: ServiceKey }) {
  const t = getDict(locale);
  const s = t.services[service];
  const sp = t.servicePage;
  const wa = waMessages(t).service(s.name);
  const url = href(locale, `service:${service}`);
  const crumbs = [
    { name: t.common.home, href: href(locale, "home") },
    { name: t.nav.services, href: href(locale, "services") },
    { name: s.name, href: url },
  ];
  const nav = [
    { id: "para-quem", label: sp.forWho },
    ...(s.modules ?? []).map((m) => ({ id: m.id, label: m.nav })),
    { id: "como-funciona", label: sp.how },
    { id: "perguntas", label: sp.faqShort },
  ];
  const videoLabels = { play: t.common.watchVideo, close: t.common.close };
  const serviceVideo = s.video ? videoFor(s.video, locale) : null;
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
      <PageHero
        crumbs={crumbs}
        title={s.heroTitle}
        sub={s.heroSub}
        actions={
          <>
            <WhatsAppButton message={wa} location={`servico-${service}`} label={t.common.whatsappCta} />
            <CallButton location={`servico-${service}`} label={t.common.phoneDisplay} note={t.common.phoneNote} />
          </>
        }
        media={<Media id={s.mediaId} locale={locale} priority sizes="(min-width: 768px) 40vw, 100vw" />}
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

      {/* Recursos incluídos (ecografia, ginásio, recuperação) */}
      {s.modules?.map((m, i) => {
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

      {/* O que nos distingue (serviços sem recursos dedicados) */}
      {!s.modules && (
        <Section tone={tone()} labelledBy="distinct">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <SectionTitle title={s.distinct.title} intro={s.distinct.text} id="distinct" />
              {serviceVideo && <VideoButton video={serviceVideo} label={`${serviceVideo.name} · ${serviceVideo.caption}`} labels={videoLabels} className="mt-8" />}
            </div>
            <ul className="divide-y divide-line self-center border-y border-line">
              {s.distinct.points.map((p) => (
                <li key={p} className="flex items-center gap-4 py-5 text-lg">
                  <span className="size-2 shrink-0 rounded-full bg-teal" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Como funciona */}
      <Section tone={tone()} id="como-funciona" labelledBy="how">
        <JourneySteps id="how" title={s.how.title} steps={s.how.steps} />
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
