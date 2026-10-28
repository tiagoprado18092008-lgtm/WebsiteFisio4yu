// Registo único de fotos e vídeos do site.
// Originais em /Fotos; exportados para /public/media em WebP (o Next.js gera os tamanhos certos para cada ecrã).
// Com `src: null` o site mostra um placeholder de marca com o rácio final — o build falha se algum chegar a uma página.

import type { Locale } from "@/lib/routes";

export type MediaRatio = "16/9" | "4/5" | "1/1" | "3/2" | "21/9" | "3/4" | "9/16";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string | null;
  poster?: string | null;
  ratio: MediaRatio;
  alt: { pt: string; en: string };
  brief: string;
  /** Ponto de foco ao recortar (CSS object-position), para fotos usadas em rácios diferentes do original. */
  position?: string;
};

/** Vídeo com som (entrevistas e clientes): só toca quando a pessoa carrega no play. */
export type VideoItem = {
  id: string;
  /** MP4 H.264 + AAC, 720×1280 (vertical), com legendas já gravadas na imagem. */
  src: string;
  /** Fotograma 4:5 acima das legendas e da marca de água. */
  poster: string;
  duration: string;
  name: { pt: string; en: string };
  caption: { pt: string; en: string };
};

// Sessão fotográfica de outubro de 2026 (alta resolução). Ficaram de fora as fotos com o mural de jogadores
// famosos em destaque atrás do tratamento (IMG_7603, IMG_7589): direitos de imagem.
const photo = {
  manualTherapy: "/media/tratamentos/terapia-manual.webp", // terapia manual na coxa, mural teal (IMG_7612)
  treatmentRoom: "/media/tratamentos/tratamento-sala.webp", // Mário a tratar um utente, mural teal (IMG_7622)
  angelaDermato: "/media/tratamentos/angela-dermatofuncional.webp", // Angela com instrumentos em madeira (IMG_7641)
  iceBath: "/media/tratamentos/banheira-gelo.webp", // fotograma do vídeo "Circuito de recuperação" (28,5 s)
  athletes: "/media/clientes/atletas.webp", // Mário com atletas no ginásio (IMG_7627)
  mario: "/media/equipa/mario-barroso.webp", // IMG_7678
  angela: "/media/equipa/angela-brazona.webp", // IMG_7660
  duo: "/media/equipa/mario-e-angela.webp", // IMG_7636
};

// Fotos do espaço. As de 1180 px são as melhores versões recebidas dessas vistas; ficaram de fora as que têm
// murais de jogadores famosos como tema principal (direitos de imagem) e a da receção (a pedido do cliente).
const space = {
  gym: "/media/espaco/ginasio.webp", // IMG_6880
  gymCorridor: "/media/espaco/ginasio-corredor.webp", // 1180×2096
  jerseys: "/media/espaco/camisolas.webp", // IMG_6905
  brandRoom: "/media/espaco/sala-fisio4you.webp", // IMG_6909
  bays: "/media/espaco/gabinetes.webp", // 1180×2096
  assessmentRoom: "/media/espaco/sala-avaliacao.webp", // IMG_7664
  treatmentRoom: "/media/espaco/sala-tratamento.webp", // IMG_7666
  muralRoom: "/media/espaco/sala-mural.webp", // IMG_7667
};

