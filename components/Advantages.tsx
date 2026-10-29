"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { title: string; text: string; media: React.ReactNode; link: { label: string; href: string } };

/**
 * Vantagens em acordeão (só uma aberta), cada uma com a sua foto e um link para ver mais.
 * Desktop: a foto ao lado troca, com um fade, para a do ponto aberto. Telemóvel: a foto aparece dentro do ponto aberto.
 */
export function Advantages({ title, titleId, items }: { title: string; titleId: string; items: Item[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 lg:gap-24">
      <div>
        <h2 id={titleId} className="t-h2 max-w-lg">
          {title}
        </h2>
        <ul className="mt-10 divide-y divide-line border-y border-line md:mt-12">
          {items.map((it, i) => {
            const on = i === open;
            return (
              <li key={it.title}>
                <h3>
                  <button
                    type="button"
                    id={`adv-${i}`}
                    aria-expanded={on}
                    aria-controls={`adv-panel-${i}`}
                    onClick={() => setOpen(i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.85rem)] leading-tight tracking-[-0.015em] text-ink transition-colors",
                        !on && "group-hover:text-teal-strong",
                      )}
                    >
                      {it.title}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300",
                        on ? "rotate-45 bg-teal-strong text-white" : "bg-ice text-teal-strong group-hover:bg-[#d3e8ec]",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`adv-panel-${i}`}
                  role="region"
                  aria-labelledby={`adv-${i}`}
                  inert={!on}
                  className={cn("grid transition-[grid-template-rows] duration-300 ease-out", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6">
                      <p className="max-w-md text-lg leading-relaxed text-grey">{it.text}</p>
                      <Link href={it.link.href} className="link mt-3 inline-flex min-h-11 items-center">
                        {it.link.label}
                      </Link>
                      <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-[20px] md:hidden">{it.media}</div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Foto do ponto aberto: todas carregadas, só a ativa visível */}
      <div className="relative hidden aspect-square overflow-hidden rounded-[28px] bg-mist md:block lg:aspect-[8/7]">
        {items.map((it, i) => (
          <div
            key={it.title}
            aria-hidden={i !== open}
            className={cn("absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none", i === open ? "opacity-100" : "opacity-0")}
          >
            {it.media}
          </div>
        ))}
      </div>
    </div>
  );
}
