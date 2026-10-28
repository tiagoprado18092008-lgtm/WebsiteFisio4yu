"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

/** Escuta cliques em qualquer elemento com data-track e envia para o dataLayer. */
export function TrackingListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      trackEvent("contact_click", {
        channel: el.dataset.track,
        location: el.dataset.location ?? "unknown",
        page: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
