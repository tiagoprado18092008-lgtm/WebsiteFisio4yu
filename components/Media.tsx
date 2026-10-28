import Image from "next/image";
import { media } from "@/content/media";
import { getDict } from "@/content";
import type { Locale } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { VideoPlayer } from "./VideoPlayer";

type Props = {
  id: string;
  locale: Locale;
  className?: string;
  /** Preenche o contentor pai (que deve ter tamanho/posição) em vez de impor o rácio. */
  cover?: boolean;
  sizes?: string;
  priority?: boolean;
  compact?: boolean;
  /** "corner": placeholder discreto com etiqueta no canto (para fundos com texto por cima). */
  placeholder?: "center" | "corner";
};

/** Mostra a foto/vídeo real se `src` existir em content/media.ts; caso contrário, um placeholder de marca. */
export function Media({ id, locale, className, cover, sizes = "(min-width: 1024px) 50vw, 100vw", priority, compact, placeholder = "center" }: Props) {
  const item = media[id];
  if (!item) throw new Error(`Media "${id}" não existe em content/media.ts`);
  const t = getDict(locale);
  const alt = item.alt[locale];
  const label = item.type === "video" ? t.common.video : t.common.photo;

  let inner: React.ReactNode;
  if (!item.src) {
    inner = <MediaPlaceholder item={item} label={label} compact={compact} corner={placeholder === "corner"} />;
  } else if (item.type === "video") {
    inner = <VideoPlayer src={item.src} poster={item.poster} alt={alt} className="absolute inset-0 size-full object-cover" />;
  } else {
    inner = <Image src={item.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={item.position ? { objectPosition: item.position } : undefined} />;
  }

  return (
    <div
      className={cn("overflow-hidden", cover ? "absolute inset-0" : "relative", className)}
      style={cover ? undefined : { aspectRatio: item.ratio }}
    >
      {inner}
    </div>
  );
}
