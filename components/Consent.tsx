"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { site } from "@/content/site";
import { btn } from "./Buttons";

type Consent = "granted" | "denied" | null;
const KEY = "f4y-consent";
// O mapa tem consentimento próprio: carregá-lo não autoriza a medição (GTM).
const MAPS_KEY = "f4y-maps";
const Ctx = createContext<{ consent: Consent; maps: boolean; set: (c: Exclude<Consent, null>) => void; allowMaps: () => void; reopen: () => void }>({
  consent: null,
  maps: false,
  set: () => {},
  allowMaps: () => {},
  reopen: () => {},
});
export const useConsent = () => useContext(Ctx);

type BannerText = { text: string; accept: string; reject: string; more: string; href: string };

export function ConsentProvider({ children, banner }: { children: React.ReactNode; banner: BannerText }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [mapsOnly, setMapsOnly] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let v: Consent = null;
    try {
      v = localStorage.getItem(KEY) as Consent;
      setMapsOnly(localStorage.getItem(MAPS_KEY) === "granted");
    } catch {}
    setConsent(v);
    setOpen(!v);
    setReady(true);
  }, []);

  const set = useCallback((c: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(KEY, c);
      if (c === "denied") localStorage.removeItem(MAPS_KEY);
    } catch {}
    if (c === "denied") setMapsOnly(false);
    setConsent(c);
    setOpen(false);
  }, []);

  const allowMaps = useCallback(() => {
    try {
      localStorage.setItem(MAPS_KEY, "granted");
    } catch {}
    setMapsOnly(true);
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
    <Ctx.Provider value={{ consent, maps: consent === "granted" || mapsOnly, set, allowMaps, reopen: () => setOpen(true) }}>
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
      className="fixed inset-x-3 bottom-[84px] z-[60] mx-auto max-w-xl rounded-[var(--radius-img)] border border-line bg-white p-5 text-ink shadow-[0_20px_50px_-12px_rgba(14,76,87,.3)] md:bottom-6 md:left-6 md:right-auto"
    >
      <p className="text-sm leading-relaxed text-grey">
        {t.text}{" "}
        <Link href={t.href} className="underline underline-offset-2 text-teal-dark">
          {t.more}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
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
