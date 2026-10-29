import Link from "next/link";
import { Check } from "lucide-react";

type Step = { title: string; text: string; details?: string[]; links?: { label: string; href: string }[] };

/**
 * Percurso numerado (é uma sequência real): título fixo à esquerda, passos numa linha vertical à direita.
 * Cada passo pode ter o detalhe do que acontece (`details`) e ligações aos recursos usados nessa fase (`links`).
 */
export function JourneySteps({ title, intro, steps, id, linksLabel, cta }: {
  title: string; intro?: string; steps: Step[]; id: string; linksLabel?: string; cta?: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
      <div className="md:sticky md:top-40 md:self-start">
        <h2 id={id} className="t-h2">
          {title}
        </h2>
        {intro && <p className="t-lead mt-5 max-w-md">{intro}</p>}
        {cta && <div className="mt-8 hidden md:block">{cta}</div>}
      </div>
      <ol className="relative">
        {steps.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-12 last:pb-0">
            {i < steps.length - 1 && <span aria-hidden className="absolute left-6 top-12 h-[calc(100%-3rem)] w-px bg-line" />}
            <span className="flex size-12 items-center justify-center rounded-full border border-teal/40 bg-white font-display text-lg font-medium text-teal-strong">
              {i + 1}
            </span>
            <div className="pt-2.5">
              <h3 className="t-h3">{s.title}</h3>
              <p className="mt-2 max-w-md text-grey">{s.text}</p>
              {s.details && s.details.length > 0 && (
                <ul className="mt-4 max-w-md space-y-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[15px] text-ink">
                      <Check className="mt-1 size-4 shrink-0 text-teal-strong" strokeWidth={2.5} aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {s.links && s.links.length > 0 && (
                <p className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                  {linksLabel && <span className="mr-1 text-muted">{linksLabel}</span>}
                  {s.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex min-h-11 items-center rounded-full bg-ice px-4 font-semibold text-teal-dark transition-colors hover:bg-[#d3e8ec] md:min-h-9 md:px-3.5"
                    >
                      {l.label}
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
