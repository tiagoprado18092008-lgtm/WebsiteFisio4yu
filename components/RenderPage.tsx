import { notFound } from "next/navigation";
import { getDict } from "@/content";
import { resolve, type Locale, type ServiceKey } from "@/lib/routes";
import { waMessages } from "@/lib/whatsapp";
import { SiteShell } from "./SiteShell";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { AboutPage, ContactPage, LegalPage, ServicesPage } from "./pages/OtherPages";

export function RenderPage({ locale, slug }: { locale: Locale; slug?: string[] }) {
  const page = resolve(locale, slug);
  if (!page) notFound();
  const t = getDict(locale);
  const wa = waMessages(t);

  let body: React.ReactNode;
  let waMessage = wa.general();
  if (page.startsWith("service:")) {
    const key = page.slice(8) as ServiceKey;
    waMessage = wa.service(t.services[key].name);
    body = <ServicePage locale={locale} service={key} />;
  } else if (page === "home") body = <HomePage locale={locale} />;
  else if (page === "services") body = <ServicesPage locale={locale} />;
  else if (page === "about") body = <AboutPage locale={locale} />;
  else if (page === "contact") body = <ContactPage locale={locale} />;
  else body = <LegalPage locale={locale} page={page as "privacy" | "terms" | "cookies"} />;

  return (
    <SiteShell locale={locale} page={page} waMessage={waMessage}>
      {body}
    </SiteShell>
  );
}
