import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getDict } from "@/content";
import { consultKeys, href, type ConsultKey, type Locale } from "@/lib/routes";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { waMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "../Buttons";
import { CtaTriad } from "../CtaTriad";
import { JsonLd } from "../JsonLd";
import { Breadcrumbs, PageHero } from "../PageHero";
import { RevealOnScroll } from "../RevealOnScroll";

/** Cartão de uma consulta, só com texto (sem fotos, a pedido do cliente); o cartão inteiro é o link. */
function ConsultCard({ locale, consult }: { locale: Locale; consult: ConsultKey }) {
  const t = getDict(locale);
  const c = t.consultations.items[consult];
  return (
    <Link href={href(locale, `consult:${consult}`)} className="card-hover card-lift group flex h-full flex-col rounded-[var(--radius-img)] bg-mist p-6 md:p-8">
      <h3 className="font-display text-[clamp(1.75rem,1.3rem+1.2vw,2.5rem)] leading-[1.05] tracking-[-0.025em] text-ink">
        <span className="card-title">{c.name}</span>
      </h3>
      <p className="mt-3 max-w-[42ch] leading-relaxed text-grey">{c.short}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-teal-strong">
        {t.common.learnMore}
        <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ---------- /consultas ---------- */
export function ConsultationsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const c = t.consultations;
  const crumbs = [
    { name: t.common.home, href: href(locale, "home") },
    { name: t.nav.consultations, href: href(locale, "consultations") },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((i) => ({ name: i.name, url: i.href })))} />
      <RevealOnScroll />
      <PageHero crumbs={crumbs} title={c.title} sub={c.sub} />
      <section aria-labelledby="consultas-lista" className="bg-white pb-8 md:pb-12">
        <div className="container-x">
          <h2 id="consultas-lista" className="sr-only">
            {c.available}
          </h2>
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
            {consultKeys.map((k, i) => (
              <li key={k} data-reveal style={{ "--d": i } as React.CSSProperties}>
                <ConsultCard locale={locale} consult={k} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaTriad locale={locale} waMessage={waMessages(t).general()} location="consultas-cta" />
    </>
  );
}

/**
 * /consultas/<consulta>: página só de texto, sem fotos (a pedido do cliente):
 * título, introdução e botão de marcar; depois os blocos de conteúdo, com o título à esquerda e o texto à direita.
 */
export function ConsultationPage({ locale, consult }: { locale: Locale; consult: ConsultKey }) {
  const t = getDict(locale);
  const all = t.consultations;
  const c = all.items[consult];
  const wa = waMessages(t).service(c.name);
  const url = href(locale, `consult:${consult}`);
  const crumbs = [
    { name: t.common.home, href: href(locale, "home") },
    { name: t.nav.consultations, href: href(locale, "consultations") },
    { name: c.name, href: url },
  ];
  return (
    <>
      <JsonLd data={[serviceJsonLd(locale, c.name, c.meta.description, url), breadcrumbJsonLd(crumbs.map((i) => ({ name: i.name, url: i.href })))]} />
      <RevealOnScroll />

      <section className="bg-white pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="container-x">
          <div className="svc-in">
            <Breadcrumbs crumbs={crumbs} />
            <h1 className="t-poster mt-10 md:mt-16" style={{ "--i": 1 } as React.CSSProperties}>
              {c.name}
            </h1>
            <div style={{ "--i": 2 } as React.CSSProperties}>
              <p className="mt-8 max-w-[44rem] text-lg leading-relaxed text-ink md:mt-12 md:text-xl">{c.lead}</p>
              <div className="mt-8">
                <WhatsAppButton message={wa} location={`consulta-${consult}-topo`} label={t.common.whatsappCta} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={c.name} className="bg-white pb-8 md:pb-12">
        <div className="container-x">
          {c.sections.map((s) => (
            <div key={s.title} data-reveal className="grid gap-5 border-t border-line py-10 md:py-14 lg:grid-cols-12 lg:gap-x-6">
              <h2 className="t-h3 lg:col-span-4">{s.title}</h2>
              <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink lg:col-span-7 lg:col-start-6">
                {s.text?.map((p) => <p key={p}>{p}</p>)}
                {s.list && (
                  <ul className="space-y-3">
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check aria-hidden className="mt-1.5 size-[18px] shrink-0 text-teal" strokeWidth={2.25} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="outras-consultas" className="bg-white pt-12 md:pt-16">
        <div className="container-x">
          <h2 id="outras-consultas" data-reveal className="t-statement text-muted">
            {all.others}
          </h2>
          <ul className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3 md:gap-6">
            {consultKeys
              .filter((k) => k !== consult)
              .map((k, i) => (
                <li key={k} data-reveal style={{ "--d": i } as React.CSSProperties}>
                  <ConsultCard locale={locale} consult={k} />
                </li>
              ))}
          </ul>
        </div>
      </section>

      <CtaTriad locale={locale} waMessage={wa} location={`consulta-${consult}-cta`} />
    </>
  );
}
