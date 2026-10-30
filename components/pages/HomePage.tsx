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
import { Advantages } from "../Advantages";
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
      {/* Hero com a foto do Mário a tratar um utente (sem vídeo, a pedido do cliente) e pouco texto: título, uma frase
          e os dois contactos. A foto é vertical: até 1024 px fica em cima, a fundir-se com o painel, e o texto por baixo;
          a partir de 1024 px ocupa a parte direita e o degradê teal cobre o mural do lado esquerdo da foto. */}
      <section className="px-2 pb-6 pt-2 md:px-4 md:pt-3">
        <div className="on-dark relative overflow-hidden rounded-[28px] bg-panel text-white md:rounded-[34px]">
          {/* Até 1024 px, o recorte quadrado mantém o rosto e as mãos e deixa de fora o topo do mural; o título assenta nas pernas do utente. */}
          {/* A partir de 1024 px, a foto mostra-se quase inteira: toda a largura e da faixa dos rostos do mural (18% de
              cima, que fica de fora) até ao fundo. Para isso a caixa tem 0,915× a altura do hero (3/4 × 1/0,82; 33rem cobre
              o hero mais baixo, quando é o texto que lhe dá a altura) e a foto assenta no fundo; 133,333cqw é a altura da
              foto. Em ecrãs largos a caixa nunca fica abaixo de 47% do painel, para não sobrar teal a mais: a foto amplia
              um pouco e perde só o fundo (as meias). O rebordo esquerdo funde-se no teal com uma máscara. */}
          <div className="relative aspect-square [--media-pos:50%_66%] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[max(47%,calc((100svh_-_8rem)*0.915),33rem)] lg:[container-type:size] lg:[--media-pos:50%_min(0px,max(100cqh_-_133.333cqw,-24cqw))] lg:[mask-image:linear-gradient(90deg,transparent,#000_24%)]">
            <Media id="hero" locale={locale} cover priority sizes="(min-width: 1536px) 50vw, (min-width: 1024px) 64vw, 100vw" placeholder="corner" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,var(--f4y-panel)_0%,var(--f4y-panel)_10%,rgba(29,90,100,0)_36%)] lg:hidden" />
          </div>
          <div className="relative -mt-8 flex flex-col px-5 pb-8 sm:-mt-28 md:px-12 md:pb-12 lg:mt-0 lg:min-h-[calc(100svh-8rem)] lg:justify-center lg:py-16">
            {/* Em ecrãs mais altos do que largos a foto chega por baixo do texto: um véu teal atrás do texto mantém-no legível */}
            <div className="hero-in relative isolate lg:max-w-[48%] lg:before:absolute lg:before:inset-y-[-100vh] lg:before:left-[-50vw] lg:before:right-[-6rem] lg:before:-z-10 lg:before:bg-[linear-gradient(90deg,var(--f4y-panel)_calc(100%-6rem),rgba(29,90,100,0))]">
              <h1 className="t-hero">
                {h.hero.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/90 md:text-xl">{h.hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton message={wa.general()} location="hero" label={t.common.whatsappCta} />
                <CallButton location="hero" label={t.common.phoneDisplay} note={t.common.phoneNote} variant="onDark" />
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

      {/* Vantagens: acordeão em que cada ponto mostra a sua foto real e leva à secção onde se vê mais */}
      <Section tone="light" labelledBy="vantagens-title">
        <Advantages
          title={h.advantages.title}
          titleId="vantagens-title"
          items={h.advantages.items.map((it) => ({
            title: it.title,
            text: it.text,
            media: <Media id={it.media} locale={locale} cover sizes="(min-width: 768px) 50vw, 100vw" />,
            link: { label: it.link.label, href: href(locale, it.link.page, it.link.hash) },
          }))}
        />
      </Section>

      {/* Tudo num só espaço: os quatro recursos da clínica, cada um com ligação direta */}
      <section aria-labelledby="hub-title" className="bg-white pb-16 md:pb-24">
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
