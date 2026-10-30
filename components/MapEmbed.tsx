import { mapsEmbed } from "@/content/site";

/** Mapa do Google Maps, carregado logo (sem clique). Em telemóvel 4:3, a partir de tablet 21:9. */
export function MapEmbed({ title }: { title: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-img)] bg-mist md:aspect-[21/9]">
      <iframe src={mapsEmbed} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
    </div>
  );
}
