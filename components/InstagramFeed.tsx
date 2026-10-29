import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import type { InstagramPostData } from "@/content/media";
import { SectionTitle } from "./Section";
import { InstagramIcon } from "./Icon";

type Labels = { title: string; intro: string; follow: string; open: string; badge: string; newWindow: string };

/** Posts do Instagram numa grelha alinhada (2 colunas em telemóvel, 4 a partir de 768 px). Cada capa abre o post numa
 *  nova janela; com rato, escurece e mostra "Ver no Instagram". O botão "Seguir" só aparece com o URL do perfil. */
export function InstagramFeed({ posts, profileUrl, labels, titleId }: {
  posts: InstagramPostData[]; profileUrl: string | null; labels: Labels; titleId: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionTitle title={labels.title} intro={labels.intro} id={titleId} />
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="instagram"
            data-location="home-instagram"
            className="group inline-flex min-h-13 shrink-0 items-center gap-3 self-start rounded-full bg-teal-strong py-2 pl-2 pr-6 text-[15px] font-semibold text-white transition-colors hover:bg-teal-dark md:self-auto"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-white text-teal-strong">
              <InstagramIcon className="size-5" />
            </span>
            {labels.follow}
            <span className="sr-only"> {labels.newWindow}</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        )}
      </div>
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {posts.map((p) => (
          <li key={p.code}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track="instagram"
              data-location="home-instagram"
              aria-label={`${labels.open}: ${p.alt} ${labels.newWindow}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-panel shadow-[0_18px_40px_-26px_rgba(14,76,87,.55)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(14,76,87,.65)]"
            >
              {/* Encostada em baixo: as legendas gravadas no vídeo ficam sempre inteiras */}
              <Image src={p.cover} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.04]" />
              <span aria-hidden className="absolute inset-0 rounded-[22px] ring-1 ring-inset ring-black/5" />
              {/* Canto superior esquerdo: a zona das capas sem rostos nem logótipos */}
              <span aria-hidden className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:left-3 sm:top-3">
                <Play className="size-3 fill-current" />
                {labels.badge}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span className="flex translate-y-2 items-center gap-2 rounded-full bg-white px-3 py-2.5 text-sm font-semibold text-teal-dark shadow-lg transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 lg:px-4">
                  <InstagramIcon className="size-[18px]" />
                  <span className="hidden lg:inline">{labels.open}</span>
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
