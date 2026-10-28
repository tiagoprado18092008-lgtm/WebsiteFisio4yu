# fisio4you.pt

Website da Fisio4you — Centro de Reabilitação (Portimão). Next.js 15 (App Router, SSG) · TypeScript · Tailwind CSS 4 · Lucide.

Serviços: **Fisioterapia Musculoesquelética** (inclui ecografia e técnicas ecoguiadas, ginásio de reabilitação, crioterapia e sauna — secções com âncoras `#ecografia`, `#ginasio`, `#recuperacao`) e **Fisioterapia Dermatofuncional**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera todas as páginas estáticas (PT + EN)
```

Deploy: importar o repositório na Vercel (sem variáveis de ambiente) e ligar o domínio `fisio4you.pt`.

## Onde está cada coisa

| O quê | Ficheiro |
|---|---|
| Textos PT / EN (todo o texto do site) | `content/pt.ts`, `content/en.ts` |
| Morada, telefone, horário, NIF, ERS, redes, GTM | `content/site.ts` |
| Fotos e vídeos (placeholders) | `content/media.ts` → lista de recolha em `MEDIA.md` (`npx tsx scripts/media-md.ts` regenera) |
| Avaliações Google | `content/reviews.ts` |
| URLs e slugs PT/EN | `lib/routes.ts` |
| SEO (meta, hreflang, JSON-LD) | `lib/seo.ts` |
| Cores (amostradas do logótipo) e tipografia | `app/globals.css` (tokens `--f4y-*`), `lib/fonts.ts` (Montserrat + Inter) |
| Pendentes do cliente | `PENDENTES.md` |

## Trocar uma foto

1. Colocar o ficheiro em `public/media/...` (caminhos sugeridos em `MEDIA.md`).
2. Em `content/media.ts`, preencher `src: "/media/servicos/service-msk.webp"` na entrada certa.

O placeholder tem o mesmo rácio, por isso o layout não muda.

## Conversões

Todos os links de WhatsApp e telefone têm `data-track="whatsapp|phone"` e `data-location="..."`. O `components/TrackingListener.tsx` envia `contact_click` para `window.dataLayer` quando o GTM existe (só é carregado depois de o utilizador aceitar cookies). O mapa do Google também só carrega com consentimento.

## Rotas

PT na raiz (`/servicos/...`), EN em `/en` (`/en/services/...`). Cada língua tem o seu root layout (`app/(pt)`, `app/(en)`) para o `lang` correto no `<html>`.
