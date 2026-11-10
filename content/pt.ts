// Conteúdo em português europeu. Nenhum componente deve ter texto fora de content/.
// {s} = nome do serviço · {p} = zona/problema · {n} = número

import type { Locale, ServiceKey } from "@/lib/routes";

export type IconName =
  | "activity" | "bone" | "heart" | "snowflake" | "flame" | "dumbbell" | "scan" | "baby"
  | "shield" | "repeat" | "target" | "eye" | "trending" | "users" | "building" | "sparkles"
  | "footprints" | "clipboard" | "stethoscope" | "brain" | "flower" | "clock" | "mappin";

/** `anchor`: secção da página do serviço para onde o item leva na página Fisioterapia (por omissão, `situacoes`). */
type Item = { icon: IconName; title: string; text: string; anchor?: string };
type Faq = { q: string; a: string };
type LegalSection = { h: string; p: string[] };

/** Capítulo de uma página de serviço, com âncora `#id` (`nav`: nome curto no índice do topo). Sem `mediaId`: só texto, com o título à esquerda. */
export type ServiceChapter = {
  id: string;
  nav: string;
  title: string;
  text: string;
  mediaId?: string;
  points: { icon?: IconName; title: string; text: string }[];
  note?: string;
};

/**
 * Tratamentos de uma página de serviço em três blocos (components/TreatmentBlocks.tsx):
 * técnicas (foto fixa + lista com filetes) → sessões Recovery (painel teal com os planos) → desempenho desportivo (dois cartões com foto).
 * `nav`: nome curto no índice do topo da página.
 */
export type TreatmentBlocks = {
  techniques: {
    id: string; nav: string; title: string; intro: string; mediaId: string;
    usesLabel: string;
    items: { id: string; name: string; full?: string; text: string; uses: string[] }[];
    note: string;
  };
  recovery: {
    id: string; nav: string; title: string; text: string; mediaId: string; secondMediaId: string;
    /** Vídeo (id em content/media.ts) no lugar da primeira foto: capa com play, abre com som. */
    video?: string;
    plansTitle: string;
    /** `parts`: as chaves de `parts` incluídas no plano, pela ordem da sessão. */
    plans: { name: string; parts: string[] }[];
    partsTitle: string;
    parts: { key: string; title: string; text: string }[];
    benefitsTitle: string;
    benefits: string[];
    waTopic: string;
    cta: string;
    /** Seletor das sessões (components/RecoveryPlanner.tsx): `{p}` é a sessão escolhida, `{n}` quantas técnicas tem e `{t}` o total. */
    planner: { cta: string; summary: string; included: string; excluded: string };
  };
  sport: {
    /** Fora do site enquanto não houver fotos que mostrem de facto a avaliação isocinética e o treino de prevenção. */
    hidden?: boolean;
    id: string; nav: string; title: string; intro: string;
    items: { id: string; title: string; text: string; points: string[]; mediaId: string }[];
  };
};

/** Item de uma lista: só texto, ou com um rótulo a negrito por cima. */
export type CarePoint = string | { title: string; text: string };

/**
 * Um tratamento no guia da dermatofuncional (components/CareGuide.tsx), com o texto do cliente organizado por camadas:
 * à vista o `summary` e o essencial; `more` fica em «Saber mais».
 * - `steps`: as fases de um protocolo, ligadas por uma linha (como as fases do tratamento por zona da musculoesquelética).
 * - `options`: variantes do tratamento, escolhidas num seletor (ex.: pré-parto / pós-parto).
 * - `groups`: listas alternativas, escolhidas num seletor quando há mais de uma (ex.: saúde / estética).
 * - `wa`: `topic` completa `wa.service` ("…marcar uma consulta de {s}.").
 */
export type CareGuideItem = {
  id: string;
  label: string;
  title: string;
  tagline: string;
  summary: string;
  steps?: { title: string; items: { title: string; text: string }[] };
  options?: { title: string; items: { label: string; title: string; tagline?: string; text: string; points?: string[] }[] };
  groups?: { title: string; items: { label: string; intro?: string; points: CarePoint[] }[] };
  chips?: { title: string; intro?: string; items: string[] };
  note?: string;
  more: { title: string; text: string[] }[];
};

/** Guia dos tratamentos da dermatofuncional: índice dos tratamentos e um painel que troca (como `ZoneGuide`). */
export type CareGuide = {
  nav: string;
  title: string;
  intro: string;
  listLabel: string;
  moreLabel: string;
  lessLabel: string;
  /** Botão no fim do painel para o tratamento seguinte: `{t}` é o nome dele. */
  nextLabel: string;
  items: CareGuideItem[];
};

/** Recurso incluído num serviço (ex.: ecografia, ginásio, recuperação): também aparece na home e em Serviços, com o `summary`. */
export type ServiceModule = ServiceChapter & {
  summary: string;
  eyebrow: string;
  itemsTitle?: string;
  items?: { title: string; text: string }[];
  /** Vídeo (id em content/media.ts) mostrado junto do texto. */
  video?: string;
  /** Sem capítulo na página do serviço: continua nas listas da home e de Serviços, com o link para o topo da página. */
  noChapter?: boolean;
  /** Capítulo em destaque, num painel teal com duas fotos (`RecoveryPanel` em components/ServiceChapters.tsx). */
  panel?: {
    moreText: string;
    /** Segunda foto do painel, por baixo da principal. */
    secondMediaId: string;
    sessionTitle: string;
    session: { title: string; text: string }[];
    indicatedTitle: string;
    indicated: string[];
    /** Título dos `points`: o resto da área de recuperação. */
    alsoTitle: string;
    /** Completa `wa.service` ("…marcar uma consulta de {s}."). */
    waTopic: string;
    cta: string;
  };
};

/**
 * Passo do percurso. `line`: a frase curta da fase, em letra grande, na escada de frases da página de serviço
 * (começa pela palavra de ordem: "Primeiro…", "Depois…"). `uses`: ids dos recursos (`modules`) usados nesse passo.
 */
type Step = { title: string; line: string; text: string; details?: string[]; uses?: string[] };

/**
 * Esquema interativo da diástase abdominal (components/DiastasisExplorer.tsx).
 * `stages` tem sempre 3 fases, por esta ordem: antes da gravidez, na gravidez, depois do parto (o desenho segue a ordem).
 */
export type ServiceExplainer = {
  /** Fora da página (a secção e o chip «A diástase» do índice), sem perder o texto. */
  hidden?: boolean;
  nav: string;
  title: string;
  intro: string;
  stagesLabel: string;
  legend: { muscle: string; linea: string; gap: string };
  stages: { label: string; title: string; text: string }[];
  assessTitle: string;
  assess: string[];
};

/** Textos e fotos próprios da página de serviço (components/pages/ServicePage.tsx). Fotos: ids de content/media.ts. */
export type ServicePageCopy = {
  /** Frase curta por baixo do título (o `heroSub`, mais longo, fica para a home). */
  lead: string;
  /** Foto do serviço no topo: larga (2:1) por baixo do título ou, com `heroBeside`, vertical (3:4) e inteira ao lado dele. */
  heroWide: string;
  heroBeside?: boolean;
  /** Foto 4:5 por baixo da introdução das situações (quando a página tem poucas fotos). */
  conditionsPhoto?: string;
  /** Mostra as duas áreas da clínica em painéis com foto (texto em `servicePage.areas`), a seguir às situações. */
  areas?: boolean;
  /**
   * O que é o serviço, logo a seguir à foto do topo: `statement` é uma frase grande em três partes (a do meio a teal),
   * e `text` os parágrafos (a lista «O que tratamos» saiu a pedido do cliente, 10/11/2026).
   */
  about?: {
    statement: [string, string, string];
    text: string[];
  };
  /** Capítulos da página quando o serviço não tem `modules` (dermatofuncional). */
  chapters?: ServiceChapter[];
  /** Tratamentos da musculoesquelética (texto do cliente), em três blocos: substitui os capítulos (components/TreatmentBlocks.tsx). */
  treatments?: TreatmentBlocks;
  /** Tratamentos da dermatofuncional (texto do cliente), num guia interativo: substitui os capítulos (components/CareGuide.tsx). */
  care?: CareGuide;
  /** Biografia do fisioterapeuta responsável: o nome vem de `team`, por isso `bio` começa logo a seguir ao nome. */
  person: { bio: string };
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
  forWho: { title: string; intro: string; items: Item[] };
  /**
   * Sem mapa do corpo: as situações da página de serviço em tabela, uma linha por zona, cada uma abre o WhatsApp.
   * `waTopic` completa `wa.problem` ("Olá, tenho {p}…"). Com `waTopic` por confirmar, a linha fica escondida.
   */
  conditions?: { id: string; label: string; common: string[]; waTopic: string }[];
  how: { title: string; intro?: string; steps: Step[] };
  distinct: { title: string; text: string; points: string[] };
  /** Recursos incluídos (`modules`): título e introdução da secção. */
  includes?: { title: string; intro: string };
  modules?: ServiceModule[];
  duration: { title: string; text: string };
  faq: Faq[];
  page: ServicePageCopy;
};

/** Bloco de texto de uma página de consulta: parágrafos e/ou lista. */
export type ConsultSection = { title: string; text?: string[]; list?: string[] };

