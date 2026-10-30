"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { isPending, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { WhatsAppButton } from "./Buttons";
import { FacebookIcon, InstagramIcon } from "./Icon";

// Redes no menu mobile: só as que já têm URL confirmado (como no rodapé)
const social = [
  { url: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { url: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
].filter((s) => !isPending(s.url));

type NavLink = { label: string; href: string; badge?: string };
type Props = {
  homeHref: string;
  logo: React.ReactNode;
  /** Página com hero em foto (home): no topo, a barra fica transparente por cima da foto, com o logótipo branco
   *  (`logoOverlay`) e os links numa pílula branca; ao descer volta a ser a barra branca. */
  overlay?: boolean;
  logoOverlay?: React.ReactNode;
  links: { home: NavLink; services: NavLink & { children: NavLink[] }; about: NavLink; contact: NavLink };
  /** Língua atual (só texto) e link para a outra língua. */
  lang: { current: string; other: string; href: string; label: string; hrefLang: string };
  labels: { book: string; open: string; close: string; phoneNote: string; phone: string; homeAria: string; nav: string; newWindow: string };
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

export function Header({ homeHref, logo, overlay, logoOverlay, links, lang, labels, waMessage }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Distância da barra ao topo do ecrã no momento em que o menu abre (16 px no topo da página, 8 px em scroll)
  const [menuTop, setMenuTop] = useState(8);
  const ref = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
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
    // Se o ecrã passar a desktop com o menu aberto (rodar o tablet), fecha-o
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    if (open) {
      ref.current?.querySelector<HTMLElement>("#mobile-menu a")?.focus();
      desktop.addEventListener("change", onDesktop);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const toggle = () => {
    if (!open && barRef.current) setMenuTop(barRef.current.getBoundingClientRect().top);
    setOpen((o) => !o);
  };

  // Transparente por cima da foto do hero: só no topo da página e com o menu fechado
  const clear = !!overlay && !scrolled && !open;
  const pill = "bg-white shadow-[0_10px_30px_-14px_rgba(6,40,46,.55)]";
  const navCls = "text-[15px] font-medium text-ink hover:text-teal-strong aria-[current=page]:text-teal-strong";
  const mobileLinks = [links.home, links.services, links.about, links.contact];
  // Ordem de entrada em cascata das linhas do menu mobile
  let row = 0;
  const stagger = () => ({ "--i": row++ }) as React.CSSProperties;
  /** Ponto teal à direita da página atual. */
  const currentDot = (
    <span aria-hidden className="size-2 shrink-0 rounded-full bg-teal opacity-0 group-aria-[current=page]:opacity-100" />
  );

  return (
    <header
      ref={ref}
      className={cn("sticky top-0 z-50 px-2 pb-1 pt-2 md:px-4 md:pt-3", !clear && "bg-[linear-gradient(to_bottom,#fff_55%,rgba(255,255,255,0))]")}
    >
      {/* Barra flutuante arredondada; no mobile, ao abrir o menu, estica até ao fundo do ecrã e passa a ser o painel */}
      <div
        ref={barRef}
        style={open ? { height: `calc(100dvh - ${menuTop + 8}px)` } : undefined}
        className={cn(
          "mx-auto flex h-[68px] flex-col overflow-hidden rounded-[20px] ring-1 transition-[height,box-shadow,background-color,--tw-ring-color,translate] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:h-[72px] lg:overflow-visible",
          open
            ? "bg-white shadow-[0_24px_48px_-18px_rgba(14,76,87,.45)] ring-line backdrop-blur-md"
            : clear
              ? "bg-transparent ring-transparent lg:translate-y-3"
              : scrolled
                ? "bg-white/95 shadow-[0_12px_32px_-14px_rgba(14,76,87,.35)] ring-line backdrop-blur-md"
                : "bg-white/95 shadow-[0_6px_20px_-14px_rgba(14,76,87,.25)] ring-line backdrop-blur-md",
        )}
      >
        <div className="flex h-[68px] shrink-0 items-center gap-4 pl-4 pr-2 md:h-[72px] md:pl-6 md:pr-3 lg:grid lg:grid-cols-[auto_1fr_auto] min-[1440px]:grid-cols-[1fr_auto_1fr]">
          <Link href={homeHref} aria-label={labels.homeAria} onClick={() => setOpen(false)} className="grid shrink-0 justify-self-start">
            {overlay && logoOverlay ? (
              <>
                <span className={cn("col-start-1 row-start-1 transition-opacity duration-300", clear && "opacity-0")}>{logo}</span>
                <span aria-hidden className={cn("col-start-1 row-start-1 transition-opacity duration-300", !clear && "opacity-0")}>
                  {logoOverlay}
                </span>
              </>
            ) : (
              logo
            )}
          </Link>

          {/* Links ao centro (no centro exato do ecrã a partir de 1440 px; abaixo, entre o logótipo e as ações, que não
              cabem numa coluna igual à do logótipo) e ações à direita; por cima da foto, cada grupo fica numa pílula
              branca (na barra branca a pílula desaparece no fundo) */}
          <nav aria-label={labels.nav} className={cn("hidden items-center gap-8 justify-self-center rounded-full px-7 py-3 transition-[background-color,box-shadow] duration-300 lg:flex", clear && pill)}>
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

          <div
            className={cn(
              "ml-auto flex items-center gap-1 justify-self-end rounded-full py-1 pl-2 pr-1 transition-[background-color,box-shadow] duration-300 sm:gap-3 lg:ml-0 lg:py-1.5 lg:pl-3",
              clear && pill,
            )}
          >
            <a
              href={site.phoneHref}
              data-track="phone"
              data-location="header"
              title={labels.phoneNote}
              className="hidden min-h-11 items-center gap-2 whitespace-nowrap px-2 text-sm font-semibold text-ink hover:text-teal-strong xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              {labels.phone}
            </a>
            <span className="hidden md:block">
              <WhatsAppButton message={waMessage} location="header" label={labels.book} className="min-h-11 whitespace-nowrap px-5 py-2.5 text-sm" />
            </span>
            <span className="px-2">
              <LangSwitch lang={lang} />
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xl text-ink hover:bg-mist lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? labels.close : labels.open}
              onClick={toggle}
            >
              {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" strokeWidth={1.75} aria-hidden />}
            </button>
          </div>
        </div>

        {/* Menu mobile: fica no DOM (inert quando fechado) para abrir e fechar com transição */}
        <nav
          id="mobile-menu"
          aria-label={labels.nav}
          inert={!open}
          data-lenis-prevent
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain border-t border-line transition-[opacity,visibility] lg:hidden",
            open ? "menu-open visible opacity-100 duration-300" : "invisible opacity-0 duration-150",
          )}
        >
          <ul className="px-5 pt-2">
            {mobileLinks.map((l) => (
              <li key={l.href} className="border-b border-line last:border-0">
                <Link
                  href={l.href}
                  aria-current={current(l.href, l === links.services)}
                  onClick={() => setOpen(false)}
                  style={stagger()}
                  className="menu-row group flex min-h-[60px] items-center [@media(max-height:700px)]:min-h-[52px] justify-between gap-4 font-display text-[1.75rem] leading-none tracking-[-0.02em] text-ink transition-colors active:text-teal-strong aria-[current=page]:text-teal-strong"
                >
                  {l.label}
                  {currentDot}
                </Link>
                {l === links.services && (
                  <ul className="-mt-1 mb-4 ml-0.5 border-l border-line pl-4">
                    {links.services.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          aria-current={current(c.href)}
                          onClick={() => setOpen(false)}
                          style={stagger()}
                          className="menu-row group flex min-h-11 items-center justify-between gap-4 py-2 text-base font-medium leading-snug text-grey transition-colors active:text-teal-strong aria-[current=page]:text-teal-strong"
                        >
                          {c.label}
                          {currentDot}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {/* Email e redes no espaço livre (some em ecrãs baixos); os botões ficam presos ao fundo, ao alcance do polegar */}
          <div style={stagger()} className="menu-row mt-auto flex items-center justify-between gap-4 px-5 pb-3 pt-8 [@media(max-height:700px)]:hidden">
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 min-w-0 items-center text-sm text-grey hover:text-teal-dark">
              <span className="truncate">{site.email}</span>
            </a>
            {social.length > 0 && (
              <ul className="flex shrink-0 gap-2">
                {social.map(({ url, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} ${labels.newWindow}`}
                      className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-teal-dark hover:border-teal hover:text-teal"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            style={stagger()}
            className="menu-row grid gap-2 border-t border-line bg-mist/60 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 [@media(max-height:700px)]:mt-auto"
          >
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
      </div>

      {/* Fundo escurecido: fecha ao tocar fora e cobre a barra fixa de baixo enquanto o menu está aberto */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 -z-10 bg-[#0e2f35]/40 backdrop-blur-[3px] transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      />
    </header>
  );
}
