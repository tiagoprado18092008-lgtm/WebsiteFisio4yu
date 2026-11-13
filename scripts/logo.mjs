// Gera os ficheiros do logótipo a partir do logótipo oficial (JPG em fundo branco, enviado pelo cliente a 13/11/2026):
//   node scripts/logo.mjs
// - public/brand/logo.png        logótipo a cores, fundo transparente, recortado
// - public/brand/logo-white.png  silhueta branca (header por cima do hero da home)
// - app/icon.png, app/apple-icon.png  o "4" (favicon transparente; ícone iOS em fundo branco)
// - public/media/og-capa-rp.png  imagem de partilha 1200×630 (ao mudar, mudar também o nome: o WhatsApp guarda pelo URL)
import sharp from "sharp";

const SRC = "public/brand/logo-original.jpg";

/** Fundo branco → transparência. As cores lisas do logótipo (cinza ~123, teal) ficam opacas; só as bordas suavizadas
 *  ficam semitransparentes, e a cor delas é "desmisturada" do branco para não deixar halo claro em fundos escuros. */
async function keyWhite(input) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const m = Math.min(r, g, b);
    const a = Math.max(0, Math.min(1, (255 - m - 6) / (255 - 140 - 6)));
    const un = (c) => (a > 0 ? Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a))) : 0);
    out[j] = un(r);
    out[j + 1] = un(g);
    out[j + 2] = un(b);
    out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
}

const keyed = await (await keyWhite(SRC)).toBuffer();
const full = await sharp(keyed).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
await sharp(full.data).png({ compressionLevel: 9 }).toFile("public/brand/logo.png");

// Silhueta branca
const raw = await sharp(full.data).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < raw.data.length; i += 4) raw.data[i] = raw.data[i + 1] = raw.data[i + 2] = 255;
await sharp(raw.data, { raw: { width: raw.info.width, height: raw.info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile("public/brand/logo-white.png");

// O "4": entre o "o" de "fisio" e o "y" de "you" no JPG original (2245×857)
// (dois passos: na mesma cadeia, o sharp aplicaria o trim antes do extract)
const fourBox = await sharp(keyed).extract({ left: 975, top: 105, width: 320, height: 510 }).png().toBuffer();
const four = await sharp(fourBox).trim({ threshold: 1 }).png().toBuffer();
const iconFrom = async (size, fill, background) =>
  sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: await sharp(four).resize({ height: Math.round(size * fill) }).png().toBuffer(), gravity: "center" }])
    .png({ compressionLevel: 9 });
await (await iconFrom(512, 0.8, { r: 0, g: 0, b: 0, alpha: 0 })).toFile("app/icon.png");
await (await iconFrom(180, 0.74, { r: 255, g: 255, b: 255, alpha: 1 })).toFile("app/apple-icon.png");

// Partilha: fundo branco, logótipo com 600 px de largura ao centro (cabe no quadrado central que o WhatsApp mostra)
await sharp({ create: { width: 1200, height: 630, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
  .composite([{ input: await sharp(full.data).resize({ width: 600 }).png().toBuffer(), gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile("public/media/og-capa-rp.png");

console.log("logo", full.info.width, "x", full.info.height);
