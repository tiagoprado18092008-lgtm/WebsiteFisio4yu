import type { Locale } from "@/lib/routes";
import { Media } from "./Media";

/** Percurso pelas salas da clínica, na ordem em que o utente as encontra (scroll horizontal com snap). */
export function VisitStrip({ locale, stops }: { locale: Locale; stops: { media: string; title: string; text: string }[] }) {
  return (
    <ol className="mr-[calc(50%-50vw)] flex snap-x snap-mandatory scroll-pl-0 gap-5 overflow-x-auto pb-6 pr-4 md:pr-8 [scrollbar-color:var(--f4y-line)_transparent] [scrollbar-width:thin]">
      {stops.map((s) => (
        <li key={s.title} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-img)]">
            <Media id={s.media} locale={locale} cover compact sizes="(min-width: 1024px) 30vw, 80vw" />
          </div>
          <h3 className="t-h3 mt-4">{s.title}</h3>
          <p className="mt-1 max-w-xs text-[15px] text-grey">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
