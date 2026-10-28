import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { href, pageKeys } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return pageKeys.map((p) => ({
    url: site.url + href("pt", p),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "home" ? 1 : p.startsWith("service") ? 0.8 : 0.5,
    alternates: { languages: { "pt-PT": site.url + href("pt", p), en: site.url + href("en", p) } },
  }));
}
