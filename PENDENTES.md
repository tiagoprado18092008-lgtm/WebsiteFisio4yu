# Fisio4you · Pendentes para validar com o cliente

Tudo o que no site aparece como `[[ ]]` (ou tem um comentário `[[ ]]` no código). Procurar `[[` em `content/` encontra todos os pontos.

## 🔴 Bloqueiam a publicação

| # | Pendente | Onde alterar |
|---|---|---|
| 1 | **Morada:** briefing diz *Rua Francisco Alvo, loja 11*; Google/Waze/Facebook dizem *R. José Mendes Furtado 13-3* (o mapa do Google no próprio site mostra esta última, verificado a 28/10/2026). Tem de ser **igual** ao perfil Google (NAP). | `content/site.ts` → `address` (e textos de privacidade em `content/pt.ts` / `en.ts`) |
| 2 | **Horário e dias:** briefing 9h–19h; perfis online Seg–Sex 9h–18h30. Abre ao sábado? | `content/site.ts` → `hours`; tabela em Contactos assume sábado e domingo encerrados |
| 3 | **N.º de registo ERS** e **n.º de licença** de funcionamento | `content/site.ts` → `ers`, `license` |
| 4 | **Coordenadas GPS** exatas (lat/long) | `content/site.ts` → `geo` |
| 5 | **Logótipo em SVG vetorial** (opcional — já está a ser usado o PNG enviado; o SVG fica mais nítido) | `public/brand/logo.png` → `components/Logo.tsx` |

## 🟠 Conteúdo

| # | Pendente | Onde alterar |
|---|---|---|
| 6 | ~~16 anos de experiência~~ — **confirmado: experiência do Mário** (já aplicado no site) | — |
| 7 | **Nota e n.º de avaliações Google** + URL do perfil Google (ficam ocultos no site até serem preenchidos). A 28/10/2026 o perfil mostrava **4,5 ★ (17 avaliações)** — decidir se querem mostrar. | `content/site.ts` → `googleRating`, `googleReviewCount`, `social.google` |
| 8 | **3 avaliações Google reais** (copiadas com autorização) | `content/reviews.ts` |
| 9 | ~~URL do Instagram~~ — **instagram.com/fisio_4you** (já no site: botão "Seguir no Instagram", menu e rodapé). Falta confirmar o URL do Facebook | `content/site.ts` → `social` |
| 10 | ~~Mário: apelido e cargo~~ — **Mário Barroso, CEO e fisioterapeuta** (tirado das entrevistas em vídeo e do polo "FT. Mário Barroso"; já no site). Opcional: versão longa do percurso | `pt.ts`/`en.ts` → `team`, `about.founderLong` |
| 11 | **História da clínica** (opcional; a secção só aparece quando houver texto) | `pt.ts`/`en.ts` → `about.story` |
| 12 | **Equipa:** no site estão **Mário Barroso** e **Angela Brazona** (ambos "CEO e fisioterapeuta", como nas entrevistas em vídeo). Confirmar a grafia "Angela" (sem acento, como no vídeo e na pasta de fotos) e se há mais profissionais a mostrar | `pt.ts`/`en.ts` → `team` |
| 13 | **Técnicas ecoguiadas** que o Mário faz (EPI? neuromodulação percutânea? punção seca?) + 2–3 linhas cada | `services.msk.modules[0].items` |
| 14 | **Redação do aviso** sobre ecografia em fisioterapia | `services.msk.modules[0].note` |
| 15 | **Âmbito da Dermatofuncional:** pós-operatório de cirurgia plástica/estética? Edema/drenagem linfática? | `services.dermato` |
| 16 | **"O mesmo fisioterapeuta do início ao fim"** — é verdade? | `home.why.items[3]` |
| 17 | **Precisa de prescrição médica?** (FAQ Musculoesquelética) | `services.msk.faq[0]` |
| 18 | **Pós-parto:** validar resposta "Quando posso começar?" | `services.dermato.faq[0]` |
| 19 | **Ginásio:** pode ser usado sem fisioterapia? | `services.msk.faq[6]` |
| 20 | **Crioterapia/sauna:** sessões avulsas? Só uma das duas? Duração e preços | `services.msk.modules[2]`, `duration`, `faq[6]` |
| 21 | **Duração das sessões e preços** (mostrar ou não) | `duration.text` de cada serviço |
| 22 | **Estacionamento, referência de localização e acessibilidade** | `ctaFinal.directions.text`, `contact.access` |
| 23 | **Seguros/subsistemas:** remover ou atualizar a linha quando houver acordos | `home.insurance` |
| 29 | **Dermatofuncional, textos novos (já publicados, a validar com a Angela):** esquema "O que é a diástase abdominal" (3 fases), "Como avaliamos", lista "Reconhece-se em alguma destas situações?", detalhe de cada passo de "Como funciona" e as perguntas novas (como saber se tenho diástase, parto há anos, cicatriz de cesariana) | `services.dermato.explainer`, `signs`, `how.steps[].details`, `faq[1]`, `faq[3]`, `faq[4]` |
| 30 | **Fisioterapeuta de cada serviço:** a página da Musculoesquelética mostra o Mário e a da Dermatofuncional a Angela (com o vídeo de cada um). Confirmar que é assim que dividem as áreas | `services.*.specialist` |
| 31 | **Musculoesquelética, textos novos (a validar com o Mário):** detalhe de cada passo de "Como funciona" e as perguntas "Tenho esta dor há meses" e "ecografia vs. ressonância" | `services.msk.how.steps[].details`, `faq[2]`, `faq[4]` |
| 32 | **Instagram na home** (links confirmados). Opcional: capas em melhor resolução (as atuais são capturas de ~280 px e ficam algo moles nos telemóveis) | `content/media.ts` → `instagramList`; capas em `/public/media/instagram/<código>.webp` |

