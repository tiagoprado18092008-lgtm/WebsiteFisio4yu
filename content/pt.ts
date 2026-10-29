// Conteúdo em português europeu. Nenhum componente deve ter texto fora de content/.
// {s} = nome do serviço · {p} = zona/problema · {n} = número

import type { Locale, PageKey, ServiceKey } from "@/lib/routes";

export type IconName =
  | "activity" | "bone" | "heart" | "snowflake" | "flame" | "dumbbell" | "scan" | "baby"
  | "shield" | "repeat" | "target" | "eye" | "trending" | "users" | "building" | "sparkles"
  | "footprints" | "clipboard" | "stethoscope" | "brain" | "flower" | "clock" | "mappin";

type Item = { icon: IconName; title: string; text: string };
/** Vantagem da home: a foto (id em content/media.ts) troca com o ponto aberto; o link leva a quem quer ver mais. */
type Advantage = { title: string; text: string; media: string; link: { label: string; page: PageKey; hash?: string } };
type Faq = { q: string; a: string };
type LegalSection = { h: string; p: string[] };

/** Recurso incluído num serviço (ex.: ecografia, ginásio, recuperação) — secção com âncora `#id`. */
export type ServiceModule = {
  id: string;
  nav: string;
  summary: string;
  eyebrow: string;
  title: string;
  text: string;
  mediaId: string;
  points: Item[];
  itemsTitle?: string;
  items?: { title: string; text: string }[];
  note?: string;
  /** Vídeo (id em content/media.ts) mostrado junto do texto. */
  video?: string;
};

/** Passo do percurso. `uses`: ids dos recursos (`modules`) usados nesse passo, mostrados como links. */
type Step = { title: string; text: string; details?: string[]; uses?: string[] };

/**
 * Esquema interativo da diástase abdominal (components/DiastasisExplorer.tsx).
 * `stages` tem sempre 3 fases, por esta ordem: antes da gravidez, na gravidez, depois do parto (o desenho segue a ordem).
 */
export type ServiceExplainer = {
  nav: string;
  title: string;
  intro: string;
  stagesLabel: string;
  legend: { muscle: string; linea: string; gap: string };
  stages: { label: string; title: string; text: string }[];
  assessTitle: string;
  assess: string[];
};

/** Lista de situações para selecionar; a seleção segue escrita na mensagem de WhatsApp (components/SignsChecklist.tsx). */
export type ServiceSigns = {
  nav: string;
  title: string;
  intro: string;
  items: string[];
  /** {n} = número de situações selecionadas */
  countOne: string;
  countMany: string;
  none: string;
  noneHint: string;
  messageIntro: string;
  send: string;
  note: string;
};

export type ServiceContent = {
  name: string;
  short: string;
  mediaId: string;
  meta: { title: string; description: string };
  heroTitle: string;
  heroSub: string;
  /** Factos curtos no fundo do hero. */
  facts: { icon: IconName; text: string }[];
  /** Fisioterapeuta à frente do serviço: `media` de uma pessoa em `team`. */
  specialist?: string;
  /** Mostra o mapa do corpo (texto em `home.bodyMap`). */
  bodyMap?: boolean;
  explainer?: ServiceExplainer;
  signs?: ServiceSigns;
  forWho: { title: string; intro: string; items: Item[] };
  how: { title: string; intro?: string; steps: Step[] };
  distinct: { title: string; text: string; points: string[] };
  includes?: { title: string; intro: string };
  modules?: ServiceModule[];
  duration: { title: string; text: string };
  faq: Faq[];
  related: ServiceKey[];
};

