# Fisio4you · Revisão de copy (PT-PT)

Proposta de reescrita de todo o texto visível do site, com base no estilo e na estrutura da Alfra Clinic (sem copiar frases).
Formato: **Atual** → **Proposto**. Quando um texto não muda, aparece como *mantém*.

Nada foi aplicado ainda. Os ficheiros só mudam depois da sua aprovação.

---

## 0. Decisões a aprovar antes de aplicar

1. **Formato dos marcadores.** O projeto já tem um sistema para conteúdo por confirmar: tudo o que estiver entre `[[ ]]` é retirado automaticamente do site publicado (`content/index.ts`), e o build falha se algum marcador chegar ao público (`scripts/check-pending.mjs`).
   Proposta: escrever os marcadores como **`[[CONFIRMAR: descrição]]`** em vez de `[CONFIRMAR: …]`. Assim ficam fáceis de procurar, mas nunca aparecem ao público.
   - Marcador **no meio de uma frase**: só o marcador desaparece e o resto da frase é publicado.
   - Marcador que **ocupa um campo inteiro** de uma lista (ex.: a resposta de uma FAQ): o item inteiro fica escondido até ser preenchido.
   - Para rever o site com os marcadores à vista: `SHOW_PENDING=1 npm run dev`.

2. **Alterações de estrutura** (usam componentes que já existem e não mudam o design):
   - **Homepage, nova secção "Como podemos ajudar?"**: 6 cartões por problema. Reutiliza o `IconList` (ícone + título + texto), com uma única alteração: um `href` opcional por item, para o título passar a ser um link para o serviço. É a única mudança num componente.
     *Alternativa sem tocar em componentes:* reativar o `BodyMap` ("Onde sente dor?"), que já existe mas não está em uso. Organiza por zona do corpo e não por tipo de problema.
   - **Homepage, nova secção FAQ** antes do bloco final de localização. Reutiliza o `Faq` e o layout da FAQ das páginas de serviço, e acrescenta o JSON-LD `FAQPage` (já existe `faqJsonLd`).
   - **Homepage, CTA a meio da página**: um `WhatsAppButton` no fim da secção "Como podemos ajudar?".
   - **Homepage, ordem final:** Hero → O nosso compromisso → Tudo no mesmo espaço → **Como podemos ajudar?** → Serviços → Como decorre → Mário → [Avaliações Google] → [Equipa] → **FAQ** → Localização + CTA final.
     Pequeno desvio à ordem pedida: a FAQ fica **antes** da localização para que a página termine com o CTA (o bloco de localização é também o CTA final).
   - **Páginas de serviço, secção "Benefícios"**: o bloco `distinct` (título + texto + lista) passa a aparecer nos dois serviços. Hoje só aparece na dermatofuncional. Fica logo a seguir a "Para quem é", e o menu interno da página ganha a entrada "Benefícios".
   - **Bloco de localização (todas as páginas)**: mostrar também o email no cartão de marcação. A opção `withEmail` já existe; só a página de Contactos a usa hoje.

3. **Versão inglesa (`/en`).** O tipo do dicionário EN é igual ao PT, por isso as chaves novas têm de existir nos dois. Proposta: depois de aprovar o PT, aplico a mesma estrutura e o mesmo conteúdo em inglês britânico, com as mesmas regras (sem inventar, sem promessas). Não repito aqui a versão EN para não duplicar este documento.

4. **Texto que não aparece no site.** Há conteúdo em `content/pt.ts` que nenhuma página usa: `home.bodyMap`, `home.eco`, `home.visit`, `home.why`, `home.coming`, `home.stack.title`, `home.hero.eyebrow`, `home.founder.cta`, `home.team.eyebrow`, `home.reviews.eyebrow/placeholder/pendingRating`, `ctaFinal.whatsapp/phone/directions`, `services.msk.includes`, `services.*.modules[].eyebrow`, `about.eyebrow`, `about.founderTitle`, `servicesPage.eyebrow`, `contact.eyebrow`, `comingSoon`, `meta.comingSoon`.
   Proposta: **não mexer**. Não chega ao público, e uma parte (`comingSoon`, `bodyMap`) está guardada de propósito para reativar mais tarde.

---

## 1. Elementos globais (todas as páginas)

### Botões e CTA

| Onde | Atual | Proposto |
|---|---|---|
| Botão WhatsApp principal (hero, serviços, cartão de marcação, menu mobile) `common.whatsappCta` | Marcar avaliação no WhatsApp | **Quero marcar a minha avaliação** (o ícone do WhatsApp continua no botão) |
| Botão do cabeçalho `common.bookAssessment` | Marcar avaliação | *mantém* |
| Barra fixa mobile `common.call` / `common.whatsapp` | Ligar / WhatsApp | *mantém* |
| Botão flutuante `common.floatingWhatsapp` | Falar connosco no WhatsApp | *mantém* |
| Link dos cartões de serviço `common.learnMore` | Saber mais | **Conhecer o serviço** |
| Botão dos cartões na homepage `home.stack.more` | Ver detalhes | **Ver o serviço** |
| Nota do telefone `common.phoneNote` | (chamada para rede móvel nacional) | *mantém (obrigatório)* |

### Mensagens pré-preenchidas do WhatsApp (`wa`)
*Mantêm-se.* Já estão na 1.ª pessoa e com contexto ("Olá, gostava de marcar uma avaliação de {serviço}.").

### Cartão de marcação (`home.booking`, aparece no bloco final de todas as páginas)

| | Atual | Proposto |
|---|---|---|
| Título | Marque a sua avaliação | **Marcações** |
| Texto | Respondemos durante o horário da clínica. | **Por WhatsApp ou telefone, no horário da clínica.** |

O título muda para não repetir o título do bloco onde o cartão está.

### Bloco final: localização + CTA (`ctaFinal`, todas as páginas exceto Contactos e legais)

| | Atual | Proposto |
|---|---|---|
| Título (H2) | A sua recuperação começa com uma mensagem. | *mantém* |
| Subtítulo | Diga-nos o que sente e marcamos a sua primeira avaliação. | **Diga-nos o que sente. Respondemos no horário da clínica e marcamos a sua avaliação em Portimão.** |

