export type Locale = "pt" | "en";
export const locales: Locale[] = ["pt", "en"];

export const serviceKeys = ["msk", "dermato"] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export type PageKey =
  | "home"
  | "services"
  | `service:${ServiceKey}`
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "cookies";

const slugs: Record<Locale, Record<PageKey, string>> = {
  pt: {
    home: "",
    services: "servicos",
    "service:msk": "servicos/fisioterapia-musculoesqueletica",
    "service:dermato": "servicos/fisioterapia-dermatofuncional",
    about: "sobre",
    contact: "contactos",
    privacy: "privacidade",
    terms: "termos",
    cookies: "cookies",
  },
  en: {
    home: "",
    services: "services",
    "service:msk": "services/musculoskeletal-physiotherapy",
    "service:dermato": "services/dermatofunctional-physiotherapy",
    about: "about",
    contact: "contact",
    privacy: "privacy",
    terms: "terms",
    cookies: "cookies",
  },
};

export const pageKeys = Object.keys(slugs.pt) as PageKey[];

/** Caminho público de uma página: PT na raiz, EN em /en. */
export function href(locale: Locale, page: PageKey, hash?: string) {
  const slug = slugs[locale][page];
  const base = locale === "pt" ? `/${slug}` : `/en${slug ? `/${slug}` : ""}`;
  return hash ? `${base}#${hash}` : base;
}

export function resolve(locale: Locale, slug: string[] | undefined): PageKey | null {
  const path = (slug ?? []).join("/");
  return pageKeys.find((k) => slugs[locale][k] === path) ?? null;
}

export function staticParams(locale: Locale) {
  return pageKeys.map((k) => ({ slug: slugs[locale][k] ? slugs[locale][k].split("/") : [] }));
}

export const otherLocale = (l: Locale): Locale => (l === "pt" ? "en" : "pt");