export const pt = {
  locale: "pt" as Locale,
  htmlLang: "pt-PT",
  common: {
    bookAssessment: "Marcar consulta",
    whatsappCta: "Marcar consulta por WhatsApp",
    whatsapp: "WhatsApp",
    call: "Ligar",
    phoneNote: "(chamada para rede móvel nacional)",
    phoneDisplay: "924 098 545",
    seeTreatments: "Ver tratamentos",
    allServices: "Ver todos os serviços",
    learnMore: "Conhecer o serviço",
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
    floatingWhatsapp: "Contactar por WhatsApp",
    directions: "Como chegar",
    sendMessage: "Enviar mensagem",
    close: "Fechar",
    previous: "Anterior",
    next: "Seguinte",
    photo: "Foto",
    video: "Vídeo",
    watchVideo: "Ver vídeo",
  },
  nav: { home: "Início", services: "Fisioterapia", consultations: "Consultas", about: "Sobre", contact: "Contactos", comingSoon: "Em breve" },
  wa: {
    general: "Olá, gostava de marcar uma consulta na Fisio4you.",
    service: "Olá, gostava de marcar uma consulta de {s}.",
    problem: "Olá, tenho {p} e gostava de marcar uma consulta.",
    notify: "Olá, gostava de ser avisado quando {s} estiver disponível.",
  },
  /** Janela de chat do botão flutuante (components/FloatingWhatsApp.tsx). A 1.ª resposta rápida usa a mensagem da página. */
  chat: {
    status: "WhatsApp",
    greeting: "Olá. Em que podemos ajudar?",
    book: "Marcar consulta",
    quick: [
      { label: "Saber preços", msg: "Olá, gostava de saber os preços das consultas." },
      { label: "Tenho outra questão", msg: "Olá, tenho uma questão para a Fisio4you." },
    ],
    placeholder: "Escreva a sua mensagem…",
    redirecting: "A abrir o WhatsApp…",
    tooltip: "Tem alguma questão? Fale connosco pelo WhatsApp.",
    open: "Abrir chat do WhatsApp",
    close: "Fechar chat",
    send: "Enviar mensagem",
    dismiss: "Fechar aviso",
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
      title: "Fisioterapia em Portimão | Fisio4you, Centro de Reabilitação",
      description:
        "Clínica de fisioterapia em Portimão: lesões musculoesqueléticas, reabilitação desportiva e pós-parto. Ecografia e ginásio de reabilitação com 100 m².",
    },
    services: {
      title: "Serviços de Fisioterapia em Portimão | Fisio4you",
      description:
        "Fisioterapia musculoesquelética e dermatofuncional em Portimão: lesões desportivas, dor, reabilitação após cirurgia, pós-parto e diástase abdominal.",
    },
    consultations: {
      title: "Consultas em Portimão: Pilates Clínico, Psicologia, Fisiatria e Osteopatia | Fisio4you",
      description: "Consultas de Pilates Clínico, Psicologia, Fisiatria e Osteopatia na Fisio4you, em Portimão. Saiba o que trata cada uma e marque a sua consulta.",
    },
    comingSoon: {
      title: "Em breve: Fisiatria, Osteopatia, Pilates Clínico e Psicologia | Fisio4you",
      description: "Novas especialidades a chegar à Fisio4you em Portimão. Peça para ser avisado por WhatsApp.",
    },
    about: {
      title: "Sobre a Fisio4you | Clínica de Fisioterapia em Portimão",
      description: "Clínica de fisioterapia em Portimão dirigida pelo fisioterapeuta Mário Barroso, com Angela Brazona na fisioterapia dermatofuncional. Conheça a equipa, a forma de trabalhar e as instalações.",
    },
    contact: {
      title: "Contactos e Horário | Fisio4you Portimão",
      description: "Contactos da Fisio4you, clínica de fisioterapia em Portimão: telefone 924 098 545, WhatsApp, morada e horário. Marque a sua consulta.",
    },
    privacy: { title: "Política de Privacidade | Fisio4you", description: "Como a Fisio4you, Lda trata os seus dados pessoais." },
    terms: { title: "Termos de Utilização | Fisio4you", description: "Termos de utilização do website fisio4you.pt." },
    cookies: { title: "Política de Cookies | Fisio4you", description: "Que cookies utiliza o website fisio4you.pt e como gerir o consentimento." },
  },

  home: {
    hero: {
      eyebrow: "Centro de Reabilitação · Portimão",
      // Frase escolhida pelo cliente (30/10/2026); "Fisioterapia em Portimão" abre a frase de baixo
      lines: ["Fisioterapia", "feita para si"],
      sub: "Fisioterapia em Portimão para lesões musculoesqueléticas e recuperação pós-parto, com ecografia e ginásio de reabilitação na própria clínica.",
    },
    stack: {
      title: "Tudo o que precisa, num só espaço",
      more: "Conhecer o serviço",
    },
    hub: {
      title: "Tratamento e reabilitação no mesmo espaço",
      text: "A fisioterapia musculoesquelética inclui ecografia, ginásio de reabilitação, banheira de gelo e sauna. A fisioterapia dermatofuncional é dedicada ao pós-parto e à diástase abdominal.",
      cta: "Conhecer os serviços",
      items: { eco: "Ecografia", gym: "Ginásio de reabilitação", ice: "Banheira de gelo e sauna", postnatal: "Pós-parto e diástase" },
    },
    booking: {
      title: "Contactos",
      text: "Respondemos às mensagens durante o horário da clínica.",
      hoursLabel: "Horário",
    },
    /**
     * Tratamento por zona do corpo, na página da musculoesquelética (components/ZoneGuide.tsx), da cabeça aos pés.
     * `steps`: o que acontece em cada uma das `phases` (avaliação, tratamento, autonomia). Uma zona com `service` de outro
     * serviço (o abdómen) não abre painel: leva à página desse serviço.
     */
    bodyMap: {
      title: "Como tratamos cada zona",
      intro: "Escolha uma zona para ver como decorre o tratamento, da avaliação à autonomia. A indicação para tratamento é confirmada na consulta.",
      listLabel: "Zonas do corpo",
      commonLabel: "Situações frequentes",
      talk: "Descrever o meu caso",
      phases: ["Avaliação", "Tratamento", "Autonomia"],
      regions: [
        {
          id: "cervical", label: "Pescoço",
          title: "Pescoço e cervical",
          text: "Dor e rigidez no pescoço, dores de cabeça de origem cervical ou dor que desce para o braço, muitas vezes ligadas a posturas mantidas, como o trabalho ao computador.",
          steps: [
            "Mobilidade do pescoço e dos ombros, postura de trabalho e, se a dor desce para o braço, testes neurológicos.",
            "Terapia manual e exercícios de mobilidade e de força para a cervical e a zona dorsal.",
            "Exercícios para manter em casa e ajustes à rotina, como a posição de trabalho.",
          ],
          common: ["Cervicalgia", "Torcicolo", "Dor irradiada para o braço"],
          service: "msk", waTopic: "dor no pescoço",
        },
        {
          id: "ombro", label: "Ombro",
          title: "Ombro",
          text: "Dor ao elevar o braço, perda de força ou instabilidade, e reabilitação depois de uma cirurgia ao ombro.",
          steps: [
            "Testes de movimento e de força e, quando indicado, ecografia para observar os tendões.",
            "Terapia manual e exercício com carga progressiva para os músculos do ombro e da omoplata.",
            "Retoma por fases dos gestos acima da cabeça, no desporto ou no trabalho.",
          ],
          common: ["Tendinopatia da coifa dos rotadores", "Ombro congelado", "Pós-operatório"],
          service: "msk", waTopic: "dor no ombro",
        },
        {
          id: "coluna", label: "Costas",
          title: "Costas e coluna",
          text: "Dor lombar ou dorsal, recente ou persistente, por vezes com dor que desce para a perna.",
          steps: [
            "História da dor, testes de movimento e, se a dor desce para a perna, testes neurológicos.",
            "Terapia manual e exercício para recuperar a mobilidade e a força do tronco.",
            "Um plano de exercício para continuar, em casa ou no ginásio.",
          ],
          common: ["Lombalgia", "Hérnia discal", "Ciática"],
          service: "msk", waTopic: "dor nas costas",
        },
        {
          id: "abdomen", label: "Abdómen",
          title: "Abdómen e pós-parto",
          text: "Recuperação da parede abdominal e do pavimento pélvico depois da gravidez, na área de fisioterapia dermatofuncional.",
          common: ["Diástase abdominal", "Recuperação pós-parto", "Cicatriz de cesariana"],
          service: "dermato", waTopic: "uma questão de pós-parto/diástase abdominal",
        },
        {
          id: "anca", label: "Anca",
          title: "Anca",
          text: "Dor na anca ou na virilha ao caminhar, correr ou subir escadas, e reabilitação depois de uma prótese da anca.",
          steps: [
            "Mobilidade da anca, força dos glúteos e observação da marcha ou da corrida.",
            "Terapia manual e exercício de força e de controlo da anca e do tronco, no ginásio.",
            "Aumento progressivo da carga até à marcha, à corrida ou ao desporto.",
          ],
          common: ["Tendinopatia glútea", "Pubalgia", "Prótese da anca"],
          service: "msk", waTopic: "dor na anca",
        },
        {
          id: "joelho", label: "Joelho",
          title: "Joelho",
          text: "Lesões desportivas, dor ao correr ou agachar e reabilitação depois de uma cirurgia, como a do ligamento cruzado.",
          steps: [
            "Testes de estabilidade, de força e de movimento e, quando indicado, ecografia.",
            "Terapia manual e exercício supervisionado no ginásio, com carga progressiva.",
            "Testes físicos e critérios definidos antes de voltar ao treino e à competição.",
          ],
          common: ["Ligamento cruzado (LCA)", "Menisco", "Tendinopatia rotuliana"],
          service: "msk", waTopic: "dor no joelho",
        },
        {
          id: "tornozelo", label: "Tornozelo",
          title: "Tornozelo e pé",
          text: "Entorses recorrentes ou mal recuperadas, dor no tendão de Aquiles ou na planta do pé.",
          steps: [
            "Testes de estabilidade e de equilíbrio e, quando indicado, ecografia dos ligamentos e do tendão.",
            "Terapia manual e exercício de força, de equilíbrio e de controlo do pé e da perna.",
            "Saltos, corrida e mudanças de direção, por fases, antes de voltar ao desporto.",
          ],
          common: ["Entorse", "Tendinopatia de Aquiles", "Fascite plantar"],
          service: "msk", waTopic: "dor no tornozelo/pé",
        },
      ] as { id: string; label: string; title: string; text: string; steps?: string[]; common: string[]; service: ServiceKey; waTopic: string }[],
      recovery: {
        title: "Recuperação entre treinos",
        text: "Banheira de gelo e sauna para quem treina com regularidade.",
        link: "Ver a área de recuperação",
      },
    },
    featured: {
      title: "Serviços de fisioterapia",
      intro: "Duas áreas de intervenção, cada uma com um responsável: Mário Barroso na fisioterapia musculoesquelética e Angela Brazona na dermatofuncional.",
      includesLabel: "Inclui",
    },
    photoStrip: {
      title: "O espaço e a equipa",
      sub: "Salas de tratamento, ginásio de reabilitação e área de recuperação, onde os fisioterapeutas acompanham cada fase do tratamento.",
      pause: "Pausar as fotos",
      play: "Retomar as fotos",
    },
    instagram: {
      title: "A clínica no Instagram",
      intro: "Vídeos curtos sobre testes físicos, tratamentos e o funcionamento da clínica.",
      follow: "Seguir no Instagram",
      open: "Ver no Instagram",
      badge: "Reel",
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
      eyebrow: "Fundador e fisioterapeuta", // apelido e cargo confirmados nas entrevistas em vídeo (outubro 2026)
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
      title: "Equipa clínica",
    },
    reviews: {
      title: "Avaliações de utentes",
      photoCaption: "Mário Barroso com atletas no ginásio da Fisio4you.",
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
    insurance: "De momento, a Fisio4you não tem acordos com seguradoras nem com subsistemas de saúde.", // [[atualizar quando houver acordos]]
  },

  ctaFinal: {
    title: "Marque a sua consulta",
    sub: "Por WhatsApp ou telefone. Se tiver exames ou relatórios médicos, traga-os para a primeira avaliação.",
    whatsapp: { title: "WhatsApp", text: "A forma mais rápida de marcar.", cta: "Enviar mensagem" },
    phone: { title: "Telefone", text: "Prefere falar connosco?", cta: "Ligar" },
    directions: { title: "Como chegar", text: "Estacionamento e referência de localização a confirmar.", cta: "Abrir no Google Maps" }, // [[estacionamento / referência]]
  },

  map: {
    title: "Mapa",
    open: "Abrir no Google Maps",
  },

  // Nomes e cargos como aparecem nas entrevistas em vídeo (outubro 2026).
  team: [
    {
      media: "team-mario",
      name: "Mário Barroso",
      role: "Fundador e fisioterapeuta",
      focus: "Fundou a Fisio4you para acompanhar lesões musculoesqueléticas e a recuperação de desportistas do primeiro dia ao regresso à atividade. Tem 16 anos de experiência clínica em reabilitação e performance desportiva, com recurso a ecografia e técnicas ecoguiadas na avaliação e no tratamento. [[Cédula profissional n.º e formação relevante]]",
    },
    {
      media: "team-angela",
      name: "Angela Brazona",
      role: "Fisioterapeuta",
      focus: "Dedica-se à fisioterapia dermatofuncional e à saúde da mulher, com acompanhamento na gravidez e no pós-parto e intervenção em diástase abdominal, cicatrizes, drenagem linfática e lipedema. Acompanha cada caso da avaliação inicial à autonomia, com um plano revisto ao longo do tratamento. [[Cédula profissional n.º e formação relevante]]",
    },
  ],

  servicesPage: {
    eyebrow: "Serviços",
    title: "Serviços de fisioterapia",
    sub: "Fisioterapia musculoesquelética e fisioterapia dermatofuncional. Cada serviço começa por uma avaliação individual, a partir da qual se define o plano de tratamento.",
    available: "Serviços disponíveis",
  },

  servicePage: {
    faq: "Perguntas frequentes",
    /** Ação de cada zona na tabela de situações (abre o WhatsApp com a zona escrita). */
    write: "Descrever",
    seeService: "Ver o serviço",
    meetTeam: "Conhecer a equipa",
    onThisPage: "Nesta página",
    /** Nomes curtos no índice do topo das páginas de serviço com guia de tratamentos. */
    howNav: "Como decorre",
    faqNav: "Perguntas",
    /** As duas áreas em painéis com foto (components/ServiceAreas.tsx), nas páginas com `page.areas`. */
    areas: {
      title: "Duas áreas, uma clínica",
      intro: "Cada área tem o seu fisioterapeuta responsável. Escolha uma para ver o que trata.",
      treats: "O que trata",
      items: <Record<ServiceKey, { name: string; what: string; treats: string[]; by: string; mediaId: string }>>{
        msk: {
          name: "Musculoesquelética",
          what: "Lesões e dor em músculos, tendões, articulações e coluna.",
          treats: ["Lesões desportivas", "Tendinopatias", "Dor lombar e cervical", "Reabilitação pós-cirúrgica"],
          by: "Com o fisioterapeuta Mário Barroso",
          mediaId: "area-msk",
        },
        dermato: {
          name: "Dermatofuncional",
          what: "Saúde e estética: pós-parto, drenagem linfática, pós-operatório, lipedema e remodelação corporal.",
          treats: ["Pós-parto e diástase", "Drenagem linfática", "Pós-operatório e cicatrizes", "Lipedema", "Estética corporal"],
          by: "Com a fisioterapeuta Angela Brazona",
          mediaId: "service-dermato",
        },
      },
    },
  },

  services: <Record<ServiceKey, ServiceContent>>{
    msk: {
      name: "Fisioterapia Musculoesquelética",
      short: "Avaliação e tratamento de lesões desportivas, dor lombar e cervical, tendinopatias e reabilitação após cirurgia ortopédica.",
      mediaId: "msk-card",
      meta: {
        title: "Fisioterapia Musculoesquelética em Portimão | Fisio4you",
        description:
          "Lesões desportivas, dor lombar e cervical, tendinopatias e reabilitação após cirurgia, em Portimão. Avaliação com ecografia e ginásio de reabilitação.",
      },
      heroTitle: "Fisioterapia Musculoesquelética",
      heroSub: "Avaliação e tratamento de lesões e dor em músculos, tendões, articulações e coluna, com terapia manual, exercício terapêutico e ecografia quando indicada.",
      facts: [
        { icon: "scan", text: "Ecografia na avaliação" },
        { icon: "dumbbell", text: "Ginásio de reabilitação com 100 m²" },
        { icon: "snowflake", text: "Banheira de gelo e sauna" },
        { icon: "clock", text: "Mário Barroso, 16 anos de experiência" },
      ],
      specialist: "team-mario",
      forWho: {
        title: "Situações mais frequentes",
        intro: "Acompanhamos atletas, pessoas fisicamente ativas e quem tem dor ou limitação de movimento no dia a dia. A indicação para tratamento é confirmada na avaliação.",
        items: [
          { icon: "activity", title: "Entorses e lesões ligamentares", text: "Tornozelo, joelho e punho." },
          { icon: "flame", title: "Roturas e contraturas musculares", text: "Isquiotibiais, gémeos, quadricípite e outros grupos musculares." },
          { icon: "repeat", title: "Tendinopatias", text: "Ombro, cotovelo, joelho e tendão de Aquiles." },
          { icon: "bone", title: "Dor lombar e cervical", text: "Incluindo hérnia discal e dor irradiada para os membros." },
          { icon: "stethoscope", title: "Reabilitação pós-cirúrgica", text: "Ligamento cruzado anterior, menisco, ombro e próteses articulares." },
          { icon: "clock", title: "Dor crónica", text: "Dor que se mantém há mais de três meses. O tratamento dá prioridade ao exercício e à recuperação da função." },
        ],
      },
      includes: {
        title: "O que inclui o tratamento",
        intro: "A avaliação, o tratamento e a recuperação acontecem na mesma clínica, sem ter de ir a outro sítio.",
      },
      modules: [
        {
          id: "ecografia",
          // Capítulo tirado a pedido do cliente (a foto da sala não servia): volta quando houver uma foto com a sonda e o ecrã (PENDENTES #50)
          noChapter: true,
          nav: "Ecografia",
          summary: "Observar a lesão e orientar o tratamento",
          eyebrow: "Avaliação",
          title: "Ecografia e técnicas ecoguiadas",
          text: "A ecografia permite observar músculos, tendões e ligamentos em tempo real, em repouso e em movimento. É indolor e não usa radiação. Na clínica, complementa a avaliação física, ajuda a acompanhar a evolução e orienta as técnicas ecoguiadas.",
          mediaId: "service-eco",
          points: [
            { icon: "eye", title: "Avaliação", text: "Observação da estrutura afetada, como complemento dos testes clínicos." },
            { icon: "target", title: "Tratamento dirigido", text: "Técnicas ecoguiadas aplicadas com controlo visual da estrutura a tratar." },
            { icon: "trending", title: "Acompanhamento", text: "Comparação de imagens ao longo do tratamento." },
          ],
          itemsTitle: "Técnicas ecoguiadas",
          items: [
            { title: "[[Técnica 1]]", text: "[[2–3 linhas de explicação em linguagem simples.]]" },
            { title: "[[Técnica 2]]", text: "[[2–3 linhas de explicação em linguagem simples.]]" },
            { title: "[[Técnica 3]]", text: "[[2–3 linhas de explicação em linguagem simples.]]" },
          ],
          note: "Em fisioterapia, a ecografia é usada na avaliação funcional e para orientar o tratamento. Não substitui os exames de diagnóstico pedidos pelo médico. [[confirmar redação com o Mário]]",
        },
        {
          // [[validar com o Mário: descrição da terapia manual]]
          id: "terapia-manual",
          nav: "Terapia manual",
          summary: "Técnicas aplicadas com as mãos, na marquesa",
          eyebrow: "Tratamento",
          title: "Terapia manual",
          text: "Técnicas aplicadas com as mãos sobre as articulações, os músculos e os tecidos moles, para ajudar a aliviar a dor e a recuperar a mobilidade. É feita na marquesa, adaptada à fase da lesão, e prepara o corpo para o exercício.",
          mediaId: "manual-therapy",
          points: [
            { title: "Mobilização articular", text: "Movimentos dirigidos às articulações com a amplitude limitada." },
            { title: "Tecidos moles", text: "Trabalho sobre músculos, tendões e fáscia da zona afetada." },
            { title: "Ligação ao exercício", text: "O ganho obtido na marquesa é consolidado no ginásio." },
          ],
        },
        {
          id: "ginasio",
          nav: "Ginásio",
          summary: "Exercício supervisionado até ao regresso à atividade",
          eyebrow: "Reabilitação ativa",
          title: "Ginásio de reabilitação com 100 m²",
          text: "O exercício terapêutico é supervisionado por fisioterapeutas e ajustado à fase da recuperação. O plano passa do tratamento na marquesa ao trabalho de força, mobilidade e controlo motor sem sair da clínica.",
          mediaId: "gym",
          points: [
            { icon: "dumbbell", title: "Exercício terapêutico", text: "Supervisionado e com progressão de carga." },
            { icon: "footprints", title: "Readaptação ao esforço", text: "Recuperação da capacidade física e da tolerância à carga." },
            { icon: "activity", title: "Regresso ao desporto", text: "Decisão baseada em testes físicos e critérios definidos." },
            { icon: "shield", title: "Prevenção de lesões", text: "Trabalho de força e controlo motor para reduzir o risco de nova lesão." },
          ],
        },
        {
          id: "recuperacao",
          nav: "Gelo e sauna",
          summary: "Recuperação entre treinos e competições",
          eyebrow: "Recuperação",
          title: "Crioterapia (banheira de gelo) e sauna",
          // [[validar com o Mário: texto da crioterapia, sessão e indicações]]
          text: "A crioterapia por imersão consiste em mergulhar o corpo em água fria durante um período controlado. Na Fisio4you é feita na banheira de gelo da clínica, integrada no plano de recuperação de quem treina com regularidade, e a utilização é sempre orientada pela equipa.",
          mediaId: "service-recovery",
          points: [
            { title: "Sauna", text: "Exposição ao calor, usada para relaxamento muscular." },
            { title: "Pressoterapia", text: "Botas que comprimem e aliviam as pernas por ciclos, usadas para recuperar depois do esforço." },
          ],
          itemsTitle: "Contraindicações gerais",
          items: [
            { title: "Contraindicações gerais", text: "Problemas cardiovasculares, tensão arterial não controlada, gravidez, alterações de sensibilidade ou circulação, entre outras." },
          ],
          video: "video-circuito",
          panel: {
            moreText: "É usada sobretudo depois de treinos exigentes e de competições. Os estudos apontam para menos dor muscular e menor sensação de fadiga nos dias seguintes ao esforço, mas o efeito varia de pessoa para pessoa e não substitui o tratamento nem o descanso.",
            secondMediaId: "strip-pressotherapy",
            sessionTitle: "Como decorre uma sessão",
            session: [
              { title: "Antes", text: "Confirmamos se é adequada ao seu caso e escolhemos o momento de acordo com o treino e a fase da recuperação." },
              { title: "Durante", text: "Imersão em água fria, com tempo controlado e orientação da equipa. [[temperatura e duração da imersão: confirmar com o Mário]]" },
              { title: "Depois", text: "O corpo volta a aquecer de forma gradual, com indicações para os treinos seguintes." },
            ],
            indicatedTitle: "Quando pode ser indicada",
            indicated: ["Depois de treinos intensos e de competições", "Entre jogos ou provas próximas", "Em períodos de carga de treino elevada"],
            alsoTitle: "Também na área de recuperação",
            waTopic: "crioterapia",
            cta: "Perguntar pela crioterapia",
          },
        },
      ],
      how: {
        title: "Como decorre o tratamento",
        intro: "O tratamento organiza-se em quatro fases. Os objetivos e a evolução são revistos consigo ao longo do processo.",
        steps: [
          {
            title: "Avaliação",
            line: "Primeiro, avaliamos.",
            text: "História clínica, testes de movimento e, quando indicado, ecografia.",
            details: ["Historial da lesão, rotina e objetivos", "Testes de movimento, força e mobilidade", "Ecografia, quando é útil para caracterizar a lesão"],
            uses: ["ecografia"],
          },
          {
            title: "Plano",
            line: "Depois, o plano.",
            text: "Definição dos objetivos terapêuticos e de uma estimativa de duração, de acordo com a sua atividade.",
            details: ["Objetivos para cada fase da recuperação", "Uma estimativa do número de sessões, revista ao longo do tratamento"],
          },
          {
            title: "Tratamento e exercício",
            line: "Tratamos e treinamos.",
            text: "Terapia manual, técnicas ecoguiadas quando indicadas e exercício supervisionado.",
            details: ["Terapia manual e técnicas ecoguiadas, quando indicadas", "Exercício supervisionado, com carga progressiva", "Reavaliação regular para ajustar o plano"],
            uses: ["ecografia", "ginasio"],
          },
          {
            title: "Autonomia e prevenção",
            line: "Por fim, autonomia.",
            text: "Plano de exercícios para manter a evolução e reduzir o risco de recidiva.",
            details: ["Critérios definidos para o regresso ao treino e à competição", "Exercícios para continuar em casa ou integrar no treino"],
            uses: ["ginasio", "recuperacao"],
          },
        ],
      },
      distinct: {
        title: "Quem acompanha o tratamento",
        text: "A fisioterapia musculoesquelética é a área de Mário Barroso, fisioterapeuta com 16 anos de experiência no tratamento de lesões e na reabilitação desportiva.",
        points: ["Ecografia na avaliação e no acompanhamento", "Ginásio de reabilitação com 100 m²", "Banheira de gelo e sauna"],
      },
      duration: {
        title: "Duração e frequência",
        text: "O número de sessões e a frequência são definidos após a avaliação inicial e revistos ao longo do tratamento. [[duração da sessão / preços / sessões avulsas de crioterapia e sauna]]",
      },
      faq: [
        // Sem resposta confirmada, a pergunta fica escondida (o campo vazio retira o item).
        { q: "Preciso de prescrição médica?", a: "[[confirmar com o Mário: é necessária prescrição médica? Resposta curta]]" },
        { q: "Quantas sessões são necessárias?", a: "Depende da lesão, do tempo de evolução e dos objetivos. Na avaliação inicial é definida uma estimativa, revista ao longo do tratamento." },
        { q: "A dor dura há vários meses. A fisioterapia pode ajudar?", a: "Em muitos casos, sim. A avaliação procura identificar o que está a manter a dor e permite definir um plano com objetivos realistas." },
        { q: "A ecografia dói ou usa radiação?", a: "Não. É um exame indolor: aplica-se um gel e desliza-se a sonda sobre a pele. Utiliza ultrassons e não envolve radiação." },
        { q: "Qual a diferença entre a ecografia e uma ressonância magnética?", a: "A ecografia mostra músculos, tendões e ligamentos em tempo real, em repouso e em movimento, e pode ser repetida ao longo do tratamento. A ressonância magnética é um exame de diagnóstico prescrito pelo médico. Em fisioterapia, a ecografia é usada para avaliar e acompanhar, sem substituir os exames médicos." },
        { q: "Posso continuar a treinar durante o tratamento?", a: "Em muitos casos, sim, com adaptações. A carga de treino é ajustada à fase da recuperação." },
        { q: "Posso usar o ginásio, a banheira de gelo ou a sauna sem fazer fisioterapia?", a: "[[confirmar com o Mário: ginásio, gelo e sauna sem fisioterapia?]]" },
        { q: "O que devo levar para a primeira consulta?", a: "Roupa confortável, que permita observar e mobilizar a zona a tratar, e os exames ou relatórios médicos que tiver." },
      ],
      page: {
        // Tratamentos enviados pelo cliente (09/11/2026), em três blocos (components/TreatmentBlocks.tsx)
        treatments: {
          techniques: {
            id: "tecnicas", nav: "Técnicas",
            title: "Técnicas de tratamento",
            intro: "Técnicas minimamente invasivas e não invasivas, usadas como complemento num plano de fisioterapia individual.",
            mediaId: "techniques-msk",
            usesLabel: "Usada em",
            items: [
              {
                id: "epte", name: "EPTE", full: "Eletropuntura Percutânea Terapêutica Ecoguiada",
                text: "Uma corrente elétrica de baixa intensidade, aplicada com uma agulha muito fina guiada por ecografia diretamente na lesão, estimula a regeneração dos tecidos, sobretudo dos tendões.",
                uses: ["Tendão de Aquiles", "Tendinopatia rotuliana", "Cotovelo de tenista"],
              },
              {
                id: "mesoterapia", name: "Mesoterapia",
                text: "Microinjeções de pequenas quantidades de substâncias terapêuticas na zona a tratar, para aliviar a dor, reduzir a inflamação e ajudar a recuperar os tecidos.",
                uses: ["Dores musculares", "Tendinopatias", "Contraturas", "Inflamação"],
              },
              {
                id: "neuromodulacao", name: "Neuromodulação Percutânea Ecoguiada",
                text: "Estímulos elétricos de baixa frequência, com agulhas muito finas e orientação ecográfica, sobre nervos periféricos específicos, para diminuir a dor e melhorar a ativação muscular.",
                uses: ["Dor crónica", "Dor neuropática", "Disfunções neuromusculares"],
              },
              {
                id: "fotobiomodulacao", name: "Fotobiomodulação",
                text: "Luz de baixa intensidade, por laser ou LED, que atua a nível celular para aliviar a dor, reduzir a inflamação e estimular a recuperação. É indolor e não invasiva.",
                uses: ["Lesões musculares", "Tendinopatias", "Dores articulares", "Tecidos moles"],
              },
            ],
            note: "As técnicas são realizadas por profissionais habilitados e adaptadas à condição clínica de cada pessoa. A indicação é confirmada na avaliação.",
          },
          recovery: {
            id: "recovery", nav: "Sessão Recovery",
            title: "Sessão Recovery",
            text: "Tão importante como treinar é deixar o corpo recuperar. A Sessão Recovery junta técnicas de recuperação num momento dedicado ao descanso, para aliviar a fadiga e preparar o corpo para o próximo treino.",
            mediaId: "service-recovery",
            // Vídeo do circuito de recuperação no lugar da foto da banheira (pedido do utilizador, 09/11)
            video: "video-circuito",
            secondMediaId: "strip-pressotherapy",
            plansTitle: "Escolha a sessão",
            plans: [
              { name: "Recovery Start", parts: ["botas", "gelo"] },
              { name: "Recovery Active", parts: ["botas", "massagem"] },
              { name: "Recovery Plus", parts: ["massagem", "botas", "gelo"] },
              { name: "Recovery Elite", parts: ["ativa", "botas", "gelo", "massagem"] },
            ],
            partsTitle: "O que pode incluir",
            parts: [
              { key: "botas", title: "Botas de compressão", text: "Compressão pneumática sequencial que ajuda a circulação e deixa as pernas mais leves." },
              { key: "gelo", title: "Banheira de gelo", text: "Imersão em água fria que pode reduzir temporariamente a dor muscular e a fadiga." },
              { key: "massagem", title: "Massagem desportiva", text: "Alivia a tensão muscular, melhora a mobilidade e prepara o músculo para o esforço." },
              { key: "ativa", title: "Recuperação ativa", text: "Exercício leve, bicicleta ou mobilidade para estimular a circulação e aliviar a rigidez." },
            ],
            benefitsTitle: "Benefícios",
            benefits: ["Menos fadiga muscular", "Menos tensão muscular", "Melhor circulação", "Recuperação pós-treino", "Relaxamento físico e mental", "Preparação para novos desafios"],
            waTopic: "Sessão Recovery",
            cta: "Marcar uma Sessão Recovery",
            planner: { cta: "Marcar a {p}", summary: "{n} de {t} incluídas na {p}", included: "incluída", excluded: "não incluída nesta sessão" },
          },
          // Escondida a 10/11/2026: as fotos (atletas, ginásio vazio) não mostram estes serviços. Volta com fotos próprias.
          sport: {
            hidden: true,
            id: "desporto", nav: "Desporto",
            title: "Avaliação e prevenção no desporto",
            intro: "Para atletas que querem regressar com segurança ou reduzir o risco de nova lesão.",
            items: [
              {
                id: "isocinetica", title: "Avaliação Isocinética",
                text: "Um equipamento especializado mede a força, a potência e a resistência dos músculos a velocidade constante, e compara os dois membros.",
                points: ["Identifica desequilíbrios e assimetrias", "Acompanha a evolução da reabilitação", "Ajuda a decidir o regresso ao desporto"],
                mediaId: "athletes",
              },
              {
                id: "prevencao", title: "Treino de Prevenção de Lesões",
                text: "Um plano individual que tem em conta a modalidade, o histórico de lesões, a posição em campo e as necessidades de cada atleta.",
                points: ["Corrige desequilíbrios e défices de força", "Melhora o desempenho físico", "Com avaliação isocinética, quando necessária"],
                mediaId: "gym",
              },
            ],
          },
        },
        lead: "Lesões desportivas, dor e reabilitação depois de uma cirurgia, com o fisioterapeuta Mário Barroso.",
        heroWide: "wide-msk",
        areas: true,
        person: {
          bio: "é fisioterapeuta há 16 anos e dirige a Fisio4you. É o responsável pela fisioterapia musculoesquelética, das lesões desportivas à reabilitação depois de uma cirurgia.",
        },
      },
    },
    dermato: {
      name: "Fisioterapia Dermatofuncional",
      short: "Recuperação pós-parto, drenagem linfática, pós-operatório e cicatrizes, lipedema, remodelação corporal e massagem terapêutica.",
      mediaId: "service-dermato",
      meta: {
        title: "Fisioterapia Dermatofuncional em Portimão | Fisio4you",
        description:
          "Fisioterapia dermatofuncional em Portimão: pós-parto e diástase abdominal, drenagem linfática, pós-operatório e cicatrizes, lipedema e remodelação corporal, com a fisioterapeuta Angela Brazona.",
      },
      heroTitle: "Fisioterapia Dermatofuncional",
      heroSub: "Saúde e estética em equilíbrio: recuperação pós-parto, drenagem linfática, pós-operatório e cicatrizes, lipedema e remodelação corporal, sempre a partir de uma avaliação individual.",
      facts: [
        { icon: "baby", text: "Pós-parto e diástase abdominal" },
        { icon: "flower", text: "Drenagem linfática manual" },
        { icon: "sparkles", text: "Pós-operatório e cicatrizes" },
        { icon: "heart", text: "Angela Brazona, fisioterapeuta" },
      ],
      specialist: "team-angela",
      // [[validar com a Angela: texto do esquema da diástase e "Como avaliamos"]]
      // Escondida a 10/11/2026 a pedido do cliente («tira esta secção»); volta tirando `hidden`.
      explainer: {
        hidden: true,
        nav: "A diástase",
        title: "O que é a diástase abdominal",
        intro: "A diástase abdominal é o afastamento dos dois músculos retos do abdómen ao longo da linha média. Selecione uma fase para ver como evolui.",
        stagesLabel: "Fases",
        legend: { muscle: "Músculos retos do abdómen", linea: "Linha alba", gap: "Distância entre os retos" },
        stages: [
          {
            label: "Antes da gravidez",
            title: "Lado a lado",
            text: "Os dois músculos retos do abdómen estão lado a lado, unidos ao centro pela linha alba, um tecido conjuntivo firme que contribui para a estabilidade do abdómen.",
          },
          {
            label: "Na gravidez",
            title: "Adaptação à gravidez",
            text: "Com o crescimento do útero, a linha alba distende e alarga, e os músculos afastam-se. É uma adaptação normal do corpo.",
          },
          {
            label: "Depois do parto",
            title: "Quando a separação persiste",
            text: "Em muitas mulheres, a separação diminui nos meses seguintes ao parto. Quando se mantém e a parede abdominal continua sem firmeza, fala-se de diástase abdominal.",
          },
        ],
        assessTitle: "Como avaliamos",
        assess: [
          "Medimos a largura e a profundidade da separação, por palpação e, quando indicado, por ecografia.",
          "Observamos a resposta da parede abdominal à respiração, ao esforço e ao movimento.",
          "Repetimos a avaliação ao longo do acompanhamento, para registar a evolução de forma objetiva.",
        ],
      },
      forWho: {
        title: "Situações mais frequentes",
        intro: "Cada tratamento começa por uma avaliação individualizada, que identifica as necessidades e os objetivos de cada pessoa.",
        items: [
          { icon: "baby", title: "Reabilitação abdominal pós-parto", text: "Diástase abdominal, força e tónus do abdómen, postura e pavimento pélvico.", anchor: "pos-parto" },
          { icon: "flower", title: "Drenagem linfática manual", text: "Na gravidez, no pós-parto e em situações de edema e retenção de líquidos.", anchor: "drenagem" },
          { icon: "stethoscope", title: "Pós-operatório e cicatrizes", text: "Drenagem linfática e tratamento de cicatrizes depois de uma cirurgia.", anchor: "pos-operatorio" },
          { icon: "heart", title: "Protocolo lipedema", text: "Drenagem, manobras dos tecidos e aparatologia para aliviar o desconforto.", anchor: "lipedema" },
          { icon: "sparkles", title: "Remodelação corporal", text: "Contorno corporal, gordura localizada, celulite e flacidez.", anchor: "remodelacao" },
          { icon: "activity", title: "Massagem terapêutica e facial", text: "Tensão muscular nas costas e relaxamento do rosto.", anchor: "massagem-terapeutica" },
        ],
      },
      how: {
        title: "Como decorre o acompanhamento",
        intro: "O plano parte da sua situação atual e cada fase é explicada antes de começar.",
        // [[validar com a Angela: detalhe de cada passo]]
        steps: [
          {
            title: "Avaliação",
            line: "Primeiro, avaliamos.",
            text: "Avaliação individualizada das alterações, das necessidades e dos objetivos de cada pessoa.",
            details: ["História clínica: gravidez, parto, cirurgias e sintomas atuais", "Avaliação dos tecidos, da parede abdominal e da postura, conforme o tratamento"],
          },
          {
            title: "Plano",
            line: "Depois, o plano.",
            text: "As técnicas são escolhidas de acordo com a avaliação e os seus objetivos.",
            details: ["Técnicas escolhidas de acordo com a avaliação e os objetivos", "No pós-operatório, respeita a fase de cicatrização e as indicações da equipa médica"],
          },
          {
            title: "Tratamento",
            line: "Tratamos, passo a passo.",
            text: "Técnicas manuais, drenagem linfática, exercício terapêutico e aparatologia, quando adequada.",
            details: ["Técnicas manuais, drenagem linfática e exercício terapêutico", "Aparatologia, quando adequada à avaliação", "Reavaliação regular para ajustar o plano"],
          },
          {
            title: "Autonomia",
            line: "Por fim, autonomia.",
            text: "Exercícios e cuidados para continuar em casa.",
            details: ["Exercícios e cuidados para continuar em casa, explicados nas sessões", "Regresso seguro à atividade física e às tarefas do dia a dia"],
          },
        ],
      },
      distinct: {
        title: "Quem acompanha o tratamento",
        text: "A fisioterapia dermatofuncional é a área de Angela Brazona, fisioterapeuta dedicada à saúde da mulher e aos cuidados que unem saúde e estética.",
        points: ["Avaliação individualizada antes de cada plano", "Técnicas manuais, drenagem linfática e aparatologia", "Exercício orientado e plano para casa"],
      },
      duration: {
        title: "Duração e frequência",
        text: "O número de sessões e a frequência são definidos após a avaliação inicial, de acordo com a fase e os objetivos de cada pessoa. [[duração da sessão / preço]]",
      },
      faq: [
        { q: "Quando posso começar depois do parto?", a: "Depende do tipo de parto, da forma como decorreu a recuperação e da indicação do seu médico. Em caso de dúvida, contacte-nos antes de marcar. [[validar com a Angela]]" },
        { q: "Como sei se tenho diástase abdominal?", a: "São sinais frequentes uma saliência ou um afundamento a meio do abdómen ao levantar-se ou ao fazer força, e a sensação de fraqueza abdominal. A confirmação é feita na avaliação, por palpação e, quando indicado, por ecografia." },
        { q: "A diástase tem tratamento sem cirurgia?", a: "Muitos casos melhoram com fisioterapia e exercício específico, mas a resposta varia de pessoa para pessoa. A avaliação permite perceber o ponto de partida e o que é realista esperar." },
        { q: "O parto foi há vários anos. Ainda faz sentido?", a: "Sim. A diástase, a fraqueza abdominal e as cicatrizes podem ser avaliadas e tratadas muito tempo depois do parto. O plano é definido a partir da avaliação." },
        { q: "A cicatriz de cesariana pode ser tratada?", a: "Depois de a cicatriz estar fechada e cicatrizada, a fisioterapia trabalha a mobilidade da pele e dos tecidos à volta. Pode ser indicada quando a cicatriz repuxa, parece aderente ou tem a sensibilidade alterada." }, // [[validar com a Angela]]
        { q: "Como é a primeira avaliação?", a: "Começa por uma conversa sobre a sua história clínica e os seus objetivos, seguida de uma avaliação física explicada passo a passo." },
      ],
      page: {
        lead: "Pós-parto, drenagem linfática, lipedema e estética corporal, com a fisioterapeuta Angela Brazona.",
        heroWide: "wide-dermato",
        heroBeside: true,
        areas: true,
        about: {
          statement: ["A ", "fisioterapia dermatofuncional", " une saúde e estética: recupera a função do corpo e cuida também da sua aparência e bem-estar."],
          text: [
            "Cada corpo é único. Por isso, cada tratamento começa por uma avaliação individualizada, que identifica as necessidades e os objetivos de cada pessoa e define o plano mais adequado.",
            "Acreditamos que a estética deve caminhar lado a lado com a saúde e o bem-estar, do pós-parto ao pós-operatório, do lipedema à remodelação corporal.",
          ],
        },
        // Tratamentos enviados pelo cliente (09/11/2026), num guia interativo (components/CareGuide.tsx):
        // à vista só o essencial de cada um; o resto do texto do cliente fica em «Saber mais».
        care: {
          nav: "Tratamentos",
          title: "Os tratamentos",
          intro: "Escolha um tratamento para ver o que inclui, os benefícios e como pode ajudar.",
          listLabel: "Tratamentos de fisioterapia dermatofuncional",
          moreLabel: "Saber mais",
          lessLabel: "Mostrar menos",
          nextLabel: "A seguir: {t}",
          items: [
            {
              id: "pos-parto",
              label: "Pós-parto",
              title: "Reabilitação abdominal pós-parto",
              tagline: "Saúde, recuperação e estética em harmonia.",
              summary: "Após o parto, a musculatura abdominal, a pele, a postura e o pavimento pélvico podem apresentar alterações que merecem cuidados especializados. A recuperação integra duas dimensões: a saúde e a estética.",
              groups: {
                title: "O que procuramos",
                items: [
                  {
                    label: "Saúde",
                    intro: "Recuperar a função e o equilíbrio abdominal.",
                    points: [
                      "Melhorar a força e a função da musculatura abdominal",
                      "Trabalhar a diástase abdominal",
                      "Recuperar a estabilidade e o controlo do tronco",
                      "Melhorar a postura e a gestão das pressões abdominais",
                      "Integrar a musculatura abdominal e o pavimento pélvico",
                      "Regressar com segurança à atividade física e às tarefas do dia a dia",
                    ],
                  },
                  {
                    label: "Estética",
                    intro: "Recuperar a harmonia e a confiança corporal.",
                    points: [
                      "A firmeza e o tónus da musculatura abdominal",
                      "O contorno e a aparência da região abdominal",
                      "A postura e a silhueta corporal",
                      "A perceção da imagem corporal e a autoconfiança",
                    ],
                  },
                ],
              },
              note: "Os resultados estéticos dependem de vários fatores, nomeadamente das características individuais, das alterações provocadas pela gravidez e da recuperação dos tecidos.",
              more: [
                {
                  title: "Porque é que o abdómen muda",
                  text: [
                    "Durante a gravidez, os músculos abdominais adaptam-se para permitir o crescimento do bebé. Estas alterações podem provocar diástase abdominal (afastamento dos músculos retos abdominais), diminuição da força muscular, alterações posturais e menor estabilidade do tronco.",
                    "A melhoria da função e do tónus muscular pode contribuir para uma maior firmeza e definição da região abdominal, com impacto positivo na imagem corporal e na autoestima.",
                  ],
                },
                {
                  title: "Um tratamento personalizado, de dentro para fora",
                  text: [
                    "Cada mulher é única. Por isso, iniciamos o acompanhamento com uma avaliação individualizada, identificando as alterações musculares e funcionais e definindo os objetivos de cada paciente. O plano pode integrar exercícios terapêuticos, técnicas de fisioterapia e estratégias específicas para a recuperação abdominal.",
                  ],
                },
                {
                  title: "Cuidar da saúde também é cuidar da beleza",
                  text: [
                    "Recuperar não significa apenas voltar à aparência anterior à gravidez. Significa sentir-se bem, recuperar a funcionalidade do corpo, melhorar a autoestima e voltar a ter confiança nos seus movimentos.",
                  ],
                },
              ],
            },
            {
              id: "drenagem",
              label: "Drenagem linfática",
              title: "Drenagem linfática manual",
              tagline: "Saúde, leveza e bem-estar para o seu corpo.",
              summary: "Movimentos suaves, lentos e ritmados que estimulam o fluxo da linfa e ajudam a reduzir a acumulação de líquidos nos tecidos, o inchaço e a sensação de peso.",
              options: {
                title: "Na gravidez e depois do parto",
                items: [
                  {
                    label: "Pré-parto",
                    title: "Durante a gravidez",
                    tagline: "Mais conforto, leveza e bem-estar.",
                    text: "As alterações hormonais e circulatórias podem favorecer a retenção de líquidos, com inchaço nas pernas, pés e tornozelos. Com movimentos adaptados à gravidez, a drenagem pode ajudar a reduzir o edema e aliviar a sensação de pernas pesadas.",
                  },
                  {
                    label: "Pós-parto",
                    title: "Depois do parto",
                    tagline: "Conforto e leveza na fase de recuperação.",
                    text: "Após o parto, o organismo passa por diversas alterações hormonais e circulatórias e pode existir acumulação de líquidos. Quando indicada, a drenagem pode ajudar a aliviar o edema e dar uma maior sensação de conforto e leveza.",
                  },
                ],
              },
              groups: {
                title: "Benefícios",
                items: [
                  {
                    label: "Na saúde",
                    points: [
                      "Ajuda a reduzir o edema e a retenção de líquidos",
                      "Favorece a circulação linfática",
                      "Alivia a sensação de pernas pesadas e inchadas",
                      "Pode ser importante na recuperação de determinadas cirurgias, quando clinicamente indicada",
                      "Melhora o conforto e a mobilidade em situações de edema",
                    ],
                  },
                  {
                    label: "Na estética",
                    points: [
                      "Diminui o inchaço e a sensação de volume associados à acumulação de líquidos",
                      "Contribui para uma aparência corporal menos edemaciada",
                      "Pode melhorar o conforto e a sensação de leveza corporal",
                      "Complementa alguns programas de cuidados estéticos e de recuperação pós-operatória, quando adequados",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "O sistema linfático",
                  text: [
                    "O sistema linfático é essencial para o equilíbrio dos líquidos e para o bom funcionamento do organismo. Quando existe acumulação de líquidos nos tecidos ou dificuldade na sua circulação, podem surgir inchaço, sensação de peso e desconforto.",
                  ],
                },
                {
                  title: "Uma abordagem personalizada",
                  text: [
                    "Utilizamos a drenagem linfática como parte de uma abordagem personalizada, tendo em conta as necessidades e os objetivos de cada pessoa. Na gravidez, cada tratamento é realizado por profissionais qualificados, respeitando as necessidades de cada grávida e a evolução da gestação.",
                  ],
                },
              ],
            },
            {
              id: "pos-operatorio",
              label: "Pós-operatório",
              title: "Pós-operatório: drenagem e cicatrizes",
              tagline: "Uma recuperação cuidada, segura e harmoniosa.",
              summary: "Depois de uma cirurgia podem surgir edema, sensação de tensão e alterações dos tecidos. Combinamos drenagem linfática manual e tratamento de cicatrizes, de acordo com as necessidades de cada paciente.",
              groups: {
                title: "O que trabalhamos",
                items: [
                  {
                    label: "Drenagem linfática",
                    intro: "Uma técnica suave que ajuda a controlar a acumulação de líquidos nos tecidos. Pode contribuir para:",
                    points: [
                      "Reduzir o edema e o inchaço",
                      "Aliviar a sensação de tensão e desconforto",
                      "Melhorar o conforto dos tecidos",
                      "Apoiar o processo de recuperação pós-cirúrgica",
                    ],
                  },
                  {
                    label: "Cicatrizes",
                    intro: "A cicatriz pode apresentar alterações de textura, elasticidade, sensibilidade e mobilidade. Procuramos:",
                    points: [
                      "Melhorar a elasticidade e a mobilidade dos tecidos",
                      "Diminuir aderências e restrições cicatriciais",
                      "Melhorar a flexibilidade da região intervencionada",
                      "Promover uma melhor qualidade e aparência da cicatriz",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "Saúde e estética em equilíbrio",
                  text: [
                    "A recuperação pós-operatória não passa apenas pela aparência exterior. É fundamental recuperar a funcionalidade, a mobilidade e o conforto dos tecidos, promovendo também uma evolução estética da região intervencionada.",
                    "Cada tratamento é personalizado, respeitando o tipo de cirurgia, a fase de cicatrização e as indicações da equipa médica.",
                  ],
                },
              ],
            },
            {
              id: "lipedema",
              label: "Lipedema",
              title: "Protocolo lipedema",
              tagline: "Cuide das suas pernas. Alivie o desconforto. Recupere o seu bem-estar.",
              summary: "O lipedema é uma doença crónica do tecido adiposo, com uma acumulação desproporcional de gordura, sobretudo nas pernas. O protocolo combina técnicas terapêuticas para controlar os sintomas e melhorar o conforto e a qualidade de vida.",
              steps: {
                title: "Em que consiste o protocolo",
                items: [
                  { title: "Drenagem linfática manual", text: "Movimentos suaves e específicos que ajudam a controlar o edema e a aliviar a sensação de peso e inchaço nas pernas." },
                  { title: "Manobras dos tecidos", text: "Técnicas manuais adaptadas à sensibilidade dos tecidos, para melhorar o conforto e a mobilidade e aliviar a tensão." },
                  { title: "Aparatologia", text: "Equipamentos escolhidos de acordo com a avaliação, que complementam a intervenção manual quando adequados." },
                ],
              },
              groups: {
                title: "O acompanhamento pode ajudar a",
                items: [
                  {
                    label: "Benefícios",
                    points: [
                      "Aliviar a sensação de peso e cansaço nas pernas",
                      "Reduzir o edema, quando presente",
                      "Melhorar o conforto e a mobilidade",
                      "Diminuir a tensão e o desconforto nos tecidos",
                      "Complementar a gestão dos sintomas do lipedema",
                      "Melhorar o bem-estar e a relação com a imagem corporal",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "O que é o lipedema",
                  text: [
                    "O lipedema é uma doença crónica do tecido adiposo, caracterizada por uma acumulação desproporcional e geralmente simétrica de gordura, sobretudo nas pernas e, por vezes, nos braços. Está frequentemente associado a dor, sensibilidade ao toque, sensação de peso, facilidade em desenvolver hematomas e desconforto físico.",
                  ],
                },
                {
                  title: "Um tratamento personalizado para cada mulher",
                  text: [
                    "O lipedema manifesta-se de forma diferente em cada pessoa. Por isso, iniciamos sempre com uma avaliação individualizada, considerando o grau de sensibilidade, os sintomas, as características dos tecidos e as necessidades de cada paciente. O objetivo é um acompanhamento especializado, respeitador e adaptado a cada fase da condição.",
                  ],
                },
                {
                  title: "Cuidar da saúde é também cuidar de si",
                  text: [
                    "Viver com lipedema não significa ter de aceitar a dor, o desconforto ou as limitações como parte inevitável do dia a dia. Queremos ajudá-la a sentir-se melhor, com uma abordagem que une fisioterapia, bem-estar e cuidados personalizados.",
                  ],
                },
              ],
            },
            {
              id: "remodelacao",
              label: "Remodelação corporal",
              title: "Body contouring: remodelação corporal",
              tagline: "Valorize as suas formas. Cuide do seu corpo. Sinta-se bem consigo.",
              summary: "Técnicas e tratamentos estéticos não invasivos para melhorar o contorno corporal, a firmeza e a qualidade da pele, de forma personalizada.",
              groups: {
                title: "Benefícios",
                items: [
                  {
                    label: "Benefícios",
                    points: [
                      { title: "Contorno corporal", text: "Ajuda a definir e harmonizar determinadas zonas do corpo." },
                      { title: "Firmeza da pele", text: "Pode contribuir para uma aparência mais firme e tonificada." },
                      { title: "Aparência da celulite", text: "Determinadas técnicas podem ajudar a melhorar o aspeto da pele com irregularidades." },
                      { title: "Textura da pele", text: "Promove uma aparência mais uniforme e cuidada." },
                      { title: "Bem-estar e autoestima", text: "Ajuda a sentir-se mais confortável e confiante com a sua imagem corporal." },
                    ],
                  },
                ],
              },
              chips: {
                title: "Zonas que podem ser tratadas",
                intro: "Dependendo da avaliação e das técnicas utilizadas.",
                items: ["Abdómen", "Cintura e flancos", "Coxas", "Glúteos", "Braços"],
              },
              more: [
                {
                  title: "Um tratamento adaptado a si",
                  text: [
                    "Cada corpo é único. Por isso, começamos com uma avaliação individualizada para identificar as necessidades de cada paciente e definir o plano de tratamento mais adequado. O objetivo é uma melhoria estética natural, que respeita a saúde, as características corporais e as expectativas de cada pessoa.",
                  ],
                },
              ],
            },
            {
              id: "gordura-celulite-flacidez",
              label: "Gordura, celulite e flacidez",
              title: "Tratamento personalizado",
              tagline: "Gordura localizada, celulite e flacidez: um tratamento pensado para si.",
              summary: "Não existem tratamentos iguais para todas as pessoas. Desenvolvemos planos de remodelação corporal individualizados, com as técnicas mais adequadas às necessidades e aos objetivos de cada paciente.",
              options: {
                title: "O que quer tratar",
                items: [
                  {
                    label: "Gordura localizada",
                    title: "Gordura localizada",
                    tagline: "Valorize o contorno e a harmonia corporal.",
                    text: "A gordura localizada pode persistir em determinadas regiões do corpo, mesmo com uma alimentação equilibrada e atividade física regular. Os tratamentos podem ajudar a:",
                    points: ["Melhorar o contorno corporal", "Trabalhar zonas com acumulação de gordura localizada", "Promover uma aparência mais harmoniosa", "Complementar a alimentação e a atividade física"],
                  },
                  {
                    label: "Celulite",
                    title: "Celulite",
                    tagline: "Uma pele com aspeto mais uniforme e cuidado.",
                    text: "A celulite caracteriza-se por alterações na superfície da pele, que criam irregularidades e o conhecido aspeto de «casca de laranja». Procuramos:",
                    points: ["Melhorar o aspeto da pele", "Atenuar a aparência da celulite", "Melhorar a textura e a uniformidade cutânea", "Promover uma melhor circulação local", "Melhorar o conforto e a qualidade dos tecidos"],
                  },
                  {
                    label: "Flacidez",
                    title: "Flacidez",
                    tagline: "Mais firmeza, tonicidade e definição corporal.",
                    text: "A flacidez pode surgir com o envelhecimento, alterações de peso, a gravidez ou a diminuição da elasticidade dos tecidos. Os tratamentos podem contribuir para:",
                    points: ["Melhorar a firmeza e o aspeto da pele", "Estimular a tonicidade dos tecidos, conforme a técnica utilizada", "Melhorar a aparência e a definição corporal", "Promover uma silhueta mais harmoniosa"],
                  },
                ],
              },
              more: [
                {
                  title: "Cada corpo é único",
                  text: [
                    "Cada corpo é único e merece cuidados específicos. A gordura localizada, a celulite e a flacidez são alterações corporais que podem afetar a silhueta, a firmeza da pele e a autoestima. Os tratamentos são selecionados de acordo com a avaliação individual.",
                  ],
                },
              ],
            },
            {
              id: "massagem-terapeutica",
              label: "Massagem terapêutica",
              title: "Massagem terapêutica: costas",
              tagline: "Alivie a tensão muscular. Recupere o conforto e o bem-estar.",
              summary: "O stress, as más posturas e os movimentos repetitivos podem provocar tensão, rigidez e desconforto nas costas. A massagem terapêutica usa manobras e pressões adaptadas a cada pessoa para aliviar a tensão e promover o relaxamento.",
              groups: {
                title: "Benefícios e indicações",
                items: [
                  {
                    label: "Benefícios",
                    points: [
                      { title: "Alívio da tensão muscular", text: "Ajuda a reduzir contraturas e sobrecargas musculares." },
                      { title: "Alívio da dor", text: "Pode diminuir o desconforto muscular nas costas." },
                      { title: "Mobilidade", text: "Reduz a sensação de rigidez e facilita os movimentos." },
                      { title: "Relaxamento", text: "Reduz a sensação de tensão acumulada." },
                      { title: "Bem-estar físico e emocional", text: "Uma sensação de tranquilidade que ajuda a aliviar o stress." },
                      { title: "Consciência corporal", text: "Ajuda a reconhecer zonas de tensão e a cuidar da postura." },
                    ],
                  },
                  {
                    label: "Para quem é indicada",
                    intro: "Pode ser benéfica para quem tem:",
                    points: [
                      "Tensão muscular cervical, dorsal ou lombar",
                      "Desconforto associado a posturas prolongadas",
                      "Sobrecarga muscular provocada pelo trabalho ou pela atividade física",
                      "Rigidez e sensação de costas pesadas",
                      "Stress e tensão muscular acumulada",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "Cuide das suas costas",
                  text: [
                    "O bem-estar começa com o equilíbrio do corpo. Com uma abordagem individualizada e técnicas terapêuticas adequadas, ajudamos a aliviar a tensão muscular e a recuperar o conforto no seu dia a dia.",
                  ],
                },
              ],
            },
            {
              id: "massagem-facial",
              label: "Massagem facial",
              title: "Massagem facial",
              tagline: "Cuide do seu rosto. Realce a sua beleza. Desperte o seu bem-estar.",
              summary: "Movimentos suaves e específicos que promovem o relaxamento, estimulam a circulação local e dão à pele uma sensação de frescura. É feita de forma personalizada, respeitando as características de cada pele.",
              groups: {
                title: "Benefícios",
                items: [
                  {
                    label: "Estéticos",
                    points: [
                      { title: "Luminosidade", text: "Um aspeto mais fresco e revitalizado." },
                      { title: "Circulação local", text: "Favorece a circulação sanguínea superficial." },
                      { title: "Descongestionamento", text: "Pode ajudar a reduzir o inchaço ligeiro do rosto." },
                      { title: "Aspeto da pele", text: "Uma aparência mais cuidada e saudável." },
                      { title: "Músculos faciais", text: "Alivia tensões associadas às expressões faciais." },
                      { title: "Pele descansada", text: "Uma aparência mais fresca e revitalizada." },
                    ],
                  },
                  {
                    label: "Bem-estar",
                    points: [
                      "Reduz a sensação de tensão e cansaço facial",
                      "Promove o relaxamento físico e mental",
                      "Proporciona momentos de tranquilidade e autocuidado",
                      "Alivia a tensão acumulada na mandíbula, na testa e no rosto",
                      "Contribui para uma sensação geral de bem-estar",
                    ],
                  },
                ],
              },
              more: [
                {
                  title: "Um momento só para si",
                  text: [
                    "O rosto é uma das zonas onde mais se refletem o stress, o cansaço e a tensão do dia a dia. Cuidar da beleza também é cuidar da saúde e do equilíbrio emocional: a massagem facial é um convite para abrandar, relaxar e dedicar algum tempo a si.",
                  ],
                },
              ],
            },
          ],
        },
        person: {
          bio: "é fisioterapeuta e a responsável pela fisioterapia dermatofuncional na Fisio4you, dedicada à saúde da mulher na gravidez e no pós-parto e aos cuidados que unem saúde e estética.",
        },
      },
    },
  },

  // Consultas: páginas só de texto (a pedido do cliente, ref. estrutura AlfraClinic), sem fotos, nomes de profissionais,
  // preços nem técnicas específicas por confirmar.
  consultations: {
    title: "Consultas",
    sub: "Pilates Clínico, Psicologia, Fisiatria e Osteopatia. Conheça o que trata cada consulta e escolha a que procura.",
    available: "Consultas disponíveis",
    others: "Outras consultas",
    items: {
      pilates: {
        name: "Pilates Clínico",
        short: "Exercício orientado por profissionais de saúde, para melhorar o controlo do movimento, a força e a postura.",
        lead: "O Pilates Clínico adapta os princípios do método Pilates às necessidades de saúde de cada pessoa, para melhorar o controlo do movimento, a força e a postura.",
        sections: [
          { title: "O que é o Pilates Clínico", text: ["É uma forma de exercício orientada por profissionais de saúde. Parte do método Pilates, mas os exercícios são escolhidos e ajustados em função do estado de saúde, dos objetivos e da evolução de cada pessoa.", "O trabalho incide sobre a respiração, o controlo do tronco, a mobilidade e a força, com atenção à qualidade de cada movimento."] },
          { title: "Em que situações pode ajudar", list: ["Dor lombar e cervical", "Alterações da postura", "Falta de força, mobilidade ou equilíbrio", "Continuação do exercício após a reabilitação", "Gravidez e pós-parto, com a devida indicação"] },
          { title: "Como funciona", text: ["O acompanhamento começa por perceber a sua história clínica, as suas limitações e o que pretende alcançar. A partir daí, são definidos os exercícios adequados, que evoluem à medida que ganha controlo e confiança no movimento."] },
          { title: "Pilates Clínico e reabilitação", text: ["Pode complementar um processo de reabilitação ou ajudar a manter os ganhos depois de este terminar. Se tem uma lesão ou um problema de saúde, leve os exames ou relatórios médicos que tiver, para que o exercício seja ajustado à sua situação."] },
        ],
        meta: { title: "Pilates Clínico em Portimão | Fisio4you", description: "Pilates Clínico em Portimão: exercício orientado por profissionais de saúde para melhorar o controlo do movimento, a força e a postura." },
      },
      psychology: {
        name: "Psicologia",
        short: "Avaliação e acompanhamento psicológico, num espaço de escuta e confidencialidade.",
        lead: "A consulta de Psicologia ajuda a compreender e a lidar com dificuldades emocionais, comportamentais e relacionais, num espaço de escuta e confidencialidade.",
        sections: [
          { title: "O que é a consulta de Psicologia", text: ["É um espaço para falar sobre o que a preocupa ou a faz sofrer, com o apoio de um profissional de psicologia. O objetivo é compreender melhor o que está a acontecer e encontrar formas de lidar com a situação.", "Não é preciso estar em crise para procurar ajuda. Muitas pessoas procuram a consulta numa fase de mudança ou quando sentem que uma dificuldade começa a afetar o seu dia a dia."] },
          { title: "Em que situações pode ajudar", list: ["Ansiedade e stress", "Alterações do humor", "Dificuldades em lidar com a dor persistente", "Adaptação a uma lesão e regresso ao desporto", "Mudanças e momentos difíceis da vida"] },
          { title: "Como decorre", text: ["As primeiras consultas servem para perceber o que motiva a procura de ajuda, conhecer a sua história e definir objetivos. A partir daí, o acompanhamento é ajustado a cada pessoa e à sua situação."] },
          { title: "Dor, lesão e bem-estar psicológico", text: ["A dor e as lesões podem ter impacto no sono, no humor, na motivação e na confiança em voltar a mexer-se ou a competir. Dar atenção a estes aspetos pode ser uma parte importante da recuperação."] },
        ],
        meta: { title: "Consulta de Psicologia em Portimão | Fisio4you", description: "Consulta de Psicologia em Portimão: avaliação e acompanhamento em situações como ansiedade, stress, dor persistente ou adaptação a uma lesão." },
      },
      physiatry: {
        name: "Fisiatria",
        short: "Consulta médica de medicina física e de reabilitação, para diagnóstico e orientação do plano de reabilitação.",
        lead: "A Fisiatria, ou Medicina Física e de Reabilitação, é a especialidade médica que avalia e orienta pessoas com dor ou com limitações da mobilidade e da função, causadas por doença ou lesão.",
        sections: [
          { title: "O que é a Fisiatria", text: ["É uma especialidade médica centrada na prevenção, no diagnóstico e no tratamento de situações que afetam o movimento e a capacidade funcional.", "O objetivo é reduzir a dor, recuperar a função e ajudar cada pessoa a alcançar a maior autonomia possível nas atividades do dia a dia, no trabalho e no desporto."] },
          { title: "Quando procurar esta consulta", list: ["Dor na coluna e nas articulações", "Lesões musculares, dos tendões e desportivas", "Reabilitação após cirurgia ou fratura", "Limitações da mobilidade e da função", "Sequelas de doença neurológica"] },
          { title: "Como decorre a consulta", text: ["A consulta inclui a história clínica e o exame físico, e pode ser necessário pedir exames complementares. Com base nesta avaliação, o médico orienta o diagnóstico e explica as opções de tratamento indicadas. Se tiver exames ou relatórios médicos, leve-os consigo."] },
          { title: "Fisiatria e fisioterapia", text: ["O fisiatra é o médico que avalia e orienta a reabilitação. O fisioterapeuta aplica a intervenção de fisioterapia com técnicas manuais, exercício e outros recursos. Quando há indicação, as duas áreas podem complementar-se no mesmo processo de recuperação."] },
        ],
        meta: { title: "Consulta de Fisiatria em Portimão | Fisio4you", description: "Consulta de Fisiatria em Portimão: avaliação médica de dor, lesões e limitações da mobilidade, para diagnóstico e orientação da reabilitação." },
      },
      osteopathy: {
        name: "Osteopatia",
        short: "Abordagem manual centrada na mobilidade das articulações e dos tecidos.",
        lead: "A Osteopatia é uma abordagem manual que avalia a forma como as diferentes estruturas do corpo se movem e se relacionam, e atua nas zonas com restrição de mobilidade.",
        sections: [
          { title: "O que é a Osteopatia", text: ["Parte da observação do corpo no seu conjunto: uma limitação numa zona pode influenciar a forma como outras se movem. Por isso, a avaliação não se limita ao local onde sente desconforto.", "A intervenção recorre a técnicas manuais sobre as articulações, os músculos e os outros tecidos."] },
          { title: "Em que situações pode ajudar", list: ["Dor lombar e cervical", "Tensão muscular", "Rigidez e limitação do movimento articular", "Desconforto ligado à postura ou a esforços repetidos"] },
          { title: "Como decorre a consulta", text: ["A consulta começa pela história clínica e pela avaliação do movimento. As técnicas são escolhidas em função de cada pessoa e explicadas antes de serem aplicadas. Se tiver exames ou relatórios médicos, leve-os consigo."] },
          { title: "Quando falar primeiro com o médico", text: ["Se a dor surgiu depois de um traumatismo, é intensa ou está a agravar-se, ou se vem acompanhada de febre, perda de força ou alterações da sensibilidade, procure primeiro uma avaliação médica."] },
        ],
        meta: { title: "Consulta de Osteopatia em Portimão | Fisio4you", description: "Consulta de Osteopatia em Portimão: abordagem manual centrada na mobilidade das articulações e dos tecidos, em situações como dor lombar e cervical." },
      },
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
    title: "Fisio4you, centro de reabilitação em Portimão",
    sub: "Clínica de fisioterapia dirigida pelo fisioterapeuta Mário Barroso, com duas áreas de intervenção: fisioterapia musculoesquelética, com o Mário, e fisioterapia dermatofuncional, com a fisioterapeuta Angela Brazona.",
    storyTitle: "A nossa história",
    story: ["[[Pedir ao Mário o texto da história da clínica.]]"],
    // Descrição factual da clínica e da forma de trabalhar (substitui a missão e os valores genéricos).
    missionTitle: "A clínica",
    mission: "A Fisio4you trata lesões musculoesqueléticas e acompanha a recuperação pós-parto, com ecografia na avaliação e reabilitação no ginásio da clínica.",
    valuesTitle: "Como trabalhamos",
    values: [
      { icon: "target", title: "Avaliação antes do tratamento", text: "Cada plano parte de uma avaliação física e, quando indicado, ecográfica." },
      { icon: "users", title: "Exercício supervisionado", text: "A reabilitação inclui exercício acompanhado por fisioterapeutas no ginásio da clínica." },
      { icon: "trending", title: "Reavaliação regular", text: "A evolução é medida ao longo do tratamento e o plano é ajustado quando necessário." },
    ] as Item[],
    founderTitle: "Equipa clínica",
    founderLong: ["[[Versão longa do percurso do Mário: formação, especializações, experiência com desportistas.]]"],
    teamTitle: "A equipa",
    galleryTitle: "Instalações",
    galleryIntro: "Tudo no mesmo espaço, em Portimão: o plano passa da marquesa para o ginásio e para a recuperação sem sair da clínica.",
    gallerySpaces: [
      { title: "Salas de tratamento", text: "Avaliação, com ecografia quando indicado, e terapia manual na marquesa, com privacidade." },
      { title: "Ginásio de reabilitação", text: "100 m² com máquinas de força, rack, kettlebells e passadeiras, para o exercício supervisionado." },
      { title: "Recuperação", text: "Banheira de gelo, sauna e pressoterapia, sempre com orientação da equipa." },
    ],
    // A primeira foto fica ao lado do texto; as outras formam a faixa por baixo, sem legendas (ids em content/media.ts)
    galleryPhotos: ["clinic-ginasio", "clinic-sala-fisio4you", "clinic-corredor-mural", "clinic-sala-tratamento", "clinic-camisolas"],
  },

  contact: {
    eyebrow: "Contactos",
    title: "Contactos",
    sub: "Fisioterapia em Portimão. As consultas são marcadas por WhatsApp ou telefone.",
    email: "Email",
    address: "Morada",
    phone: "Telefone",
    findUs: "Como nos encontrar",
    accessTitle: "Acessibilidade e estacionamento",
    access: "[[confirmar acessibilidade e estacionamento]]",
  },

  footer: {
    tagline: "Clínica de fisioterapia e centro de reabilitação em Portimão.",
    services: "Fisioterapia",
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
    text: "Usamos cookies essenciais para o site funcionar e, com o seu consentimento, cookies de medição.",
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
        { h: "Cookies que usamos", p: ["Essenciais: guardam a sua escolha de consentimento (armazenamento local do navegador).", "Medição (apenas com consentimento): Google Tag Manager / Google Analytics, para perceber como o site é usado.", "Terceiros: o mapa do Google Maps na página de Contactos pode definir cookies próprios."] },
        { h: "Gerir o consentimento", p: ["Pode alterar a sua escolha em qualquer momento através do link “Preferências de cookies” no rodapé, ou apagar os cookies nas definições do seu navegador."] },
      ] as LegalSection[],
    },
  },
};

export type Dict = typeof pt;
