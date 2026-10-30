# Fisio4you · Fotos e vídeos

Tudo o que aparece no site está registado em `content/media.ts`. Os originais estão em `/Fotos` (não são publicados: ver `.vercelignore`); o site usa as versões otimizadas em `/public/media`.

**Seleção de outubro de 2026:** entraram as fotos de tratamento, equipa e espaço com boa nitidez e enquadramento. Ficaram de fora a IMG_7589 (mural de jogadores famosos em destaque atrás do tratamento), por direitos de imagem; as de festa da inauguração (comida, cartões); e os vídeos repetidos ou de evento (`18_10_2026` está incluído como testemunho do Pedro Senra; `INAUGURAÇÃO` não entrou).

**Galeria das instalações (página Sobre):** as versões editadas das fotos do espaço (soltas em `/Fotos`), em WebP no tamanho original em `/public/media/instalacoes`. Incluem o corredor "God, why me?" e a sala com o mural a preto e branco, ambos com jogadores famosos. Grelha regular de quadrados 3:4, em 2 colunas (3 a partir de 1024 px): a foto horizontal ocupa duas colunas e, se com 2 colunas sobrar um lugar, a última ocupa a linha toda. No lightbox cada foto aparece inteira.

**Hero:** foto (sem vídeo, a pedido do cliente). É vertical: até 1024 px ocupa o hero todo; a partir daí fica na metade direita e funde-se com o painel teal.

**Faixa de fotos (home):** 8 fotos boas e pouco vistas no resto do site, a alternar pessoas e espaço, deslizam devagar para a direita entre os serviços e o Instagram. A lista e a ordem estão em `photoStrip` (`content/media.ts`); as fotos devem ser verticais 3:4, como os cartões.

**Como substituir uma foto:** exportar para `/public/media/...` em WebP (lado maior ≥ 1600 px) e mudar o `src` em `content/media.ts`. O `position` define o ponto de foco quando a foto é recortada. Com `src: null` o item não pode aparecer no site: o `npm run build` falha se algum placeholder chegar a uma página.

**Vídeos:** MP4 H.264 + AAC, 720×1280, 30 fps, com as legendas já gravadas na imagem; só tocam quando a pessoa carrega no play (com som), num diálogo com controlos. Poster 4:5 tirado do próprio vídeo, acima das legendas e da marca de água. Para converter um novo vídeo: `ffmpeg -i entrada.mov -vf "scale=720:1280,fps=30" -c:v libx264 -preset slow -crf 25 -maxrate 1800k -bufsize 3600k -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart saida.mp4`.

## Fotos