const items: MediaItem[] = [
  {
    // Hero da home (sem vídeo, a pedido do cliente): ginásio com a iluminação hexagonal (exportado a 2400 px).
    // Foto vertical: a toda a largura até 1024 px, com as luzes no topo e o texto sobre o chão escuro;
    // daí para cima ocupa a metade direita do hero e funde-se com o painel teal.
    id: "hero",
    type: "image",
    src: space.gym,
    ratio: "4/5",
    alt: { pt: "Ginásio de reabilitação da Fisio4you, com máquinas de força e iluminação hexagonal", en: "The Fisio4you rehabilitation gym, with strength machines and hexagonal lighting" },
    brief: "Ginásio de reabilitação (escolhido pelo cliente).",
    position: "58% 38%",
  },
  // Galeria "As instalações" (página Sobre), no rácio original de cada foto
  ...[
    { src: space.gym, ratio: "3/4", pt: "Ginásio de reabilitação com máquinas de força e iluminação hexagonal", en: "Rehabilitation gym with strength machines and hexagonal lighting" },
    { src: space.jerseys, ratio: "3/4", pt: "Parede de camisolas desportivas assinadas no ginásio", en: "Wall of signed sports shirts in the gym" },
    { src: space.brandRoom, ratio: "3/4", pt: "Sala com o logótipo Fisio4you na parede", en: "Room with the Fisio4you logo on the wall" },
    { src: space.gymCorridor, ratio: "9/16", pt: "Vista ao longo do ginásio de reabilitação", en: "View along the rehabilitation gym" },
    { src: space.assessmentRoom, ratio: "3/4", pt: "Sala de avaliação e tratamento, com marquesa e equipamento", en: "Assessment and treatment room, with a couch and equipment" },
    { src: space.bays, ratio: "9/16", pt: "Zona de tratamento com marquesas e cortinas", en: "Treatment area with couches and curtains" },
    { src: space.treatmentRoom, ratio: "3/4", pt: "Sala de tratamento com parede de pedra e marquesa", en: "Treatment room with a stone wall and couch" },
    { src: space.muralRoom, ratio: "3/4", pt: "Sala de tratamento com mural em tons de azul e dourado", en: "Treatment room with a blue and gold mural" },
  ].map<MediaItem>((p, i) => ({
    id: `clinic-0${i + 1}`,
    type: "image",
    src: p.src,
    ratio: p.ratio as MediaRatio,
    alt: { pt: p.pt, en: p.en },
    brief: "Instalações: salas, ginásio, equipamento.",
  })),
  {
    // Coluna alta da colagem da secção de vantagens (home). O ginásio passou para o hero.
    id: "advantages-therapy",
    type: "image",
    src: photo.manualTherapy,
    ratio: "9/16",
    alt: { pt: "Mário Barroso, fisioterapeuta, a fazer terapia manual na coxa de um utente", en: "Mário Barroso, physiotherapist, giving manual therapy to a patient's thigh" },
    brief: "Terapia manual (coluna alta da colagem, home).",
    position: "55% 50%",
  },
  {
    id: "brand-room",
    type: "image",
    src: space.brandRoom,
    ratio: "3/2",
    alt: { pt: "Sala da Fisio4you com o logótipo na parede", en: "Fisio4you room with the logo on the wall" },
    brief: "Sala com o logótipo.",
    position: "50% 58%",
  },
  {
    id: "athletes",
    type: "image",
    src: photo.athletes,
    ratio: "3/2",
    alt: { pt: "Mário Barroso com três atletas no ginásio da Fisio4you", en: "Mário Barroso with three athletes in the Fisio4you gym" },
    brief: "Mário com clientes/atletas na clínica (secção de avaliações da home).",
    position: "40% 30%",
  },
  {
    id: "jerseys",
    type: "image",
    src: space.jerseys,
    ratio: "3/2",
    alt: { pt: "Parede de camisolas desportivas assinadas no ginásio da Fisio4you", en: "Wall of signed sports shirts in the Fisio4you gym" },
    brief: "Camisolas assinadas (colagem da secção de vantagens, home).",
    position: "50% 45%",
  },
  {
    id: "about-hero",
    type: "image",
    src: photo.duo,
    ratio: "4/5",
    alt: { pt: "Mário Barroso e Angela Brazona, fisioterapeutas e responsáveis da Fisio4you", en: "Mário Barroso and Angela Brazona, physiotherapists who run Fisio4you" },
    brief: "Os responsáveis da clínica juntos.",
    position: "50% 30%",
  },
  {
    id: "service-msk",
    type: "image",
    src: photo.treatmentRoom,
    ratio: "4/5",
    alt: { pt: "Mário Barroso a fazer terapia manual a um utente deitado na marquesa", en: "Mário Barroso giving manual therapy to a patient lying on the couch" },
    brief: "Terapia manual num desportista.",
    position: "50% 50%",
  },
  {
    id: "service-dermato",
    type: "image",
    src: photo.angelaDermato,
    ratio: "4/5",
    alt: { pt: "Angela Brazona, fisioterapeuta, com instrumentos de massagem em madeira", en: "Angela Brazona, physiotherapist, holding wooden massage tools" },
    brief: "Fisioterapeuta da área dermatofuncional.",
    position: "50% 30%",
  },
  {
    // Não há (ainda) foto da ecografia: entra a sala de avaliação, onde ela acontece.
    id: "service-eco",
    type: "image",
    src: space.assessmentRoom,
    ratio: "4/5",
    alt: { pt: "Sala de avaliação da Fisio4you, com marquesa e equipamento", en: "Fisio4you assessment room, with a couch and equipment" },
    brief: "Ideal: fisioterapeuta com sonda do ecógrafo, ecrã visível.",
    position: "50% 60%",
  },
  {
    id: "service-gym",
    type: "image",
    src: space.gymCorridor,
    ratio: "4/5",
    alt: { pt: "Ginásio de reabilitação com passadeiras, equipamento e parede de camisolas", en: "Rehabilitation gym with treadmills, equipment and a wall of shirts" },
    brief: "Ginásio de 100 m² em plano aberto.",
    position: "50% 72%",
  },
  {
    id: "service-recovery",
    type: "image",
    src: photo.iceBath,
    ratio: "4/5",
    alt: { pt: "Atleta dentro da banheira de gelo, de polegar para cima", en: "Athlete standing in the ice bath, giving a thumbs up" },
    brief: "Banheira de gelo.",
  },
  {
    id: "team-mario",
    type: "image",
    src: photo.mario,
    ratio: "4/5",
    alt: { pt: "Retrato de Mário Barroso", en: "Portrait of Mário Barroso" },
    brief: "Retrato do Mário.",
    position: "50% 25%",
  },
  {
    id: "team-angela",
    type: "image",
    src: photo.angela,
    ratio: "4/5",
    alt: { pt: "Retrato de Angela Brazona", en: "Portrait of Angela Brazona" },
    brief: "Retrato da Angela.",
    position: "50% 25%",
  },
  // Ainda em falta (não aparecem no site enquanto `src` for null)
  {
    id: "eco-photo",
    type: "image",
    src: null,
    ratio: "4/5",
    alt: { pt: "Fisioterapeuta a realizar ecografia músculo-esquelética", en: "Physiotherapist performing a musculoskeletal ultrasound" },
    brief: "Fisioterapeuta com a sonda do ecógrafo, ecrã visível (substitui a sala de avaliação em service-eco).",
  },
  {
    id: "recovery-sauna",
    type: "image",
    src: null,
    ratio: "4/5",
    alt: { pt: "Sauna da Fisio4you", en: "Fisio4you sauna" },
    brief: "Sauna.",
  },
];

