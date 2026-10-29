"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import type { VideoData } from "@/content/media";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/cn";

type Labels = { play: string; close: string };

/** Abre o vídeo num diálogo e devolve o foco ao botão que o abriu. */
function useVideoDialog(video: VideoData) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const show = () => {
    setOpen(true);
    trackEvent("video_play", { video: video.id, page: window.location.pathname });
  };
  const hide = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);
  return { open, show, hide, trigger };
}

/** Vídeo vertical com som e controlos (teclado: Esc fecha; Tab alterna entre fechar e o vídeo). */
function VideoDialog({ video, labels, onClose }: { video: VideoData; labels: Labels; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        (document.activeElement === close.current ? player.current : close.current)?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${video.name}: ${video.caption}`}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink/95 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        ref={close}
        type="button"
        autoFocus
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <X className="size-6" aria-hidden />
      </button>
      <video
        ref={player}
        src={video.src}
        controls
        autoPlay
        playsInline
        className="aspect-[9/16] h-[min(80svh,calc((100vw-2rem)*16/9))] rounded-[18px] bg-black"
      />
      <p className="mt-4 text-center text-sm text-white/80">
        <span className="font-semibold text-white">{video.name}</span> · {video.caption}
      </p>
    </div>
  );
}

/** Cartão 4:5 com o poster do vídeo, nome e duração; abre o vídeo com som. Com `bare` fica só a capa e o botão de play ao centro. */
export function VideoCard({ video, labels, sizes, className, bare }: { video: VideoData; labels: Labels; sizes: string; className?: string; bare?: boolean }) {
  const d = useVideoDialog(video);
  return (
    <>
      <button
        ref={d.trigger}
        type="button"
        onClick={d.show}
        aria-label={`${labels.play}: ${video.name}, ${video.caption} (${video.duration})`}
        className={cn("group relative block aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-panel text-left", className)}
      >
        <Image src={video.poster} alt="" fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        {bare ? (
          <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="flex size-16 items-center justify-center rounded-full bg-white text-teal-dark shadow-[0_14px_30px_-10px_rgba(6,40,46,.6)] transition-transform duration-300 group-hover:scale-110 md:size-20">
              <Play className="ml-1 size-7 fill-current md:size-8" />
            </span>
          </span>
        ) : (
          <>
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,27,0)_40%,rgba(16,24,27,.85)_100%)]" />
            <span aria-hidden className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold tabular-nums text-white">
              {video.duration}
            </span>
            <span aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
              <span className="min-w-0">
                <span className="block font-display text-lg font-medium leading-tight">{video.name}</span>
                <span className="mt-1 block text-sm leading-snug text-white/85">{video.caption}</span>
              </span>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-teal-dark transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 size-5 fill-current" />
              </span>
            </span>
          </>
        )}
      </button>
      {d.open && <VideoDialog video={video} labels={labels} onClose={d.hide} />}
    </>
  );
}

/** Botão compacto (miniatura + texto) para pôr um vídeo junto de um texto. "Ver vídeo" fica só para leitores de ecrã. */
export function VideoButton({ video, label, labels, className }: { video: VideoData; label: string; labels: Labels; className?: string }) {
  const d = useVideoDialog(video);
  return (
    <>
      <button
        ref={d.trigger}
        type="button"
        onClick={d.show}
        className={cn(
          "group inline-flex min-h-13 items-center gap-3 rounded-full bg-ice py-1.5 pl-1.5 pr-5 text-left text-[15px] font-semibold text-teal-dark transition-colors hover:bg-[#d3e8ec]",
          className,
        )}
      >
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image src={video.poster} alt="" fill sizes="40px" className="object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/35">
            <Play className="ml-0.5 size-4 fill-white text-white" aria-hidden />
          </span>
        </span>
        <span>
          <span className="sr-only">{labels.play}: </span>
          {label} <span className="font-normal tabular-nums text-teal-strong">· {video.duration}</span>
        </span>
      </button>
      {d.open && <VideoDialog video={video} labels={labels} onClose={d.hide} />}
    </>
  );
}
