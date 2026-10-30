import Image from "next/image";
import Link from "next/link";
import complaintsBadge from "@/public/brand/livro-reclamacoes.webp";
import { site, isPending } from "@/content/site";
import { getDict } from "@/content";
import { href, serviceKeys, type Locale } from "@/lib/routes";
import { waLink, waMessages } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { Wordmark } from "./Wordmark";
import { FacebookIcon, GoogleIcon, InstagramIcon, WhatsAppIcon } from "./Icon";
import { CookieSettingsLink } from "./Consent";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const f = t.footer;
  // Redes sociais e, no fim, o WhatsApp (o único que conta como conversão no tracking)
  const social = [
    { url: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { url: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: site.social.google, label: "Google", Icon: GoogleIcon },
    { url: waLink(waMessages(t).general()), label: "WhatsApp", Icon: WhatsAppIcon, track: "whatsapp" },
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
    // Painel ice encostado às margens e ao fundo da folha, só com os cantos de cima arredondados: os de baixo são os
    // da própria folha, por isso não há dois cantos desencontrados lado a lado
    <footer className="bg-white pt-4 text-ink md:pt-6">
      <div className="overflow-hidden rounded-t-[28px] bg-ice pb-20 pt-16 md:rounded-t-[34px] md:pb-0 md:pt-20">
      <div className="container-x">
        {/* Em telemóvel: 2 colunas (Clínica | Horário lado a lado) e Contactos no fim, para um rodapé mais curto */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-16 w-auto md:h-[72px]" sizes="180px" />
            <p className="mt-6 max-w-xs text-grey">{f.tagline}</p>
            {social.length > 0 && (
              <ul className="mt-6 flex gap-2.5">
                {social.map(({ url, label, Icon, track }) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track={track}
                      data-location={track && "footer-social"}
                      aria-label={`${label} ${t.common.newWindow}`}
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-teal-dark transition-colors hover:border-teal hover:bg-teal-dark hover:text-white"
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
                {/* Se não couber, parte a seguir à "@" e não a meio de "gmail" (o span evita que o inline-flex do alvo de
                    toque transforme cada metade num item de flex que não parte) */}
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-teal-dark">
                  <span>
                    {site.email.split("@")[0]}@<wbr />
                    {site.email.split("@")[1]}
                  </span>
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
              {/* Selo oficial do Livro de Reclamações Eletrónico */}
              <a href={site.complaintsBook} target="_blank" rel="noopener noreferrer" className="rounded-[5px] transition-transform hover:-translate-y-px">
                <Image src={complaintsBadge} alt={`${f.complaints} ${t.common.newWindow}`} sizes="106px" className="h-12 w-auto rounded-[5px]" />
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
              {/* Logótipo da agência com brilho ao passar o cursor (.agency em app/globals.css) */}
              <a href={site.agency.url} target="_blank" rel="noopener" className="agency inline-flex items-center gap-2.5 transition-colors hover:text-teal-dark">
                {f.builtBy}
                <span className="agency-mark">
                  <span aria-hidden className="agency-logo" />
                </span>
                <span className="sr-only">{site.agency.name}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Marca em grande, a toda a largura e a desvanecer no fundo (pedido do cliente: manter), com as letras e a fita
          do "4" do próprio logótipo; o desvanecer é uma máscara, para a cor das letras ficar lisa */}
      <Wordmark className="pointer-events-none mx-auto mt-12 block h-auto w-[min(86vw,87rem)] select-none text-teal-dark/50 [mask-image:linear-gradient(to_bottom,#000_30%,transparent_88%)]" />
      </div>
    </footer>
  );
}
