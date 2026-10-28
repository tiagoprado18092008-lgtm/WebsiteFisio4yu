import { Plus } from "lucide-react";

/** Acordeão nativo (<details>) — acessível e sem JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="self-start divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-3 font-display text-lg font-semibold text-ink hover:text-teal-dark">
            {f.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ice text-teal-strong transition-transform group-open:rotate-45">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <p className="max-w-3xl pb-5 leading-relaxed text-grey">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
