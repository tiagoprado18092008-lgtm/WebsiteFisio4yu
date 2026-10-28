# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: desportistas e pessoas ativas** em Portimão e arredores (Alvor, Praia da Rocha, Lagoa) com lesões desportivas, dor, ou a regressar ao treino depois de uma lesão ou cirurgia. Querem perceber se a Fisio4you resolve o seu caso e marcar uma avaliação rapidamente.
- **Lado estético/dermatofuncional (também prioritário):** sobretudo mulheres no pós-parto (diástase abdominal, recuperação do abdómen e pavimento pélvico) e pessoas com cicatrizes ou recuperação após cirurgia. Procuram um acompanhamento discreto, próximo e de confiança.
- **Secundário:** adultos com dor crónica ou em reabilitação pós-operatória; residentes estrangeiros e turistas no Algarve, que chegam pela versão inglesa.

## Product Purpose

Website da **Fisio4you — Centro de Reabilitação**, clínica de fisioterapia em Portimão (Algarve), feito pela agência AlphaScale AI. O objetivo é transformar visitantes em contactos: **WhatsApp é a conversão principal e o telefone a secundária**. Sucesso = mais avaliações marcadas por WhatsApp/telefone, com tracking por localização do clique (`data-track` / `data-location` → GTM).

## Positioning

A Fisio4you junta no mesmo espaço o que outras clínicas da zona separam:

- **Ecografia** na avaliação e no acompanhamento, e **técnicas ecoguiadas** (lista exata a confirmar);
- **Ginásio de reabilitação com 100 m²** para reabilitação ativa até ao regresso ao desporto;
- **Crioterapia (banheira de gelo) e sauna** para recuperação;
- **Fisioterapia dermatofuncional** com foco em pós-parto e diástase abdominal.

A proposta combina um lado **desportivo/de performance** com um lado **estético/dermatofuncional**, sempre com rigor clínico.

## Operating Context

- Marcação apenas por **WhatsApp** (mensagens pré-preenchidas por contexto) e **telefone**. **Sem marcação online e sem formulários** (decisão do cliente).
- Um único espaço físico em Portimão; horário 9h00–19h00 (dias a confirmar).
- Site bilingue: **português europeu (pt-PT) por defeito** e **inglês** em `/en`.
- Seguros e subsistemas de saúde: **em negociação**, sem acordos ainda.

## Capabilities and Constraints

- **Serviços (só estes dois):**
  1. **Fisioterapia Musculoesquelética**, que inclui ecografia e técnicas ecoguiadas, ginásio de reabilitação e crioterapia/sauna;
  2. **Fisioterapia Dermatofuncional**.
- **Especialidades futuras** (Fisiatria, Osteopatia, Pilates Clínico, Psicologia): **removidas do site por agora**, a pedido do cliente; só voltam quando abrirem.
- Stack existente: Next.js 15 (App Router, SSG), TypeScript, Tailwind CSS 4, deploy previsto na Vercel com o domínio `fisio4you.pt`.
- Todo o texto vive em `content/pt.ts` e `content/en.ts`; fotos e vídeos em `content/media.ts` (placeholders até chegarem as fotos profissionais).
- Requisitos legais em Portugal: Livro de Reclamações Eletrónico, registo ERS e licença no rodapé, RGPD (privacidade, cookies, consentimento antes de GTM e Google Maps), nota "(chamada para rede móvel nacional)" junto aos telefones.
- Publicidade em saúde: linguagem rigorosa e verificável; sem "a melhor clínica", sem garantias de resultados, sem antes/depois sem consentimento.
- **Em aberto:** morada (briefing vs. perfis online), dias de abertura, n.º ERS e licença, técnicas ecoguiadas, âmbito exato da dermatofuncional, preços/duração, sessões avulsas de gelo/sauna. Lista completa em `PENDENTES.md`.

## Brand Commitments

- Nome comercial **Fisio4you**; logótipo "fisio4you · Centro de Reabilitação" com o "4" em fita teal (`public/brand/logo.png`; vetorial ainda por receber). Entidade legal Fisio4you, Lda, NIF 514 628 847.
- Contacto principal e fundador: **Mário**, fisioterapeuta, com **16 anos de experiência** (a experiência é dele, não da clínica).
- Voz: profissional e próxima, em **português europeu** ("equipa", "marcar consulta", "telemóvel", "utente"), nunca português do Brasil; inglês britânico na versão EN ("physiotherapy", "ice bath", "postnatal").
- O cliente pediu um site **clínico, claro e não escuro**, com credibilidade profissional, que não pareça genérico nem feito por IA.
- Rodapé com "Desenvolvido por AlphaScale AI".

## Evidence on Hand

- Logótipo: `public/brand/logo.png` (+ `logo-white.png`, `logo-original.png`).
- Dados do briefing: NIF, telefone/WhatsApp 924 098 545, email fisio4youportimao@gmail.com, Facebook.
- **Ainda não existem (não inventar):** fotografias e vídeos reais (ver `MEDIA.md`), avaliações Google (nota, número e textos), nomes e funções da equipa, biografia do Mário, história da clínica, número de pacientes, prémios.

## Product Principles

1. **Uma mensagem de distância:** cada página leva a um WhatsApp com contexto; o utente nunca tem de explicar de onde veio.
2. **Mostrar o mecanismo, não prometer resultados:** ecografia, ginásio e recuperação são factos verificáveis; nada de curas garantidas.
3. **Desporto e estética com o mesmo rigor clínico:** o lado de performance e o lado dermatofuncional/pós-parto têm igual dignidade.
4. **Só factos confirmados:** nada de números, testemunhos ou nomes inventados; o que falta fica pendente e não aparece ao público.
5. **Bilingue de verdade:** o visitante estrangeiro tem a mesma experiência completa em inglês.

## Accessibility & Inclusion

Contraste mínimo WCAG AA, navegação completa por teclado com foco visível, `prefers-reduced-motion` respeitado, `lang` correto por língua, alvos de toque com pelo menos 44 px em mobile.
