import Link from "next/link";
import type { Locale } from "@/lib/routes";
import { Media } from "./Media";

type Lead = {
  title: string;
  text: string;
  media: string;
  href: string;
  /** Recursos incluídos no serviço, cada um com âncora na página do serviço. */
  modules: { title: string; summary: string; href: string }[];
};
type Second = { title: string; text: string; media: string; href: string; points: string[] };

/**
 * Os dois serviços da clínica. A musculoesquelética lidera (com ecografia, ginásio e recuperação lá dentro);
 * a dermatofuncional fica ao lado, com o mesmo peso de leitura e um tom mais claro.
 */
export function ServiceDuo({ locale, lead, second, more, includesLabel }: { locale: Locale; lead: Lead; second: Second; more: string; includesLabel: string }) {
  const cta = "mt-8 inline-flex min-h-11 items-center self-start rounded-full px-5 text-[15px] font-semibold transition-colors";
  return (
    <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
      <article className="on-dark flex flex-col rounded-[30px] bg-panel p-6 text-white md:p-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[20px]">
          <Media id={lead.media} locale={locale} cover compact sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <h3 className="t-h2 mt-8">{lead.title}</h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{lead.text}</p>
        <p className="mt-8 text-sm font-semibold text-white/80">{includesLabel}</p>
        <ul className="mt-2 divide-y divide-white/20 border-y border-white/20">
          {lead.modules.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="group flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-semibold underline decoration-white/0 underline-offset-4 transition-colors group-hover:decoration-white">{m.title}</span>
                <span className="text-[15px] text-white/85 sm:text-right">{m.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={lead.href} className={`${cta} bg-white text-panel hover:bg-ice`}>
          {more}
          <span className="sr-only">: {lead.title}</span>
        </Link>
      </article>

      <article className="flex flex-col rounded-[30px] bg-mist p-6 text-ink md:p-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] lg:aspect-[4/3]">
          <Media id={second.media} locale={locale} cover compact sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <h3 className="t-h2 mt-8">{second.title}</h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-grey">{second.text}</p>
        <ul className="mt-8 space-y-2.5">
          {second.points.map((p) => (
            <li key={p} className="flex items-center gap-3 font-medium">
              <span className="size-1.5 shrink-0 rounded-full bg-teal-strong" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        <Link href={second.href} className={`${cta} bg-panel text-white hover:bg-teal-dark lg:mt-auto`}>
          {more}
          <span className="sr-only">: {second.title}</span>
        </Link>
      </article>
    </div>
  );
}
