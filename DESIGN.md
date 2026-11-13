---
name: Fisio4you
description: Clínica de fisioterapia e centro de reabilitação em Portimão — clínico, claro, com o teal do logótipo como instrumento.
colors:
  ink: "#20282b"
  grey: "#4e5053"
  muted: "#6a7377"
  line: "#d7e2e5"
  mist: "#f4f8f9"
  ice: "#e4f1f3"
  white: "#ffffff"
  teal: "#118193"
  teal-strong: "#0d6b7a"
  teal-dark: "#0e4c57"
  cyan: "#1fb5ca"
  panel: "#1d5a64"
  frame: "#a9ced5"
  whatsapp: "#25d366"
  whatsapp-ink: "#05301a"
typography:
  hero:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.5rem + 4.4vw, 5.25rem); ≥1280px: clamp(5.25rem, 0.5rem + 6.6vw, 8.5rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.038em"
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 1.5rem + 2.8vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 1.35rem + 1.9vw, 2.8rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.32rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.012em"
  subhead:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.35vw, 1.28rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  chip: "18px"
  bar: "20px"
  img: "24px"
  card: "28px"
  panel: "34px"
  pill: "999px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  section-mobile: "80px"
  section-desktop: "112px"
components:
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.whatsapp-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "48px"
  button-teal:
    backgroundColor: "{colors.teal-strong}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "48px"
  button-teal-hover:
    backgroundColor: "{colors.teal-dark}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "48px"
  chip-link:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.teal-dark}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "36px"
  card-booking:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "28px"
  card-fact:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "12px 16px"
  nav-bar:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bar}"
    height: "72px"
---

# Design System: Fisio4you

## Overview

**Creative North Star: "A Sala de Avaliação Clara"**

O site comporta-se como a sala onde a primeira consulta acontece: luz branca, superfícies limpas, instrumentos precisos e uma pessoa próxima a explicar o que vê. O teal do logótipo é o instrumento, não a decoração. Marca o que se pode fazer (botões, links, a fase ativa, a última frase do percurso) e nunca cobre a página. O calor vem das fotografias reais da clínica e da equipa, nunca de gradientes ou ilustrações genéricas.

A página inteira vive numa folha branca de cantos largos (34 px em desktop) pousada sobre uma moldura teal suave. Isto dá ao site um objeto físico reconhecível e separa o conteúdo do browser. Dentro da folha, as secções alternam entre branco e "mist", um branco frio quase impercetível, e o ritmo vem de espaço generoso e filetes finos, não de caixas. O cliente pediu um site **clínico, claro e não escuro**. O painel escuro (teal "panel") está reservado a poucos momentos: o hero da página inicial, o bloco de marcação, os cartões entre serviços e o painel da crioterapia, que acaba a pedir a marcação.

A densidade é editorial: títulos grandes em frase normal (Bricolage Grotesque 400), texto corrido sóbrio (Public Sans), listas separadas por filetes em vez de cartões, e a informação clínica organizada por fases e por zonas do corpo.

**Key Characteristics:**
- Folha branca de cantos largos sobre moldura teal (`frame`), com o rodapé num cartão "ice" pousado no fundo da folha.
- Teal como instrumento: ação, estado e foco. O verde WhatsApp é a única cor de conversão.
- Fotografias reais com cantos de 24–28 px; nada de ilustração decorativa.
- Listas com filetes (`line`) em vez de grelhas de cartões.
- Movimento curto e único: entrada do hero, cascata do menu e, nas páginas de serviço, a foto larga que abre de cima para baixo.

## Colors

Paleta amostrada do logótipo: grafite frio para texto, uma família teal do "4" para ação e estado, e brancos frios para superfícies.

