import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, fullAddress, mapsDirections } from "@/content/site";
import { getDict } from "@/content";
import type { Locale } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { WhatsAppButton } from "./Buttons";

/** Cartão de marcação: WhatsApp (principal), telefone, horário e, opcionalmente, morada e email. Sem formulários. */
export function BookingCard({ locale, waMessage, location, className, withAddress, withEmail }: {
  locale: Locale; waMessage: string; location: string; className?: string; withAddress?: boolean; withEmail?: boolean;
}) {
  const t = getDict(locale);
  const b = t.home.booking;
  const hours = `${t.hours.weekdaysShort}, ${site.hours[0].opens.replace(":", "h")}–${site.hours[0].closes.replace(":", "h")}`;
  const row = "flex items-center gap-3 rounded-2xl bg-white/[.08] px-4 py-3 text-[15px]";
  return (
    <div className={cn("on-dark rounded-[28px] bg-panel p-6 text-white md:p-7", className)}>
      <p className="font-display text-2xl tracking-tight">{b.title}</p>
      <p className="mt-1 text-[15px] text-white/85">{b.text}</p>
      <div className="mt-5 space-y-2">
        <a href={site.phoneHref} data-track="phone" data-location={`${location}-cartao`} className={cn(row, "hover:bg-white/15")}>
          <Phone className="size-4 text-ice" aria-hidden />
          <span className="leading-tight">
            {t.common.phoneDisplay}
            <span className="block text-xs text-white/80">{t.common.phoneNote}</span>
          </span>
        </a>
        <p className={row}>
          <Clock className="size-4 text-ice" aria-hidden />
          <span>
            <span className="sr-only">{b.hoursLabel}: </span>
            {hours}
          </span>
        </p>
        {withAddress && (
          <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className={cn(row, "hover:bg-white/15")}>
            <MapPin className="size-4 shrink-0 text-ice" aria-hidden />
            <span>{fullAddress}</span>
          </a>
        )}
        {withEmail && (
          <a href={`mailto:${site.email}`} className={cn(row, "hover:bg-white/15")}>
            <Mail className="size-4 shrink-0 text-ice" aria-hidden />
            <span className="break-all">{site.email}</span>
          </a>
        )}
      </div>
      <WhatsAppButton message={waMessage} location={location} label={t.common.whatsappCta} className="mt-5 w-full" />
    </div>
  );
}
