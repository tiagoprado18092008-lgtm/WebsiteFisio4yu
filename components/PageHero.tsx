import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; href: string };

/** Caminho até à página atual. `onDark`: para painéis escuros (hero dos serviços). */
export function Breadcrumbs({ crumbs, onDark }: { crumbs: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", onDark ? "text-white/80" : "text-muted")}>
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
            {i < crumbs.length - 1 ? (
              <Link href={c.href} className={cn("inline-flex min-h-8 items-center", onDark ? "hover:text-white" : "hover:text-teal-strong")}>
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className={onDark ? "text-white" : "text-ink"}>
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Hero das páginas internas: breadcrumb, título, introdução, ações e fotografia à direita. */
export function PageHero({ crumbs, title, sub, actions, media }: {
  crumbs: Crumb[]; title: string; sub?: string; actions?: React.ReactNode; media?: React.ReactNode;
}) {
  return (
    <section className="bg-white pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="container-x">
        <Breadcrumbs crumbs={crumbs} />
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
