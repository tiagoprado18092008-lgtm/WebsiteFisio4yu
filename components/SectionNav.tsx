"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Navegação interna fixa das páginas de serviço; marca a secção que está no ecrã.
 * Em telemóvel desliza na horizontal (sem partir os rótulos), com o separador ativo sempre à vista.
 */
export function SectionNav({ label, items }: { label: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    // A secção ativa é a que atravessa a faixa logo abaixo do header + navegação
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Traz o separador ativo para dentro da faixa quando a lista transborda
  useEffect(() => {
    const ul = listRef.current;
    const el = ul?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!ul || !el || ul.scrollWidth <= ul.clientWidth) return;
    ul.scrollTo({ left: el.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-20 z-30 border-y border-line bg-white/95 backdrop-blur md:top-[88px]">
      <ul
        ref={listRef}
        className="container-x flex gap-6 overflow-x-auto overscroll-x-contain whitespace-nowrap text-[15px] [mask-image:linear-gradient(to_right,#000_82%,transparent)] [scrollbar-width:none] md:gap-7 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((l) => (
          <li key={l.id} className="shrink-0 last:pr-10 md:last:pr-0">
            <a
              href={`#${l.id}`}
              aria-current={active === l.id ? "location" : undefined}
              className={cn(
                "relative inline-flex min-h-12 items-center text-grey transition-colors hover:text-teal-strong",
                "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-teal-strong after:transition-transform",
                active === l.id && "font-medium text-teal-strong after:scale-x-100",
              )}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