export const media: Record<string, MediaItem> = Object.fromEntries(items.map((i) => [i.id, i]));
export const mediaList = items;

const videoList: VideoItem[] = [
  {
    id: "video-mario",
    src: "/media/video/mario-novo-espaco.mp4",
    poster: "/media/video/mario-novo-espaco.webp",
    duration: "1:02",
    name: { pt: "Mário Barroso", en: "Mário Barroso" },
    caption: { pt: "O novo espaço", en: "The new space" },
  },
  {
    id: "video-angela",
    src: "/media/video/angela-brazona.mp4",
    poster: "/media/video/angela-brazona.webp",
    duration: "1:16",
    name: { pt: "Angela Brazona", en: "Angela Brazona" },
    caption: { pt: "Saúde da mulher", en: "Women's health" },
  },
  {
    id: "video-pedro",
    src: "/media/video/pedro-senra.mp4",
    poster: "/media/video/pedro-senra.webp",
    duration: "0:27",
    name: { pt: "Pedro Senra", en: "Pedro Senra" },
    caption: { pt: "Cliente", en: "Client" },
  },
  {
    id: "video-circuito",
    src: "/media/video/circuito-recuperacao.mp4",
    poster: "/media/video/circuito-recuperacao.webp",
    duration: "0:48",
    name: { pt: "Circuito de recuperação", en: "Recovery circuit" },
    caption: { pt: "Treino, pressoterapia e banheira de gelo", en: "Training, compression boots and ice bath" },
  },
  {
    id: "video-mario-mensagem",
    src: "/media/video/mario-mensagem.mp4",
    poster: "/media/video/mario-mensagem.webp",
    duration: "0:34",
    name: { pt: "Mário Barroso", en: "Mário Barroso" },
    caption: { pt: "Uma mensagem do Mário", en: "A message from Mário" },
  },
];

export const videos: Record<string, VideoItem> = Object.fromEntries(videoList.map((v) => [v.id, v]));

/** Vídeo já no idioma da página (dados simples, para passar a componentes de cliente). */
export type VideoData = Omit<VideoItem, "name" | "caption"> & { name: string; caption: string };

export function videoFor(id: string, locale: Locale): VideoData {
  const v = videos[id];
  if (!v) throw new Error(`Vídeo "${id}" não existe em content/media.ts`);
  return { ...v, name: v.name[locale], caption: v.caption[locale] };
}

/** Imagem de partilha (1200×630): terapia manual sobre o mural teal, com o logótipo branco. */
export const ogCover: string | null = "/media/og-cover.jpg";
