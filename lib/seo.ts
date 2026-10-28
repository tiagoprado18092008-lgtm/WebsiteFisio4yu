import type { Metadata } from "next";
import { site, fullAddress } from "@/content/site";
import { ogCover } from "@/content/media";
import { getDict, type Dict } from "@/content";
import { href, type Locale, type PageKey } from "./routes";

export function pageMeta(locale: Locale, page: PageKey): { title: string; description: string } {
  const t = getDict(locale);
  if (page.startsWith("service:")) return t.services[page.slice(8) as keyof Dict["services"]].meta;
  return t.meta[page as keyof Dict["meta"]];
}

export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const { title, description } = pageMeta(locale, page);
  const url = site.url + href(locale, page);
  const images = ogCover ? [{ url: ogCover, width: 1200, height: 630 }] : undefined;
  return {
    metadataBase: new URL(site.url),
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-PT": site.url + href("pt", page),
        en: site.url + href("en", page),
        "x-default": site.url + href("pt", page),
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images?.map((i) => i.url) },
    robots: { index: true, follow: true },
  };
}

const pending = (v: string) => v.startsWith("[[");

export function clinicJsonLd(locale: Locale) {
  const sameAs = Object.values(site.social).filter((v) => !pending(v));
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${site.url}/#clinic`,
    name: `${site.name} · ${site.tagline}`,
    legalName: site.legalName,
    url: site.url + href(locale, "home"),
    logo: `${site.url}/brand/logo.png`,
    image: ogCover ? site.url + ogCover : `${site.url}/brand/logo.png`,
    telephone: "+351924098545",
    email: site.email,
    priceRange: "€€",
    medicalSpecialty: "Physiotherapy",
    taxID: site.nif.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`,
    areaServed: ["Portimão", "Alvor", "Praia da Rocha", "Lagoa", "Lagos", "Silves"],
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => ({ Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" })[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.googleRating && site.googleReviewCount
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: site.googleRating, reviewCount: site.googleReviewCount } }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: site.url + i.url })),
  };
}

export function serviceJsonLd(locale: Locale, name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name,
    description,
    url: site.url + url,
    inLanguage: locale === "pt" ? "pt-PT" : "en",
    provider: { "@id": `${site.url}/#clinic` },
    areaServed: "Portimão",
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