### Reformulação do copy (29/10/2026): pontos a validar

| # | Pendente | Onde alterar |
|---|---|---|
| 33 | **Cédula profissional** (Ordem dos Fisioterapeutas) e **formação relevante** do Mário e da Angela. Aparecem nos cartões da equipa assim que preenchidas | `pt.ts`/`en.ts` → `team[].focus` |
| 34 | **Cargo:** os dois aparecem como "Fisioterapeuta e CEO" (como nas entrevistas). Preferem outra designação (ex.: sócio-gerente, direção clínica) ou só "Fisioterapeuta"? | `team[].role` |
| 35 | **Divisão das áreas:** o site diz que a musculoesquelética "é a área de Mário Barroso" e a dermatofuncional "é a área de Angela Brazona" (home, páginas de serviço). Confirmar (liga-se ao #30) | `home.featured.intro`, `services.*.distinct.text` |
| 36 | **Gravidez:** o perfil da Angela refere acompanhamento durante a gravidez (dito no vídeo), mas a página do serviço só fala do pós-parto. Há acompanhamento na gravidez? Se sim, acrescentar ao serviço | `team[1].focus`, `services.dermato` |
| 37 | **Pressoterapia:** aparece numa foto da faixa da home e no vídeo "Circuito de recuperação", mas não está descrita como serviço. Querem mencioná-la? | `services.msk.modules[2]` |
| 38 | **Processo clínico:** as fases de cada serviço (avaliação → plano → tratamento e exercício → alta) e os princípios da página Sobre ("Avaliação antes do tratamento", "Exercício supervisionado", "Reavaliação regular") descrevem a prática habitual. Confirmar que correspondem ao que fazem | `services.*.how`, `about.values` |
| 39 | **Exercício supervisionado "por fisioterapeutas":** além do Mário e da Angela, há outros profissionais no ginásio? | `services.msk.modules[1].text` |
| 40 | **Avaliações Google e publicidade em saúde:** uma das avaliações publicadas diz "A melhor clínica de fisioterapia de Portimão". O texto é da utente e não foi alterado, mas convém confirmar que a utilização de testemunhos cumpre as regras de publicidade em saúde (ERS) | `content/reviews.ts` |
| 41 | **Perguntas escondidas até haver resposta:** "Preciso de prescrição médica?" (#17) e "Posso usar o ginásio, a banheira de gelo ou a sauna sem fazer fisioterapia?" (#19) deixaram de aparecer: a resposta pública era apenas "fale connosco". Voltam a aparecer quando a resposta for escrita | `services.msk.faq[0]`, `faq[6]` |
| 42 | **Seguros:** a frase passou a "De momento, a Fisio4you não tem acordos com seguradoras nem com subsistemas de saúde." Se preferirem anunciar que estão em negociação, confirmar a redação (liga-se ao #23) | `home.insurance` |

## 🟢 Técnico

| # | Pendente | Onde alterar |
|---|---|---|
| 24 | **ID do Google Tag Manager** (`GTM-XXXXXXX`) | `content/site.ts` → `gtmId` (só carrega após consentimento de cookies) |
| 25 | ~~Fotos e vídeos~~ — **feito** (28/10/2026). Opcional: foto da ecografia e da sauna — ver `MEDIA.md` | `content/media.ts` |
| 26 | ~~Imagem de partilha~~ — **feito** (`/public/media/og-cover.jpg`) | `content/media.ts` → `ogCover` |
| 27 | Domínio **fisio4you.pt** apontado para a Vercel | Vercel → Domains |
| 28 | Validar JSON-LD no [Rich Results Test](https://search.google.com/test/rich-results) depois de publicar | — |

## ✅ Decisões registadas

- **Especialidades "Em breve"** (Fisiatria, Osteopatia, Pilates Clínico, Psicologia): retiradas do site por agora. O texto continua em `content/pt.ts` / `en.ts` (`comingSoon`) para reativar quando abrirem.
- **16 anos de experiência:** são do Mário.
- **Hero sem vídeo** (pedido do cliente): foto de tratamento. Os vídeos (entrevistas do Mário e da Angela, testemunho do Pedro Senra, circuito de recuperação) estão na home, na página Sobre e nas páginas de serviço, e só tocam quando se carrega no play. Na home, a antiga secção de vídeos deu lugar à "A clínica no Instagram" (4 posts que abrem no Instagram); as entrevistas passaram para os cartões da equipa.
- **Fotos com o mural de jogadores famosos em destaque** ficam de fora (direitos de imagem). Ver `MEDIA.md`.
- **Originais em `/Fotos`** (~1,3 GB) não são publicados: estão no `.gitignore` e no `.vercelignore`.
- Contexto de produto em `PRODUCT.md`.