O cartão ao lado mostra telefone, horário, morada e (proposta) email, e tem o botão "Quero marcar a minha avaliação". O mapa aparece por baixo.

### Mapa (`map`)
*Mantém.* O texto do consentimento é claro.

### Banner de cookies (`cookieBanner`)

| | Atual | Proposto |
|---|---|---|
| Texto | Usamos cookies essenciais para o site funcionar e, com o seu consentimento, cookies de medição e o mapa do Google. | *mantém* |
| Botões | Aceitar / Recusar / Saber mais | *mantém* |

---

## 2. SEO: `<title>` e meta description

Limites: title ≤ 60 caracteres, description ≤ 155 (contados).

| Página | Atual | Proposto | Car. |
|---|---|---|---|
| **Início**, title | Fisio4you · Fisioterapia em Portimão \| Centro de Reabilitação | Fisioterapia em Portimão com Ecografia e Ginásio \| Fisio4you | 60 |
| Início, description | Fisioterapia em Portimão com avaliação ecográfica, ginásio de reabilitação de 100 m², crioterapia e sauna. Marque a sua avaliação por WhatsApp ou telefone. | Fisioterapia em Portimão com avaliação por ecografia, ginásio de reabilitação de 100 m², banheira de gelo e sauna. Marque a sua avaliação na Fisio4you. | 151 |
| **Serviços**, title | Serviços de Fisioterapia em Portimão \| Fisio4you | *mantém* | 48 |
| Serviços, description | Fisioterapia musculoesquelética e dermatofuncional, ecografia, técnicas ecoguiadas, ginásio de reabilitação e recuperação com banheira de gelo e sauna em Portimão. (163, acima do limite) | Fisioterapia musculoesquelética, desportiva e pós-parto em Portimão, com ecografia, ginásio de reabilitação de 100 m², banheira de gelo e sauna. | 144 |
| **Musculoesquelética**, title | Fisioterapia Musculoesquelética e Desportiva em Portimão \| Fisio4you (68, acima do limite) | Fisioterapia Musculoesquelética em Portimão \| Fisio4you | 55 |
| Musculoesquelética, description | Lesões desportivas, dor lombar e cervical, tendinopatias e reabilitação pós-cirúrgica em Portimão, com ecografia, ginásio de 100 m², crioterapia e sauna. | Lesões desportivas, dor nas costas e no pescoço, tendinites e recuperação após cirurgia em Portimão. Avaliação com ecografia e ginásio de reabilitação. | 151 |
| **Dermatofuncional**, title | Diástase Abdominal e Pós-Parto em Portimão \| Fisio4you | Fisioterapia Pós-Parto e Diástase em Portimão \| Fisio4you | 57 |
| Dermatofuncional, description | Fisioterapia dermatofuncional em Portimão: recuperação pós-parto, diástase abdominal, cicatrizes e aderências, com acompanhamento próximo e discreto. | Fisioterapia dermatofuncional em Portimão: recuperação pós-parto, diástase abdominal e cicatrizes, com acompanhamento próximo e discreto. | 137 |
| **Sobre**, title | Sobre a Fisio4you · Centro de Reabilitação em Portimão | Sobre a Fisio4you \| Centro de Reabilitação em Portimão | 54 |
| Sobre, description | Conheça a Fisio4you, a equipa e as instalações: ecografia, ginásio de reabilitação de 100 m², crioterapia e sauna em Portimão. | Fisio4you, centro de reabilitação em Portimão: ecografia, ginásio de 100 m², banheira de gelo e sauna no mesmo espaço. Conheça a clínica. | 137 |
| **Contactos**, title | Contactos e Horário \| Fisio4you Portimão | Contactos e Horário \| Fisio4you, Fisioterapia em Portimão | 57 |
| Contactos, description | Marque a sua avaliação na Fisio4you em Portimão por WhatsApp ou telefone (924 098 545). Morada, horário e como chegar. | Marque a sua avaliação de fisioterapia em Portimão por WhatsApp ou telefone (924 098 545). Morada, horário e como chegar à Fisio4you. | 133 |
| **Privacidade**, title | Política de Privacidade \| Fisio4you | Política de Privacidade \| Fisio4you Portimão | 44 |
| Privacidade, description | Como a Fisio4you, Lda trata os seus dados pessoais. | Como a Fisio4you, Lda trata os seus dados pessoais quando nos contacta por WhatsApp, telefone ou email. | 103 |
| **Termos**, title | Termos de Utilização \| Fisio4you | Termos de Utilização \| Fisio4you Portimão | 41 |
| Termos, description | Termos de utilização do website fisio4you.pt. | Condições de utilização do website fisio4you.pt, da Fisio4you, Lda, clínica de fisioterapia em Portimão. | 104 |
| **Cookies**, title | Política de Cookies \| Fisio4you | Política de Cookies \| Fisio4you Portimão | 40 |
| Cookies, description | Que cookies utiliza o website fisio4you.pt e como gerir o consentimento. | Que cookies utiliza o website fisio4you.pt, para que servem e como alterar o seu consentimento a qualquer momento. | 114 |

---

## 3. Homepage

### a) Hero

| | Atual | Proposto |
|---|---|---|
| **H1** (2 linhas) | Vemos a lesão. / Treinamos o regresso. | **Fisioterapia em Portimão, / com ecografia e ginásio próprio.** ✅ aplicado |
| Subtítulo | Fisioterapia com avaliação ecográfica, ginásio de reabilitação de 100 m² e recuperação com crioterapia e sauna — tudo num só espaço, em Portimão. | **Da avaliação com ecografia ao treino num ginásio de reabilitação de 100 m², com banheira de gelo e sauna para recuperar. Tudo no mesmo espaço.** |
| Botões | Marcar avaliação no WhatsApp · 924 098 545 | **Quero marcar a minha avaliação** · 924 098 545 |
| Factos (faixa inferior) | Seg–Sex, 09h–19h · Ecografia na avaliação · Ginásio de 100 m² · Banheira de gelo e sauna | *mantém* |

Porquê: o H1 atual é um bom slogan, mas não diz o que a clínica é nem onde está, e é o único H1 da página. A proposta junta quem somos, onde estamos e o que nos distingue.
*Alternativa:* manter "Vemos a lesão. / Treinamos o regresso." como H1 e começar o subtítulo por "Fisioterapia em Portimão: …". Funciona, mas tem menos peso para SEO local.

