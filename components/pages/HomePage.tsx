import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { getDict } from "@/content";
import { site, isPending } from "@/content/site";
import { reviews } from "@/content/reviews";
import { videoFor, instagramFor, photoStrip } from "@/content/media";
import { href, type Locale } from "@/lib/routes";
import { waMessages } from "@/lib/whatsapp";
import { Section, SectionTitle } from "../Section";
import { Pictogram, type PictogramName } from "../Pictograms";
import { Media } from "../Media";
import { ServiceDuo } from "../ServiceDuo";
import { Testimonials } from "../Testimonials";
import { CtaTriad } from "../CtaTriad";
import { WhatsAppButton, CallButton } from "../Buttons";
import { TeamMember } from "../Cards";
import { VideoCard } from "../VideoCard";
import { InstagramFeed } from "../InstagramFeed";
import { PhotoStrip } from "../PhotoStrip";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const h = t.home;
  const wa = waMessages(t);
  const googleUrl = isPending(site.social.google) ? null : site.social.google;
  // Avaliação Google, testemunhos e equipa só aparecem com dados reais (sem marcadores visíveis ao público)
  const hasRating = site.googleRating !== null && site.googleReviewCount !== null;
  const ratingText = `${site.googleRating ?? ""}, ${site.googleReviewCount ?? ""} ${t.common.googleReviews}`;
  const realReviews = reviews.filter((r) => r.text && r.rating === 5);
  // Sem URL do perfil Google confirmado, o cartão "Ver todas" abre a pesquisa da clínica no Google Maps
  const reviewsUrl = googleUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Fisio4you ${site.address.city}`)}`;
  const team = t.team.slice(0, 4);
  const instagramUrl = isPending(site.social.instagram) ? null : site.social.instagram;
  const clientVideo = videoFor("video-pedro", locale);
  const videoLabels = { play: t.common.watchVideo, close: t.common.close };
  const msk = t.services.msk;
  const dermato = t.services.dermato;
  const hubItems: { icon: PictogramName; label: string; href: string }[] = [
    { icon: "eco", label: h.hub.items.eco, href: href(locale, "service:msk") },
    { icon: "gym", label: h.hub.items.gym, href: href(locale, "service:msk", "ginasio") },
    { icon: "ice", label: h.hub.items.ice, href: href(locale, "service:msk", "recuperacao") },
    { icon: "postnatal", label: h.hub.items.postnatal, href: href(locale, "service:dermato") },
  ];
  return (
    <>
      {/* Hero: painel teal liso. À esquerda o título, uma frase e os dois contactos; à direita a foto do Mário num cartão
          grande, da linha do header até 20 px do fundo do painel. Em telemóvel e tablet o cartão vem depois dos botões,
          quase de margem a margem. O margin negativo, igual à altura do header, sobe o painel para debaixo dele (header
          transparente no topo da página). */}
      <section className="-mt-20 px-2 pb-6 pt-2 md:-mt-[88px] md:px-4 md:pt-3">
        <div className="on-dark relative overflow-hidden rounded-[28px] bg-panel text-white md:rounded-[34px]">
          <div className="grid gap-12 px-5 pb-3 pt-28 md:px-12 md:pb-4 md:pt-36 lg:min-h-[max(40rem,calc(100svh-2.25rem))] lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-x-12 lg:pb-5 lg:pr-5 lg:pt-[6.5rem]">
            {/* Cada linha do título inteira a partir de 1024 px; a coluna tem só a largura do título (a frase e os botões
                cabem nela), para o cartão ficar com o resto. O bloco assenta à altura do fundo do cartão */}
            <div className="hero-in lg:w-min lg:pb-[clamp(1.5rem,6vh,4.5rem)]">
              <h1 className="t-hero">
                {h.hero.lines.map((l) => (
                  <span key={l} className="block lg:whitespace-nowrap">
                    {l}
                  </span>
                ))}
              </h1>
              {/* A partir de 1280 px a frase acompanha o título: até 1,5rem por volta dos 1920 px */}
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/90 md:text-xl xl:mt-7 xl:max-w-[33rem] xl:text-[clamp(1.25rem,0.55rem+0.8vw,1.5rem)]">
                {h.hero.sub}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 xl:mt-10">
                <WhatsAppButton message={wa.general()} location="hero" label={t.common.whatsappCta} className="xl:min-h-14 xl:px-7 xl:text-base" />
                <CallButton location="hero" label={t.common.phoneDisplay} note={t.common.phoneNote} variant="onDark" className="xl:min-h-14 xl:px-7 xl:text-base" />
              </div>
              {hasRating && (
                <p className="mt-6 flex items-center gap-2.5 text-[15px] text-white/90">
                  <Star className="size-4 fill-[#f2b632] text-[#f2b632]" aria-hidden />
                  {googleUrl ? (
                    <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4">
                      {ratingText}
                    </a>
                  ) : (
                    ratingText
                  )}
                </p>
              )}
            </div>

            {/* No desktop o cartão ocupa a altura toda do painel abaixo do header (--card-h) e toda a largura que o título
                deixa, até 1,1 vezes a altura; mais largo do que a foto (0,926), o recorte (preso em cima, em media.ts)
                corta só em baixo, na toalha e na marquesa. Abre de cima para baixo e assenta, como a foto larga das
                páginas de serviço (globals.css). */}
            <div className="svc-shutter relative -mx-3 aspect-[4/5] overflow-hidden rounded-[22px] bg-teal-dark sm:mx-auto sm:w-full sm:max-w-[40rem] md:rounded-[24px] lg:mx-0 lg:aspect-auto lg:h-(--card-h) lg:max-w-[calc(var(--card-h)*1.1)] lg:justify-self-end lg:[--card-h:calc(max(40rem,100svh-2.25rem)-7.75rem)]">
              <div className="svc-settle absolute inset-0">
                <Media id="hero" locale={locale} cover priority sizes="(min-width: 1024px) 54vw, (min-width: 640px) 40rem, 100vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tudo num só espaço: os quatro recursos da clínica, cada um com ligação direta */}
      <section aria-labelledby="hub-title" className="bg-white pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="container-x">
          <div className="grid items-center gap-10 rounded-[34px] bg-[radial-gradient(120%_90%_at_85%_0%,#ffffff_0%,transparent_55%),linear-gradient(135deg,var(--f4y-mist),#e9f0f2)] p-6 sm:p-10 md:grid-cols-[1fr_1.1fr] md:gap-12 lg:p-16">
            <div>
              <h2 id="hub-title" className="t-h2 max-w-lg">
                {h.hub.title}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-grey">{h.hub.text}</p>
              <Link
                href={href(locale, "services")}
                className="group mt-9 inline-flex min-h-13 items-center gap-4 rounded-full bg-teal-strong py-2 pl-7 pr-2 text-[15px] font-semibold text-white transition-colors hover:bg-teal-dark"
              >
                {h.hub.cta}
                <span className="flex size-9 items-center justify-center rounded-full bg-white text-teal-strong transition-transform group-hover:translate-x-0.5">
                  <ChevronRight className="size-5" aria-hidden />
                </span>
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {hubItems.map((it) => (
                <li key={it.icon}>
                  <Link
                    href={it.href}
                    className="card-hover card-lift group flex aspect-square flex-col items-center justify-center gap-4 rounded-[24px] bg-white p-4 text-center shadow-[0_14px_30px_-20px_rgba(14,76,87,.45)] ring-1 ring-line/70 sm:max-h-[230px] sm:aspect-auto sm:h-[clamp(170px,17vw,230px)]"
                  >
                    <Pictogram name={it.icon} className="card-icon size-16 text-teal-dark group-hover:text-teal-strong sm:size-20 lg:size-24" />
                    <span className="card-title text-[15px] font-semibold leading-snug text-ink">{it.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Os dois serviços */}
      <Section tone="light" id="servicos" labelledBy="servicos-title" className="pt-0 md:pt-4">
        <SectionTitle title={h.featured.title} intro={h.featured.intro} id="servicos-title" />
        <div className="mt-14">
          <ServiceDuo
            locale={locale}
            more={h.stack.more}
            includesLabel={h.featured.includesLabel}
            lead={{
              title: msk.name,
              text: msk.short,
              media: msk.mediaId,
              href: href(locale, "service:msk"),
              modules: (msk.modules ?? []).map((m) => ({ title: m.title, summary: m.summary, href: href(locale, "service:msk", m.noChapter ? undefined : m.id) })),
            }}
            second={{
              title: dermato.name,
              text: dermato.heroSub,
              media: dermato.mediaId,
              href: href(locale, "service:dermato"),
              points: dermato.forWho.items.slice(0, 3).map((i) => i.title),
            }}
          />
        </div>
      </Section>

      {/* Faixa com as melhores fotos da clínica a deslizar devagar para a direita, de ponta a ponta, e a frase da marca por baixo */}
      <section aria-labelledby="fotos-title" className="bg-white pb-20 md:pb-28">
        <PhotoStrip
          photos={photoStrip.map((id) => ({
            id,
            node: <Media id={id} locale={locale} cover sizes="(min-width: 1790px) 340px, (min-width: 1053px) 19vw, 200px" />,
          }))}
          labels={h.photoStrip}
        />
        <div className="container-x mt-12 text-center md:mt-16">
          <h2 id="fotos-title" className="t-h2">
            {h.photoStrip.title}
          </h2>
          <p className="t-lead mx-auto mt-4 max-w-xl">{h.photoStrip.sub}</p>
        </div>
      </section>

      {/* Instagram: quatro vídeos da clínica, cada um abre o post. As entrevistas do Mário e da Angela estão nos
          cartões da equipa e o testemunho do Pedro junto das avaliações. */}
      <Section tone="mist" labelledBy="instagram-title">
        <InstagramFeed
          posts={instagramFor(locale)}
          profileUrl={instagramUrl}
          titleId="instagram-title"
          labels={{ ...h.instagram, newWindow: t.common.newWindow }}
        />
      </Section>

      {/* Avaliações Google (só 5 estrelas) no azul da marca, com a foto do Mário com clientes e o vídeo do Pedro Senra
          (cliente) lado a lado. A partir de 1280 px: à esquerda o título e, por baixo, a foto e o vídeo; à direita as
          avaliações, a começar à altura do título. Entre 1024 e 1279 px: título ao lado da foto e do vídeo, avaliações
          por baixo a toda a largura. Em telemóvel e tablet: título, foto e vídeo, avaliações. */}
      {realReviews.length > 0 && (
        <section aria-labelledby="reviews-title" className="px-2 md:px-4">
          <div className="on-dark rounded-[28px] bg-[linear-gradient(160deg,#118193_0%,#0d6b7a_50%,#0c6372_100%)] text-white md:rounded-[34px]">
            <div className="container-x grid gap-8 py-16 md:gap-10 md:py-20 lg:grid-cols-2 lg:gap-x-16 xl:grid-rows-[auto_1fr] xl:gap-x-20 xl:gap-y-12">
              <h2 id="reviews-title" className="t-h2 max-w-xl lg:self-center xl:col-start-1 xl:self-start">
                {h.reviews.title}
              </h2>
              <div className="grid w-full max-w-2xl grid-cols-2 items-start gap-3 sm:gap-4 lg:max-w-none xl:col-start-1">
                <figure>
                  <div className="card-photo relative aspect-[4/5] overflow-hidden rounded-[22px] shadow-[0_24px_50px_-28px_rgba(6,40,46,.6)]">
                    <Media id="athletes" locale={locale} cover sizes="(min-width: 1024px) 22vw, 48vw" />
                  </div>
                  <figcaption className="mt-3 text-sm">{h.reviews.photoCaption}</figcaption>
                </figure>
                <VideoCard
                  video={clientVideo}
                  labels={videoLabels}
                  sizes="(min-width: 1024px) 22vw, 48vw"
                  className="mt-10 shadow-[0_24px_50px_-28px_rgba(6,40,46,.6)] sm:mt-16"
                />
              </div>
              <div className="lg:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-span-2 xl:row-start-1">
                <Testimonials
                  reviews={realReviews}
                  sourceLabel={h.reviews.source}
                  allLabel={hasRating ? `${h.reviews.all} · ${ratingText}` : h.reviews.all}
                  allHref={reviewsUrl}
                  newWindow={t.common.newWindow}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Equipa: quem está à frente da clínica (nomes e cargos das entrevistas em vídeo) */}
      {team.length > 0 && (
        <Section tone="light" labelledBy="equipa-title">
          <SectionTitle title={h.team.title} id="equipa-title" />
          <ul className="mt-12 grid gap-5 lg:grid-cols-2">
            {team.map((m) => (
              <li key={m.media}>
                <TeamMember locale={locale} mediaId={m.media} name={m.name} role={m.role} focus={m.focus} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaTriad locale={locale} waMessage={wa.general()} />
    </>
  );
}
