"use client";

import { MapPin } from "lucide-react";
import { mapsDirections, mapsEmbed, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useConsent } from "./Consent";
import { btn } from "./Buttons";

/**
 * Iframe do Google Maps só após consentimento; até lá, a morada em destaque com os dois botões.
 * Em telemóvel o cartão cresce com o conteúdo (num 16:10 estreito a morada e os botões não cabiam).
 */
export function MapEmbed({ title, consentText, load, open }: { title: string; consentText: string; load: string; open: string }) {
  const { maps, allowMaps } = useConsent();
  return (
    <div className={cn("relative w-full overflow-hidden rounded-[var(--radius-img)] bg-mist md:aspect-[21/9]", maps && "aspect-[16/10]")}>
      {maps ? (
        <iframe src={mapsEmbed} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 px-6 py-10 text-center text-ink md:absolute md:inset-0">
          <span className="flex size-14 items-center justify-center rounded-full bg-white text-teal-strong ring-1 ring-line">
            <MapPin className="size-6" aria-hidden />
          </span>
          <p className="font-display text-2xl leading-tight tracking-tight">
            {site.address.street}
            <span className="block text-grey">
              {site.address.postalCode} {site.address.city}
            </span>
          </p>
          <p className="max-w-md text-balance text-[15px] text-grey">{consentText}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={allowMaps} className={btn.teal}>
              {load}
            </button>
            <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className={btn.outline}>
              {open}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