| id | rácio | feito | o que mostra / o que falta | ficheiro |
|---|---|---|---|---|
| `hero` | 16/9 | ✅ | Mário a tratar um utente, com o mural teal ("fOTO HERO MELHOR QUALIDADE", escolhida pelo cliente). | `/public/media/tratamentos/hero-mario-tratamento.webp` |
| `gym` | 3/4 | ✅ | Ginásio de reabilitação com a iluminação hexagonal (faixa de fotos da home). | `/public/media/espaco/ginasio.webp` |
| `clinic-01` | 16/9 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/ginasio.webp` |
| `clinic-02` | 9/16 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/ginasio-corredor.webp` |
| `clinic-03` | 3/4 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/sala-fisio4you.webp` |
| `clinic-04` | 9/16 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/corredor-mural.webp` |
| `clinic-05` | 9/16 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/gabinetes.webp` |
| `clinic-06` | 9/16 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/sala-tratamento.webp` |
| `clinic-07` | 9/16 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/ginasio-maquinas.webp` |
| `clinic-08` | 3/4 | ✅ | Instalações: salas, ginásio, equipamento. | `/public/media/instalacoes/camisolas.webp` |
| `brand-room` | 3/2 | ✅ | Sala com o logótipo. | `/public/media/espaco/sala-fisio4you.webp` |
| `athletes` | 3/2 | ✅ | Mário com clientes/atletas na clínica (secção de avaliações da home). | `/public/media/clientes/atletas.webp` |
| `jerseys` | 3/2 | ✅ | Camisolas assinadas (colagem da secção de vantagens, home). | `/public/media/espaco/camisolas.webp` |
| `about-hero` | 4/5 | ✅ | O Mário e a Angela juntos. | `/public/media/equipa/mario-e-angela.webp` |
| `service-msk` | 4/5 | ✅ | Terapia manual num desportista. | `/public/media/tratamentos/tratamento-sala.webp` |
| `msk-card` | 3/2 | ✅ | Cartão da musculoesquelética (home e Serviços): o Mário a tratar um utente (antigo hero). | `/public/media/tratamentos/mario-tratamento.webp` |
| `service-dermato` | 4/5 | ✅ | Fisioterapeuta da área dermatofuncional. | `/public/media/tratamentos/angela-dermatofuncional.webp` |
| `service-eco` | 4/5 | ✅ | Ideal: fisioterapeuta com sonda do ecógrafo, ecrã visível. | `/public/media/espaco/sala-avaliacao.webp` |
| `service-gym` | 4/5 | ✅ | Ginásio de 100 m² em plano aberto. | `/public/media/espaco/ginasio-corredor.webp` |
| `service-recovery` | 4/5 | ✅ | Banheira de gelo, vazia (cartão da crioterapia e visita à clínica). | `/public/media/tratamentos/banheira-gelo-vazia.webp` |
| `slot-msk` | 3/4 | ✅ | Faixa no título da página da musculoesquelética: as mãos em terapia manual. | `/public/media/tratamentos/terapia-manual.webp` |
| `wide-msk` | 3/4 | ✅ | Foto larga do topo da musculoesquelética (as mãos do Mário no utente, na marquesa). | `/public/media/tratamentos/tratamento-sala.webp` |
| `wide-dermato` | 3/4 | ✅ | Foto do hero da dermatofuncional, inteira (3:4) ao lado do título: a Angela com os instrumentos em madeira. | `/public/media/tratamentos/angela-dermatofuncional.webp` |
| `team-mario` | 4/5 | ✅ | Retrato do Mário. | `/public/media/equipa/mario-barroso.webp` |
| `team-angela` | 4/5 | ✅ | Retrato da Angela. | `/public/media/equipa/angela-brazona.webp` |
| `strip-pressotherapy` | 3/4 | ✅ | Faixa de fotos da home. | `/public/media/clientes/pressoterapia.webp` |
| `strip-rack` | 3/4 | ✅ | Faixa de fotos da home. | `/public/media/espaco/rack.webp` |
| `strip-duo-gym` | 3/4 | ✅ | Faixa de fotos da home. | `/public/media/equipa/mario-e-angela-ginasio.webp` |
| `strip-angela` | 3/4 | ✅ | Faixa de fotos da home. | `/public/media/tratamentos/angela-instrumentos.webp` |
| `strip-mural` | 3/4 | ✅ | Faixa de fotos da home. | `/public/media/espaco/sala-mural.webp` |
| `strip-cards` | 3/4 | ✅ | Faixa de fotos da home. | `/public/media/espaco/cartoes.webp` |
| `strip-gym` | 3/4 | ✅ | Faixa de fotos da home. | `/public/media/espaco/ginasio-kettlebells.webp` |
| `eco-photo` | 4/5 | ⬜ | Fisioterapeuta com a sonda do ecógrafo, ecrã visível (substitui a sala de avaliação em service-eco). | — |
| `recovery-sauna` | 4/5 | ⬜ | Sauna. | — |
| `og-cover` | 1200×630 | ✅ | Imagem de partilha nas redes sociais (terapia manual + logótipo branco). | `/public/media/og-cover.jpg` |

## Vídeos

| id | conteúdo | duração | ficheiro | poster |
|---|---|---|---|---|
| `video-mario` | Mário Barroso — O novo espaço | 1:02 | `/public/media/video/mario-novo-espaco.mp4` | `/public/media/video/mario-novo-espaco.webp` |
| `video-angela` | Angela Brazona — Saúde da mulher | 1:16 | `/public/media/video/angela-brazona.mp4` | `/public/media/video/angela-brazona.webp` |
| `video-pedro` | Pedro Senra — Cliente | 0:27 | `/public/media/video/pedro-senra.mp4` | `/public/media/video/pedro-senra.webp` |
| `video-circuito` | Circuito de recuperação — Treino, pressoterapia e banheira de gelo | 0:48 | `/public/media/video/circuito-recuperacao.mp4` | `/public/media/video/circuito-recuperacao.webp` |
| `video-mario-mensagem` | Mário Barroso — Uma mensagem do Mário | 0:34 | `/public/media/video/mario-mensagem.mp4` | `/public/media/video/mario-mensagem.webp` |

## Ainda em falta (opcional)

- **Ecografia:** foto do fisioterapeuta com a sonda e o ecrã visível (`eco-photo`). Até lá, a secção de ecografia mostra a sala de avaliação.
- **Sauna:** foto da sauna (`recovery-sauna`).
- **Logótipo em SVG** (versão a cores e branca), para ficar mais nítido do que o PNG atual.
