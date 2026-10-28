"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { WhatsAppButton } from "./Buttons";

type NavLink = { label: string; href: string; badge?: string };
type Props = {
  homeHref: string;
  logo: React.ReactNode;
  links: { home: NavLink; services: NavLink & { children: NavLink[] }; about: NavLink; contact: NavLink };
  /** Língua atual (só texto) e link para a outra língua. */
  lang: { current: string; other: string; href: string; label: string; hrefLang: string };
  labels: { book: string; open: string; close: string; phoneNote: string; phone: string; homeAria: string; nav: string };
  waMessage: string;
};

/** Seletor "PT | EN": a língua ativa a teal, a outra é o link. */
function LangSwitch({ lang, onNavigate }: { lang: Props["lang"]; onNavigate?: () => void }) {
  const isPt = lang.current === "PT";
  const active = <span className="text-teal-strong">{lang.current}</span>;
  const other = (
    <Link
      href={lang.href}
      hrefLang={lang.hrefLang}
      aria-label={lang.label}
      onClick={onNavigate}
      className="-mx-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ink/75 hover:bg-mist hover:text-ink"
    >
      {lang.other}
    </Link>
  );
  return (
    <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
      {isPt ? active : other}
      <span className="h-3.5 w-px bg-line" aria-hidden />
      {isPt ? other : active}
    </span>
  );
}

export function Header({ homeHref, logo, links, lang, labels, waMessage }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  // Página atual: correspondência exata; "Serviços" também fica ativo nas páginas de cada serviço
  const current = (href: string, section = false) =>
    pathname === href || (section && href !== "/" && pathname.startsWith(`${href}/`)) ? ("page" as const) : undefined;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Fecha o menu ao mudar de página (inclui o botão "voltar" do telemóvel)
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Com o menu aberto, o Tab circula só dentro do header (barra + menu)
      if (open && e.key === "Tab" && ref.current) {
        const els = [...ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter((el) => el.offsetParent !== null);
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    if (open) ref.current?.querySelector<HTMLElement>("#mobile-menu a")?.focus();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const navCls = "text-[15px] font-medium text-ink hover:text-teal-strong aria-[current=page]:text-teal-strong";
  const mobileLinks: (NavLink & { sub?: boolean })[] = [
    links.home,
    links.services,
    ...links.services.children.map((c) => ({ ...c, sub: true })),
    links.about,
    links.contact,
  ];

  return (
    <header ref={ref} className="sticky top-0 z-50 bg-[linear-gradient(to_bottom,#fff_55%,rgba(255,255,255,0))] px-2 pb-1 pt-2 md:px-4 md:pt-3">
      {/* Barra flutuante arredondada */}
      <div
        className={cn(
          "mx-auto flex h-[68px] items-center gap-4 rounded-[20px] bg-white/95 pl-4 pr-2 ring-1 ring-line backdrop-blur-md transition-shadow duration-300 md:h-[72px] md:pl-6 md:pr-3",
          scrolled || open ? "shadow-[0_12px_32px_-14px_rgba(14,76,87,.35)]" : "shadow-[0_6px_20px_-14px_rgba(14,76,87,.25)]",
        )}
      >
        <Link href={homeHref} aria-label={labels.homeAria} onClick={() => setOpen(false)} className="shrink-0">
          {logo}
        </Link>

        <nav aria-label={labels.nav} className="ml-auto hidden items-center gap-8 lg:flex">
          <Link href={links.home.href} aria-current={current(links.home.href)} className={navCls}>
            {links.home.label}
          </Link>
          <div className="group relative">
            <Link href={links.services.href} aria-current={current(links.services.href, true)} className={cn(navCls, "inline-flex items-center gap-1")}>
              {links.services.label}
              <ChevronDown className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-5 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-[20px] bg-white p-2 shadow-[0_20px_40px_-16px_rgba(14,76,87,.3)] ring-1 ring-line">
                {links.services.children.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      aria-current={current(c.href)}
                      className="block rounded-xl px-4 py-3 text-[15px] text-ink hover:bg-mist hover:text-teal-strong aria-[current=page]:bg-mist aria-[current=page]:text-teal-strong"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href={links.about.href} aria-current={current(links.about.href)} className={navCls}>
            {links.about.label}
          </Link>
          <Link href={links.contact.href} aria-current={current(links.contact.href)} className={navCls}>
            {links.contact.label}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-3 lg:ml-6">
          <a
            href={site.phoneHref}
            data-track="phone"
            data-location="header"
            title={labels.phoneNote}
            className="hidden min-h-11 items-center gap-2 px-2 text-sm font-semibold text-ink hover:text-teal-strong xl:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            {labels.phone}
          </a>
          <span className="hidden md:block">
            <WhatsAppButton message={waMessage} location="header" label={labels.book} className="min-h-11 px-5 py-2.5 text-sm" />
          </span>
          <span className="px-2">
            <LangSwitch lang={lang} />
          </span>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-ink hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.close : labels.open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" strokeWidth={1.75} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <>
          {/* Fundo escurecido: fecha ao tocar fora e cobre a barra fixa de baixo enquanto o menu está aberto */}
          <div aria-hidden onClick={() => setOpen(false)} className="menu-backdrop fixed inset-0 -z-10 bg-[#0e2f35]/40 backdrop-blur-[3px] lg:hidden" />
          <nav
            id="mobile-menu"
            aria-label={labels.nav}
            data-lenis-prevent
            className="menu-sheet mt-2 flex max-h-[calc(100dvh-96px)] flex-col overflow-y-auto overscroll-contain rounded-[24px] bg-white shadow-[0_24px_48px_-18px_rgba(14,76,87,.45)] ring-1 ring-line lg:hidden"
          >
            <ul className="px-3 pt-3">
              {mobileLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={current(l.href, !l.sub && l.href === links.services.href)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-2xl px-3 transition-colors active:bg-mist aria-[current=page]:text-teal-strong",
                      l.sub
                        ? "mx-1 mb-1 min-h-12 bg-mist/70 text-[15px] font-medium text-ink"
                        : "min-h-14 font-display text-[1.6rem] tracking-tight text-ink",
                    )}
                  >
                    {l.label}
                    <ChevronRight
                      className={cn("shrink-0 text-teal-strong/70 transition-transform group-active:translate-x-0.5", l.sub ? "size-4" : "size-5")}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 border-t border-line bg-mist/60 p-4 pb-5">
              <WhatsAppButton message={waMessage} location="menu-mobile" label={labels.book} className="w-full" />
              <a
                href={site.phoneHref}
                data-track="phone"
                data-location="menu-mobile"
                className="flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-teal-dark/25 bg-white text-[15px] font-semibold text-teal-dark"
              >
                <Phone className="size-[18px]" aria-hidden />
                {labels.phone}
              </a>
              <p className="text-center text-xs text-grey">{labels.phoneNote}</p>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