### Primary
- **Teal Instrumento** (`teal-strong`): botões teal, links sublinhados, separador ativo, anel de foco. É o teal com contraste AA sobre branco, por isso é o único teal usado em texto.
- **Teal do "4"** (`teal`): ícones de lista, filetes de destaque, músculos no esquema da diástase. Usado em ícones e marcas, nunca em texto corrido.
- **Teal Profundo** (`teal-dark`): estados hover de botões e links, texto sobre "ice" (a frase do mural), a placa do título na faixa de fotos.
- **Brilho do "4"** (`cyan`): só no halo do logótipo da AlphaScale no rodapé, ao passar o cursor.

### Secondary
- **Verde WhatsApp** (`whatsapp`, texto `whatsapp-ink`): o botão de conversão principal. Aparece em todos os heros, no cartão de marcação e na barra móvel. Nunca é usado como decoração.

### Neutral
- **Grafite Frio** (`ink`): títulos e texto principal.
- **Cinza do Logótipo** (`grey`): texto secundário, introduções (`lead`), descrições de lista.
- **Cinza Terciário** (`muted`): breadcrumbs, metadados, rótulos pequenos. Mantém AA sobre branco.
- **Filete** (`line`): divisores entre itens de lista, bordas de cartões e chips.
- **Mist** (`mist`): fundo das secções alternadas.
- **Ice** (`ice`): o painel do rodapé, chips de link, o campo da frase do mural na página da musculoesquelética.
- **Teal Painel** (`panel`): o painel escuro do bloco de marcação.
- **Moldura** (`frame`): só a moldura exterior da página.

### Named Rules
**A Regra do Instrumento.** O teal marca o que se pode usar ou o que está ativo. Um bloco teal grande só existe para pedir a marcação.

**A Regra de Uma Conversão.** O verde WhatsApp só aparece em botões que abrem o WhatsApp. Nenhum outro elemento é verde.

## Typography

**Display Font:** Bricolage Grotesque (fallback system-ui)
**Body Font:** Public Sans (fallback system-ui)

**Character:** uma grotesca com eixo ótico e um ligeiro carácter humano nos títulos, ao lado de uma sans institucional, muito legível, para o texto clínico. Os títulos vêm sempre em frase normal, nunca em maiúsculas.

### Hierarchy
- **Hero** (400, `clamp(2.6rem…5.25rem)`, 0.96; a partir de 1280 px continua até 8,5rem por volta dos 1940 px): só o hero da página inicial. Em ecrãs largos o título enche a coluna à esquerda do cartão da foto, a frase sobe até 1,5rem e os botões até 56 px.
- **Display** (400, `clamp(2.2rem…3.75rem)`, 1.02): o H1 de cada página interna e o título do bloco de marcação.
- **Headline** (400, `clamp(1.85rem…2.8rem)`, 1.06): o H2 de cada secção. Todas as secções de uma página partilham este tamanho.
- **Subhead** (400–500, 1.75rem, 1.2): nomes nos cartões da equipa, a frase da missão em /sobre.

As **páginas de serviço** têm escala própria, em cinco degraus (`globals.css`): **Cartaz** (`t-poster`, 500, `clamp(2.1rem, 9vw, 9.25rem)`, 0.94, -0.045em) para o nome do serviço; **Título** (`t-display`, 400, `clamp(2rem…4.5rem)`, 1.0) para os títulos de secção e as frases do percurso; **Afirmação** (`t-statement`, 400, `clamp(1.3rem…2.25rem)`, 1.18) para perguntas, biografia e títulos dos recursos; e o corpo a 17–18 px e notas a 15 px.
- **Title** (600, 1.32rem, 1.2): títulos de itens de lista, passos do percurso, perguntas, subtítulos dentro de uma secção ("Como trabalhamos").
- **Lead** (400, `clamp(1.1rem…1.28rem)`, 1.55, `grey`): introdução sob um H1 ou H2, até cerca de 60ch.
- **Body** (400, 17px, 1.6): texto corrido.
- **Label** (500, 15px, `teal-strong`): cargos e rótulos curtos de listas ("Inclui").

