import type { Locale } from "@/lib/routes";
import { pt } from "./pt";
import { en } from "./en";

/**
 * Conteúdo por confirmar ([[...]], ver PENDENTES.md) nunca chega ao público:
 * - marcadores no meio de uma frase são retirados ("Mário [[apelido]]" → "Mário");
 * - um campo que fica vazio elimina o item da lista a que pertence (ex.: técnicas, equipa, linha do tempo).
 * Para rever o site com os marcadores visíveis: SHOW_PENDING=1 npm run dev
 */
const TOKEN = /\s*\[\[[^\]]*\]\]\s*/g;
const showPending = process.env.SHOW_PENDING === "1";

const DROP = Symbol("drop");

// `item`: o valor é um elemento de lista. Um texto vazio elimina o item; fora de listas, o campo fica "".
function strip(v: unknown, item = false): unknown {
  if (typeof v === "string") {
    if (!v.includes("[[")) return v;
    const s = v.replace(TOKEN, " ").replace(/\s{2,}/g, " ").trim();
    return s ? s : DROP;
  }
  if (Array.isArray(v)) {
    return v.map((x) => strip(x, true)).filter((x) => x !== DROP);
  }
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) {
      const s = strip(x);
      if (s === DROP && item) return DROP;
      out[k] = s === DROP ? "" : s;
    }
    return out;
  }
  return v;
}

const publish = <T,>(d: T): T => (showPending ? d : (strip(d) as T));

export const dictionaries = { pt: publish(pt), en: publish(en) };
export const getDict = (locale: Locale) => dictionaries[locale];
export type { Dict, IconName, ServiceComposer, ServiceContent } from "./pt";
