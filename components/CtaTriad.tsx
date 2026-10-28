import { MapPin } from "lucide-react";
import { getDict } from "@/content";
import { fullAddress, mapsDirections } from "@/content/site";
import type { Locale } from "@/lib/routes";
import { BookingCard } from "./BookingCard";
import { MapEmbed } from "./MapEmbed";

/**
 * Bloco final: painel teal com título + cartão de marcação sobreposto.
 * O mapa (iframe com consentimento) só entra nos Contactos (`withMap`); nas outras páginas fica uma linha com a morada.
 * `photo={false}` (página de contactos): só cartão (com email) e mapa, lado a lado, sem repetir o título.
 * `data-hide-fab`: o botão flutuante de WhatsApp esconde-se enquanto este bloco está visível.
 */
export function CtaTriad({ locale, waMessage, location = "cta-final", withMap = false, photo = true }: {
  locale: Locale; waMessage: string; location?: string; withMap?: boolean; photo?: boolean;
}) {
  const t = getDict(locale);
  const c = t.ctaFinal;
  if (!photo) {
    return (
      <section aria-label={t.home.booking.title} data-hide-fab className="bg-white pb-16 md:pb-24">
        <div className="container-x grid items-stretch gap-6 md:grid-cols-[400px_1fr]">
          <BookingCard locale={locale} waMessage={waMessage} location={location} withAddress withEmail />
          {withMap && <MapEmbed {...t.map} />}
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="cta-title" data-hide-fab className="bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="relative">
          <div className="on-dark relative min-h-[420px] overflow-hidden rounded-[30px] bg-panel md:min-h-[480px] md:w-[78%]">
            <div className="relative flex min-h-[420px] flex-col justify-center p-8 text-white md:min-h-[480px] md:max-w-[60%] md:p-14">
              <h2 id="cta-title" className="t-h1">
                {c.title}
              </h2>
              <p className="mt-5 max-w-sm text-lg text-white/90">{c.sub}</p>
            </div>
          </div>
          <BookingCard
            locale={locale}
            waMessage={waMessage}
            location={location}
            withAddress
            className="relative -mt-10 mx-3 ring-[10px] ring-white md:absolute md:right-0 md:top-1/2 md:mx-0 md:mt-0 md:w-[400px] md:-translate-y-1/2"
          />
        </div>
        {withMap ? (
          <div className="mt-14">
            <MapEmbed {...t.map} />
          </div>
        ) : (
          // Em telemóvel o cartão logo acima já mostra a morada (com link de direções): a linha só aparece a partir de tablet
          <p className="mt-10 hidden flex-wrap items-center md:flex gap-x-5 gap-y-2 border-t border-line pt-6 text-grey md:mt-14">
            <span className="inline-flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-teal-strong" aria-hidden />
              {fullAddress}
            </span>
            <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
              {t.map.open}
              <span className="sr-only"> {t.common.newWindow}</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
