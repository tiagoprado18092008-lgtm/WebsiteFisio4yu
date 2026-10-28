import { site } from "@/content/site";
import type { Dict } from "@/content";

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

const fill = (tpl: string, key: string, value: string) => tpl.replace(`{${key}}`, value);

export const waMessages = (t: Dict) => ({
  general: () => t.wa.general,
  service: (name: string) => fill(t.wa.service, "s", name),
  problem: (topic: string) => fill(t.wa.problem, "p", topic),
  notify: (name: string) => fill(t.wa.notify, "s", name),
});
