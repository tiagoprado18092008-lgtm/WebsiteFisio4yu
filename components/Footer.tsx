import Link from "next/link";
import { site, isPending } from "@/content/site";
import { getDict } from "@/content";
import { href, serviceKeys, type Locale } from "@/lib/routes";
import { waLink, waMessages } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { FacebookIcon, GoogleIcon, InstagramIcon } from "./Icon";
import { CookieSettingsLink } from "./Consent";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const f = t.footer;
  const social = [
    { url: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { url: site.social.google, label: "Google", Icon: GoogleIcon },
  ].filter((s) => !isPending(s.url));
  // Registo ERS e licença só aparecem quando confirmados (ver PENDENTES.md)
  const legal = [
    f.legal,
    `${f.nif} ${site.nif}`,
    !isPending(site.ers) && `${f.ers} ${site.ers}`,
    !isPending(site.license) && `${f.license} ${site.license}`,
  ].filter(Boolean);
  const hasTeam = t.team.length > 0;
  const h = "mb-4 text-[15px] font-semibold text-ink";
  const link = "text-grey transition-colors hover:text-teal-dark";
  // Em telemóvel, cada link do rodapé tem um alvo de toque de 44 px
  const tap = "[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_button]:min-h-11 md:[&_a]:min-h-0 md:[&_button]:min-h-0";

  return (
    // Painel arredondado em ice (teal claro), recolhido nas margens: separa claramente o rodapé do conteúdo
    <footer className="bg-white px-2 pb-2 pt-4 text-ink md:px-4 md:pb-4 md:pt-6">
      <div className="overflow-hidden rounded-[28px] bg-ice pb-20 pt-16 md:rounded-[34px] md:pb-0 md:pt-20">
      <div className="container-x">
        {/* Em telemóvel: 2 colunas (Clínica | Horário lado a lado) e Contactos no fim, para um rodapé mais curto */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-14 w-auto" />
            <p className="mt-5 max-w-xs text-grey">{f.tagline}</p>
            {social.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {social.map(({ url, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} ${t.common.newWindow}`}
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-teal-dark hover:border-teal hover:text-teal"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-labelledby="f-services" className="col-span-2 md:col-span-1">
            <h2 id="f-services" className={h}>
              {f.services}
            </h2>
            <ul className={`text-[15px] md:space-y-2.5 ${tap}`}>
              {serviceKeys.map((k) => (
                <li key={k}>
                  <Link href={href(locale, `service:${k}`)} className={link}>
                    {t.services[k].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="f-clinic">
            <h2 id="f-clinic" className={h}>
              {f.clinic}
            </h2>
            <ul className={`text-[15px] md:space-y-2.5 ${tap}`}>
              <li>
                <Link href={href(locale, "about")} className={link}>
                  {t.nav.about}
                </Link>
              </li>
              {hasTeam && (
                <li>
                  <Link href={href(locale, "about", "equipa")} className={link}>
                    {f.team}
                  </Link>
                </li>
              )}
              <li>
                <Link href={href(locale, "contact")} className={link}>
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="order-last col-span-2 md:order-none md:col-span-1">
            <h2 className={h}>{f.contacts}</h2>
            <address className={`space-y-1 text-[15px] not-italic text-grey md:space-y-2.5 ${tap}`}>
              {/* Rua numa linha, código postal e localidade na seguinte: assim o "8500-759" nunca parte no hífen */}
              <p>
                {site.address.street}
                <br />
                <span className="whitespace-nowrap">
                  {site.address.postalCode} {site.address.city}
                </span>
              </p>
              <p>
                <a href={site.phoneHref} data-track="phone" data-location="footer" className="tabular-nums transition-colors hover:text-teal-dark">
                  {t.common.phoneDisplay}
                </a>
                <br />
                <span className="text-xs text-grey">{t.common.phoneNote}</span>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-teal-dark">
                  {site.email}
                </a>
              </p>
              <p>
                <a
                  href={waLink(waMessages(t).general())}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp"
                  data-location="footer"
                  className="transition-colors hover:text-teal-dark"
                >
                  {t.common.whatsapp}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className={h}>{t.hours.title}</h2>
            <p className="text-[15px] tabular-nums text-grey">
              {t.hours.weekdays}
              <br />
              {site.hours[0].opens.replace(":", "h")} – {site.hours[0].closes.replace(":", "h")}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 text-sm text-grey lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1 lg:shrink-0">
            <p>
              {legal.join(" · ")}
            </p>
            <p>
              © {new Date().getFullYear()} {site.name}. {f.rights}
            </p>
          </div>
          {/* O bloco legal não encolhe: se faltar largura, são os links que passam à linha seguinte, alinhados à direita */}
          <ul className={`flex flex-wrap items-center gap-x-5 md:gap-y-2 lg:justify-end lg:gap-x-4 ${tap}`}>
            <li>
              <a href={site.complaintsBook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-teal-dark">
                <span className="rounded border border-line bg-white px-2 py-1 text-xs font-bold uppercase leading-tight text-[#c8102e]">Livro de Reclamações</span>
                <span className="sr-only">{f.complaints}</span>
              </a>
            </li>
            <li>
              <Link href={href(locale, "privacy")} className="transition-colors hover:text-teal-dark">
                {f.privacy}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "terms")} className="transition-colors hover:text-teal-dark">
                {f.terms}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "cookies")} className="transition-colors hover:text-teal-dark">
                {f.cookies}
              </Link>
            </li>
            <li>
              <CookieSettingsLink label={f.cookieSettings} />
            </li>
            <li>
              {f.builtBy}{" "}
              <a href={site.agency.url} target="_blank" rel="noopener" className="font-semibold text-teal-dark hover:text-teal-dark">
                {site.agency.name}
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Marca em grande, a desvanecer (pedido do cliente: manter) */}
      <p aria-hidden className="pointer-events-none mt-12 select-none bg-gradient-to-b from-teal-dark/70 via-teal/40 to-transparent bg-clip-text text-center font-display text-[clamp(4.5rem,19vw,17rem)] leading-[0.78] tracking-[-0.05em] text-transparent">
        fisio4you
      </p>
      </div>
    </footer>
  );
}
