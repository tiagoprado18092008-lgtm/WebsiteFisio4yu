"use client";

import { useEffect, useState } from "react";

/** Vídeo decorativo: autoplay só em desktop e sem prefers-reduced-motion; caso contrário mostra o poster. */
export function VideoPlayer({ src, poster, alt, className }: { src: string; poster?: string | null; alt: string; className?: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    setPlay(!reduce && desktop);
  }, []);

  if (!play) {
    // eslint-disable-next-line @next/next/no-img-element
    return poster ? <img src={poster} alt={alt} className={className} /> : <div className={className} aria-label={alt} role="img" />;
  }
  const webm = src.replace(/\.mp4$/, ".webm");
  return (
    <video className={className} autoPlay muted loop playsInline preload="metadata" poster={poster ?? undefined} aria-label={alt}>
      {webm !== src && <source src={webm} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