### b) O nosso compromisso (secção "Vantagens": acordeão + fotos)

**H2.** Atual: O que faz a diferença na sua recuperação → **Proposto: O nosso compromisso consigo**

| # | Atual | Proposto |
|---|---|---|
| 1 | — (novo) | **Do primeiro dia até à alta.** Acompanhamos cada fase: avaliação, tratamento, ginásio e regresso à atividade. Sabe sempre em que ponto está e qual é o passo seguinte. |
| 2 | — (novo) | **Um só plano, partilhado pela equipa.** Avaliação, tratamento e exercício seguem o mesmo plano, conhecido por quem o acompanha. `[[CONFIRMAR: n.º de fisioterapeutas; o utente é seguido sempre pelo mesmo fisioterapeuta?]]` |
| 3 | — (novo) | **Para atletas e não só.** Atletas, pessoas ativas, quem passa o dia sentado e seniores. Adaptamos o plano à sua idade, à sua rotina e ao que quer voltar a fazer. |
| 4 | **Avaliação com ecografia.** Vemos músculos, tendões e ligamentos em tempo real, para tratar a causa e não só o sintoma. | **Avaliação com ecografia.** Vemos músculos, tendões e ligamentos em tempo real. Assim, o tratamento parte da causa e não só do sintoma. |
| 5 | **16 anos de experiência.** O Mário tem 16 anos de experiência a tratar lesões e a acompanhar recuperações. | *mantém* |
| – | **Tudo no mesmo espaço.** Fisioterapia, ginásio de reabilitação de 100 m², banheira de gelo e sauna, sem andar de um sítio para o outro. | *sai daqui* (passa para a secção seguinte, que já trata disso) |
| – | **Reabilitação ativa até ao regresso.** Exercício supervisionado e progressivo, com critérios claros para voltar a treinar e competir. | *sai daqui* (passa para o cartão "Lesão desportiva" e para os benefícios do serviço) |

### Tudo no mesmo espaço (secção "hub": 4 atalhos com pictograma)

| | Atual | Proposto |
|---|---|---|
| H2 | Tudo o que a sua recuperação precisa, num só espaço | **Avaliar, tratar e treinar no mesmo sítio** |
| Texto | Da avaliação com ecografia ao regresso ao treino: fisioterapia, ginásio de reabilitação e recuperação, sem andar de um sítio para o outro. | **Ecografia, ginásio de reabilitação, banheira de gelo, sauna e fisioterapia pós-parto. Sem andar de clínica em clínica.** |
| Botão | Ver todos os serviços | *mantém* |
| Atalhos | Ecografia · Ginásio de reabilitação · Banheira de gelo e sauna · Pós-parto e diástase | *mantém* |

### c) Como podemos ajudar? (NOVA secção)

**H2:** Como podemos ajudar?
**Intro:** Escolha a situação mais parecida com a sua. Em todas, começamos por uma avaliação.

| Ícone | Título (H3, link) | Texto | Liga a |
|---|---|---|---|
| activity | **Dor aguda ou lesão recente** | Uma entorse, uma rotura muscular ou uma dor que apareceu há pouco. Quanto mais cedo avaliarmos, mais cedo sabe o que tem e o que fazer. | Musculoesquelética |
| clock | **Dor crónica** | Dor que dura há meses e não passa com repouso. Tratamos a dor e trabalhamos a força para recuperar o movimento e a confiança. | Musculoesquelética |
| stethoscope | **Recuperação após cirurgia** | Ligamento cruzado, menisco, ombro ou prótese. Um plano por fases, da marquesa ao ginásio, até voltar às suas atividades. | Musculoesquelética › Ginásio |
| dumbbell | **Lesão desportiva e regresso ao treino** | Exercício supervisionado e critérios claros para voltar a treinar e a competir com segurança. | Musculoesquelética › Ginásio |
| bone | **Costas, pescoço e postura** | Dor lombar ou cervical, muitas vezes ligada a muitas horas sentado. Tratamos a dor e trabalhamos o que a provoca. | Musculoesquelética |
| baby | **Pós-parto e diástase abdominal** | Recuperar o abdómen e o pavimento pélvico depois da gravidez, ao seu ritmo e com total discrição. | Dermatofuncional |

**CTA a meio da página:** botão **Quero marcar a minha avaliação** + nota curta: *Não sabe qual é o seu caso? Descreva-o no WhatsApp e ajudamos.*

Nota: o pedido referia "pré e pós-operatório". No projeto só está confirmado o **pós**-operatório, por isso o cartão diz "Recuperação após cirurgia". Se a clínica fizer preparação pré-operatória, o título passa a "Antes e depois de uma cirurgia" (ver lista [CONFIRMAR]).

### d) Serviços (2 cartões)

| | Atual | Proposto |
|---|---|---|
| H2 | Dois serviços, um mesmo cuidado | **Os nossos serviços de fisioterapia** |
| Intro | Tratamos lesões e dor com método, e acompanhamos a recuperação depois do parto com a mesma atenção. | **Fisioterapia musculoesquelética para lesões, dor e recuperação após cirurgia. Fisioterapia dermatofuncional para o pós-parto e a recuperação dos tecidos.** |
| Cartão Musculoesquelética (`msk.short`) | Lesões desportivas, dor e reabilitação pós-cirúrgica, com ecografia, ginásio de reabilitação e recuperação com crioterapia e sauna. | **Para lesões desportivas, dor nas costas ou nas articulações e recuperação após cirurgia. Inclui ecografia, ginásio de reabilitação, banheira de gelo e sauna.** |
| "Inclui" (3 linhas) | Ecografia e técnicas ecoguiadas — Ver a lesão e guiar o tratamento · Ginásio de reabilitação com 100 m² — Exercício supervisionado até ao regresso ao desporto · Crioterapia (banheira de gelo) e sauna — Recuperar entre treinos e competições | *mantém* |
| Cartão Dermatofuncional (usa `dermato.heroSub`) | ver página Dermatofuncional (§6) | ver §6 |
| Botões | Ver detalhes | **Ver o serviço** |

### Como decorre (secção "Percurso")