export const pt = {
  locale: "pt" as Locale,
  htmlLang: "pt-PT",
  common: {
    bookAssessment: "Marcar avaliação",
    whatsappCta: "Marcar avaliação no WhatsApp",
    whatsapp: "WhatsApp",
    call: "Ligar",
    phoneNote: "(chamada para rede móvel nacional)",
    phoneDisplay: "924 098 545",
    seeTreatments: "Ver tratamentos",
    allServices: "Ver todos os serviços",
    learnMore: "Saber mais",
    comingSoon: "Em breve",
    notifyMe: "Avise-me quando abrir",
    yearsExperience: "anos de experiência",
    googleReviews: "avaliações no Google",
    seeAllReviews: "Ver todas as avaliações no Google",
    newWindow: "(abre numa nova janela)",
    home: "Início",
    menu: "Menu",
    closeMenu: "Fechar menu",
    openMenu: "Abrir menu",
    language: "Mudar para inglês",
    languageShort: "EN",
    scroll: "Descer",
    floatingWhatsapp: "Falar connosco no WhatsApp",
    directions: "Como chegar",
    sendMessage: "Enviar mensagem",
    close: "Fechar",
    previous: "Anterior",
    next: "Seguinte",
    photo: "Foto",
    video: "Vídeo",
    watchVideo: "Ver vídeo",
  },
  nav: { home: "Início", services: "Serviços", about: "Sobre", contact: "Contactos", comingSoon: "Em breve" },
  wa: {
    general: "Olá, gostava de marcar uma avaliação na Fisio4you.",
    service: "Olá, gostava de marcar uma avaliação de {s}.",
    problem: "Olá, tenho {p} e gostava de marcar uma avaliação.",
    notify: "Olá, gostava de ser avisado quando {s} estiver disponível.",
  },
  hours: {
    weekdays: "Segunda a sexta",
    weekdaysShort: "Seg–Sex",
    saturday: "Sábado",
    sunday: "Domingo",
    closed: "Encerrado",
    title: "Horário",
  },
  meta: {
    home: {
      title: "Fisio4you · Fisioterapia em Portimão | Centro de Reabilitação",
      description:
        "Fisioterapia em Portimão com avaliação ecográfica, ginásio de reabilitação de 100 m², crioterapia e sauna. Marque a sua avaliação por WhatsApp ou telefone.",
    },
    services: {
      title: "Serviços de Fisioterapia em Portimão | Fisio4you",
      description:
        "Fisioterapia musculoesquelética e dermatofuncional, ecografia, técnicas ecoguiadas, ginásio de reabilitação e recuperação com banheira de gelo e sauna em Portimão.",
    },
    comingSoon: {
      title: "Em breve: Fisiatria, Osteopatia, Pilates Clínico e Psicologia | Fisio4you",
      description: "Novas especialidades a chegar à Fisio4you em Portimão. Peça para ser avisado por WhatsApp.",
    },
    about: {
      title: "Sobre a Fisio4you · Centro de Reabilitação em Portimão",
      description: "Conheça a Fisio4you, a equipa e as instalações: ecografia, ginásio de reabilitação de 100 m², crioterapia e sauna em Portimão.",
    },
    contact: {
      title: "Contactos e Horário | Fisio4you Portimão",
      description: "Marque a sua avaliação na Fisio4you em Portimão por WhatsApp ou telefone (924 098 545). Morada, horário e como chegar.",
    },
    privacy: { title: "Política de Privacidade | Fisio4you", description: "Como a Fisio4you, Lda trata os seus dados pessoais." },
    terms: { title: "Termos de Utilização | Fisio4you", description: "Termos de utilização do website fisio4you.pt." },
    cookies: { title: "Política de Cookies | Fisio4you", description: "Que cookies utiliza o website fisio4you.pt e como gerir o consentimento." },
  },

  home: {
    hero: {
      eyebrow: "Centro de Reabilitação · Portimão",
      lines: ["Fisioterapia em Portimão,", "com ecografia e ginásio próprio."],
      sub: "Fisioterapia com avaliação ecográfica, ginásio de reabilitação de 100 m² e recuperação com crioterapia e sauna — tudo num só espaço, em Portimão.",
      facts: ["Ecografia na avaliação", "Ginásio de 100 m²", "Banheira de gelo e sauna"],    },
    stack: {
      title: "Tudo o que precisa, num só espaço",
      more: "Ver detalhes",
    },
    advantages: {
      title: "O que faz a diferença na sua recuperação",
      items: [
        {
          title: "Avaliação com ecografia",
          text: "Vemos músculos, tendões e ligamentos em tempo real, para tratar a causa e não só o sintoma.",
          media: "service-eco",
          link: { label: "Como usamos a ecografia", page: "service:msk", hash: "ecografia" },
        },
        {
          title: "Tudo no mesmo espaço",
          text: "Fisioterapia, ginásio de reabilitação de 100 m², banheira de gelo e sauna, sem andar de um sítio para o outro.",
          media: "brand-room",
          link: { label: "Ver as instalações", page: "about", hash: "galeria" },
        },
        {
          title: "Reabilitação ativa até ao regresso",
          text: "Exercício supervisionado e progressivo, com critérios claros para voltar a treinar e competir.",
          media: "service-gym",
          link: { label: "Conhecer o ginásio", page: "service:msk", hash: "ginasio" },
        },
        {
          title: "16 anos de experiência",
          text: "O Mário tem 16 anos de experiência a tratar lesões e a acompanhar recuperações.",
          media: "advantages-therapy",
          link: { label: "Conhecer a equipa", page: "about", hash: "equipa" },
        },
      ] as Advantage[],
    },
    hub: {
      title: "Tudo o que a sua recuperação precisa, num só espaço",
      text: "Da avaliação com ecografia ao regresso ao treino: fisioterapia, ginásio de reabilitação e recuperação, sem andar de um sítio para o outro.",
      cta: "Ver todos os serviços",
      items: { eco: "Ecografia", gym: "Ginásio de reabilitação", ice: "Banheira de gelo e sauna", postnatal: "Pós-parto e diástase" },
    },
    booking: {
      title: "Marque a sua avaliação",
      text: "Respondemos durante o horário da clínica.",
      hoursLabel: "Horário",
    },
    bodyMap: {
      title: "Onde sente dor ou limitação?",
      intro: "Escolha uma zona do corpo para ver o que costumamos tratar ali e falar connosco sobre o seu caso.",
      listLabel: "Zonas do corpo",
      commonLabel: "Situações frequentes",
      talk: "Descrever o meu caso no WhatsApp",
      see: "Ver o tratamento",
      regions: [
        {
          id: "cervical", x: 100, y: 72, label: "Pescoço",
          title: "Pescoço e cervical",
          text: "Dor cervical, rigidez e dores de cabeça de origem cervical, muitas vezes ligadas à postura e ao trabalho ao computador.",
          common: ["Cervicalgia", "Torcicolo", "Dor irradiada para o braço"],
          service: "msk", waTopic: "dor no pescoço",
        },
        {
          id: "ombro", x: 59, y: 104, label: "Ombro",
          title: "Ombro",
          text: "Dor ao levantar o braço, perda de força ou instabilidade. A ecografia ajuda a perceber o estado dos tendões.",
          common: ["Tendinopatia da coifa", "Ombro congelado", "Pós-operatório"],
          service: "msk", anchor: "ecografia", waTopic: "dor no ombro",
        },
        {
          id: "coluna", x: 100, y: 140, label: "Costas",
          title: "Costas e coluna",
          text: "Dor lombar ou dorsal, aguda ou que se arrasta há meses. Tratamos a dor e trabalhamos a força para que não volte.",
          common: ["Lombalgia", "Hérnia discal", "Ciática"],
          service: "msk", anchor: "ginasio", waTopic: "dor nas costas",
        },
        {
          id: "abdomen", x: 100, y: 184, label: "Abdómen",
          title: "Abdómen e pós-parto",
          text: "Recuperar a parede abdominal e o pavimento pélvico depois da gravidez, com acompanhamento próximo e discreto.",
          common: ["Diástase abdominal", "Recuperação pós-parto", "Cicatriz de cesariana"],
          service: "dermato", waTopic: "uma questão de pós-parto/diástase abdominal",
        },
        {
          id: "anca", x: 77, y: 208, label: "Anca",
          title: "Anca",
          text: "Dor na anca ou na virilha, ao caminhar, correr ou subir escadas, e reabilitação depois de prótese.",
          common: ["Tendinopatia glútea", "Pubalgia", "Prótese da anca"],
          service: "msk", anchor: "ginasio", waTopic: "dor na anca",
        },
        {
          id: "joelho", x: 82, y: 318, label: "Joelho",
          title: "Joelho",
          text: "Lesões desportivas, dor a correr ou a agachar, e a recuperação depois de cirurgia — até voltar a treinar com confiança.",
          common: ["Ligamento cruzado (LCA)", "Menisco", "Tendinopatia rotuliana"],
          service: "msk", anchor: "ginasio", waTopic: "dor no joelho",
        },
        {
          id: "tornozelo", x: 82, y: 396, label: "Tornozelo",
          title: "Tornozelo e pé",
          text: "Entorses que não ficam bem resolvidas, dor no tendão de Aquiles ou na planta do pé.",
          common: ["Entorse", "Tendinopatia de Aquiles", "Fascite plantar"],
          service: "msk", waTopic: "dor no tornozelo/pé",
        },
      ] as { id: string; x: number; y: number; label: string; title: string; text: string; common: string[]; service: ServiceKey; anchor?: string; waTopic: string }[],
      recovery: {
        title: "Sem lesão, só quer recuperar melhor?",
        text: "Banheira de gelo e sauna para quem treina com frequência.",
        link: "Conhecer a recuperação",
      },
    },
    featured: {
      title: "Dois serviços, um mesmo cuidado",
      intro: "Tratamos lesões e dor com método, e acompanhamos a recuperação depois do parto com a mesma atenção.",
      includesLabel: "Inclui",
    },
    videos: {
      title: "A Fisio4you na primeira pessoa",
      intro: "Conheça quem está à frente da clínica e ouça quem já cá treina e recupera.",
      items: ["video-mario", "video-angela", "video-pedro", "video-circuito"],
    },
    visit: {
      title: "Por dentro da clínica",
      intro: "Da avaliação ao último exercício, tudo acontece no mesmo espaço.",
      stops: [
        { media: "brand-room", title: "Receção", text: "Chega, é recebido e conhece o fisioterapeuta que o vai acompanhar." },
        { media: "service-eco", title: "Sala de avaliação", text: "Onde ouvimos a sua história e, quando indicado, fazemos a ecografia." },
        { media: "service-msk", title: "Sala de tratamento", text: "Terapia manual e técnicas ecoguiadas, com privacidade." },
        { media: "service-gym", title: "Ginásio de 100 m²", text: "Exercício supervisionado, do primeiro passo ao regresso ao desporto." },
        { media: "service-recovery", title: "Banheira de gelo", text: "Imersão em água fria para recuperar depois de treinos e competições." },
        { media: "recovery-sauna", title: "Sauna", text: "Calor para relaxar a musculatura." },
      ],
    },
    eco: {
      eyebrow: "Tecnologia",
      title: "Não tratamos às cegas.",
      text: "Com a ecografia, avaliamos músculos, tendões e ligamentos em tempo real. Isso permite perceber melhor o que se passa, acompanhar a evolução e aplicar técnicas ecoguiadas com maior precisão.",
      points: [
        { icon: "target", title: "Avaliação mais precisa", text: "Ver a estrutura lesionada, não apenas os sintomas." },
        { icon: "scan", title: "Tratamento dirigido", text: "Técnicas ecoguiadas aplicadas exatamente onde é preciso." },
        { icon: "eye", title: "Evolução visível", text: "Comparar imagens ao longo do tratamento." },
      ] as Item[],
      cta: "Saber mais sobre a ecografia",
      caption: "Ecografia músculo-esquelética: músculos, tendões e ligamentos vistos em tempo real.",
    },
    journey: {
      eyebrow: "O seu percurso",
      title: "Do primeiro contacto ao regresso à atividade",
      steps: [
        { title: "Avaliação", text: "Ouvimos a sua história, avaliamos o movimento e, quando indicado, usamos a ecografia." },
        { title: "Plano à medida", text: "Objetivos claros e um plano ajustado a si, à sua rotina e ao seu desporto." },
        { title: "Tratamento + exercício", text: "Terapia na marquesa e trabalho ativo no ginásio de reabilitação." },
        { title: "Regresso e prevenção", text: "Voltar a treinar, trabalhar ou viver sem dor — e evitar recaídas." },
      ],
    },
    why: {
      eyebrow: "Porquê a Fisio4you",
      title: "Porquê a Fisio4you",
      items: [
        { icon: "clock", title: "Experiência", text: "O Mário tem 16 anos de experiência a tratar lesões e a acompanhar recuperações." },
        { icon: "scan", title: "Tecnologia", text: "Ecografia e técnicas ecoguiadas ao serviço do tratamento." },
        { icon: "building", title: "Tudo no mesmo sítio", text: "Fisioterapia, ginásio e recuperação, sem andar de um lado para o outro." },
      ] as Item[],
    },
    founder: {
      eyebrow: "CEO e fisioterapeuta", // apelido e cargo confirmados nas entrevistas em vídeo (outubro 2026)
      name: "Mário Barroso",
      lead: "Fisioterapeuta com 16 anos de experiência a tratar lesões e a acompanhar recuperações, do primeiro dia ao regresso à atividade.",
      bio: [
        "[[Texto do Mário, 3–4 frases: percurso, especializações e porque criou a Fisio4you.]]",
      ],
      timeline: [
        { value: "[[ano]]", label: "Início da prática clínica" },
        { value: "[[ano]]", label: "Fundação da Fisio4you" },
        { value: "[[nº]]", label: "Especialidades" },
      ],
      cta: "Conhecer a equipa",
    },
    team: {
      eyebrow: "Equipa",
      title: "Uma equipa que trabalha lado a lado",
    },
    reviews: {
      title: "O que dizem os nossos utentes",
      intro: "Avaliações reais, copiadas tal como foram escritas no Google.",
      photoCaption: "Mário Barroso com clientes da Fisio4you.",
      source: "Avaliação no Google",
      all: "Ver todas as avaliações no Google",
      placeholder: "[Avaliação Google a inserir]",
      pendingRating: "Avaliações verificadas no Google",
    },
    coming: {
      eyebrow: "Em breve",
      title: "Em breve",
      text: "Vamos ter também",
    },
    insurance: "Acordos com seguros e subsistemas de saúde em breve. Fale connosco para saber mais.", // [[remover/atualizar quando houver acordos]]
  },

  ctaFinal: {
    title: "A sua recuperação começa com uma mensagem.",
    sub: "Diga-nos o que sente e marcamos a sua primeira avaliação.",
    whatsapp: { title: "WhatsApp", text: "A forma mais rápida de marcar.", cta: "Enviar mensagem" },
    phone: { title: "Telefone", text: "Prefere falar connosco?", cta: "Ligar" },
    directions: { title: "Como chegar", text: "Estacionamento e referência de localização a confirmar.", cta: "Abrir no Google Maps" }, // [[estacionamento / referência]]
  },

  map: {
    title: "Mapa",
    consentText: "O mapa é fornecido pelo Google e pode usar cookies. Carregue-o apenas se concordar.",
    load: "Mostrar mapa",
    open: "Abrir no Google Maps",
  },

  // Nomes e cargos como aparecem nas entrevistas em vídeo (outubro 2026). `video`: id em content/media.ts.
  team: [
    {
      media: "team-mario",
      name: "Mário Barroso",
      role: "CEO e fisioterapeuta",
      focus: "Lesões musculoesqueléticas, reabilitação e performance desportiva. 16 anos de experiência a tratar lesões e a acompanhar recuperações.",
      video: "video-mario-mensagem",
    },
    {
      media: "team-angela",
      name: "Angela Brazona",
      role: "CEO e fisioterapeuta",
      focus: "Fisioterapia dermatofuncional e saúde da mulher, no pré e no pós-parto, a nível fisiológico e estético.",
      video: "video-angela",
    },
  ],

  servicesPage: {
    eyebrow: "Serviços",
    title: "Serviços",
    sub: "Da avaliação com ecografia ao regresso ao desporto: tudo o que precisa para recuperar, num só espaço em Portimão.",
    available: "Disponíveis",
  },

  servicePage: {
    forWho: "Para quem é",
    includes: "O que inclui",
    how: "Como funciona",
    distinct: "O que nos distingue",
    duration: "Duração e frequência",
    faq: "Perguntas frequentes",
    faqShort: "Perguntas",
    onThisPage: "Nesta página",
    related: "Também disponível",
    where: "Onde dói",
    inStep: "Nesta fase",
  },

  services: <Record<ServiceKey, ServiceContent>>{
    msk: {
      name: "Fisioterapia Musculoesquelética",
      short: "Lesões desportivas, dor e reabilitação pós-cirúrgica, com ecografia, ginásio de reabilitação e recuperação com crioterapia e sauna.",
      mediaId: "service-msk",
      meta: {
        title: "Fisioterapia Musculoesquelética e Desportiva em Portimão | Fisio4you",
        description:
          "Lesões desportivas, dor lombar e cervical, tendinopatias e reabilitação pós-cirúrgica em Portimão, com ecografia, ginásio de 100 m², crioterapia e sauna.",
      },
      heroTitle: "Fisioterapia Musculoesquelética",
      heroSub: "Perceber a origem da dor ou da lesão e tratá-la com método — com ecografia, ginásio de reabilitação e recuperação no mesmo espaço.",
      facts: [
        { icon: "scan", text: "Ecografia na avaliação" },
        { icon: "dumbbell", text: "Ginásio de reabilitação com 100 m²" },
        { icon: "snowflake", text: "Banheira de gelo e sauna" },
        { icon: "clock", text: "Mário Barroso, 16 anos de experiência" },
      ],
      specialist: "team-mario",
      bodyMap: true,
      forWho: {
        title: "Situações que acompanhamos",
        intro: "Para desportistas, pessoas ativas e para quem quer voltar a mexer-se sem dor.",
        items: [
          { icon: "activity", title: "Entorses e lesões ligamentares", text: "Tornozelo, joelho, punho." },
          { icon: "flame", title: "Roturas e contraturas musculares", text: "Isquiotibiais, gémeos, quadricípite e outras." },
          { icon: "repeat", title: "Tendinopatias", text: "Ombro, cotovelo, joelho, tendão de Aquiles." },
          { icon: "bone", title: "Dor lombar e cervical", text: "Incluindo hérnias discais e dor irradiada." },
          { icon: "stethoscope", title: "Reabilitação pós-cirúrgica", text: "LCA, menisco, ombro, próteses." },
          { icon: "clock", title: "Dor crónica", text: "Abordagem ativa para recuperar função e confiança." },
        ],
      },
      includes: {
        title: "Tudo o que a sua recuperação precisa, no mesmo espaço",
        intro: "A fisioterapia musculoesquelética na Fisio4you integra três recursos que fazem a diferença.",
      },
      modules: [
        {
          id: "ecografia",
          nav: "Ecografia",
          summary: "Ver a lesão e guiar o tratamento",
          eyebrow: "Avaliação",
          title: "Ecografia e técnicas ecoguiadas",
          text: "Avaliamos músculos, tendões e ligamentos em tempo real, consigo a ver o ecrã. A ecografia não dói e não usa radiação, e permite aplicar técnicas ecoguiadas com maior precisão.",
          mediaId: "service-eco",
          points: [
            { icon: "eye", title: "Ver a lesão", text: "Observar a estrutura em repouso e em movimento." },
            { icon: "target", title: "Tratamento dirigido", text: "Técnicas aplicadas exatamente na estrutura a tratar." },
            { icon: "trending", title: "Evolução visível", text: "Comparar imagens ao longo do tratamento." },
          ],
          itemsTitle: "Técnicas ecoguiadas",
          items: [
            { title: "[[Técnica 1]]", text: "[[2–3 linhas de explicação em linguagem simples.]]" },
            { title: "[[Técnica 2]]", text: "[[2–3 linhas de explicação em linguagem simples.]]" },
            { title: "[[Técnica 3]]", text: "[[2–3 linhas de explicação em linguagem simples.]]" },
          ],
          note: "A ecografia em fisioterapia serve para avaliação funcional e para guiar o tratamento, não substituindo os exames de diagnóstico médico. [[confirmar redação com o Mário]]",
        },
        {
          id: "ginasio",
          nav: "Ginásio",
          summary: "Exercício supervisionado até ao regresso ao desporto",
          eyebrow: "Reabilitação ativa",
          title: "Ginásio de reabilitação com 100 m²",
          text: "Da marquesa ao exercício sem sair da clínica: exercício terapêutico supervisionado por fisioterapeutas, ajustado à fase da sua recuperação.",
          mediaId: "service-gym",
          points: [
            { icon: "dumbbell", title: "Exercício terapêutico", text: "Supervisionado e progressivo." },
            { icon: "footprints", title: "Readaptação ao esforço", text: "Recuperar capacidade e tolerância à carga." },
            { icon: "activity", title: "Regresso ao desporto", text: "Critérios claros para voltar a treinar e competir." },
            { icon: "shield", title: "Prevenção de lesões", text: "Trabalhar os pontos fracos antes de se tornarem lesões." },
          ],
        },
        {
          id: "recuperacao",
          nav: "Gelo e sauna",
          summary: "Recuperar entre treinos e competições",
          eyebrow: "Recuperação",
          title: "Crioterapia (banheira de gelo) e sauna",
          text: "Para quem treina com frequência e quer recuperar melhor entre treinos e competições, sempre com a orientação da nossa equipa.",
          mediaId: "service-recovery",
          points: [
            { icon: "snowflake", title: "Banheira de gelo", text: "Imersão em água fria, com tempo controlado." },
            { icon: "flame", title: "Sauna", text: "Calor para relaxamento muscular." },
            { icon: "repeat", title: "Integrado no plano", text: "Sessões integradas no tratamento. [[confirmar se há sessões avulsas]]" },
          ],
          itemsTitle: "Antes de começar",
          items: [
            { title: "Contraindicações gerais", text: "Problemas cardiovasculares, tensão arterial não controlada, gravidez, alterações de sensibilidade ou circulação, entre outras." },
            { title: "Aconselhe-se com a nossa equipa", text: "Antes da primeira sessão, falamos consigo para perceber se é indicado para si." },
          ],
          video: "video-circuito",
        },
      ],
      how: {
        title: "Como funciona",
        intro: "Quatro passos, da primeira avaliação à alta. Em cada um, sabe o que estamos a fazer e porquê.",
        steps: [
          {
            title: "Avaliação",
            text: "História clínica, testes de movimento e, quando indicado, ecografia.",
            details: ["Conversa sobre a lesão, a sua rotina e os seus objetivos", "Testes de movimento, força e mobilidade", "Ecografia, quando ajuda a perceber a lesão"],
            uses: ["ecografia"],
          },
          {
            title: "Plano",
            text: "Objetivos concretos e prazos realistas, ajustados à sua atividade.",
            details: ["Objetivos para cada fase da recuperação", "Uma estimativa do número de sessões, revista ao longo do tratamento"],
          },
          {
            title: "Tratamento + ginásio",
            text: "Terapia manual, técnicas ecoguiadas quando indicadas e exercício supervisionado.",
            details: ["Terapia manual e técnicas ecoguiadas, quando indicadas", "Exercício supervisionado, com carga progressiva", "Reavaliação regular para ajustar o plano"],
            uses: ["ecografia", "ginasio"],
          },
          {
            title: "Alta e prevenção",
            text: "Plano de exercícios para manter os resultados e evitar recaídas.",
            details: ["Critérios claros para voltar a treinar e competir", "Exercícios para manter os resultados em casa ou no treino"],
            uses: ["ginasio", "recuperacao"],
          },
        ],
      },
      distinct: {
        title: "Mais do que tratar a dor",
        text: "Juntamos a precisão da ecografia ao trabalho ativo no ginásio e à recuperação, para que o tratamento se traduza em força e confiança.",
        points: ["Ecografia na avaliação e no acompanhamento", "Ginásio de reabilitação com 100 m²", "Crioterapia e sauna para a recuperação"],
      },
      duration: {
        title: "Duração e frequência",
        text: "A duração e o número de sessões dependem da avaliação inicial. Fale connosco para saber mais. [[duração da sessão / preços / sessões avulsas de crioterapia e sauna]]",
      },
      faq: [
        { q: "Preciso de prescrição médica?", a: "[[confirmar com o Mário]] Fale connosco por WhatsApp ou telefone e esclarecemos a sua situação." },
        { q: "Quantas sessões vou precisar?", a: "Depende da lesão, do tempo de evolução e dos seus objetivos. Na avaliação inicial definimos um plano e uma estimativa, que vamos ajustando ao longo do tratamento." },
        { q: "Tenho esta dor há meses. Ainda vale a pena?", a: "Sim. Muitas pessoas chegam com dores que se arrastam há meses. A avaliação serve para perceber o que está a manter o problema e definir um plano realista." },
        { q: "A ecografia dói ou usa radiação?", a: "Não. É indolor — apenas se coloca um gel e se desliza a sonda sobre a pele — e utiliza ultrassons, sem radiação." },
        { q: "Qual a diferença entre a ecografia e uma ressonância magnética?", a: "A ecografia mostra músculos, tendões e ligamentos em tempo real, em repouso e em movimento, e pode repetir-se ao longo do tratamento. A ressonância magnética é um exame de diagnóstico pedido pelo médico. Na fisioterapia usamos a ecografia para avaliar e acompanhar, sem substituir os exames médicos." },
        { q: "Posso continuar a treinar durante o tratamento?", a: "Muitas vezes sim, com adaptações. Ajustamos a carga de treino à fase da recuperação para que se mantenha ativo com segurança." },
        { q: "Posso usar o ginásio, a banheira de gelo ou a sauna sem fazer fisioterapia?", a: "[[confirmar com o Mário]] Fale connosco para saber as opções disponíveis." },
        { q: "O que devo levar para a primeira consulta?", a: "Roupa confortável que permita avaliar a zona afetada e, se tiver, exames e relatórios médicos." },
      ],
      related: ["dermato"],
    },
    dermato: {
      name: "Fisioterapia Dermatofuncional",
      short: "Diástase abdominal, recuperação pós-parto e cuidados da pele e tecidos após cirurgia.", // [[confirmar âmbito]]
      mediaId: "service-dermato",
      meta: {
        title: "Diástase Abdominal e Pós-Parto em Portimão | Fisio4you",
        description:
          "Fisioterapia dermatofuncional em Portimão: recuperação pós-parto, diástase abdominal, cicatrizes e aderências, com acompanhamento próximo e discreto.",
      },
      heroTitle: "Fisioterapia Dermatofuncional",
      heroSub: "Acompanhamento próximo e discreto para recuperar o abdómen, o pavimento pélvico e os tecidos após o parto ou a cirurgia.",
      facts: [
        { icon: "baby", text: "Pós-parto e diástase abdominal" },
        { icon: "sparkles", text: "Cicatrizes e aderências" },
        { icon: "scan", text: "Ecografia para acompanhar a evolução" },
        { icon: "heart", text: "Angela Brazona, fisioterapeuta" },
      ],
      specialist: "team-angela",
      // [[validar com a Angela: texto do esquema da diástase, "Como avaliamos" e lista de sinais]]
      explainer: {
        nav: "A diástase",
        title: "O que é a diástase abdominal",
        intro: "É a separação dos dois músculos retos do abdómen, ao longo do meio da barriga. Escolha uma fase para ver o que acontece.",
        stagesLabel: "Fases",
        legend: { muscle: "Músculos retos do abdómen", linea: "Linha alba", gap: "Distância entre os retos" },
        stages: [
          {
            label: "Antes da gravidez",
            title: "Lado a lado",
            text: "Os dois músculos retos do abdómen ficam lado a lado, unidos ao centro pela linha alba, um tecido firme que dá estabilidade à barriga.",
          },
          {
            label: "Na gravidez",
            title: "Espaço para o bebé",
            text: "Com o crescimento da barriga, a linha alba estica e alarga e os músculos afastam-se. É uma adaptação normal do corpo.",
          },
          {
            label: "Depois do parto",
            title: "Quando a separação fica",
            text: "Em muitas mulheres, a separação diminui nos meses a seguir ao parto. Quando se mantém e a barriga continua sem firmeza, falamos de diástase abdominal.",
          },
        ],
        assessTitle: "Como avaliamos",
        assess: [
          "Medimos a largura e a profundidade da separação, com os dedos e, quando indicado, com ecografia.",
          "Vemos como a parede abdominal responde ao respirar, ao fazer força e ao mexer-se.",
          "Repetimos a avaliação ao longo do acompanhamento, para ver a evolução de forma objetiva.",
        ],
      },
      signs: {
        nav: "Sinais",
        title: "Reconhece-se em alguma destas situações?",
        intro: "Selecione o que se aplica a si. A sua seleção segue escrita na mensagem de WhatsApp, para prepararmos a avaliação.",
        items: [
          "Uma saliência ou um afundamento ao longo do meio da barriga quando se levanta ou faz força",
          "Barriga sem firmeza, mesmo meses depois do parto",
          "Dor nas costas ou na zona da bacia",
          "Perdas de urina ao tossir, rir ou saltar",
          "Cicatriz de cesariana que repuxa, parece presa ou tem a sensibilidade alterada",
          "Quero voltar a treinar ou a correr em segurança",
        ],
        countOne: "1 situação selecionada",
        countMany: "{n} situações selecionadas",
        none: "Nenhuma situação selecionada",
        noneHint: "Pode enviar mensagem na mesma.",
        messageIntro: "Reconheço-me nestas situações:",
        send: "Enviar a minha seleção no WhatsApp",
        note: "Não é um diagnóstico. Serve só para nos contar o seu caso antes da avaliação.",
      },
      forWho: {
        title: "Situações que acompanhamos",
        intro: "Um espaço de confiança, ao seu ritmo e com todo o respeito pela sua privacidade.",
        items: [
          { icon: "baby", title: "Recuperação pós-parto", text: "Abdómen, postura e regresso progressivo à atividade." },
          { icon: "target", title: "Diástase abdominal", text: "Avaliação e plano de exercício específico." },
          { icon: "sparkles", title: "Cicatrizes e aderências", text: "Incluindo cicatriz de cesariana." },
          { icon: "stethoscope", title: "Pós-operatório de cirurgia plástica/estética", text: "[[confirmar]]" },
          { icon: "flower", title: "Edema e drenagem linfática", text: "[[confirmar]]" },
        ],
      },
      how: {
        title: "Como funciona",
        intro: "Ao seu ritmo e com cada passo explicado, da primeira conversa até se sentir segura.",
        // [[validar com a Angela: detalhe de cada passo]]
        steps: [
          {
            title: "Conversa e avaliação",
            text: "Ouvimos a sua história e avaliamos com cuidado, quando indicado com ecografia.",
            details: ["A gravidez, o parto, cirurgias anteriores e o que sente hoje", "Avaliação da parede abdominal, da postura e da respiração"],
          },
          {
            title: "Plano",
            text: "Objetivos realistas, adaptados à sua fase e à sua rotina.",
            details: ["Semanas, meses ou anos depois do parto: o plano parte do seu ponto de partida", "Exercícios que cabem no seu dia a dia"],
          },
          {
            title: "Sessões",
            text: "Técnicas manuais e exercício orientado, sempre com explicação de cada passo.",
            details: ["Respiração, postura e ligação ao abdómen profundo e ao pavimento pélvico", "Fortalecimento progressivo da parede abdominal", "Técnicas manuais, também para cicatrizes e aderências"],
          },
          {
            title: "Autonomia",
            text: "Exercícios para casa e acompanhamento até se sentir segura.",
            details: ["Exercícios para casa, explicados e revistos nas sessões", "Regresso gradual ao exercício, à corrida ou ao desporto"],
          },
        ],
      },
      distinct: {
        title: "Acompanhamento especializado",
        text: "A ecografia permite acompanhar a parede abdominal de forma objetiva, e o ginásio de reabilitação ajuda a recuperar força e confiança com segurança.",
        points: ["Ambiente acolhedor e discreto", "Ecografia para acompanhar a evolução", "Exercício orientado no ginásio"],
      },
      duration: {
        title: "Duração e frequência",
        text: "Definida após a avaliação inicial, de acordo com a sua fase e objetivos. [[duração da sessão / preço]]",
      },
      faq: [
        { q: "Quando posso começar depois do parto?", a: "Depende do tipo de parto, de como correu a recuperação e da indicação do seu médico. Fale connosco e ajudamos a perceber qual o melhor momento. [[validar com o Mário]]" },
        { q: "Como sei se tenho diástase abdominal?", a: "Alguns sinais comuns são uma saliência ou um afundamento ao longo do meio da barriga quando se levanta da cama ou faz força, e a sensação de barriga fraca. Só a avaliação confirma, com palpação e, quando indicado, ecografia." },
        { q: "A diástase tem tratamento sem cirurgia?", a: "Muitas situações melhoram com fisioterapia e exercício específico, mas cada caso é diferente. A avaliação permite perceber o seu ponto de partida e o que é realista esperar." },
        { q: "O parto já foi há anos. Ainda faz sentido?", a: "Sim. A diástase, a fraqueza abdominal e as cicatrizes podem ser avaliadas e trabalhadas muito depois do parto. A avaliação mostra de onde parte e o que é realista esperar." },
        { q: "A cicatriz de cesariana pode ser trabalhada?", a: "Depois de a cicatriz estar fechada e sarada, a fisioterapia trabalha a mobilidade da pele e dos tecidos à volta. Pode ajudar quando a cicatriz repuxa, parece presa ou tem a sensibilidade alterada." }, // [[validar com a Angela]]
        { q: "Como é a primeira avaliação?", a: "Começamos por uma conversa sobre a sua história e objetivos, seguida de uma avaliação cuidada e explicada passo a passo, com total respeito pela sua privacidade." },
      ],
      related: ["msk"],
    },
  },

  // Especialidades futuras: retiradas do site por agora (ver PRODUCT.md). Texto guardado para reativar quando abrirem.
  comingSoon: {
    eyebrow: "Em breve",
    title: "Novas especialidades",
    sub: "Estamos a crescer para cuidar de si de forma ainda mais completa. Peça para ser avisado quando abrirem.",
    items: [
      { icon: "stethoscope", name: "Fisiatria", text: "Consulta médica de medicina física e de reabilitação, para diagnóstico e orientação do plano de reabilitação." },
      { icon: "bone", name: "Osteopatia", text: "Abordagem manual centrada na mobilidade das articulações e tecidos." },
      { icon: "flower", name: "Pilates Clínico", text: "Exercício orientado por profissionais de saúde para controlo, força e postura." },
      { icon: "brain", name: "Psicologia", text: "Apoio psicológico, incluindo na gestão da dor e no regresso ao desporto após lesão." },
    ] as { icon: IconName; name: string; text: string }[],
  },

  about: {
    eyebrow: "Sobre nós",
    title: "Fisio4you — Centro de Reabilitação",
    sub: "Fisioterapia, ginásio de reabilitação e recuperação num só espaço, em Portimão.",
    storyTitle: "A nossa história",
    story: ["[[Pedir ao Mário o texto da história da clínica.]]"],
    missionTitle: "Missão",
    mission: "Ajudar cada pessoa a recuperar, fortalecer-se e voltar à atividade que gosta, com rigor e acompanhamento próximo.",
    valuesTitle: "Valores",
    values: [
      { icon: "target", title: "Rigor", text: "Avaliar bem para tratar melhor." },
      { icon: "users", title: "Proximidade", text: "Conhecer a pessoa, não apenas a lesão." },
      { icon: "trending", title: "Evolução", text: "Objetivos claros e progresso que se mede." },
    ] as Item[],
    founderTitle: "Quem está por trás",
    founderLong: ["[[Versão longa do percurso do Mário: formação, especializações, experiência com desportistas.]]"],
    teamTitle: "A equipa",
    galleryTitle: "As instalações",
  },

  contact: {
    eyebrow: "Contactos",
    title: "Fale connosco",
    sub: "Marque a sua avaliação por WhatsApp ou telefone. Respondemos durante o horário da clínica.",
    email: "Email",
    address: "Morada",
    phone: "Telefone",
    findUs: "Como nos encontrar",
    accessTitle: "Acessibilidade e estacionamento",
    access: "[[confirmar acessibilidade e estacionamento]]",
  },

  footer: {
    tagline: "Centro de reabilitação em Portimão.",
    services: "Serviços",
    clinic: "Clínica",
    contacts: "Contactos",
    team: "Equipa",
    legal: "Fisio4you, Lda",
    nif: "NIF",
    ers: "Registo ERS n.º",
    license: "Licença n.º",
    complaints: "Livro de Reclamações Eletrónico",
    privacy: "Política de Privacidade",
    terms: "Termos",
    cookies: "Política de Cookies",
    cookieSettings: "Preferências de cookies",
    rights: "Todos os direitos reservados.",
    builtBy: "Desenvolvido por",
  },

  cookieBanner: {
    text: "Usamos cookies essenciais para o site funcionar e, com o seu consentimento, cookies de medição e o mapa do Google.",
    accept: "Aceitar",
    reject: "Recusar",
    more: "Saber mais",
  },

  legal: {
    updated: "Última atualização: outubro de 2026",
    privacy: {
      title: "Política de Privacidade",
      sections: [
        { h: "Responsável pelo tratamento", p: ["Fisio4you, Lda, NIF 514 628 847, com sede em Rua Francisco Alvo, loja 11, 8500-759 Portimão. Contacto: fisio4youportimao@gmail.com."] },
        { h: "Que dados tratamos", p: ["Este website não tem formulários. Os dados que nos envia por WhatsApp, telefone ou email (nome, contacto e informação sobre o motivo da consulta) são usados apenas para responder e marcar a sua consulta.", "Com o seu consentimento, podemos recolher dados de navegação anónimos ou pseudonimizados para medir a utilização do site."] },
        { h: "Fundamento e conservação", p: ["Tratamos os dados com base nas diligências pré-contratuais a seu pedido, no cumprimento de obrigações legais e no seu consentimento. Conservamos os dados apenas pelo tempo necessário para essas finalidades ou exigido por lei."] },
        { h: "Partilha de dados", p: ["As mensagens de WhatsApp são processadas pela WhatsApp/Meta, de acordo com as suas próprias políticas. Não vendemos nem cedemos os seus dados a terceiros para fins comerciais."] },
        { h: "Os seus direitos", p: ["Pode pedir acesso, retificação, apagamento, limitação, portabilidade ou opor-se ao tratamento dos seus dados através de fisio4youportimao@gmail.com. Tem também o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (www.cnpd.pt)."] },
      ] as LegalSection[],
    },
    terms: {
      title: "Termos de Utilização",
      sections: [
        { h: "Objeto", p: ["Este website apresenta a Fisio4you, Lda e os seus serviços. A informação tem caráter geral e não substitui uma avaliação clínica individual."] },
        { h: "Propriedade intelectual", p: ["Os textos, imagens, logótipo e restantes conteúdos pertencem à Fisio4you, Lda ou são usados com autorização, não podendo ser reproduzidos sem consentimento."] },
        { h: "Responsabilidade", p: ["Procuramos manter a informação atualizada e correta, mas não garantimos a ausência de erros. Os resultados de qualquer tratamento dependem de cada pessoa e da sua situação clínica."] },
        { h: "Ligações externas", p: ["O site contém ligações para serviços de terceiros (WhatsApp, Google Maps, redes sociais), cujas políticas são da responsabilidade dos respetivos operadores."] },
        { h: "Lei aplicável", p: ["Aplica-se a lei portuguesa. Em caso de litígio, o consumidor pode recorrer ao Livro de Reclamações Eletrónico ou a uma entidade de resolução alternativa de litígios."] },
      ] as LegalSection[],
    },
    cookies: {
      title: "Política de Cookies",
      sections: [
        { h: "O que são cookies", p: ["Cookies são pequenos ficheiros guardados no seu dispositivo quando visita um website."] },
        { h: "Cookies que usamos", p: ["Essenciais: guardam a sua escolha de consentimento (armazenamento local do navegador).", "Medição (apenas com consentimento): Google Tag Manager / Google Analytics, para perceber como o site é usado.", "Terceiros (apenas com consentimento): o mapa do Google Maps pode definir cookies próprios."] },
        { h: "Gerir o consentimento", p: ["Pode alterar a sua escolha em qualquer momento através do link “Preferências de cookies” no rodapé, ou apagar os cookies nas definições do seu navegador."] },
      ] as LegalSection[],
    },
  },
};

export type Dict = typeof pt;
