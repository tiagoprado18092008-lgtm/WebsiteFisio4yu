"use client";

import { MapPin } from "lucide-react";
import { mapsDirections, mapsEmbed } from "@/content/site";
import { useConsent } from "./Consent";
import { btn } from "./Buttons";

/** Iframe do Google Maps só após consentimento; até lá, cartão com link. */
export function MapEmbed({ title, consentText, load, open }: { title: string; consentText: string; load: string; open: string }) {
  const { maps, allowMaps } = useConsent();
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-img)] bg-mist md:aspect-[21/9]">
      {maps ? (
        <iframe src={mapsEmbed} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-ink">
          <MapPin className="size-8 text-teal" aria-hidden />
          <p className="max-w-md text-sm text-grey">{consentText}</p>
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
