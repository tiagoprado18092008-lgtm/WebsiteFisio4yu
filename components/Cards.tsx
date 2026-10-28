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
      <Link href={href} tabIndex={-1} aria-hidden className={cn("block overflow-hidden rounded-[var(--radius-img)]", reverse && "md:order-last")}>
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
                <li key={i.href}>
                  <Link href={i.href} className="group flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-semibold text-ink group-hover:text-teal-strong">{i.label}</span>
                    <span className="text-[15px] text-grey sm:max-w-[60%] sm:text-right">{i.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link href={href} className="link mt-8 inline-block">
          {cta}
        </Link>
      </div>
    </article>
  );
}

/** Lista com ícone discreto, em duas colunas, separada por filetes (sem caixas). */
export function IconList({ items, cols = 2 }: { items: { icon: IconName; title: string; text: string }[]; cols?: 1 | 2 | 3 }) {
  return (
    <ul className={cn("grid border-t border-line", cols > 1 && "sm:grid-cols-2", cols === 3 && "lg:grid-cols-3")}>
      {items.map((it) => (
        <li key={it.title} className="flex gap-4 border-b border-line py-6 sm:pr-8">
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