| | Atual | Proposto |
|---|---|---|
| H2 | Do primeiro contacto ao regresso à atividade | **Como decorre o seu acompanhamento** |
| 1 | **Avaliação.** Ouvimos a sua história, avaliamos o movimento e, quando indicado, usamos a ecografia. | *mantém* |
| 2 | **Plano à medida.** Objetivos claros e um plano ajustado a si, à sua rotina e ao seu desporto. | **Plano à medida.** Objetivos claros e prazos realistas, ajustados à sua rotina e à sua atividade. |
| 3 | **Tratamento + exercício.** Terapia na marquesa e trabalho ativo no ginásio de reabilitação. | **Tratamento e exercício.** Terapia manual na marquesa e exercício supervisionado no ginásio. |
| 4 | **Regresso e prevenção.** Voltar a treinar, trabalhar ou viver sem dor — e evitar recaídas. | **Regresso e prevenção.** Voltar ao treino, ao trabalho ou ao dia a dia com confiança, e com um plano para evitar recaídas. |

Porquê (4): "viver sem dor" funciona como promessa de resultado.

### Mário (secção do fundador)

| | Atual | Proposto |
|---|---|---|
| H2 (nome) | Mário `[[apelido]]` | Mário `[[CONFIRMAR: apelido]]` |
| Cargo | Fundador e fisioterapeuta | Fundador e fisioterapeuta `[[CONFIRMAR: cargo]]` |
| Texto | Fisioterapeuta com 16 anos de experiência a tratar lesões e a acompanhar recuperações, do primeiro dia ao regresso à atividade. | *mantém* |
| Bio | `[[Texto do Mário, 3–4 frases…]]` | `[[CONFIRMAR: texto do Mário, 3–4 frases: percurso, especializações e porque criou a Fisio4you]]` (escondido) |
| Linha temporal | `[[ano]]` Início da prática clínica · `[[ano]]` Fundação · `[[nº]]` Especialidades | igual, com `[[CONFIRMAR: …]]` (escondida) |
| Nota de seguros | Acordos com seguros e subsistemas de saúde em breve. Fale connosco para saber mais. | **De momento, não temos acordos com seguros nem subsistemas de saúde. Estamos a tratar disso: fale connosco para saber mais.** `[[CONFIRMAR: atualizar quando houver acordos]]` |

### e) Prova social: Avaliações Google
**Ainda não existem avaliações no projeto** (`content/reviews.ts` está vazio, e a nota e o número de avaliações estão a `null`). A secção continua **escondida** até haver avaliações reais. Não escrevo testemunhos.

| | Atual | Proposto |
|---|---|---|
| H2 | O que dizem os nossos utentes | *mantém* |

### Equipa (escondida até haver nomes confirmados)

| | Atual | Proposto |
|---|---|---|
| H2 | Uma equipa que trabalha lado a lado | **A equipa que o vai acompanhar** |

### g) FAQ (NOVA secção na homepage)

**H2:** Perguntas frequentes · botão ao lado: **Quero marcar a minha avaliação**

| Pergunta | Resposta proposta |
|---|---|
| Qual é o horário da clínica? | Segunda a sexta, das 9h00 às 19h00. Marcações por WhatsApp ou pelo 924 098 545. `[[CONFIRMAR: dias e horário; os perfis online indicam Seg–Sex 9h–18h30; abre ao sábado?]]` |
| Preciso de receita médica para começar? | `[[CONFIRMAR: é preciso prescrição médica? Resposta curta do Mário]]` → **escondida até ser preenchida** |
| O que devo vestir? | Roupa confortável, que deixe ver e mexer a zona a tratar: calções para o joelho ou a anca, uma t-shirt de alças para o ombro. Traga calçado desportivo, caso faça exercício no ginásio. |
| O que acontece na primeira consulta? | Conversamos sobre o seu problema e a sua história, avaliamos o movimento e, quando indicado, fazemos ecografia. No fim, explicamos o que encontrámos e propomos um plano. Se tiver exames ou relatórios, traga-os. `[[CONFIRMAR: duração da 1.ª consulta]]` |
| Têm acordos com seguros ou subsistemas de saúde? | De momento, não. Estamos a tratar disso: fale connosco para saber mais. `[[CONFIRMAR: atualizar quando houver acordos]]` |
| Que formas de pagamento aceitam? | `[[CONFIRMAR: numerário, multibanco, MB WAY, transferência?]]` → **escondida** |
| Têm packs de sessões? | `[[CONFIRMAR: existem packs? n.º de sessões, condições, validade]]` → **escondida** |
| E se precisar de cancelar ou remarcar? | `[[CONFIRMAR: política de cancelamento, ex.: aviso com X horas de antecedência]]` → **escondida** |

Até haver confirmações, aparecem as 4 perguntas com resposta. As outras surgem sozinhas quando o texto for preenchido.

### f) Localização + CTA final
Ver §1 ("Bloco final"). Título: *A sua recuperação começa com uma mensagem.* O cartão mostra telefone, horário, morada e email, e tem o botão "Quero marcar a minha avaliação". O mapa aparece por baixo.

---

## 4. Página Serviços (`/servicos`)

| | Atual | Proposto |
|---|---|---|
| **H1** | Serviços | **Serviços de fisioterapia em Portimão** |
| Subtítulo | Da avaliação com ecografia ao regresso ao desporto: tudo o que precisa para recuperar, num só espaço em Portimão. | **Dois serviços no mesmo espaço: fisioterapia musculoesquelética, para lesões e dor, e fisioterapia dermatofuncional, para o pós-parto e a recuperação dos tecidos.** |
| Botão | Marcar avaliação no WhatsApp | **Quero marcar a minha avaliação** |
| H2 (só para leitores de ecrã) | Disponíveis | **Os nossos serviços** |
| Linha Musculoesquelética | (texto `msk.short`, ver §3d) | (ver §3d) |
| Linha Dermatofuncional (`dermato.short`) | Diástase abdominal, recuperação pós-parto e cuidados da pele e tecidos após cirurgia. | **Para recuperar o abdómen e o pavimento pélvico depois do parto, tratar a diástase abdominal e cuidar de cicatrizes.** |
| Links | Saber mais | **Conhecer o serviço** |