### Named Rules
**A Regra de Um Nível por Papel.** Dentro de uma página, todos os H2 usam Headline. Um H2 nunca sobe a Display para parecer mais importante. A importância vem da posição e da fotografia. Exceção: as páginas de serviço, que seguem a sua escala de cinco degraus (ver acima).

**A Regra da Frase Normal.** Sem maiúsculas em títulos nem em rótulos.

**A Regra do Título Sem Eyebrow.** Nenhum rótulo pequeno por cima de um título faz de título. Se a secção precisa de um nome, esse nome é o H2, em Headline, à esquerda do conteúdo.

## Layout

- **Contentor:** largura máxima de 1480 px, com margens de 16 px (mobile), 32 px (tablet) e 48 px (desktop ≥1280 px).
- **Folha:** a página vive numa folha branca com 8–12 px de moldura e cantos de 22 px (mobile) ou 34 px (desktop).
- **Secções:** 80 px de padding vertical em mobile e 112 px em desktop. Branco e mist alternam ao longo das páginas de serviço.
- **Grelhas:** duas colunas assimétricas para texto e foto (`1.15fr / 1fr`, `1fr / 1.3fr`), com a foto ou o título colado (`sticky`) quando a outra coluna é longa. Secções sem foto usam o padrão título à esquerda e conteúdo à direita (`1fr / 1.4fr`). As listas usam 2 ou 3 colunas separadas por filetes; com um número ímpar de itens, o último ocupa a linha toda.
- **Breakpoints:** sm 640, md 768, lg 1024, xl 1280. A navegação passa a menu a partir de < 1024 px.
- **Mobile:** tudo numa coluna, foto depois do texto e dos botões; alvos de toque com pelo menos 44 px; barra fixa de Ligar e WhatsApp no fundo do ecrã.

## Elevation & Depth

O sistema é plano por defeito. A profundidade vem da folha branca sobre a moldura e da alternância branco/mist. As sombras são raras, difusas e tingidas de teal, e só aparecem em elementos que "flutuam" sobre outros: a barra do header e o cartão de pessoa da equipa. As páginas de serviço não têm sombras nem filetes: separam com espaço e com degraus de tom.

### Shadow Vocabulary
- **Barra em repouso** (`0 6px 20px -14px rgba(14,76,87,.25)`): header no topo da página.
- **Barra em scroll** (`0 12px 32px -14px rgba(14,76,87,.35)`): header depois de descer.
- **Cartão pousado** (`0 18px 40px -30px rgba(14,76,87,.45)`): cartão de pessoa da equipa.
- **Cartão levantado** (`0 32px 56px -32px rgb(14 76 87 / .6)`, com um anel teal de 1 px a 35 %): qualquer cartão com o cursor por cima. É a única sombra admitida nas páginas de serviço, porque só existe durante o hover.

### Cartões ao passar o cursor
O mesmo gesto em todo o site (classes `card-*` em `globals.css`): o cartão levanta-se 6 px (`card-lift`), a foto aproxima-se até 1,06 (`card-photo`) ou o desenho até 1,1 (`card-icon`), e o título ganha `teal-strong` com um sublinhado de 2 px que se desenha da esquerda para a direita (`card-title`; branco em superfícies escuras). Entra devagar e sai mais depressa. Só com rato; com "reduzir movimento" ficam a cor, a sombra e o sublinhado. Estas regras não vão no mesmo elemento que `data-reveal`.

### Named Rules
**A Regra da Folha Plana.** As secções e as listas não têm sombra. Uma sombra significa que o elemento está pousado sobre outro.

## Shapes

Cantos largos e suaves em tudo o que é superfície, e pílula em tudo o que é ação.

