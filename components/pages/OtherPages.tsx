import { Info } from "lucide-react";
import { getDict } from "@/content";
import { mediaList } from "@/content/media";
import { site } from "@/content/site";
import { href, serviceKeys, type Locale, type PageKey } from "@/lib/routes";
import { waMessages } from "@/lib/whatsapp";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { Section, SectionTitle } from "../Section";
import { PageHero } from "../PageHero";
import { Media } from "../Media";
import { CtaTriad } from "../CtaTriad";
import { Gallery } from "../Gallery";
import { WhatsAppButton } from "../Buttons";
import { IconList, ServiceRow, TeamMember } from "../Cards";
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
              // Sem recursos próprios (dermatofuncional): a lista mostra as situações acompanhadas, para as duas linhas terem o mesmo peso
              includes={
                t.services[k].modules?.map((m) => ({ label: m.title, text: m.summary, href: href(locale, `service:${k}`, m.id) })) ??
                t.services[k].forWho.items.map((it) => ({ label: it.title, text: it.text, href: href(locale, `service:${k}`, "para-quem") }))
              }
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

      {/* A história só aparece quando o texto do Mário chegar; até lá, a secção abre com a missão */}
      <Section tone="mist" labelledBy={a.story.length ? "historia" : "missao"}>
        {a.story.length > 0 && (
          <div className="mb-16 grid gap-x-20 gap-y-6 border-b border-line pb-16 md:grid-cols-[1fr_1.4fr]">
            <h2 id="historia" className="t-h2">
              {a.storyTitle}
            </h2>
            <div>
              {a.story.map((p, i) => (
                <p key={p} className={cn("t-lead", i > 0 && "mt-6")}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}
        {/* Título à esquerda e missão à direita, como nas outras secções; os valores ocupam a largura toda por baixo */}
        <div className="grid gap-x-20 gap-y-6 md:grid-cols-[1fr_1.4fr]">
          <h2 id="missao" className="t-h2">
            {a.missionTitle}
          </h2>
          <p className="font-display text-2xl leading-snug tracking-tight text-ink md:pt-1 md:text-[1.75rem]">{a.mission}</p>
        </div>
        <h3 className="t-h3 mt-14 md:mt-20">{a.valuesTitle}</h3>
        <div className="mt-5">
          <IconList items={a.values} cols={3} />
        </div>
      </Section>

      {/* Quem está por trás: o Mário e a Angela */}
      {t.team.length > 0 && (
        <Section tone="light" id="equipa" labelledBy="equipa-h">
          <SectionTitle title={a.founderTitle} id="equipa-h" />
          <ul className="mt-12 grid gap-5 lg:grid-cols-2">
            {t.team.map((m) => (
              <li key={m.media}>
                <TeamMember locale={locale} mediaId={m.media} name={m.name} role={m.role} focus={m.focus} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="mist" labelledBy="galeria">
        <h2 id="galeria" className="t-h2 mb-12">
          {a.galleryTitle}
        </h2>
        <Gallery
          labels={{ close: t.common.close, previous: t.common.previous, next: t.common.next }}
          items={gallery.map((g) => {
            const wide = g.ratio === "16/9";
            return {
              id: g.id,
              alt: g.alt[locale],
              ratio: g.ratio,
              wide,
              thumb: <Media id={g.id} locale={locale} cover compact sizes={wide ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"} />,
              full: <Media id={g.id} locale={locale} sizes="90vw" />,
            };
          })}
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
      {/* Título à esquerda, horário à direita; a nota dos seguros fica logo por baixo do horário */}
      <Section tone="mist" labelledBy="horario">
        <div className="grid gap-x-20 gap-y-8 md:grid-cols-[1fr_1.4fr]">
          <h2 id="horario" className="t-h2">
            {t.hours.title}
          </h2>
          <div>
            <table className="w-full text-lg tabular-nums">
              <tbody className="border-t border-line">
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
            <p className="mt-8 flex gap-3 text-grey">
              <Info className="mt-1 size-5 shrink-0 text-teal" aria-hidden />
              {t.home.insurance}
            </p>
          </div>
          {c.access && (
            <>
              <h2 className="t-h2 md:mt-12">{c.accessTitle}</h2>
              <p className="t-lead md:mt-12">{c.access}</p>
            </>
          )}
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
