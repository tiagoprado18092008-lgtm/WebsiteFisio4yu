# Handoff: interatividade das páginas de serviço

Páginas: `/servicos/fisioterapia-musculoesqueletica` e `/servicos/fisioterapia-dermatofuncional` (e as versões `/en`).
Código: `components/pages/ServicePage.tsx`, `components/TreatmentBlocks.tsx`, `components/ScrollSpy.tsx`,
`components/RecoveryPlanner.tsx`, `components/ServiceAreas.tsx`, estilos em `app/globals.css` («Seguir o scroll» e
«Perguntas»). Texto em `content/pt.ts` e `content/en.ts`.

## Overview

O visitante chega para perceber se a clínica trata o seu caso e para marcar por WhatsApp. As interações servem esse
caminho: mostram onde está na página, deixam-no escolher uma sessão e levam a escolha para a mensagem. Nenhuma esconde
conteúdo sem JavaScript.

| Secção | Página | Interação |
|---|---|---|
| Frase de «Sobre o serviço» | dermatofuncional | Acende palavra a palavra ao descer (`ScrollWords`) |
| Os tratamentos (guia) | dermatofuncional | Botão «A seguir: {tratamento}» no fim do painel |
| Técnicas de tratamento | musculoesquelética | A técnica que está a ser lida acende; índice clicável junto à foto |
| Sessão Recovery | musculoesquelética | Seletor das quatro sessões; «O que pode incluir» e o botão seguem a escolha |
| Como decorre | as duas | As quatro frases acendem uma a uma ao descer |
| Perguntas frequentes | as duas | A resposta abre a deslizar |
| Duas áreas, uma clínica | as duas | Tocar no painel fechado troca-o pelo aberto (já existia) |

## Design tokens usados

| Token | Valor | Uso |
|---|---|---|
| `ice` | #e4f1f3 | Chips do índice das técnicas em repouso |
| `teal-strong` | #0d6b7a | Chip ativo; círculo da sessão escolhida; última frase do percurso acesa |
| `teal-dark` | #0e4c57 | Texto dos chips; visto dentro do círculo branco |
| `muted` | #6a7377 | Frases do percurso por acender (AA sobre `mist`) |
| `ink` | #20282b | Frases acesas; texto do cartão da sessão escolhida |
| `panel` | #1d5a64 | Fundo do painel Recovery e do texto do painel aberto das duas áreas |
| `whatsapp` | #25d366 | Botão «Marcar a {sessão}» |
| Raio | 16–18 px | Cartões das sessões e das partes |
| Curva | `cubic-bezier(0.22, 1, 0.36, 1)` | Todas as transições novas |

## Componentes

| Componente | Props | Notas |
|---|---|---|
| `ScrollSpy` | `mode: "active" \| "seen"`, `className` | Marca os filhos com `data-spy`. `active`: só um fica `data-active` e os `data-spy-link="<id>"` acompanham-no (com `aria-current`). `seen`: cada um fica `data-seen` ao passar a linha. Põe `data-spy-ready` no bloco; o CSS só atua com esse atributo. |
| `RecoveryPlanner` | `plans` (com `message` já feita), `parts`, `plansTitle`, `partsTitle`, `labels`, `waLocation` | Cliente. Estado: índice da sessão escolhida, começa na 1.ª. |
| `ServiceAreas` | `areas`, `initial`, `treatsLabel` | Abre no serviço da página. |

## Estados e interações

| Elemento | Estado | Comportamento |
|---|---|---|
| Técnica (lista) | Ativa | Opacidade 1 |
| Técnica (lista) | Inativa, ≥1024 px com rato | Opacidade 0,55; 0,85 com o cursor por cima |
| Técnica (lista) | Telemóvel / tablet / sem JS | Sempre a opacidade 1 |
| Chip do índice | Repouso / hover / ativo | `ice` / #d2e8ec / `teal-strong` com texto branco |
| Chip do índice | Clique | Âncora para a técnica (`scroll-mt-32` deixa espaço para o header) |
| Cartão da sessão | Escolhido | Fundo branco, texto `ink`, círculo `teal-strong` com visto |
| Cartão da sessão | Por escolher | Branco a 7%, aro branco a 15%; hover a 13% e sobe 4 px (só com rato) |
| Parte da sessão | Incluída | Branco a 10%, aro a 25%, visto num círculo branco |
| Parte da sessão | Fora da sessão | Opacidade 0,45, traço no círculo, «não incluída nesta sessão» para leitores de ecrã |
| Botão WhatsApp | Sessão escolhida | Etiqueta «Marcar a Recovery Plus»; mensagem «…consulta de Sessão Recovery (Recovery Plus).»; `data-location="servico-msk-recovery"` |
| Palavra da frase «Sobre» | Por acender / acesa | `muted` → `ink` (o nome do serviço → `teal-strong`), da entrada a 85% do ecrã até a frase passar 40%; sem JS ou com «reduzir movimento», já acesa |
| Ligação `#id` de um tratamento | Clique (em qualquer sítio da página) | Abre o tratamento no guia, `#id` na barra de endereço, desce a deslizar até ao guia (funciona mesmo com o mesmo `#id` já na barra) |
| «A seguir» do guia | Clique | Abre o tratamento seguinte (o último volta ao primeiro); se o topo do painel saiu do ecrã, sobe até ele |
| Frase do percurso | Por acender / acesa | `muted` → `ink` (a última → `teal-strong`) quando cruza 45% da altura do ecrã |
| Pergunta | Aberta | O conteúdo desliza até `auto` em 450 ms; a resposta sobe 6 px e aparece |