- **Pílula** (999 px): todos os botões, chips de link, seletor de fases.
- **Barra** (20 px): o header flutuante.
- **Imagem** (24 px): fotografias em secções e na galeria.
- **Cartão** (28–30 px): cartão de marcação, fotos dos heros, cartão de pessoa da equipa.
- **Painel** (34 px): a folha da página, o painel do rodapé, os blocos de cor atrás das fotos.

## Components

### Buttons
- **Shape:** pílula (999 px), altura mínima de 48 px, ícone de 18–20 px à esquerda.
- **WhatsApp (principal):** fundo verde WhatsApp com texto verde muito escuro, semibold 15 px. Hover num verde ligeiramente mais fundo.
- **Teal:** fundo `teal-strong`, texto branco; hover `teal-dark`. Usado em ações que não são WhatsApp (ex.: aceitar cookies).
- **Outline:** fundo branco, borda `ink` a 20 %; hover com borda `ink`. É o botão do telefone ao lado do WhatsApp.
- **On dark:** borda branca a 55 %, texto branco; hover a branco cheio.
- **Foco:** anel `teal-strong` de 2 px com 3 px de afastamento; branco sobre superfícies escuras.

### Chips
- **Chip de link:** fundo `ice`, texto `teal-dark` semibold, pílula com 36 px de altura.

### Cards / Containers
- **Cartão de marcação:** painel `panel`, cantos de 28 px, linhas internas em branco a 8 %, botão WhatsApp a toda a largura no fim.
- **Cartão de pessoa:** branco, cantos de 30 px, anel `line` e sombra "cartão pousado"; retrato à esquerda, nome em Bricolage 28 px, cargo em `label`.
- **Listas em vez de cartões:** os conteúdos repetidos (indicações, valores, recursos) são listas com filetes, sem fundo nem sombra.

### Navigation
- **Header:** barra branca flutuante a 95 % com desfoque, cantos de 20 px e anel `line`, em três colunas: logótipo à esquerda, links no centro exato da barra (abaixo de 1280 px mais juntos; o telefone só aparece a partir de 1440 px) e, à direita, telefone, botão WhatsApp e seletor PT | EN. O telefone usa, em todo o site, o auscultador cheio de pontas redondas (`PhoneIcon` em `components/Icon.tsx`, o mesmo peso do ícone do WhatsApp); no header vai num círculo `ice` de 32 px que passa a `teal-strong` ao passar o cursor. Links em 15 px medium `ink`; a página atual fica a `teal-strong`. Na home, no topo da página, a barra fica transparente por cima do painel do hero: logótipo branco, e os links e as ações em duas pílulas brancas; ao descer volta a ser a barra branca.
- **Mobile:** a barra estica até ao fundo do ecrã e passa a ser o painel do menu, com as linhas a entrar em cascata. As três barras do ícone juntam-se no centro e cruzam-se em X (e o contrário ao fechar). Em "Serviços", cada serviço tem uma foto 5:4 ao lado do nome. O fundo do painel é compacto (botões de 44 px, email e redes em ponto pequeno) e o menu aberto fica por cima do aviso de cookies.
### Hero da página inicial (signature)
Painel `panel` liso (cantos de 34 px), sem textura nem degradê. À esquerda, o título em `t-hero`, uma frase e os dois contactos, assentes à altura do fundo da foto; à direita, a foto do Mário a tratar um utente (IMG_7603) num cartão grande com cantos de 24 px, sem moldura nem etiqueta: no desktop vai da linha do header até 20 px do fundo e da margem direita do painel, e fica com toda a largura que o título deixa (a coluna do texto tem só a largura do título), até 1,1 vezes a altura; em telemóvel e tablet vem depois dos botões, a 4:5, quase de margem a margem (até 40rem). O cartão abre de cima para baixo e assenta (o mesmo movimento da foto larga das páginas de serviço). A foto está recortada para deixar de fora os rostos do mural de atletas; o foco segue o Mário (à direita, em cima).

