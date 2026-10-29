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
    fontSize: "clamp(2.6rem, 1.5rem + 4.4vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
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

O site comporta-se como a sala onde a primeira consulta acontece: luz branca, superfícies limpas, instrumentos precisos e uma pessoa próxima a explicar o que vê. O teal do logótipo é o instrumento, não a decoração. Marca o que se pode fazer (botões, links, a fase ativa, o ponto no mapa do corpo) e nunca cobre a página. O calor vem das fotografias reais da clínica e da equipa, nunca de gradientes ou ilustrações genéricas.

A página inteira vive numa folha branca de cantos largos (34 px em desktop) pousada sobre uma moldura teal suave. Isto dá ao site um objeto físico reconhecível e separa o conteúdo do browser. Dentro da folha, as secções alternam entre branco e "mist", um branco frio quase impercetível, e o ritmo vem de espaço generoso e filetes finos, não de caixas. O cliente pediu um site **clínico, claro e não escuro**. O único painel escuro (teal "panel") está reservado ao momento de marcar consulta e ao hero do serviço desportivo.

A densidade é editorial: títulos grandes em frase normal (Bricolage Grotesque 400), texto corrido sóbrio (Public Sans), listas separadas por filetes em vez de cartões, e a informação clínica organizada por fases e por zonas do corpo.

**Key Characteristics:**
- Folha branca de cantos largos sobre moldura teal (`frame`), com rodapé em painel "ice" recolhido nas margens.
- Teal como instrumento: ação, estado e foco. O verde WhatsApp é a única cor de conversão.
- Fotografias reais com cantos de 24–28 px; nada de ilustração decorativa.
- Listas com filetes (`line`) em vez de grelhas de cartões.
- Movimento curto e único: entrada do hero, cascata do menu, troca de zona no mapa do corpo.

## Colors

Paleta amostrada do logótipo: grafite frio para texto, uma família teal do "4" para ação e estado, e brancos frios para superfícies.

### Primary
- **Teal Instrumento** (`teal-strong`): botões teal, links sublinhados, separador ativo, anel de foco. É o teal com contraste AA sobre branco, por isso é o único teal usado em texto.
- **Teal do "4"** (`teal`): ícones de lista, filetes de destaque, pontos do mapa do corpo. Usado em ícones e marcas, nunca em texto corrido.
- **Teal Profundo** (`teal-dark`): estados hover de botões e links, texto sobre "ice".
- **Brilho do "4"** (`cyan`): só nos pontos pulsantes do mapa do corpo.

### Secondary
- **Verde WhatsApp** (`whatsapp`, texto `whatsapp-ink`): o botão de conversão principal. Aparece em todos os heros, no cartão de marcação e na barra móvel. Nunca é usado como decoração.

### Neutral
- **Grafite Frio** (`ink`): títulos e texto principal.
- **Cinza do Logótipo** (`grey`): texto secundário, introduções (`lead`), descrições de lista.
- **Cinza Terciário** (`muted`): breadcrumbs, metadados, rótulos pequenos. Mantém AA sobre branco.
- **Filete** (`line`): divisores entre itens de lista, bordas de cartões e chips.
- **Mist** (`mist`): fundo das secções alternadas e dos cartões de factos.
- **Ice** (`ice`): o painel do rodapé, chips de link, o bloco atrás da foto no hero da dermatofuncional.
- **Teal Painel** (`panel`): o painel escuro do bloco de marcação e o bloco atrás da foto no hero da musculoesquelética.
- **Moldura** (`frame`): só a moldura exterior da página.

### Named Rules
**A Regra do Instrumento.** O teal marca o que se pode usar ou o que está ativo. Um bloco teal grande só existe para pedir a marcação ou para emoldurar a foto de um serviço.

**A Regra de Uma Conversão.** O verde WhatsApp só aparece em botões que abrem o WhatsApp. Nenhum outro elemento é verde.

## Typography

**Display Font:** Bricolage Grotesque (fallback system-ui)
**Body Font:** Public Sans (fallback system-ui)

**Character:** uma grotesca com eixo ótico e um ligeiro carácter humano nos títulos, ao lado de uma sans institucional, muito legível, para o texto clínico. Os títulos vêm sempre em frase normal, nunca em maiúsculas.