Porquê (Dermatofuncional): "tecidos após cirurgia" ainda não está confirmado (pendente #15); "cicatrizes" está.

---

## 5. Fisioterapia Musculoesquelética (`/servicos/fisioterapia-musculoesqueletica`)

Nova ordem: Hero (o que é) → Para quem é → **Benefícios** → Ecografia → Ginásio → Gelo e sauna → Como decorre → Perguntas + Duração (com CTA) → Também disponível → CTA final.

### Hero (o que é)

| | Atual | Proposto |
|---|---|---|
| **H1** | Fisioterapia Musculoesquelética | **Fisioterapia Musculoesquelética em Portimão** |
| Subtítulo | Perceber a origem da dor ou da lesão e tratá-la com método — com ecografia, ginásio de reabilitação e recuperação no mesmo espaço. | **Tratamos lesões e dor em músculos, tendões, articulações e coluna. Primeiro percebemos a origem, com ecografia quando indicado. Depois tratamos e treinamos o seu regresso no ginásio.** |
| Botões | Marcar avaliação no WhatsApp · 924 098 545 | **Quero marcar a minha avaliação** · 924 098 545 |

### Para quem é

| | Atual | Proposto |
|---|---|---|
| Menu interno | Para quem é | *mantém* |
| H2 | Situações que acompanhamos | **Para quem é indicada** |
| Intro | Para desportistas, pessoas ativas e para quem quer voltar a mexer-se sem dor. | **Para atletas, pessoas ativas, quem trabalha sentado e seniores. Se se revê numa destas situações, podemos ajudar.** |
| 1 | **Entorses e lesões ligamentares.** Tornozelo, joelho, punho. | **Entorses e lesões de ligamentos.** No tornozelo, no joelho ou no punho. |
| 2 | **Roturas e contraturas musculares.** Isquiotibiais, gémeos, quadricípite e outras. | **Roturas e contraturas musculares.** Na coxa, na barriga da perna e noutros músculos. |
| 3 | **Tendinopatias.** Ombro, cotovelo, joelho, tendão de Aquiles. | **Tendinites e tendinopatias.** No ombro, no cotovelo, no joelho ou no tendão de Aquiles. |
| 4 | **Dor lombar e cervical.** Incluindo hérnias discais e dor irradiada. | **Dor lombar e cervical.** Incluindo hérnias discais e dor que irradia para o braço ou para a perna. |
| 5 | **Reabilitação pós-cirúrgica.** LCA, menisco, ombro, próteses. | **Recuperação após cirurgia.** Ligamento cruzado (LCA), menisco, ombro e próteses. |
| 6 | **Dor crónica.** Abordagem ativa para recuperar função e confiança. | **Dor crónica.** Dor que dura há meses. Uma abordagem ativa para recuperar o movimento e a confiança. |

### Benefícios (secção que passa a aparecer neste serviço)

| | Atual (não aparecia) | Proposto |
|---|---|---|
| Menu interno | — | **Benefícios** |
| H2 | Mais do que tratar a dor | **O que ganha com este acompanhamento** |
| Texto | Juntamos a precisão da ecografia ao trabalho ativo no ginásio e à recuperação, para que o tratamento se traduza em força e confiança. | **Juntamos a ecografia ao trabalho ativo no ginásio, para que o tratamento se traduza em força e confiança no movimento.** |
| Lista | Ecografia na avaliação e no acompanhamento · Ginásio de reabilitação com 100 m² · Crioterapia e sauna para a recuperação | **Percebe o que se passa, com ecografia quando indicado** · **Tratamento e exercício no mesmo plano e no mesmo espaço** · **Critérios claros para voltar a treinar e a competir** · **Exercícios para manter os resultados e evitar recaídas** |

### Ecografia e técnicas ecoguiadas (`#ecografia`)

| | Atual | Proposto |
|---|---|---|
| H2 | Ecografia e técnicas ecoguiadas | *mantém* |
| Texto | Avaliamos músculos, tendões e ligamentos em tempo real, consigo a ver o ecrã. A ecografia não dói e não usa radiação, e permite aplicar técnicas ecoguiadas com maior precisão. | **Avaliamos músculos, tendões e ligamentos em tempo real, e o utente acompanha tudo no ecrã. A ecografia não dói e não usa radiação. Também nos permite aplicar técnicas ecoguiadas com mais precisão.** |
| Pontos | Ver a lesão · Tratamento dirigido · Evolução visível (+ textos) | *mantém* |
| H3 + lista | Técnicas ecoguiadas: `[[Técnica 1–3]]` | igual, com `[[CONFIRMAR: nome da técnica + 2–3 linhas em linguagem simples]]` (escondido) |
| Nota | A ecografia em fisioterapia serve para avaliação funcional e para guiar o tratamento, não substituindo os exames de diagnóstico médico. `[[confirmar redação com o Mário]]` | *mantém*, com `[[CONFIRMAR: redação com o Mário]]` |

### Ginásio de reabilitação com 100 m² (`#ginasio`)

| | Atual | Proposto |
|---|---|---|
| H2 | Ginásio de reabilitação com 100 m² | *mantém* |
| Texto | Da marquesa ao exercício sem sair da clínica: exercício terapêutico supervisionado por fisioterapeutas, ajustado à fase da sua recuperação. | **Da marquesa ao exercício, sem sair da clínica. O exercício é supervisionado por fisioterapeutas e ajustado à fase da sua recuperação.** |
| Pontos | Exercício terapêutico — Supervisionado e progressivo · Readaptação ao esforço — Recuperar capacidade e tolerância à carga · Regresso ao desporto — Critérios claros para voltar a treinar e competir · Prevenção de lesões — Trabalhar os pontos fracos antes de se tornarem lesões | igual, exceto: **Readaptação ao esforço — Voltar a aguentar esforço, passo a passo.** |

### Crioterapia (banheira de gelo) e sauna (`#recuperacao`)

| | Atual | Proposto |
|---|---|---|
| H2 | Crioterapia (banheira de gelo) e sauna | *mantém* |
| Texto | Para quem treina com frequência e quer recuperar melhor entre treinos e competições, sempre com a orientação da nossa equipa. | **Para quem treina com frequência e quer recuperar melhor entre treinos e competições. Sempre com orientação da nossa equipa.** |
| Pontos | Banheira de gelo — Imersão em água fria, com tempo controlado · Sauna — Calor para relaxamento muscular · Integrado no plano — Sessões integradas no tratamento. `[[…]]` | Banheira de gelo — *mantém* · Sauna — **Calor para relaxar a musculatura.** · Integrado no plano — **Sessões integradas no seu tratamento.** `[[CONFIRMAR: há sessões avulsas?]]` |
| H3 "Antes de começar" | Contraindicações gerais — *(texto)* · Aconselhe-se com a nossa equipa — Antes da primeira sessão, falamos consigo para perceber se é indicado para si. | Contraindicações gerais — *mantém* · **Fale primeiro connosco** — **Antes da primeira sessão, confirmamos se é indicado para si.** |

### Como decorre

| | Atual | Proposto |
|---|---|---|
| Menu interno | Como funciona | **Como decorre** |
| H2 | Como funciona | **Como decorre o tratamento** |
| 1 | **Avaliação.** História clínica, testes de movimento e, quando indicado, ecografia. | **Avaliação.** Conversa sobre a sua história, testes de movimento e, quando indicado, ecografia. |
| 2 | **Plano.** Objetivos concretos e prazos realistas, ajustados à sua atividade. | *mantém* |
| 3 | **Tratamento + ginásio.** Terapia manual, técnicas ecoguiadas quando indicadas e exercício supervisionado. | **Tratamento e ginásio.** *(texto mantém)* |
| 4 | **Alta e prevenção.** Plano de exercícios para manter os resultados e evitar recaídas. | **Alta e prevenção.** Um plano de exercícios para manter os resultados e reduzir o risco de recaída. |

### Perguntas + Duração (com CTA)

| | Atual | Proposto |
|---|---|---|
| H2 | Perguntas frequentes | *mantém* |
| H3 Duração | Duração e frequência | *mantém* |
| Texto | A duração e o número de sessões dependem da avaliação inicial. Fale connosco para saber mais. `[[…]]` | **A duração e o número de sessões dependem da avaliação inicial. Na primeira consulta damos-lhe uma estimativa.** `[[CONFIRMAR: duração da sessão / preços / sessões avulsas de gelo e sauna]]` |
| Botão | Marcar avaliação no WhatsApp | **Quero marcar a minha avaliação** |

| Pergunta | Atual | Proposto |
|---|---|---|
| Preciso de prescrição médica? | `[[confirmar]]` Fale connosco por WhatsApp ou telefone e esclarecemos a sua situação. | **Preciso de receita médica?** `[[CONFIRMAR: resposta do Mário]]` → **escondida até ser preenchida** (hoje aparece com uma resposta que não responde) |
| Quantas sessões vou precisar? | Depende da lesão, do tempo de evolução e dos seus objetivos. Na avaliação inicial definimos um plano e uma estimativa, que vamos ajustando ao longo do tratamento. | Depende da lesão, de há quanto tempo dura e dos seus objetivos. Na avaliação inicial definimos um plano e uma estimativa, que ajustamos ao longo do tratamento. |
| A ecografia dói ou usa radiação? | Não. É indolor — apenas se coloca um gel e se desliza a sonda sobre a pele — e utiliza ultrassons, sem radiação. | Não. Só se coloca um gel e se desliza a sonda sobre a pele. Usa ultrassons, sem radiação. |
| Posso continuar a treinar durante o tratamento? | Muitas vezes sim, com adaptações. Ajustamos a carga de treino à fase da recuperação para que se mantenha ativo com segurança. | *mantém* |
| Posso usar o ginásio, a banheira de gelo ou a sauna sem fazer fisioterapia? | `[[confirmar]]` Fale connosco para saber as opções disponíveis. | *mantém*, com `[[CONFIRMAR: ginásio/gelo/sauna sem fisioterapia?]]` |
| O que devo levar para a primeira consulta? | Roupa confortável que permita avaliar a zona afetada e, se tiver, exames e relatórios médicos. | **O que devo levar e vestir?** Roupa confortável, que deixe ver e mexer a zona a tratar, e calçado desportivo. Se tiver exames ou relatórios médicos, traga-os. |
| — (nova) | — | **O que acontece na primeira consulta?** Conversamos sobre o seu problema, avaliamos o movimento e, quando indicado, fazemos ecografia. No fim, explicamos o que encontrámos e propomos um plano. |

### Também disponível + CTA final
| | Atual | Proposto |
|---|---|---|
| Etiqueta | Também disponível | *mantém* |
| CTA final | (bloco global, §1) | (bloco global, §1) |

---

## 6. Fisioterapia Dermatofuncional (`/servicos/fisioterapia-dermatofuncional`)

Nova ordem: Hero (o que é) → Para quem é → **Benefícios** (sobe na página) → Como decorre → Perguntas + Duração (com CTA) → Também disponível → CTA final.

### Hero (o que é)

| | Atual | Proposto |
|---|---|---|
| **H1** | Fisioterapia Dermatofuncional | **Fisioterapia Dermatofuncional em Portimão** |
| Subtítulo (também usado no cartão da homepage) | Acompanhamento próximo e discreto para recuperar o abdómen, o pavimento pélvico e os tecidos após o parto ou a cirurgia. | **Fisioterapia para recuperar a parede abdominal, o pavimento pélvico e os tecidos. Acompanhamos sobretudo o pós-parto e a diástase abdominal, num ambiente próximo e discreto.** |

### Para quem é

| | Atual | Proposto |
|---|---|---|
| H2 | Situações que acompanhamos | **Para quem é indicada** |
| Intro | Um espaço de confiança, ao seu ritmo e com todo o respeito pela sua privacidade. | **Para mulheres no pós-parto e para quem precisa de recuperar tecidos e cicatrizes. Ao seu ritmo e com todo o respeito pela sua privacidade.** |
| 1 | **Recuperação pós-parto.** Abdómen, postura e regresso progressivo à atividade. | **Recuperação pós-parto.** Abdómen, postura e regresso gradual à atividade física. |
| 2 | **Diástase abdominal.** Avaliação e plano de exercício específico. | **Diástase abdominal.** A separação dos músculos da barriga depois da gravidez. Avaliamos e definimos exercício específico. |
| 3 | **Cicatrizes e aderências.** Incluindo cicatriz de cesariana. | **Cicatrizes e aderências.** Incluindo a cicatriz de cesariana. |
| 4 | Pós-operatório de cirurgia plástica/estética `[[confirmar]]` | igual, com `[[CONFIRMAR: âmbito]]` (escondido) |
| 5 | Edema e drenagem linfática `[[confirmar]]` | igual, com `[[CONFIRMAR: âmbito]]` (escondido) |

### Benefícios

| | Atual | Proposto |
|---|---|---|
| Menu interno | — | **Benefícios** |
| H2 | Acompanhamento especializado | **O que ganha com este acompanhamento** |
| Texto | A ecografia permite acompanhar a parede abdominal de forma objetiva, e o ginásio de reabilitação ajuda a recuperar força e confiança com segurança. | **A ecografia permite acompanhar a parede abdominal de forma objetiva. O ginásio ajuda a recuperar força e confiança, com segurança.** |
| Lista | Ambiente acolhedor e discreto · Ecografia para acompanhar a evolução · Exercício orientado no ginásio | **Um espaço acolhedor e discreto** · **Evolução acompanhada por ecografia** · **Exercício orientado, explicado passo a passo** · **Exercícios para continuar em casa** |

### Como decorre

| | Atual | Proposto |
|---|---|---|
| H2 | Como funciona | **Como decorre o acompanhamento** |
| 1 | **Conversa e avaliação.** Ouvimos a sua história e avaliamos com cuidado, quando indicado com ecografia. | **Conversa e avaliação.** Ouvimos a sua história e avaliamos com cuidado, com ecografia quando indicado. |
| 2 | **Plano.** Objetivos realistas, adaptados à sua fase e à sua rotina. | *mantém* |
| 3 | **Sessões.** Técnicas manuais e exercício orientado, sempre com explicação de cada passo. | **Sessões.** Técnicas manuais e exercício orientado. Explicamos cada passo antes de o fazer. |
| 4 | **Autonomia.** Exercícios para casa e acompanhamento até se sentir segura. | *mantém* |

### Perguntas + Duração (com CTA)

| | Atual | Proposto |
|---|---|---|
| Duração | Definida após a avaliação inicial, de acordo com a sua fase e objetivos. `[[…]]` | *mantém*, com `[[CONFIRMAR: duração da sessão / preço]]` |
| Quando posso começar depois do parto? | Depende do tipo de parto, de como correu a recuperação e da indicação do seu médico. Fale connosco e ajudamos a perceber qual o melhor momento. `[[validar]]` | *mantém*, com `[[CONFIRMAR: validar com o Mário]]` |
| A diástase tem tratamento sem cirurgia? | Muitas situações melhoram com fisioterapia e exercício específico, mas cada caso é diferente. A avaliação permite perceber o seu ponto de partida e o que é realista esperar. | *mantém* |
| Como é a primeira avaliação? | Começamos por uma conversa sobre a sua história e objetivos, seguida de uma avaliação cuidada e explicada passo a passo, com total respeito pela sua privacidade. | *mantém* |
| — (nova) | — | **O que devo vestir?** Roupa confortável que permita trabalhar a zona abdominal, como um top desportivo e leggings. |
| Botão | Marcar avaliação no WhatsApp | **Quero marcar a minha avaliação** |

---

## 7. Sobre (`/sobre`)

| | Atual | Proposto |
|---|---|---|
| **H1** | Fisio4you — Centro de Reabilitação | **Fisio4you, centro de reabilitação em Portimão** |
| Subtítulo | Fisioterapia, ginásio de reabilitação e recuperação num só espaço, em Portimão. | **Uma clínica onde se avalia, trata e treina no mesmo espaço: ecografia, ginásio de reabilitação de 100 m², banheira de gelo e sauna.** |
| A nossa história (H2) | `[[Pedir ao Mário…]]` | `[[CONFIRMAR: história da clínica]]` (escondida) |
| Missão (H2) | Ajudar cada pessoa a recuperar, fortalecer-se e voltar à atividade que gosta, com rigor e acompanhamento próximo. | **Ajudar cada pessoa a recuperar da lesão ou da dor e a voltar ao que gosta de fazer, com um plano claro e acompanhamento próximo.** |
| Valores (H3) | Rigor — Avaliar bem para tratar melhor. · Proximidade — Conhecer a pessoa, não apenas a lesão. · Evolução — Objetivos claros e progresso que se mede. | Rigor — **Avaliar bem antes de tratar.** · Proximidade — *mantém* · Evolução — *mantém* |
| Fundador (H2) | ver §3 | ver §3 + `[[CONFIRMAR: versão longa do percurso do Mário]]` (escondida) |
| A equipa (H2, escondida) | A equipa | *mantém* |
| Galeria (H2) | As instalações | **Conheça o espaço** |

---

## 8. Contactos (`/contactos`)

| | Atual | Proposto |
|---|---|---|
| **H1** | Fale connosco | **Contactos e marcações em Portimão** |
| Subtítulo | Marque a sua avaliação por WhatsApp ou telefone. Respondemos durante o horário da clínica. | **Marque a sua avaliação de fisioterapia por WhatsApp ou telefone. Respondemos no horário da clínica.** |
| Botões | Marcar avaliação no WhatsApp · 924 098 545 | **Quero marcar a minha avaliação** · 924 098 545 |
| Horário (H2) | Segunda a sexta 09h00 – 19h00 · Sábado Encerrado · Domingo Encerrado | *mantém* (dados em `site.ts`; ver [CONFIRMAR]) |
| Acessibilidade e estacionamento (H2) | `[[confirmar…]]` | `[[CONFIRMAR: acessibilidade, estacionamento e referência de localização]]` (escondida) |

---

## 9. Rodapé

| | Atual | Proposto |
|---|---|---|
| Frase | Centro de reabilitação em Portimão. | **Fisioterapia e reabilitação em Portimão.** |
| Colunas | Serviços · Clínica · Contactos · Horário | *mantém* |
| Dados de confiança | Morada · telefone + nota · email · WhatsApp · horário · Fisio4you, Lda · NIF 514 628 847 · Registo ERS n.º (escondido) · Licença n.º (escondido) · Livro de Reclamações · Privacidade · Termos · Cookies · Preferências de cookies · Desenvolvido por AlphaScale AI | *mantém*. O ERS e a licença aparecem sozinhos quando forem preenchidos em `site.ts`. |
| Wordmark "fisio4you" | — | *mantém* (decisão do cliente) |

---

## 10. Páginas legais
O texto mantém-se (só mudam title e description, ver §2). A morada no "Responsável pelo tratamento" depende do [CONFIRMAR] da morada.

---

## 11. Alt text das imagens (`content/media.ts`)

**Fotos reais (aparecem no site):**

| id | Atual | Proposto |
|---|---|---|
| clinic-01 / reception | Receção da Fisio4you, com divisória em madeira e paredes azul-claro / Receção da Fisio4you em Portimão | **Receção e sala de espera da Fisio4you em Portimão, com divisória em ripas de madeira** |
| clinic-02 / gym-tall | Ginásio de reabilitação com máquinas de força e iluminação hexagonal | **Ginásio de reabilitação com bancos, kettlebells, prensa de pernas e iluminação hexagonal** |
| clinic-03 | Parede de camisolas desportivas assinadas no ginásio | *mantém* |
| clinic-04 / brand-room | Sala com o logótipo Fisio4you na parede | **Sala de atendimento com mesa de vidro e o logótipo Fisio4you na parede** |
| clinic-05 / service-gym | Vista ao longo do ginásio de reabilitação / Ginásio de reabilitação com passadeiras, equipamento e parede de camisolas | **Ginásio de reabilitação com passadeiras, zona de relva sintética para treino funcional e parede de camisolas desportivas** |
| clinic-06 | Zona de tratamento com marquesas e cortinas | **Zona de tratamento com marquesas separadas por cortinas, para mais privacidade** |

**Fotos ainda por receber** (o alt passa a descrever o que a foto deve mostrar):

| id | Atual | Proposto |
|---|---|---|
| service-msk | Parede de camisolas desportivas assinadas no ginásio da Fisio4you (não corresponde à foto pedida) | **Fisioterapeuta a tratar o joelho de um desportista na Fisio4you** |
| hero-video / hero-poster | Fisioterapeuta a acompanhar atleta no ginásio da Fisio4you | *mantém* |
| service-eco | Fisioterapeuta a realizar ecografia músculo-esquelética | **Fisioterapeuta a fazer uma ecografia ao ombro, com a imagem no ecrã** `[[CONFIRMAR quando houver foto]]` |
| restantes (dermato, recovery, gym-wide, eco-video, founder, team, facade) | — | *mantém*. Revejo cada um quando as fotos chegarem. |

---

## 12. Hierarquia de headings (verificação)

- **Um único H1 por página.** Homepage: o H1 do hero. Restantes páginas: o H1 do `PageHero`. ✔
- **Homepage:** H1 → H2 por secção (Compromisso, Tudo no mesmo espaço, Como podemos ajudar?, Serviços, Como decorre, Mário, [Avaliações], [Equipa], FAQ, CTA final) → H3 nos itens (acordeão, cartões de problema, cartões de serviço, passos). ✔
- **Serviços:** H1 → H2 por secção → H3 nos itens. ✔
- **Sobre:** "Missão" é H2 com estilo pequeno e "Valores" é H3. Correto, mantém-se.
- **Rodapé:** os títulos das colunas são H2. Estão fora do `<main>`, por isso são aceitáveis. Mantém-se.

---

## 13. Lista de [CONFIRMAR]

**Já existiam (PENDENTES.md), continuam em aberto:**
1. **Morada:** Rua Francisco Alvo, loja 11 (briefing) vs. R. José Mendes Furtado 13-3 (Google/Waze/Facebook). Afeta o rodapé, o cartão, o mapa e a Política de Privacidade.
2. **Horário e dias:** 9h–19h (briefing) vs. Seg–Sex 9h–18h30 (perfis online). Abre ao sábado? Afeta o hero, o cartão, o rodapé, a página de Contactos e a FAQ.
3. **N.º de registo ERS.**
4. **N.º de licença de funcionamento.**
5. **Coordenadas GPS** exatas.
6. **Nota e n.º de avaliações Google** + URL do perfil.
7. **3 avaliações Google reais** (com autorização) para a secção de prova social.
8. **URL do Instagram**; confirmar o URL do Facebook.
9. **Mário:** apelido, cargo, bio curta (3–4 frases), versão longa, linha temporal.
10. **História da clínica.**
11. **Equipa:** nomes, funções e especialização.
12. **Técnicas ecoguiadas** (nome + 2–3 linhas cada).
13. **Redação da nota sobre ecografia** em fisioterapia.
14. **Âmbito da dermatofuncional:** pós-operatório de cirurgia plástica/estética? Edema/drenagem linfática?
15. **Precisa de receita médica?** (FAQ da homepage e da musculoesquelética)
16. **Pós-parto:** validar a resposta "Quando posso começar?".
17. **Ginásio, gelo e sauna sem fisioterapia?**
18. **Crioterapia/sauna:** sessões avulsas? Duração e preços.
19. **Duração das sessões e preços** (mostrar ou não).
20. **Estacionamento, referência de localização e acessibilidade.**
21. **Seguros/subsistemas:** atualizar quando houver acordos.

**Novos, por causa da nova estrutura:**
22. **Equipa integrada:** quantos fisioterapeutas há? O utente é seguido sempre pelo mesmo fisioterapeuta? (cartão "Um só plano, partilhado pela equipa"; pendente #16 do PENDENTES.md)
23. **Preparação pré-operatória:** fazem? Se sim, o cartão passa a "Antes e depois de uma cirurgia".
24. **Duração da primeira consulta** (FAQ "O que acontece na primeira consulta?").
25. **Formas de pagamento** (numerário, multibanco, MB WAY, transferência…).
26. **Packs de sessões:** existem? Condições e validade.
27. **Política de cancelamento/remarcação** (ex.: aviso com X horas de antecedência; há custo?).
28. **Público sénior e sedentário:** confirmar que o cliente quer falar explicitamente para estes perfis (pedido do briefing de copy; o PRODUCT.md foca desportistas e pós-parto).
29. **"Rehab & Performance":** a parede da sala mostra este subtítulo, mas o site usa "Centro de Reabilitação". Qual é a assinatura oficial?
30. **Alt da foto de ecografia** quando a foto chegar (zona do corpo visível).
