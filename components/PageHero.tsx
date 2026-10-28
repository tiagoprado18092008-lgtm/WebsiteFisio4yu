import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { name: string; href: string };

/** Hero das páginas internas: breadcrumb, título, introdução, ações e fotografia à direita. */
export function PageHero({ crumbs, title, sub, actions, media }: {
  crumbs: Crumb[]; title: string; sub?: string; actions?: React.ReactNode; media?: React.ReactNode;
}) {
  return (
    <section className="bg-white pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="container-x">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-teal-strong">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={media ? "mt-10 grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16" : "mt-10"}>
          <div className="hero-in">
            <h1 className="t-h1 max-w-3xl">{title}</h1>
            {sub && <p className="t-lead mt-6 max-w-xl">{sub}</p>}
            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {/* Em desktop a foto fica 5:4 para o título e os botões caberem acima da dobra */}
          {media && <div className="overflow-hidden rounded-[28px] md:[&>div]:aspect-[5/4]!">{media}</div>}
        </div>
      </div>
    </section>
  );
}
