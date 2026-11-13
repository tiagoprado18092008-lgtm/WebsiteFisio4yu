import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { site, isPending } from "@/content/site";
import { getDict } from "@/content";
import { consultKeys, href, serviceKeys, type Locale } from "@/lib/routes";
import { waLink, waMessages } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { Wordmark } from "./Wordmark";
import { FacebookIcon, GoogleIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from "./Icon";
import { CookieSettingsLink } from "./Consent";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const f = t.footer;
  const wa = waLink(waMessages(t).general());
  // Redes sociais e, no fim, o WhatsApp (o único que conta como conversão no tracking)
  const social = [
    { url: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { url: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: site.social.google, label: "Google", Icon: GoogleIcon },
    { url: wa, label: "WhatsApp", Icon: WhatsAppIcon, track: "whatsapp" },
  ].filter((s) => !isPending(s.url));
  // Registo ERS e licença só aparecem quando confirmados (ver PENDENTES.md)
  const legal = [
    f.legal,
    `${f.nif} ${site.nif}`,
    !isPending(site.ers) && `${f.ers} ${site.ers}`,
    !isPending(site.license) && `${f.license} ${site.license}`,
  ].filter(Boolean);
  const hasTeam = t.team.length > 0;
  const h = "mb-1.5 font-display text-base font-medium text-teal-strong md:mb-3 md:text-lg";
  const link = "text-grey transition-colors hover:text-teal-dark";
  // Em telemóvel, cada link do rodapé tem um alvo de toque de 44 px
  const tap = "[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_button]:min-h-11 md:[&_a]:min-h-0 md:[&_button]:min-h-0";
  const icon = "size-4 shrink-0 text-teal";

  return (
    // Painel ice pousado na folha como um cartão: margem branca à volta e os quatro cantos arredondados, concêntricos com
    // os da folha (22/34 px menos a margem de 8/12 px)
    <footer className="bg-white px-2 pb-2 pt-4 text-ink md:px-3 md:pb-3 md:pt-6">
      <div className="overflow-hidden rounded-[16px] bg-ice pb-[72px] pt-8 md:rounded-[24px] md:pb-0 md:pt-12">
        {/* Marca | Clínica | Serviços | Contactos. Em telemóvel: marca, Clínica e Serviços lado a lado, Contactos no fim */}
        <div className="container-x grid grid-cols-2 gap-x-6 gap-y-6 md:gap-x-12 md:gap-y-8 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-12 w-auto md:h-14" sizes="140px" />
            <p className="mt-3 max-w-xs text-[15px] font-medium leading-snug text-teal-strong">{f.tagline}</p>
            {social.length > 0 && (
              <ul className="mt-4 flex gap-2">
                {social.map(({ url, label, Icon, track }) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track={track}
                      data-location={track && "footer-social"}
                      aria-label={`${label} ${t.common.newWindow}`}
                      // Círculo de 36 px com área de toque de 44 px
                      className="relative flex size-9 items-center justify-center rounded-full border border-line bg-white text-teal-dark transition-colors after:absolute after:-inset-1 hover:border-teal hover:bg-teal-dark hover:text-white"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <nav aria-labelledby="f-clinic">
              <h2 id="f-clinic" className={h}>
                {f.clinic}
              </h2>
              <ul className={`text-sm md:space-y-1.5 ${tap}`}>
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
            {/* Dados da empresa por baixo dos links da clínica, uma linha cada */}
            <p className="mt-3 text-[13px] font-semibold leading-normal text-ink">
              {legal.map((l) => (
                <span key={String(l)} className="block tabular-nums">
                  {l}
                </span>
              ))}
            </p>
          </div>

          <nav aria-labelledby="f-services">
            <h2 id="f-services" className={h}>
              {f.services}
            </h2>
            {/* Em telemóvel os nomes partem em duas linhas: o espaço entre eles mostra que são dois links e não quatro */}
            <ul className={`space-y-1 text-sm leading-snug md:space-y-1.5 ${tap}`}>
              {serviceKeys.map((k) => (
                <li key={k}>
                  <Link href={href(locale, `service:${k}`)} className={link}>
                    {t.services[k].name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className={`${h} mt-5`}>
              <Link href={href(locale, "consultations")} className="transition-colors hover:text-teal-dark">
                {t.nav.consultations}
              </Link>
            </h2>
            <ul className={`space-y-1 text-sm leading-snug md:space-y-1.5 ${tap}`}>
              {consultKeys.map((k) => (
                <li key={k}>
                  <Link href={href(locale, `consult:${k}`)} className={link}>
                    {t.consultations.items[k].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cada contacto com o seu ícone; nas linhas que são links o ícone fica dentro do link, para a linha inteira ser
              clicável e o ícone ficar centrado no alvo de toque */}
          <div className={`col-span-2 text-sm leading-snug text-grey lg:col-span-1 ${tap}`}>
            <h2 className={h}>{f.contacts}</h2>
            <address className="space-y-1 not-italic md:space-y-2">
              {/* Rua numa linha, código postal e localidade na seguinte: assim o "8500-759" nunca parte no hífen */}
              <p className="flex gap-2.5">
                <MapPin aria-hidden strokeWidth={1.75} className={`${icon} mt-0.5`} />
                <span>
                  {site.address.street}
                  <br />
                  <span className="whitespace-nowrap">
                    {site.address.postalCode} {site.address.city}
                  </span>
                </span>
              </p>
              <p>
                <a href={site.phoneHref} data-track="phone" data-location="footer" className="gap-2.5 tabular-nums transition-colors hover:text-teal-dark">
                  <PhoneIcon className={icon} />
                  {t.common.phoneDisplay}
                </a>
                <span className="block pl-[26px] text-[11px]">{t.common.phoneNote}</span>
              </p>
              <p>
                {/* Se não couber, parte a seguir à "@" e não a meio de "gmail" (o span evita que o inline-flex do alvo de
                    toque transforme cada metade num item de flex que não parte) */}
                <a href={`mailto:${site.email}`} className="gap-2.5 transition-colors hover:text-teal-dark">
                  <Mail aria-hidden strokeWidth={1.75} className={icon} />
                  <span>
                    {site.email.split("@")[0]}@<wbr />
                    {site.email.split("@")[1]}
                  </span>
                </a>
              </p>
              <p>
                <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-location="footer" className="gap-2.5 transition-colors hover:text-teal-dark">
                  <WhatsAppIcon className={icon} />
                  {t.common.whatsapp}
                </a>
              </p>
            </address>
            <p className="mt-1 flex gap-2.5 tabular-nums md:mt-2">
              <Clock aria-hidden strokeWidth={1.75} className={`${icon} mt-0.5`} />
              <span>
                <span className="sr-only">{t.hours.title}: </span>
                {t.hours.weekdays}
                <br />
                {site.hours[0].opens.replace(":", "h")} – {site.hours[0].closes.replace(":", "h")}
              </span>
            </p>
            {/* Livro de Reclamações Eletrónico: círculo branco com o "Livro de" lá dentro e o "Reclamações" ao lado. É o nome
                oficial da plataforma, por isso fica em português nas duas línguas */}
            <a
              href={site.complaintsBook}
              target="_blank"
              rel="noopener noreferrer"
              lang="pt"
              title={f.complaints}
              className="mt-3 gap-0.5 whitespace-nowrap text-xs font-semibold text-ink transition-colors hover:text-teal-dark"
            >
              {/* 56 px: o "Livro de" cabe dentro do círculo, sem tocar no aro */}
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white">Livro de</span>
              Reclamações
              <span className="sr-only" lang={locale}>
                {t.common.newWindow}
              </span>
            </a>
          </div>
        </div>

        {/* Linha de baixo com o filete a toda a largura do painel: direitos à esquerda, links legais e agência à direita */}
        <div className="mt-6 border-t border-line md:mt-8">
          <div className="container-x flex flex-col gap-1 py-3 text-[13px] text-grey md:gap-3 md:py-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="lg:shrink-0">
              © {new Date().getFullYear()} {site.name}. {f.rights}
            </p>
            <ul className={`flex flex-wrap items-center gap-x-5 md:gap-y-2 lg:justify-end lg:gap-x-6 ${tap}`}>
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

        {/* Marca em grande no fundo do painel, a desvanecer (pedido do cliente: manter), com as letras e a fita do "4" do
            próprio logótipo; o desvanecer é uma máscara, para a cor das letras ficar lisa */}
        <Wordmark className="pointer-events-none mx-auto mt-1 block h-auto w-[min(66vw,36rem)] select-none text-teal-dark/50 [mask-image:linear-gradient(to_bottom,#000_30%,transparent_88%)]" />
      </div>
    </footer>
  );
}