### Páginas de serviço (signature)
Completa e feita de **fotos dos tratamentos** (`components/pages/ServicePage.tsx`, `components/ServiceChapters.tsx`): o cliente pediu que as páginas falem mais dos serviços (referências MoviMente e PhysioClinic), mantendo as fotos de pessoas em tratamento, nada de fotos do ginásio no topo. Sem figuras humanas desenhadas (a silhueta do mapa do corpo saiu a pedido do cliente), sem filetes, sem sombras, sem cartões.
1. **O nome em cartaz:** o H1 em `t-poster`, só com texto (a foto em faixa dentro do título saiu a pedido do cliente), e por baixo uma frase curta (`page.lead`). Sem botões no topo (também a pedido do cliente): o contacto fica no header e na barra fixa. Depois, uma foto do serviço abre larga (2:1), com o único momento forte de movimento. Na dermatofuncional (`page.heroBeside`), a foto da Angela (vertical) aparece inteira, sem recorte, numa coluna à direita (4 de 12 colunas a partir de 1024 px), com o título e a frase assentes no fundo dela; em telemóvel e tablet fica por baixo da frase.
   **O que é o serviço** (`page.about`, dermatofuncional): uma frase em `t-display` com o nome do serviço a `teal-strong`, que acende palavra a palavra ao descer (de `muted` para `ink`; `components/ScrollWords.tsx`); ao lado, os parágrafos e o índice da página em chips `ice`. (A lista «O que tratamos» por baixo saiu a pedido do cliente: o guia dos tratamentos já a mostra.)
2. **Tratamento por zona** (musculoesquelética, `components/ZoneGuide.tsx`): faixa `mist` com o título "Como tratamos cada zona" e a introdução por cima. A partir de 1024 px, à esquerda, um índice das zonas em letra grande, da cabeça aos pés: a zona aberta fica a `teal-strong` com um ponto `teal`, e o Abdómen leva à dermatofuncional. À direita, um painel branco (28 px) com o nome da zona, o que se sente, as situações frequentes em pílulas `ice` e as três fases (Avaliação, Tratamento, Autonomia) ligadas por uma linha teal que se desenha ao trocar de zona; no fim, o WhatsApp com a zona escrita. Em telemóvel, as zonas são pílulas e as fases ficam na vertical. **Situações** (dermatofuncional): a foto à esquerda; à direita, título, introdução e linhas separadas só por espaço, cada uma com WhatsApp.
3. **Diástase** (dermatofuncional): escondida a pedido do cliente (`explainer.hidden`, 10/11/2026). Quando volta: o esquema por fases, em teal liso, e por baixo «Como avaliamos» em três colunas com visto.
4. **Capítulos** (`modules` ou `page.chapters`): título em `t-display`, um parágrafo e a lista com visto, ao lado de uma foto 4:5 presa ao topo, com os lados a alternar; sem foto, o título à esquerda e o conteúdo à direita. A ecografia da musculoesquelética não tem capítulo até haver uma foto boa (`noChapter`). O capítulo com `panel` (a crioterapia) vai num painel `panel` de 34 px, com o texto à esquerda, duas fotos à direita (banheira de gelo em cima, pressoterapia em baixo, cantos de 22 px) e o WhatsApp no fim.
   **Técnicas** (musculoesquelética, `components/TreatmentBlocks.tsx`): título e introdução por cima; a foto presa ao topo com o índice das técnicas em chips `ice` (a que está a ser lida fica `teal-strong` cheio) e, à direita, as técnicas separadas por filetes. A partir de 1024 px com rato, as técnicas que não estão a ser lidas esbatem a 55% (`components/ScrollSpy.tsx`). **Sessão Recovery:** no painel `panel`, as quatro sessões são um seletor (botões com `aria-pressed`): a escolhida fica branca com o círculo `teal-strong`; «O que pode incluir» marca com visto o que entra nela e esbate o resto; o botão do WhatsApp passa a «Marcar a {sessão}», com a sessão na mensagem.
