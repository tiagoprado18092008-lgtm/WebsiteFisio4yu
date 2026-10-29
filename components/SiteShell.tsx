import { getDict } from "@/content";
import { href, otherLocale, serviceKeys, type Locale, type PageKey } from "@/lib/routes";
import { clinicJsonLd } from "@/lib/seo";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { StickyMobileBar } from "./StickyMobileBar";
import { ConsentProvider } from "./Consent";
import { TrackingListener } from "./TrackingListener";
import { JsonLd } from "./JsonLd";

/** Estrutura comum: header, conteúdo, rodapé, barra móvel, WhatsApp flutuante, cookies e tracking. */
export function SiteShell({ locale, page, waMessage, children }: { locale: Locale; page: PageKey; waMessage: string; children: React.ReactNode }) {
  const t = getDict(locale);
  const other = otherLocale(locale);
  return (
    <ConsentProvider banner={{ ...t.cookieBanner, href: href(locale, "cookies") }}>
        <div className="p-2 md:p-2.5 xl:p-3">
        <div className="mx-auto max-w-[2200px] overflow-clip rounded-[22px] bg-white md:rounded-[34px]">
        <Header
          homeHref={href(locale, "home")}
          logo={<Logo priority className="h-11 md:h-[52px]" />}
          links={{
            home: { label: t.nav.home, href: href(locale, "home") },
            services: {
              label: t.nav.services,
              href: href(locale, "services"),
              children: [
                ...serviceKeys.map((k) => ({ label: t.services[k].name, href: href(locale, `service:${k}`) })),
              ],
            },
            about: { label: t.nav.about, href: href(locale, "about") },
            contact: { label: t.nav.contact, href: href(locale, "contact") },
          }}
          lang={{
            current: locale.toUpperCase(),
            other: t.common.languageShort,
            href: href(other, page),
            label: t.common.language,
            hrefLang: other === "en" ? "en" : "pt-PT",
          }}
          labels={{ book: t.common.bookAssessment, open: t.common.openMenu, close: t.common.closeMenu, phoneNote: t.common.phoneNote, phone: t.common.phoneDisplay, homeAria: `Fisio4you — ${t.common.home}`, nav: t.common.menu }}
          waMessage={waMessage}
        />
        <main id="conteudo">{children}</main>
        <Footer locale={locale} />
        </div>
        </div>
        <StickyMobileBar waMessage={waMessage} callLabel={t.common.call} waLabel={t.common.whatsapp} floatingLabel={t.common.floatingWhatsapp} />
        <TrackingListener />
        <JsonLd data={clinicJsonLd(locale)} />
    </ConsentProvider>
  );
}
