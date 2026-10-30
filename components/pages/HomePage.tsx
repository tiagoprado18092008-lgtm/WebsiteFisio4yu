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
    { icon: "eco", label: h.hub.items.eco, href: href(locale, "service:msk", "ecografia") },
    { icon: "gym", label: h.hub.items.gym, href: href(locale, "service:msk", "ginasio") },
    { icon: "ice", label: h.hub.items.ice, href: href(locale, "service:msk", "recuperacao") },
    { icon: "postnatal", label: h.hub.items.postnatal, href: href(locale, "service:dermato") },
  ];
  return (
    <>
      {/* Hero em cartaz: a "Foto hero" do cliente (o Mário a tratar um utente, sem vídeo) ocupa o painel todo, com o
          header por cima (transparente no topo da página). Pouco texto: título, uma frase e os dois contactos. O Mário
          está à esquerda da foto, por isso a partir de 1024 px o texto fica à direita, sobre o mural e um degradê teal;
          em telemóvel fica em baixo. O margin negativo, igual à altura do header, sobe o painel para debaixo dele. */}
      <section className="-mt-20 px-2 pb-6 pt-2 md:-mt-[88px] md:px-4 md:pt-3">
        <div className="on-dark relative flex min-h-[max(36rem,calc(100svh-6.5rem))] flex-col justify-end overflow-hidden rounded-[28px] bg-panel text-white md:rounded-[34px] lg:min-h-[max(40rem,calc(100svh-2.25rem))]">
          <div className="absolute inset-0">
            <Media id="hero" locale={locale} cover priority sizes="(min-width: 2200px) 2200px, 100vw" placeholder="corner" />
          </div>
          {/* Degradês: escuro em cima para o logótipo branco; teal em baixo (telemóvel) ou à direita (desktop) para o texto */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,38,44,.55)_0%,rgba(9,38,44,0)_22%),linear-gradient(0deg,var(--f4y-panel)_0%,rgba(29,90,100,.92)_28%,rgba(29,90,100,0)_62%)] lg:bg-[linear-gradient(180deg,rgba(9,38,44,.5)_0%,rgba(9,38,44,0)_20%),linear-gradient(270deg,rgba(17,64,73,.92)_0%,rgba(17,64,73,.7)_32%,rgba(17,64,73,0)_62%),linear-gradient(0deg,rgba(17,64,73,.6)_0%,rgba(17,64,73,0)_40%)]"
          />
          <div className="relative px-5 pb-10 md:px-12 md:pb-14 lg:pb-[clamp(3.5rem,10vh,7.5rem)]">
            <div className="hero-in lg:ml-auto lg:w-[46%]">
              <h1 className="t-hero">
                {h.hero.lines.map((l) => (
                  <span key={l} className="block">
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
                    className="group flex aspect-square flex-col items-center justify-center gap-4 rounded-[24px] bg-white p-4 text-center shadow-[0_14px_30px_-20px_rgba(14,76,87,.45)] ring-1 ring-line/70 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-22px_rgba(14,76,87,.55)] sm:max-h-[230px] sm:aspect-auto sm:h-[clamp(170px,17vw,230px)]"
                  >
                    <Pictogram name={it.icon} className="size-16 text-teal-dark transition-colors group-hover:text-teal-strong sm:size-20 lg:size-24" />
                    <span className="text-[15px] font-semibold leading-snug text-ink">{it.label}</span>
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
              modules: (msk.modules ?? []).map((m) => ({ title: m.title, summary: m.summary, href: href(locale, "service:msk", m.id) })),
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
          (cliente) lado a lado. A partir de 1280 px: título e introdução numa linha e, por baixo, foto e vídeo à esquerda
          e as avaliações à direita, à mesma altura. Entre 1024 e 1279 px: título ao lado da foto e do vídeo, avaliações
          por baixo a toda a largura. Em telemóvel e tablet: título, foto e vídeo, avaliações. */}
      {realReviews.length > 0 && (
        <section aria-labelledby="reviews-title" className="px-2 md:px-4">
          <div className="on-dark rounded-[28px] bg-[linear-gradient(160deg,#118193_0%,#0d6b7a_50%,#0c6372_100%)] text-white md:rounded-[34px]">
            <div className="container-x grid gap-8 py-16 md:gap-10 md:py-20 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20 xl:gap-y-12">
              <div className="grid gap-5 lg:self-center xl:col-span-2 xl:grid-cols-2 xl:items-end xl:gap-x-20">
                <h2 id="reviews-title" className="t-h2 max-w-xl">
                  {h.reviews.title}
                </h2>
                <p className="max-w-lg text-lg leading-relaxed">{h.reviews.intro}</p>
              </div>
              <div className="grid w-full max-w-2xl grid-cols-2 items-start gap-3 sm:gap-4 lg:max-w-none">
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] shadow-[0_24px_50px_-28px_rgba(6,40,46,.6)]">
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
              <div className="lg:col-span-2 xl:col-span-1">
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