5. **Percurso:** quatro frases em `t-display` que descem em escada ("Primeiro, avaliamos." … a última em `teal-strong`), cada uma com a sua lista com visto. Com JavaScript, as frases começam em `muted` e acendem para `ink` (a última para `teal-strong`) quando passam o meio do ecrã. A duração e frequência ficam no canto livre da escada, em baixo à esquerda.
6. **Quem acompanha:** retrato 4:5 grande e, ao lado, nome, cargo e uma frase.
7. **Perguntas:** só as perguntas à vista; a resposta abre a deslizar (onde o browser anima até `auto`; nos outros abre de uma vez). (A frase do mural, «A lesão é uma oportunidade de mudança», saiu a pedido do cliente.)
8. **As duas áreas** (`components/ServiceAreas.tsx`) fecham a página: dois painéis, um aberto (texto no teal liso e a foto inteira ao lado, sem véu) e o outro fechado (foto escurecida com o nome); tocar no fechado troca-os. O cartão «Também na Fisio4you» e o painel "Por onde começamos?" saíram a pedido do cliente.

### Rodapé (signature)
Estrutura pedida pelo cliente a partir do rodapé da Ninho Home Care, nas cores do site (claro, não escuro). Cartão `ice` pousado na folha com 8/12 px de margem branca e os quatro cantos arredondados (16/24 px, concêntricos com a folha). Compacto, a pedido do cliente: texto a 13–14 px e pouco espaço entre blocos, mantendo os 44 px de toque em telemóvel. Quatro colunas: marca (logótipo a 56 px, a frase em `teal-strong` e ícones redondos de Facebook, Instagram e WhatsApp), Clínica (links e, por baixo, os dados da empresa a negrito), Serviços e Contactos (morada, telefone com a nota, email, WhatsApp e horário, cada um com o seu ícone `teal`, e no fim o Livro de Reclamações: círculo branco com "Livro de" e "Reclamações" ao lado, em HTML). Títulos das colunas em `font-display` e `teal-strong`. Uma linha de baixo com o filete a toda a largura do cartão: direitos à esquerda, links legais à direita. No fundo, o "fisio4you" grande (até 36 rem), a desvanecer (máscara, cor lisa, o "4" em `teal` como a fita do logótipo). O wordmark fica, a pedido do cliente. No fim da linha legal, "Desenvolvido por" com o logótipo da AlphaScale (28 px, máscara pintada a `ink`); ao passar o cursor passa a `teal-strong`, sobe 1 px, ganha um halo `cyan` e uma faixa de luz atravessa as letras uma vez (sem a viagem com `prefers-reduced-motion`).

## Do's and Don'ts

### Do:
- **Do** usar `teal-strong` (#0d6b7a) para qualquer texto teal; `teal` (#118193) só em ícones e marcas.
- **Do** separar itens repetidos com filetes `line` (#d7e2e5) em vez de os meter em cartões.
- **Do** usar fotografias reais da clínica com cantos de 24–28 px; enquanto faltar uma foto, usar outra foto real do espaço.
- **Do** manter todos os H2 de uma página no nível Headline.
- **Do** dar a cada alvo de toque pelo menos 44 px em mobile.
- **Do** levar cada página a um WhatsApp com a mensagem pré-preenchida pelo contexto.

### Don't:
- **Don't** escurecer o site: o cliente pediu um site clínico, claro e não escuro. O painel escuro fica reservado ao hero da página inicial, ao bloco de marcação e ao painel final das páginas de serviço.
- **Don't** usar verde fora dos botões de WhatsApp.
- **Don't** usar maiúsculas em títulos ou rótulos.
- **Don't** remover o "fisio4you" grande no fundo do rodapé.
- **Don't** pôr sombras em secções ou listas; a sombra é só para elementos pousados sobre outros.
- **Don't** inventar números, testemunhos ou nomes; o que falta fica pendente e não aparece ao público.
