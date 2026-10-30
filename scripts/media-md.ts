// Gera MEDIA.md a partir de content/media.ts:  npx tsx scripts/media-md.ts
import { writeFileSync } from "node:fs";
import { mediaList, videos, ogCover } from "../content/media";

const photos = mediaList.map((m) => `| \`${m.id}\` | ${m.ratio} | ${m.src ? "✅" : "⬜"} | ${m.brief} | ${m.src ? `\`/public${m.src}\`` : "—"} |`);
const clips = Object.values(videos).map((v) => `| \`${v.id}\` | ${v.name.pt} — ${v.caption.pt} | ${v.duration} | \`/public${v.src}\` | \`/public${v.poster}\` |`);

writeFileSync(
  "MEDIA.md",
  `# Fisio4you · Fotos e vídeos

Tudo o que aparece no site está registado em \`content/media.ts\`. Os originais estão em \`/Fotos\` (não são publicados: ver \`.vercelignore\`); o site usa as versões otimizadas em \`/public/media\`.

**Seleção de outubro de 2026:** entraram as fotos de tratamento, equipa e espaço com boa nitidez e enquadramento. Ficaram de fora a IMG_7589 (mural de jogadores famosos em destaque atrás do tratamento), por direitos de imagem; as de festa da inauguração (comida, cartões); e os vídeos repetidos ou de evento (\`18_10_2026\` está incluído como testemunho do Pedro Senra; \`INAUGURAÇÃO\` não entrou).

**Galeria das instalações (página Sobre):** as versões editadas das fotos do espaço (soltas em \`/Fotos\`), em WebP no tamanho original em \`/public/media/instalacoes\`. Incluem o corredor "God, why me?" e a sala com o mural a preto e branco, ambos com jogadores famosos. Grelha regular de quadrados 3:4, em 2 colunas (3 a partir de 1024 px): a foto horizontal ocupa duas colunas e, se com 2 colunas sobrar um lugar, a última ocupa a linha toda. No lightbox cada foto aparece inteira.

**Hero:** foto (sem vídeo, a pedido do cliente). É vertical: até 1024 px ocupa o hero todo; a partir daí fica na metade direita e funde-se com o painel teal.

**Faixa de fotos (home):** 8 fotos boas e pouco vistas no resto do site, a alternar pessoas e espaço, deslizam devagar para a direita entre os serviços e o Instagram. A lista e a ordem estão em \`photoStrip\` (\`content/media.ts\`); as fotos devem ser verticais 3:4, como os cartões.

**Como substituir uma foto:** exportar para \`/public/media/...\` em WebP (lado maior ≥ 1600 px) e mudar o \`src\` em \`content/media.ts\`. O \`position\` define o ponto de foco quando a foto é recortada. Com \`src: null\` o item não pode aparecer no site: o \`npm run build\` falha se algum placeholder chegar a uma página.

**Vídeos:** MP4 H.264 + AAC, 720×1280, 30 fps, com as legendas já gravadas na imagem; só tocam quando a pessoa carrega no play (com som), num diálogo com controlos. Poster 4:5 tirado do próprio vídeo, acima das legendas e da marca de água. Para converter um novo vídeo: \`ffmpeg -i entrada.mov -vf "scale=720:1280,fps=30" -c:v libx264 -preset slow -crf 25 -maxrate 1800k -bufsize 3600k -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart saida.mp4\`.

## Fotos

| id | rácio | feito | o que mostra / o que falta | ficheiro |
|---|---|---|---|---|
${photos.join("\n")}
| \`og-cover\` | 1200×630 | ${ogCover ? "✅" : "⬜"} | Imagem de partilha nas redes sociais (terapia manual + logótipo branco). | ${ogCover ? `\`/public${ogCover}\`` : "—"} |

## Vídeos

| id | conteúdo | duração | ficheiro | poster |
|---|---|---|---|---|
${clips.join("\n")}

## Ainda em falta (opcional)

- **Ecografia:** foto do fisioterapeuta com a sonda e o ecrã visível (\`eco-photo\`). Até lá, a secção de ecografia mostra a sala de avaliação.
- **Sauna:** foto da sauna (\`recovery-sauna\`).
- **Logótipo em SVG** (versão a cores e branca), para ficar mais nítido do que o PNG atual.
`,
);
console.log(`MEDIA.md: ${photos.length + 1} fotos, ${clips.length} vídeos`);
