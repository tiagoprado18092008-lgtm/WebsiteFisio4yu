"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/track";
import type { Dict } from "@/content/pt";
import avatar from "@/app/icon.png";
import { WhatsAppIcon } from "./Icon";

type Row = { id: number; from: "in" | "out"; text: string; time: string; href?: string };

const TOOLTIP_SEEN = "f4y-wa-tooltip";
const now = () => new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

/**
 * Botão flutuante (tablet/desktop) que abre uma janela de chat ao estilo WhatsApp: saudação, respostas rápidas e
 * campo livre. Ao enviar, mostra "a escrever…" e abre o WhatsApp com a mensagem. O botão aparece depois do hero e
 * esconde-se enquanto um bloco de marcação (`[data-hide-fab]`) está no ecrã, exceto com a janela aberta.
 */
export function FloatingWhatsApp({ waMessage, t }: { waMessage: string; t: Dict["chat"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [covered, setCovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [quick, setQuick] = useState(true);
  const [typing, setTyping] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [dot, setDot] = useState(false);
  const [draft, setDraft] = useState("");
  const fab = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
      setCovered(visible.size > 0);
    });
    document.querySelectorAll("[data-hide-fab]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", on);
      io.disconnect();
    };
  }, []);

  const show = open || (scrolled && !covered);

  // Aviso "Tem alguma questão?" uma vez por sessão, pouco depois de o botão aparecer.
  useEffect(() => {
    if (!show || open) return;
    let hide: number | undefined;
    const wait = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(TOOLTIP_SEEN)) return;
        sessionStorage.setItem(TOOLTIP_SEEN, "1");
      } catch {}
      setTooltip(true);
      setDot(true);
      hide = window.setTimeout(() => setTooltip(false), 9000);
    }, 2500);
    return () => {
      window.clearTimeout(wait);
      window.clearTimeout(hide);
    };
  }, [show, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      fab.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    const focus = window.setTimeout(() => input.current?.focus(), 260);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focus);
    };
  }, [open]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [rows, typing, quick]);

  const add = (row: Omit<Row, "id" | "time">) => setRows((r) => [...r, { ...row, id: nextId.current++, time: now() }]);

  const toggle = () => {
    setTooltip(false);
    if (!open) {
      setDot(false);
      if (rows.length === 0) add({ from: "in", text: t.greeting });
    }
    setOpen(!open);
  };

  const send = (text: string) => {
    const msg = text.trim();
    if (!msg || typing) return;
    const href = waLink(msg);
    add({ from: "out", text: msg });
    setDraft("");
    setQuick(false);
    setTyping(true);
    trackEvent("contact_click", { channel: "whatsapp", location: "floating-chat", page: window.location.pathname });
    // Abaixo de ~1 s o navegador ainda conta o clique como gesto do utilizador e não bloqueia a nova janela.
    window.setTimeout(() => {
      setTyping(false);
      add({ from: "in", text: t.redirecting, href });
      window.open(href, "_blank", "noopener,noreferrer");
    }, 700);
  };

  const replies = [{ label: t.book, msg: waMessage }, ...t.quick];

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <div
        role="status"
        className={cn(
          "absolute bottom-2 right-[84px] w-max max-w-[230px] rounded-2xl bg-white py-3 pl-3.5 pr-7 text-[13.5px] font-semibold leading-snug text-ink shadow-[0_18px_40px_-12px_rgba(32,40,43,.35)] transition duration-200",
          "after:absolute after:-right-1.5 after:bottom-[22px] after:size-3 after:rotate-45 after:bg-white",
          tooltip ? "translate-x-0 scale-100 opacity-100" : "pointer-events-none translate-x-2 scale-[.97] opacity-0",
        )}
      >
        {tooltip && (
          <>
            <button
              type="button"
              onClick={() => setTooltip(false)}
              aria-label={t.dismiss}
              className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full text-muted hover:bg-mist hover:text-ink"
            >
              <X className="size-3.5" aria-hidden />
            </button>
            {t.tooltip}
          </>
        )}
      </div>

      <div
        role="dialog"
        aria-label={`${site.name} — WhatsApp`}
        inert={!open}
        className={cn(
          "absolute bottom-[80px] right-0 flex h-[min(560px,calc(100dvh-130px))] w-[368px] origin-bottom-right flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_24px_60px_-16px_rgba(32,40,43,.45)] transition duration-[260ms]",
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-[18px] scale-[.96] opacity-0",
        )}
      >
        <div className="on-dark flex flex-none items-center gap-3 bg-[linear-gradient(135deg,#128c7e,#25d366)] px-4 py-3.5 text-white">
          <div className="flex size-[42px] flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,.15)]">
            <Image src={avatar} alt="" sizes="34px" className="size-[34px] object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <b className="block text-[15px] font-extrabold leading-tight">{site.name}</b>
            <span className="mt-0.5 flex items-center gap-1.5 text-[12.5px] opacity-95">
              <i className="size-[7px] rounded-full bg-[#b6f0c9] shadow-[0_0_0_2px_rgba(255,255,255,.25)]" />
              {t.status}
            </span>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={t.close}
            className="flex size-[30px] flex-none items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
          >
            <X className="size-4" strokeWidth={2.2} aria-hidden />
          </button>
        </div>

        <div ref={body} data-lenis-prevent className="wa-wallpaper flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
          {rows.map((r, i) => (
            <div key={r.id} className={cn("flex max-w-[84%] flex-col", r.from === "out" ? "items-end self-end" : "items-start self-start", i > 0 && "wa-row-in")}>
              {r.href ? (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[14px_14px_14px_4px] bg-white px-3.5 py-2.5 text-sm leading-normal text-ink shadow-[0_1px_2px_rgba(0,0,0,.06)] underline-offset-2 hover:underline"
                >
                  {r.text}
                </a>
              ) : (
                <p
                  className={cn(
                    "px-3.5 py-2.5 text-sm leading-normal text-ink shadow-[0_1px_2px_rgba(0,0,0,.06)]",
                    r.from === "out" ? "rounded-[14px_14px_4px_14px] bg-[#dcf8c6]" : "rounded-[14px_14px_14px_4px] bg-white",
                  )}
                >
                  {r.text}
                </p>
              )}
              <span className="mt-0.5 px-0.5 text-[10.5px] text-muted">{r.time}</span>
            </div>
          ))}
          {typing && (
            <div className="flex gap-1 self-start rounded-[14px_14px_14px_4px] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(0,0,0,.06)]" aria-hidden>
              <i className="wa-typing-dot" />
              <i className="wa-typing-dot" />
              <i className="wa-typing-dot" />
            </div>
          )}
          {quick && rows.length > 0 && (
            <div className="flex max-w-full flex-col items-start gap-2">
              {replies.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => send(q.msg)}
                  className="rounded-full border-[1.5px] border-whatsapp bg-white px-3.5 py-2 text-[13px] font-bold text-[#0e7a6e] transition hover:-translate-y-px hover:bg-whatsapp hover:text-[#06301a]"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="flex flex-none items-center gap-2 border-t border-line bg-white px-3 py-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <input
            ref={input}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={400}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            className="min-w-0 flex-1 rounded-full border-[1.5px] border-line bg-mist px-4 py-2.5 text-sm text-ink outline-none! transition-colors placeholder:text-muted focus:border-whatsapp focus:bg-white"
          />
          <button
            type="submit"
            aria-label={t.send}
            className="flex size-[38px] flex-none items-center justify-center rounded-full bg-whatsapp text-white transition hover:scale-105 hover:bg-[#128c7e]"
          >
            <Send className="size-[17px]" aria-hidden />
          </button>
        </form>
      </div>

      <button
        ref={fab}
        type="button"
        onClick={toggle}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        tabIndex={show ? 0 : -1}
        className={cn(
          "relative flex size-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#25d366,#128c7e)] text-white shadow-[0_10px_30px_-6px_rgba(18,140,126,.55)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {!open && <span className="wa-pulse absolute inset-0 rounded-full border-2 border-whatsapp" aria-hidden />}
        {open ? <X className="relative size-7" strokeWidth={2.4} aria-hidden /> : <WhatsAppIcon className="relative size-8" />}
        {dot && <span className="absolute -right-0.5 -top-0.5 size-4 rounded-full border-2 border-white bg-[#e5484d]" aria-hidden />}
      </button>
    </div>
  );
}
