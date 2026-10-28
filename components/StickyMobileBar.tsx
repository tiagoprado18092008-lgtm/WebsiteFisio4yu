import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icon";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

type Props = { waMessage: string; callLabel: string; waLabel: string; floatingLabel: string };

/** Barra fixa em mobile (Ligar + WhatsApp) e botão flutuante de WhatsApp a partir de tablet. */
export function StickyMobileBar({ waMessage, callLabel, waLabel, floatingLabel }: Props) {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a
          href={site.phoneHref}
          data-track="phone"
          data-location="sticky"
          className="flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-teal-dark/30 font-semibold text-teal-dark"
        >
          <Phone className="size-[18px]" aria-hidden />
          {callLabel}
        </a>
        <a
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp"
          data-location="sticky"
          className="flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-whatsapp font-semibold text-[#06301a]"
        >
          <WhatsAppIcon className="size-5" />
          {waLabel}
        </a>
      </div>
      <FloatingWhatsApp href={waLink(waMessage)} label={floatingLabel} />
    </>
  );
}
