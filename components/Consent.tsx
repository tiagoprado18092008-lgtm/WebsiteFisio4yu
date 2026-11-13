"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { site } from "@/content/site";
import { btn } from "./Buttons";

type Consent = "granted" | "denied" | null;
const KEY = "f4y-consent";
const Ctx = createContext<{ consent: Consent; set: (c: Exclude<Consent, null>) => void; reopen: () => void }>({
  consent: null,
  set: () => {},
  reopen: () => {},
});
export const useConsent = () => useContext(Ctx);

type BannerText = { text: string; accept: string; reject: string; more: string; href: string };

export function ConsentProvider({ children, banner }: { children: React.ReactNode; banner: BannerText }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let v: Consent = null;
    try {
      v = localStorage.getItem(KEY) as Consent;
    } catch {}
    setConsent(v);
    setOpen(!v);
    setReady(true);
  }, []);

  const set = useCallback((c: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    setConsent(c);
    setOpen(false);
  }, []);

  // GTM só depois de consentimento e com ID real
  useEffect(() => {
    if (consent !== "granted" || site.gtmId.startsWith("[[") || document.getElementById("gtm")) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const s = document.createElement("script");
    s.id = "gtm";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${site.gtmId}`;
    document.head.appendChild(s);
  }, [consent]);

  return (
    <Ctx.Provider value={{ consent, set, reopen: () => setOpen(true) }}>
      {children}
      {ready && open && <CookieBanner t={banner} set={set} />}
    </Ctx.Provider>
  );
}

function CookieBanner({ t, set }: { t: BannerText; set: (c: "granted" | "denied") => void }) {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      // Em telemóvel, compacto e logo acima da barra fixa (texto a 13 px, botões lado a lado a toda a largura): antes
      // tapava um terço do primeiro ecrã
      className="fixed inset-x-2 bottom-[calc(72px+env(safe-area-inset-bottom))] z-[60] mx-auto max-w-xl rounded-[20px] border border-line bg-white p-3.5 text-ink shadow-[0_20px_50px_-12px_rgba(14,76,87,.3)] md:bottom-6 md:left-6 md:right-auto md:rounded-[var(--radius-img)] md:p-5"
    >
      <p className="text-[13px] leading-snug text-grey md:text-sm md:leading-relaxed">
        {t.text}{" "}
        <Link href={t.href} className="underline underline-offset-2 text-teal-dark">
          {t.more}
        </Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:flex md:gap-3">
        <button type="button" onClick={() => set("granted")} className={btn.teal + " min-h-11 py-2.5"}>
          {t.accept}
        </button>
        <button type="button" onClick={() => set("denied")} className={btn.outline + " min-h-11 py-2.5"}>
          {t.reject}
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ label }: { label: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className="hover:text-teal-dark">
      {label}
    </button>
  );
}
