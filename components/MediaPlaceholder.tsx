import { Camera, Play } from "lucide-react";
import type { MediaItem } from "@/content/media";
import { cn } from "@/lib/cn";

/** Placeholder de marca: mantém o rácio final e descreve o que a foto/vídeo deve mostrar. */
export function MediaPlaceholder({ item, label, className, compact, corner }: {
  item: MediaItem; label: string; className?: string; compact?: boolean; corner?: boolean;
}) {
  const Ico = item.type === "video" ? Play : Camera;
  const stripes = { backgroundImage: "repeating-linear-gradient(135deg, transparent 0 14px, rgba(17,129,147,.05) 14px 15px)" };

  // Fundo de hero: textura discreta e etiqueta no canto, para não competir com o título
  if (corner) {
    return (
      <div role="img" aria-label={`${label}: ${item.id}`} data-media-placeholder={item.id} className={cn("relative h-full w-full bg-[#5f9ea8]", className)} style={stripes}>
        <span className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-[var(--radius-btn)] bg-black/50 px-3 py-1.5 text-xs text-white">
          <Ico className="size-3.5" aria-hidden />
          {label} {item.id} ({item.ratio})
        </span>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${label}: ${item.id}`}
      data-media-placeholder={item.id}
      className={cn("relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-ice p-5 text-center", className)}
      style={stripes}
    >
      <Ico className="size-6 text-teal" strokeWidth={1.5} aria-hidden />
      <span className="text-[13px] font-medium text-teal-dark">
        {label} {item.id} ({item.ratio})
      </span>
      {!compact && <span className="max-w-xs text-xs leading-snug text-teal-dark">{item.brief}</span>}
    </div>
  );
}
