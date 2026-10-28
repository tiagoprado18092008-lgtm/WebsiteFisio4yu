"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Lista de vantagens em acordeão: só uma aberta de cada vez; a ativa fica a escuro, as outras a cinzento. */
export function Advantages({ items }: { items: { title: string; text: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="divide-y divide-line border-y border-line">
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
                    "font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.85rem)] leading-tight tracking-[-0.015em] transition-colors",
                    on ? "text-ink" : "text-grey group-hover:text-ink",
                  )}
                >
                  {it.title}
                </span>
                <ChevronRight
                  className={cn("size-5 shrink-0 transition-transform duration-300", on ? "rotate-90 text-teal-strong" : "text-grey")}
                  aria-hidden
                />
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
                <p className="max-w-md pb-6 text-lg leading-relaxed text-grey">{it.text}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
