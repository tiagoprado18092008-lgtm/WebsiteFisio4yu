import { getDict } from "@/content";
import { mediaList, videoFor } from "@/content/media";
import { site } from "@/content/site";
import { href, serviceKeys, type Locale, type PageKey } from "@/lib/routes";
import { waMessages } from "@/lib/whatsapp";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Section, SectionTitle } from "../Section";
import { PageHero } from "../PageHero";
import { Media } from "../Media";
import { CtaTriad } from "../CtaTriad";
import { Gallery } from "../Gallery";
import { WhatsAppButton } from "../Buttons";
import { IconList, ServiceRow, TeamMember } from "../Cards";
import { VideoButton } from "../VideoCard";
import { JsonLd } from "../JsonLd";

const crumbsFor = (locale: Locale, items: { name: string; page: PageKey }[]) => {
  const t = getDict(locale);
  return [{ name: t.common.home, href: href(locale, "home") }, ...items.map((i) => ({ name: i.name, href: href(locale, i.page) }))];
};

function Crumbs({ crumbs }: { crumbs: { name: string; href: string }[] }) {
  return <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, url: c.href })))} />;
}

/* ---------- /servicos ---------- */
export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const wa = waMessages(t);
  const crumbs = crumbsFor(locale, [{ name: t.nav.services, page: "services" }]);
  return (
    <>
      <Crumbs crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        title={t.servicesPage.title}
        sub={t.servicesPage.sub}
        actions={<WhatsAppButton message={wa.general()} location="servicos-hero" label={t.common.whatsappCta} />}
      />
      <Section tone="light" labelledBy="disponiveis" className="pt-0 md:pt-0">
        <h2 id="disponiveis" className="sr-only">
          {t.servicesPage.available}
        </h2>
        <div className="space-y-20 md:space-y-28">
          {serviceKeys.map((k, i) => (
            <ServiceRow
              key={k}
              locale={locale}
              reverse={i % 2 === 1}
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
      <CtaTriad locale={locale} waMessage={wa.general()} />
    </>
  );
}

/* ---------- /sobre ---------- */
export function AboutPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const a = t.about;
  const wa = waMessages(t);
  const crumbs = crumbsFor(locale, [{ name: t.nav.about, page: "about" }]);
  const gallery = mediaList.filter((m) => m.id.startsWith("clinic-"));
  return (
    <>
      <Crumbs crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        title={a.title}
        sub={a.sub}
        actions={<WhatsAppButton message={wa.general()} location="sobre-hero" label={t.common.whatsappCta} />}
        media={<Media id="about-hero" locale={locale} priority sizes="(min-width: 768px) 40vw, 100vw" />}
      />

      {/* A história só aparece quando o texto do Mário chegar; até lá, missão e valores ocupam a secção */}
      <Section tone="mist" labelledBy={a.story.length ? "historia" : "missao"}>
        <div className={a.story.length ? "grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20" : "max-w-3xl"}>
          {a.story.length > 0 && (
            <div>
              <h2 id="historia" className="t-h2">
                {a.storyTitle}
              </h2>
              {a.story.map((p) => (
                <p key={p} className="t-lead mt-6">
                  {p}
                </p>
              ))}
            </div>
          )}
          <div>
            <h2 id="missao" className="text-[15px] font-medium text-teal-strong">{a.missionTitle}</h2>
            <p className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">{a.mission}</p>
            <h3 className="mt-12 text-[15px] font-medium text-teal-strong">{a.valuesTitle}</h3>
            <div className="mt-4">
              <IconList items={a.values} />
            </div>
          </div>
        </div>
      </Section>

      {/* Quem está por trás: o Mário e a Angela, cada um com o seu vídeo */}
      {t.team.length > 0 && (
        <Section tone="light" id="equipa" labelledBy="equipa-h">
          <SectionTitle title={a.founderTitle} id="equipa-h" />
          <ul className="mt-12 grid gap-5 lg:grid-cols-2">
            {t.team.map((m) => {
              const v = m.video ? videoFor(m.video, locale) : null;
              return (
                <li key={m.media}>
                  <TeamMember
                    locale={locale}
                    mediaId={m.media}
                    name={m.name}
                    role={m.role}
                    focus={m.focus}
                    video={v && <VideoButton video={v} label={v.caption} labels={{ play: t.common.watchVideo, close: t.common.close }} />}
                  />
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <Section tone="mist" labelledBy="galeria">
        <h2 id="galeria" className="t-h2 mb-12">
          {a.galleryTitle}
        </h2>
        <Gallery
          labels={{ close: t.common.close, previous: t.common.previous, next: t.common.next }}
          items={gallery.map((g) => ({
            id: g.id,
            alt: g.alt[locale],
            ratio: g.ratio,
            thumb: <Media id={g.id} locale={locale} compact sizes="(min-width: 1024px) 33vw, 100vw" />,
            full: <Media id={g.id} locale={locale} sizes="90vw" />,
          }))}
        />
      </Section>

      <CtaTriad locale={locale} waMessage={wa.general()} />
    </>
  );
}

/* ---------- /contactos ---------- */
export function ContactPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const c = t.contact;
  const wa = waMessages(t);
  const crumbs = crumbsFor(locale, [{ name: t.nav.contact, page: "contact" }]);
  const days = [
    { d: t.hours.weekdays, h: `${site.hours[0].opens.replace(":", "h")} – ${site.hours[0].closes.replace(":", "h")}` },
    { d: t.hours.saturday, h: t.hours.closed },
    { d: t.hours.sunday, h: t.hours.closed },
  ];
  return (
    <>
      <Crumbs crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        title={c.title}
        sub={c.sub}
        media={<Media id="brand-room" locale={locale} priority sizes="(min-width: 768px) 40vw, 100vw" />}
      />
      {/* O cartão de marcação vem logo a seguir ao título: os botões não se repetem no hero */}
      <CtaTriad locale={locale} waMessage={wa.general()} location="contactos" photo={false} withMap />
      <Section tone="mist" labelledBy="horario">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <h2 id="horario" className="t-h2">
              {t.hours.title}
            </h2>
            <table className="mt-8 w-full text-lg">
              <tbody>
                {days.map((r) => (
                  <tr key={r.d} className="border-b border-line">
                    <th scope="row" className="py-4 text-left font-medium">
                      {r.d}
                    </th>
                    <td className="py-4 text-right text-grey">{r.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:pt-2">
            {c.access && (
              <>
                <h2 className="t-h2">{c.accessTitle}</h2>
                <p className="t-lead mt-6">{c.access}</p>
              </>
            )}
            <p className={c.access ? "mt-10 border-t border-line pt-6 text-grey" : "text-lg leading-relaxed text-grey md:mt-16"}>{t.home.insurance}</p>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------- Páginas legais ---------- */
export function LegalPage({ locale, page }: { locale: Locale; page: "privacy" | "terms" | "cookies" }) {
  const t = getDict(locale);
  const l = t.legal[page];
  const crumbs = crumbsFor(locale, [{ name: l.title, page }]);
  return (
    <>
      <PageHero crumbs={crumbs} title={l.title} sub={t.legal.updated} />
      <Section tone="light" className="pt-0 md:pt-0">
        <div className="max-w-2xl">
          {l.sections.map((s) => (
            <div key={s.h} className="border-t border-line py-8">
              <h2 className="t-h3">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-grey">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