## Comportamento por tamanho de ecrã

| Largura | Alterações |
|---|---|
| ≥1280 px | Duas áreas lado a lado (64% / 36%); no aberto, texto 56% e foto 44% |
| ≥1024 px | Técnicas em duas colunas com a foto presa (altura `min(100svh − 15rem, 42rem)`) e o índice por cima; esbater ativo |
| 768–1023 px | Técnicas numa coluna, sem índice nem esbater; duas áreas uma por baixo da outra, aberto com texto à esquerda e foto à direita |
| <768 px | Sessões em 2 colunas; partes numa coluna; duas áreas com a foto em cima e o texto por baixo |

## Casos-limite

- **Sem JavaScript:** sem `data-spy-ready`, tudo fica à vista e com a cor normal; as sessões aparecem com a 1.ª escolhida (render do servidor) e o botão aponta para ela.
- **Chegar por âncora a meio da página:** no modo `seen`, as frases que já estão acima do meio acendem logo.
- **Nomes longos no índice** («Neuromodulação Percutânea Ecoguiada»): os chips passam para uma 2.ª linha.
- **Texto mais longo em inglês:** testado a 1440 e 390 px; «Ultrasound-guided percutaneous neuromodulation» também passa para a 2.ª linha.
- **Uma sessão nova:** acrescentar a `recovery.plans` com as chaves de `parts`; o seletor e a mensagem seguem sozinhos.

## Movimento

| Elemento | Gatilho | Animação | Duração | Curva |
|---|---|---|---|---|
| Técnica | Passa a linha dos 45% | Opacidade | 600 ms | ease-out expo |
| Chip do índice | Técnica ativa muda | Fundo e cor | 350 ms | ease |
| Cartão / parte da sessão | Clique | Fundo, aro, opacidade | 500 ms | ease-out expo |
| Frase do percurso | Passa a linha dos 45% | Cor | 800 ms | ease-out expo |
| Pergunta | Abrir / fechar | Altura até `auto` + entrada da resposta | 450 ms | ease-out expo |

Com «reduzir movimento», os estados mudam na mesma mas sem transições, e as perguntas abrem de uma vez.

## Acessibilidade

- Sessões: `<button aria-pressed>`, foco visível com contorno branco de 2 px; «{n} de {t} incluídas na {sessão}» num `aria-live="polite"`.
- Índice das técnicas: `<nav aria-label="Técnicas de tratamento">`; o link da técnica ativa tem `aria-current="true"`.
- Partes fora da sessão: o estado é dito por texto (`sr-only`), não só pela opacidade.
- Perguntas: `<details>`/`<summary>` nativos; teclado e leitores de ecrã sem alterações.
- Contraste: as frases por acender usam `muted`, que passa AA sobre `mist`; as técnicas esbatidas só esbatem com rato e em ecrã largo, enquanto não estão a ser lidas.

## Texto novo (UX copy)

| Elemento | PT | EN |
|---|---|---|
| Botão no fim do guia | A seguir: {tratamento} | Next: {treatment} |
| Botão da sessão | Marcar a {sessão} | Book {session} |
| Resumo da escolha | {n} de {t} incluídas na {sessão} | {n} of {t} included in {session} |
| Parte incluída (leitor de ecrã) | incluída | included |
| Parte fora (leitor de ecrã) | não incluída nesta sessão | not included in this session |
| Mensagem de WhatsApp | Olá, gostava de marcar uma consulta de Sessão Recovery ({sessão}). | Hello, I'd like to book a Recovery session ({session}) appointment. |

O rótulo «Usada em» das técnicas deixou de estar em maiúsculas (a regra da frase normal do DESIGN.md). A etiqueta do
botão começa pelo verbo e diz o que se marca. A mensagem reutiliza o modelo `wa.service`, por isso o tom é o mesmo das
outras mensagens. Nota para tradução: «incluída» é feminino porque todas as partes são femininas em português (botas,
banheira, massagem, recuperação); se entrar uma parte masculina, a etiqueta passa a «incluído/a» ou vai para cada parte.
