// Recorta o logótipo (PNG transparente) e gera versão branca: node scripts/logo.mjs
import sharp from "sharp";
const src = "public/brand/logo-original.png";
const trimmed = await sharp(src).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
await sharp(trimmed.data).toFile("public/brand/logo.png");
const { data, info } = await sharp(trimmed.data).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) data[i] = data[i + 1] = data[i + 2] = 255;
await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile("public/brand/logo-white.png");
// ícone: o "4" recortado
console.log("logo", trimmed.info.width, "x", trimmed.info.height);