### Hierarchy
- **Hero** (400, `clamp(2.6rem…5.25rem)`, 0.98): só o hero da página inicial.
- **Display** (400, `clamp(2.2rem…3.75rem)`, 1.02): o H1 de cada página interna e o título do bloco de marcação.
- **Headline** (400, `clamp(1.85rem…2.8rem)`, 1.06): o H2 de cada secção. Todas as secções de uma página partilham este tamanho.
- **Subhead** (400–500, 1.75rem, 1.2): nomes nos cartões da equipa, a frase da missão em /sobre, o nome do outro serviço no fim de cada página de serviço.
- **Title** (600, 1.32rem, 1.2): títulos de itens de lista, passos do percurso, perguntas, subtítulos dentro de uma secção ("Como trabalhamos").
- **Lead** (400, `clamp(1.1rem…1.28rem)`, 1.55, `grey`): introdução sob um H1 ou H2, até cerca de 60ch.
- **Body** (400, 17px, 1.6): texto corrido.
- **Label** (500, 15px, `teal-strong`): cargos e rótulos curtos de listas ("Inclui").

### Named Rules
**A Regra de Um Nível por Papel.** Dentro de uma página, todos os H2 usam Headline. Um H2 nunca sobe a Display para parecer mais importante. A importância vem da posição e da fotografia.

**A Regra da Frase Normal.** Sem maiúsculas em títulos nem em rótulos. A única exceção é o selo do Livro de Reclamações, que é um elemento oficial.

**A Regra do Título Sem Eyebrow.** Nenhum rótulo pequeno por cima de um título faz de título. Se a secção precisa de um nome, esse nome é o H2, em Headline, à esquerda do conteúdo.

## Layout

- **Contentor:** largura máxima de 1480 px, com margens de 16 px (mobile), 32 px (tablet) e 48 px (desktop ≥1280 px).
- **Folha:** a página vive numa folha branca com 8–12 px de moldura e cantos de 22 px (mobile) ou 34 px (desktop).
- **Secções:** 80 px de padding vertical em mobile e 112 px em desktop. Branco e mist alternam ao longo das páginas de serviço.
- **Grelhas:** duas colunas assimétricas para texto e foto (`1.15fr / 1fr`, `1fr / 1.3fr`), com a foto ou o título colado (`sticky`) quando a outra coluna é longa. Secções sem foto usam o padrão título à esquerda e conteúdo à direita (`1fr / 1.4fr`). As listas usam 2 ou 3 colunas separadas por filetes; com um número ímpar de itens, o último ocupa a linha toda.
- **Breakpoints:** sm 640, md 768, lg 1024, xl 1280. A navegação passa a menu a partir de < 1024 px.
- **Mobile:** tudo numa coluna, foto depois do texto e dos botões; alvos de toque com pelo menos 44 px; barra fixa de Ligar e WhatsApp no fundo do ecrã.

## Elevation & Depth

O sistema é plano por defeito. A profundidade vem da folha branca sobre a moldura e da alternância branco/mist. As sombras são raras, difusas e tingidas de teal, e só aparecem em elementos que "flutuam" sobre outros: a barra do header, o cartão de pessoa da equipa, a foto do hero de serviço e o selo do fisioterapeuta responsável.

### Shadow Vocabulary
- **Barra em repouso** (`0 6px 20px -14px rgba(14,76,87,.25)`): header no topo da página.
- **Barra em scroll** (`0 12px 32px -14px rgba(14,76,87,.35)`): header depois de descer.
- **Cartão pousado** (`0 18px 40px -30px rgba(14,76,87,.45)`): cartão de pessoa da equipa, cartão do mapa do corpo.
- **Foto emoldurada** (`0 30px 60px -34px rgba(6,40,46,.55)`): a foto no hero de cada serviço.

### Named Rules
**A Regra da Folha Plana.** As secções e as listas não têm sombra. Uma sombra significa que o elemento está pousado sobre outro.

## Shapes

Cantos largos e suaves em tudo o que é superfície, e pílula em tudo o que é ação.

- **Pílula** (999 px): todos os botões, chips de link, seletor de fases.
- **Chip** (18 px): cartões de factos no hero de serviço.
- **Barra** (20 px): o header flutuante.
- **Imagem** (24 px): fotografias em secções e na galeria.
- **Cartão** (28–30 px): cartão de marcação, fotos dos heros, cartão de pessoa da equipa.
- **Painel** (34 px): a folha da página, o painel do rodapé, os blocos de cor atrás das fotos.

