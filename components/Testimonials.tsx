import { ArrowUpRight, Star } from "lucide-react";
import type { Review } from "@/content/reviews";
import { GoogleIcon } from "./Icon";

/**
 * Avaliações Google todas à vista (são poucas e curtas): estrelas, citação e autor, separadas por filetes,
 * em duas colunas quando há largura (uma só entre 1024 e 1279 px, ao lado da foto). Pensado para o painel azul da home
 * (texto branco). Fecha com o link para o Google.
 */
export function Testimonials({ reviews, sourceLabel, allLabel, allHref, newWindow }: {
  reviews: Review[]; sourceLabel: string; allLabel: string; allHref: string; newWindow: string;
}) {
  const initial = (name: string | null) => (name ?? "?").trim().charAt(0).toUpperCase();

  return (
    <div>
      <ul className="grid border-b border-white/25 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-1 xl:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.name ?? r.text} className="border-t border-white/25 py-7">
            <figure className="flex h-full flex-col">
              <div className="flex gap-1 text-[#ffc542]" role="img" aria-label={`${r.rating}/5`}>
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 font-display text-xl leading-snug tracking-tight md:text-[1.4rem]">“{r.text}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white font-semibold text-teal-dark">
                  {initial(r.name)}
                </span>
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <GoogleIcon className="size-3.5" />
                    {sourceLabel}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <a
        href={allHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-dark transition-colors hover:bg-ice sm:inline-flex sm:w-auto sm:pl-5 sm:text-[15px]"
      >
        <GoogleIcon className="size-4" />
        {allLabel}
        <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only"> {newWindow}</span>
      </a>
    </div>
  );
}
