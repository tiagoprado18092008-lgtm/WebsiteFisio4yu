// Corre depois de `next build`: falha se chegou às páginas geradas algum marcador [[...]] (conteúdo por confirmar)
// ou algum placeholder de foto/vídeo (item de content/media.ts sem `src`).
// Ignora os nomes de rotas do Next ([[...slug]]). Ver PENDENTES.md, MEDIA.md e content/index.ts.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = ".next/server/app";
// Sem aspas nem chavetas no interior: exclui os dados dos ícones no payload RSC ([["path",{...}]]).
const marker = /\[\[(?!\.\.\.)[^\][{}"\\]{1,120}\]\]/g;
const placeholder = /data-media-placeholder="([^"]+)"/g;
const found = [];
const missing = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|rsc|body)$/.test(name)) {
      const text = readFileSync(p, "utf8");
      const hits = text.match(marker);
      if (hits) found.push(`${p}: ${[...new Set(hits)].slice(0, 5).join(", ")}`);
      const ids = [...text.matchAll(placeholder)].map((m) => m[1]);
      if (ids.length) missing.push(`${p}: ${[...new Set(ids)].join(", ")}`);
    }
  }
}

walk(root);
if (found.length) console.error(`\n✖ Conteúdo por confirmar visível ao público em ${found.length} ficheiro(s):\n  ${found.join("\n  ")}\n`);
if (missing.length) console.error(`\n✖ Placeholders de foto/vídeo visíveis ao público em ${missing.length} ficheiro(s):\n  ${missing.join("\n  ")}\n`);
if (found.length || missing.length) process.exit(1);
console.log("✓ Nenhum marcador [[...]] nem placeholder de foto/vídeo nas páginas geradas.");