## Components

### Buttons
- **Shape:** pílula (999 px), altura mínima de 48 px, ícone de 18–20 px à esquerda.
- **WhatsApp (principal):** fundo verde WhatsApp com texto verde muito escuro, semibold 15 px. Hover num verde ligeiramente mais fundo.
- **Teal:** fundo `teal-strong`, texto branco; hover `teal-dark`. Usado em ações que não são WhatsApp (mostrar mapa).
- **Outline:** fundo branco, borda `ink` a 20 %; hover com borda `ink`. É o botão do telefone ao lado do WhatsApp.
- **On dark:** borda branca a 55 %, texto branco; hover a branco cheio.
- **Foco:** anel `teal-strong` de 2 px com 3 px de afastamento; branco sobre superfícies escuras.

### Chips
- **Chip de link:** fundo `ice`, texto `teal-dark` semibold, pílula com 36 px de altura. Liga um passo do percurso ao recurso usado nessa fase.
- **Zonas do corpo:** pílulas brancas com borda `line`. A zona ativa fica a `teal-strong` cheio com texto branco.

### Cards / Containers
- **Cartão de marcação:** painel `panel`, cantos de 28 px, linhas internas em branco a 8 %, botão WhatsApp a toda a largura no fim.
- **Cartão de pessoa:** branco, cantos de 30 px, anel `line` e sombra "cartão pousado"; retrato à esquerda, nome em Bricolage 28 px, cargo em `label`.
- **Cartões de factos (hero de serviço):** fundo `mist`, cantos de 18 px, ícone num círculo branco.
- **Listas em vez de cartões:** os conteúdos repetidos (indicações, valores, recursos) são listas com filetes, sem fundo nem sombra.

### Navigation
- **Header:** barra branca flutuante a 95 % com desfoque, cantos de 20 px e anel `line`. Links em 15 px medium `ink`; a página atual fica a `teal-strong`. Do lado direito: telefone, botão WhatsApp e seletor PT | EN.
- **Mobile:** a barra estica até ao fundo do ecrã e passa a ser o painel do menu, com as linhas a entrar em cascata.
- **Navegação de secção (serviços):** faixa fixa sob o header com filete em cima e em baixo. O separador ativo fica a `teal-strong` com um sublinhado de 2 px.

### Mapa do corpo (signature)
Silhueta em linha fina com pontos teal pulsantes. Escolher uma zona troca o cartão ao lado com as situações frequentes e abre um WhatsApp já com a zona escrita.

### Rodapé (signature)
Painel `ice` recolhido nas margens da folha, com cinco colunas (marca, Serviços, Clínica, Contactos e Horário), uma linha legal com o selo do Livro de Reclamações e o "fisio4you" gigante a desvanecer no fundo. O wordmark fica, a pedido do cliente.

## Do's and Don'ts

### Do:
- **Do** usar `teal-strong` (#0d6b7a) para qualquer texto teal; `teal` (#118193) só em ícones e marcas.
- **Do** separar itens repetidos com filetes `line` (#d7e2e5) em vez de os meter em cartões.
- **Do** usar fotografias reais da clínica com cantos de 24–28 px; enquanto faltar uma foto, usar outra foto real do espaço.
- **Do** manter todos os H2 de uma página no nível Headline.
- **Do** dar a cada alvo de toque pelo menos 44 px em mobile.
- **Do** levar cada página a um WhatsApp com a mensagem pré-preenchida pelo contexto.

### Don't:
- **Don't** escurecer o site: o cliente pediu um site clínico, claro e não escuro. O painel escuro fica reservado ao bloco de marcação e ao hero da musculoesquelética.
- **Don't** usar verde fora dos botões de WhatsApp.
- **Don't** usar maiúsculas em títulos ou rótulos (exceto o selo oficial do Livro de Reclamações).
- **Don't** remover o "fisio4you" grande no fundo do rodapé.
- **Don't** pôr sombras em secções ou listas; a sombra é só para elementos pousados sobre outros.
- **Don't** inventar números, testemunhos ou nomes; o que falta fica pendente e não aparece ao público.
