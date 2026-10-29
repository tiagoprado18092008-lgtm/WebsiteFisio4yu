import Link from "next/link";
import type { IconName } from "@/content";
import type { Locale } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { Media } from "./Media";

/** Serviço em formato editorial: fotografia grande + texto + lista do que inclui. */
export function ServiceRow({ locale, mediaId, title, text, href, cta, includesLabel, includes, reverse }: {
  locale: Locale;
  mediaId: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  includesLabel?: string;
  includes?: { label: string; text: string; href: string }[];
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">
      {/* Em desktop a foto fica 5:4: em retrato, a coluna da imagem ficava muito mais alta do que o texto ao lado */}
      <Link href={href} tabIndex={-1} aria-hidden className={cn("block overflow-hidden rounded-[var(--radius-img)] md:[&>div]:aspect-[5/4]!", reverse && "md:order-last")}>
        <Media id={mediaId} locale={locale} compact sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-700 hover:scale-[1.02]" />
      </Link>
      <div>
        <h3 className="t-h2">
          <Link href={href} className="hover:text-teal-dark">
            {title}
          </Link>
        </h3>
        <p className="t-lead mt-4 max-w-lg">{text}</p>
        {includes && (
          <div className="mt-8">
            {includesLabel && <p className="text-sm font-semibold text-muted">{includesLabel}</p>}
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {includes.map((i) => (
                <li key={i.label}>
                  <Link href={i.href} className="group flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-semibold text-ink group-hover:text-teal-strong">{i.label}</span>
                    <span className="text-[15px] text-grey sm:max-w-[60%] sm:text-right">{i.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link href={href} className="link mt-6 inline-flex min-h-11 items-center">
          {cta}
        </Link>
      </div>
    </article>
  );
}

/** O outro serviço, no fim de cada página de serviço: uma linha com miniatura, sem repetir a secção inteira. */
export function RelatedService({ locale, mediaId, title, text, href, cta }: {
  locale: Locale; mediaId: string; title: string; text: string; href: string; cta: string;
}) {
  return (
    <Link href={href} className="group grid items-center gap-5 border-y border-line py-5 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8">
      <span className="relative block aspect-[3/2] overflow-hidden rounded-[18px]">
        <Media id={mediaId} locale={locale} cover sizes="(min-width: 640px) 220px, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
      </span>
      <span>
        <span className="block font-display text-2xl font-medium leading-tight tracking-tight text-ink group-hover:text-teal-dark md:text-[1.75rem]">{title}</span>
        <span className="mt-2 block max-w-lg text-grey">{text}</span>
        <span className="link mt-3 inline-flex min-h-11 items-center">{cta}</span>
      </span>
    </Link>
  );
}

/** Lista com ícone discreto, em duas colunas, separada por filetes (sem caixas). */
export function IconList({ items, cols = 2 }: { items: { icon: IconName; title: string; text: string }[]; cols?: 1 | 2 | 3 }) {
  // Número ímpar em duas colunas: o último item ocupa a linha toda, em vez de ficar com meio filete órfão
  const oddLast = cols > 1 && items.length % 2 === 1;
  return (
    <ul className={cn("grid border-t border-line", cols > 1 && "sm:grid-cols-2", cols === 3 && "lg:grid-cols-3")}>
      {items.map((it, i) => (
        <li
          key={it.title}
          className={cn(
            "flex gap-4 border-b border-line py-6 sm:pr-8",
            oddLast && i === items.length - 1 && "sm:col-span-2",
            oddLast && i === items.length - 1 && cols === 3 && items.length % 3 === 0 && "lg:col-span-1",
          )}
        >
          <Icon name={it.icon} className="mt-1 size-6 shrink-0 text-teal" />
          <div>
            <p className="t-h3">{it.title}</p>
            <p className="mt-1 text-grey">{it.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Pessoa da equipa em cartão: retrato, nome, função, especialização e (opcional) um vídeo. */
export function TeamMember({ locale, mediaId, name, role, focus, video }: {
  locale: Locale; mediaId: string; name: string; role: string; focus: string; video?: React.ReactNode;
}) {
  return (
    <figure className="grid h-full gap-6 rounded-[30px] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(14,76,87,.45)] ring-1 ring-line sm:grid-cols-[minmax(0,180px)_1fr] sm:items-center sm:p-6 xl:grid-cols-[minmax(0,210px)_1fr]">
      <div className="w-full max-w-[260px] overflow-hidden rounded-[22px]">
        <Media id={mediaId} locale={locale} compact sizes="(min-width: 640px) 210px, 260px" />
      </div>
      <figcaption>
        <p className="font-display text-2xl font-medium leading-tight tracking-tight md:text-[28px]">{name}</p>
        <p className="mt-1.5 text-[15px] font-medium text-teal-strong">{role}</p>
        <p className="mt-4 leading-relaxed text-grey">{focus}</p>
        {video && <div className="mt-6">{video}</div>}
      </figcaption>
    </figure>
  );
}

