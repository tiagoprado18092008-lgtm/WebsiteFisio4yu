// Conteúdo em português europeu. Nenhum componente deve ter texto fora de content/.
// {s} = nome do serviço · {p} = zona/problema · {n} = número

import type { Locale, ServiceKey } from "@/lib/routes";

export type IconName =
  | "activity" | "bone" | "heart" | "snowflake" | "flame" | "dumbbell" | "scan" | "baby"
  | "shield" | "repeat" | "target" | "eye" | "trending" | "users" | "building" | "sparkles"
  | "footprints" | "clipboard" | "stethoscope" | "brain" | "flower" | "clock" | "mappin";

type Item = { icon: IconName; title: string; text: string };
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
  /**
   * Foto de um tratamento em faixa dentro do título; outra foto do serviço abre larga logo abaixo (`heroWide`).
   * Sem `heroSlot`, a `heroWide` (vertical, 3:4) aparece inteira, sem recorte, ao lado do título.
   */
  heroSlot?: string;
  heroWide: string;
  /** Foto 4:5 por baixo da introdução das situações (quando a página tem poucas fotos). */
  conditionsPhoto?: string;
  /** Biografia do fisioterapeuta responsável: o nome vem de `team`, por isso `bio` começa logo a seguir ao nome. */
  person: { bio: string };
  /** Frase do mural da entrada, espalhada de margem a margem: duas linhas, palavras de cada linha. */
  motto?: { lines: string[][]; by: [string, string, string] };
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
  how: { title: string; intro?: string; steps: Step[] };
  distinct: { title: string; text: string; points: string[] };
  /** Recursos incluídos (`modules`): título e introdução da secção. */
  includes?: { title: string; intro: string };
  modules?: ServiceModule[];
  duration: { title: string; text: string };
  faq: Faq[];
  related: ServiceKey[];
  page: ServicePageCopy;
};

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
  nav: { home: "Início", services: "Serviços", about: "Sobre", contact: "Contactos", comingSoon: "Em breve" },
  wa: {
    general: "Olá, gostava de marcar uma consulta na Fisio4you.",
    service: "Olá, gostava de marcar uma consulta de {s}.",
    problem: "Olá, tenho {p} e gostava de marcar uma consulta.",
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
      title: "Fisioterapia em Portimão | Fisio4you, Centro de Reabilitação",
      description:
        "Clínica de fisioterapia em Portimão: lesões musculoesqueléticas, reabilitação desportiva e pós-parto. Ecografia e ginásio de reabilitação com 100 m².",
    },
    services: {
      title: "Serviços de Fisioterapia em Portimão | Fisio4you",
      description:
        "Fisioterapia musculoesquelética e dermatofuncional em Portimão: lesões desportivas, dor, reabilitação após cirurgia, pós-parto e diástase abdominal.",
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
      lines: ["Fisioterapia", "em Portimão."],
      sub: "Tratamento de lesões musculoesqueléticas e recuperação pós-parto, com ecografia e ginásio de reabilitação na própria clínica.",
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
    bodyMap: {
      title: "Onde sente dor?",
      intro: "Selecione uma zona para ver as situações que acompanhamos com mais frequência. Pode descrever o seu caso por WhatsApp antes da consulta.",
      listLabel: "Zonas do corpo",
      commonLabel: "Situações frequentes",
      talk: "Descrever o meu caso por WhatsApp",
      see: "Ver o tratamento",
      regions: [
        {
          id: "cervical", label: "Pescoço",
          title: "Pescoço e cervical",
          text: "Dor e rigidez cervical e dores de cabeça de origem cervical, muitas vezes associadas a posturas mantidas, como o trabalho ao computador.",
          common: ["Cervicalgia", "Torcicolo", "Dor irradiada para o braço"],
          service: "msk", waTopic: "dor no pescoço",
        },
        {
          id: "ombro", label: "Ombro",
          title: "Ombro",
          text: "Dor ao elevar o braço, perda de força ou instabilidade. A ecografia permite observar o estado dos tendões.",
          common: ["Tendinopatia da coifa dos rotadores", "Ombro congelado", "Pós-operatório"],
          service: "msk", anchor: "ecografia", waTopic: "dor no ombro",
        },
        {
          id: "coluna", label: "Costas",
          title: "Costas e coluna",
          text: "Dor lombar ou dorsal, aguda ou persistente. O tratamento combina terapia manual e exercício para recuperar a mobilidade e a força.",
          common: ["Lombalgia", "Hérnia discal", "Ciática"],
          service: "msk", anchor: "ginasio", waTopic: "dor nas costas",
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
          text: "Dor na anca ou na virilha ao caminhar, correr ou subir escadas, e reabilitação após prótese da anca.",
          common: ["Tendinopatia glútea", "Pubalgia", "Prótese da anca"],
          service: "msk", anchor: "ginasio", waTopic: "dor na anca",
        },
        {
          id: "joelho", label: "Joelho",
          title: "Joelho",
          text: "Lesões desportivas, dor ao correr ou agachar e reabilitação após cirurgia, até ao regresso ao treino.",
          common: ["Ligamento cruzado (LCA)", "Menisco", "Tendinopatia rotuliana"],
          service: "msk", anchor: "ginasio", waTopic: "dor no joelho",
        },
        {
          id: "tornozelo", label: "Tornozelo",
          title: "Tornozelo e pé",
          text: "Entorses recorrentes ou mal recuperadas, dor no tendão de Aquiles ou na planta do pé.",
          common: ["Entorse", "Tendinopatia de Aquiles", "Fascite plantar"],
          service: "msk", waTopic: "dor no tornozelo/pé",
        },
      ] as { id: string; label: string; title: string; text: string; common: string[]; service: ServiceKey; anchor?: string; waTopic: string }[],
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
      title: "Equipa clínica",
    },
    reviews: {
      title: "Avaliações de utentes",
      intro: "Comentários publicados no perfil da clínica no Google, reproduzidos sem alterações.",
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
      role: "Fisioterapeuta e CEO",
      focus: "Lesões musculoesqueléticas, reabilitação e performance desportiva. Tem 16 anos de experiência clínica. [[Cédula profissional n.º e formação relevante]]",
    },
    {
      media: "team-angela",
      name: "Angela Brazona",
      role: "Fisioterapeuta",
      focus: "Fisioterapia dermatofuncional e saúde da mulher, durante a gravidez e no pós-parto, nas vertentes funcional e estética. [[Cédula profissional n.º e formação relevante]]",
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
    related: "Também na Fisio4you",
    /** Ação de cada zona na tabela de situações (abre o WhatsApp com a zona escrita). */
    write: "Descrever",
    seeService: "Ver o serviço",
    meetTeam: "Conhecer a equipa",
  },

  services: <Record<ServiceKey, ServiceContent>>{
    msk: {
      name: "Fisioterapia Musculoesquelética",
      short: "Avaliação e tratamento de lesões desportivas, dor lombar e cervical, tendinopatias e reabilitação após cirurgia ortopédica.",
      mediaId: "service-msk",
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
      bodyMap: true,
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
        title: "Tudo no mesmo espaço",
        intro: "A avaliação, o tratamento e a recuperação acontecem na mesma clínica, sem ter de ir a outro sítio.",
      },
      modules: [
        {
          id: "ecografia",
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
          id: "ginasio",
          nav: "Ginásio",
          summary: "Exercício supervisionado até ao regresso à atividade",
          eyebrow: "Reabilitação ativa",
          title: "Ginásio de reabilitação com 100 m²",
          text: "O exercício terapêutico é supervisionado por fisioterapeutas e ajustado à fase da recuperação. O plano passa do tratamento na marquesa ao trabalho de força, mobilidade e controlo motor sem sair da clínica.",
          mediaId: "athletes",
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
          text: "Imersão em água fria e sauna, integradas no plano de recuperação de quem treina com regularidade. A utilização é sempre orientada pela equipa da clínica.",
          mediaId: "service-recovery",
          points: [
            { icon: "snowflake", title: "Banheira de gelo", text: "Imersão em água fria, com tempo controlado." },
            { icon: "flame", title: "Sauna", text: "Exposição ao calor, usada para relaxamento muscular." },
            { icon: "repeat", title: "Integrado no plano", text: "Sessões definidas em função do plano de tratamento. [[confirmar se há sessões avulsas]]" },
          ],
          itemsTitle: "Antes de começar",
          items: [
            { title: "Contraindicações gerais", text: "Problemas cardiovasculares, tensão arterial não controlada, gravidez, alterações de sensibilidade ou circulação, entre outras." },
            { title: "Avaliação prévia", text: "Antes da primeira sessão, confirmamos se a banheira de gelo e a sauna são adequadas ao seu caso." },
          ],
          note: "Antes da primeira sessão, confirmamos se é adequada ao seu caso.",
          video: "video-circuito",
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
            title: "Alta e prevenção",
            line: "Por fim, a alta.",
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
      related: ["dermato"],
      page: {
        lead: "Lesões desportivas, dor e reabilitação depois de uma cirurgia, com o fisioterapeuta Mário Barroso.",
        heroSlot: "slot-msk",
        heroWide: "wide-msk",
        person: {
          bio: "é fisioterapeuta há 16 anos e dirige a Fisio4you. É o responsável pela fisioterapia musculoesquelética, das lesões desportivas à reabilitação depois de uma cirurgia.",
        },
        motto: {
          lines: [["«A", "lesão", "é", "uma"], ["oportunidade", "de", "mudança»"]],
          by: ["Mural da entrada", "Fisio4you", "Portimão"],
        },
      },
    },
    dermato: {
      name: "Fisioterapia Dermatofuncional",
      short: "Recuperação pós-parto, diástase abdominal e tratamento de cicatrizes, incluindo a cicatriz de cesariana.",
      mediaId: "service-dermato",
      meta: {
        title: "Fisioterapia Pós-Parto e Diástase em Portimão | Fisio4you",
        description:
          "Fisioterapia dermatofuncional em Portimão: recuperação pós-parto, diástase abdominal e cicatriz de cesariana, com a fisioterapeuta Angela Brazona.",
      },
      heroTitle: "Fisioterapia Dermatofuncional",
      heroSub: "Avaliação e tratamento da parede abdominal, do pavimento pélvico e das cicatrizes, com particular atenção ao pós-parto e à diástase abdominal.",
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
        intro: "Acompanhamos sobretudo mulheres no pós-parto, independentemente do tempo que passou desde o parto.",
        items: [
          { icon: "baby", title: "Recuperação pós-parto", text: "Parede abdominal, postura e regresso gradual à atividade física." },
          { icon: "target", title: "Diástase abdominal", text: "Avaliação da separação e plano de exercício específico." },
          { icon: "sparkles", title: "Cicatrizes e aderências", text: "Incluindo a cicatriz de cesariana, depois de cicatrizada." },
          { icon: "stethoscope", title: "Pós-operatório de cirurgia plástica/estética", text: "[[confirmar]]" },
          { icon: "flower", title: "Edema e drenagem linfática", text: "[[confirmar]]" },
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
            text: "História clínica e avaliação da parede abdominal, com ecografia quando indicado.",
            details: ["Gravidez, parto, cirurgias anteriores e sintomas atuais", "Avaliação da parede abdominal, da postura e da respiração"],
          },
          {
            title: "Plano",
            line: "Depois, o plano.",
            text: "Objetivos realistas, adaptados à fase em que se encontra e à sua rotina.",
            details: ["O plano parte da sua situação, seja semanas, meses ou anos após o parto", "Exercícios compatíveis com o seu dia a dia"],
          },
          {
            title: "Tratamento",
            line: "Tratamos, passo a passo.",
            text: "Técnicas manuais e exercício orientado, com cada passo explicado.",
            details: ["Respiração, postura e ativação do abdómen profundo e do pavimento pélvico", "Fortalecimento progressivo da parede abdominal", "Técnicas manuais, incluindo para cicatrizes e aderências"],
          },
          {
            title: "Autonomia",
            line: "Por fim, autonomia.",
            text: "Exercícios para casa e acompanhamento no regresso ao exercício físico.",
            details: ["Exercícios para casa, explicados e revistos nas sessões", "Regresso gradual ao exercício, à corrida ou ao desporto"],
          },
        ],
      },
      distinct: {
        title: "Quem acompanha o tratamento",
        text: "A fisioterapia dermatofuncional é a área de Angela Brazona, fisioterapeuta dedicada à saúde da mulher na gravidez e no pós-parto.",
        points: ["Ecografia para avaliar e acompanhar a parede abdominal", "Exercício orientado no ginásio de reabilitação", "Plano de exercícios para continuar em casa"],
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
      related: ["msk"],
      page: {
        lead: "Recuperação pós-parto, diástase abdominal e cicatrizes, com a fisioterapeuta Angela Brazona.",
        heroWide: "wide-dermato",
        conditionsPhoto: "strip-angela",
        person: {
          bio: "é fisioterapeuta e a responsável pela fisioterapia dermatofuncional na Fisio4you, dedicada à saúde da mulher durante a gravidez e no pós-parto.",
        },
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
