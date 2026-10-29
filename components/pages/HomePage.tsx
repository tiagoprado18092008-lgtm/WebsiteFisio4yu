import Link from "next/link";
import { ChevronRight, Clock, Dumbbell, ScanLine, Snowflake, Star } from "lucide-react";
import { getDict } from "@/content";
import { site, isPending } from "@/content/site";
import { reviews } from "@/content/reviews";
import { videoFor } from "@/content/media";
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
  const homeVideos = h.videos.items.map((id) => videoFor(id, locale));
  const videoLabels = { play: t.common.watchVideo, close: t.common.close };
  const msk = t.services.msk;
  const dermato = t.services.dermato;
  const hours = `${t.hours.weekdaysShort}, ${site.hours[0].opens.replace(":", "h")}–${site.hours[0].closes.replace(":", "h")}`;
  const hubItems: { icon: PictogramName; label: string; href: string }[] = [
    { icon: "eco", label: h.hub.items.eco, href: href(locale, "service:msk", "ecografia") },
    { icon: "gym", label: h.hub.items.gym, href: href(locale, "service:msk", "ginasio") },
    { icon: "ice", label: h.hub.items.ice, href: href(locale, "service:msk", "recuperacao") },
    { icon: "postnatal", label: h.hub.items.postnatal, href: href(locale, "service:dermato") },
  ];
  const heroFacts = [
    { Ico: Clock, text: hours },
    { Ico: ScanLine, text: h.hero.facts[0] },
    { Ico: Dumbbell, text: h.hero.facts[1] },
    { Ico: Snowflake, text: h.hero.facts[2] },
  ];

  return (
    <>
      {/* Hero com a foto do ginásio (sem vídeo, a pedido do cliente). A foto é vertical:
          até 1024 px fica inteira em cima, a fundir-se com o painel, e o texto por baixo (as luzes não ficam atrás do título);
          a partir de 1024 px ocupa a metade direita e funde-se com o painel teal onde está o texto. */}
      <section className="px-2 pb-6 pt-2 md:px-4 md:pt-3">
        <div className="on-dark relative overflow-hidden rounded-[28px] bg-panel text-white md:rounded-[34px]">
          <div className="relative aspect-[4/3] md:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
            <Media id="hero" locale={locale} cover priority sizes="(min-width: 1024px) 50vw, 100vw" placeholder="corner" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,var(--f4y-panel)_0%,rgba(29,90,100,0)_45%)] lg:hidden" />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(0deg,rgba(16,24,27,.65)_0%,rgba(16,24,27,0)_34%),linear-gradient(90deg,var(--f4y-panel)_50%,rgba(29,90,100,.6)_58%,rgba(29,90,100,0)_70%)]"
          />
          <div className="relative flex flex-col justify-end px-5 pb-7 pt-1 md:px-12 md:pb-10 lg:min-h-[calc(100svh-8rem)] lg:pt-24">
            <div className="hero-in max-w-4xl lg:max-w-[50%]">
              <h1 className="t-hero">
                {h.hero.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">{h.hero.sub}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <WhatsAppButton message={wa.general()} location="hero" label={t.common.whatsappCta} />
                <CallButton location="hero" label={t.common.phoneDisplay} note={t.common.phoneNote} variant="onDark" />
              </div>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/25 pt-5 text-sm text-white/90 sm:flex sm:flex-wrap sm:gap-x-8 sm:text-[15px] md:mt-12">
              {heroFacts.map(({ Ico, text }) => (
                <li key={text} className="flex items-start gap-2.5 sm:items-center">
                  <Ico className="mt-0.5 size-4 shrink-0 text-ice sm:mt-0" aria-hidden />
                  {text}
                </li>
              ))}
              {hasRating && (
                <li className="flex items-center gap-2.5">
                  <Star className="size-4 fill-[#f2b632] text-[#f2b632]" aria-hidden />
                  {googleUrl ? (
                    <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4">
                      {ratingText}
                    </a>
                  ) : (
                    ratingText
                  )}
                </li>
              )}
            </ul>
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

      {/* Vídeos: entrevistas do Mário e da Angela e testemunhos de clientes. Tocam com som, só quando se carrega. */}
      <Section tone="mist" labelledBy="videos-title">
        <SectionTitle title={h.videos.title} intro={h.videos.intro} id="videos-title" />
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {homeVideos.map((v) => (
            <li key={v.id} className="w-[72%] shrink-0 snap-start sm:w-[42%] md:w-auto">
              <VideoCard video={v} labels={videoLabels} sizes="(min-width: 768px) 25vw, 72vw" />
            </li>
          ))}
        </ul>
      </Section>

      {/* Avaliações Google (só 5 estrelas) no azul da marca: foto do Mário com clientes à esquerda (fixa enquanto
          se lê, em desktop) e as avaliações todas à vista à direita. Em telemóvel: título, foto, avaliações. */}
      {realReviews.length > 0 && (
        <section aria-labelledby="reviews-title" className="px-2 md:px-4">
          <div className="on-dark rounded-[28px] bg-[linear-gradient(160deg,#118193_0%,#0d6b7a_50%,#0c6372_100%)] text-white md:rounded-[34px]">
            <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16 lg:gap-y-12 xl:gap-x-24">
              <div className="lg:col-start-2">
                <h2 id="reviews-title" className="t-h1 max-w-xl">
                  {h.reviews.title}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed">{h.reviews.intro}</p>
              </div>
              <figure className="lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_24px_50px_-28px_rgba(6,40,46,.6)] md:aspect-[3/2] lg:aspect-[3/4]">
                  <Media id="athletes" locale={locale} cover sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
                <figcaption className="mt-3 text-sm">{h.reviews.photoCaption}</figcaption>
              </figure>
              <div className="lg:col-start-2">
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
