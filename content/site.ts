// Dados factuais da clínica (NAP, legais, redes). Texto traduzível vive em pt.ts / en.ts.
// Tudo marcado com [[ ]] está listado em PENDENTES.md e deve ser validado com o cliente.

export const site = {
  name: "Fisio4you",
  tagline: "Centro de Reabilitação",
  legalName: "Fisio4you, Lda",
  nif: "514 628 847",
  ers: "[[n.º registo ERS]]",
  license: "[[n.º licença]]",
  url: "https://fisio4you.pt",
  phone: "924 098 545",
  phoneHref: "tel:+351924098545",
  whatsappNumber: "351924098545",
  email: "fisio4youportimao@gmail.com",
  address: {
    // [[CONFIRMAR — perfis online indicam R. José Mendes Furtado 13-3]]
    street: "Rua Francisco Alvo, loja 11",
    postalCode: "8500-759",
    city: "Portimão",
    region: "Faro",
    country: "PT",
  },
  geo: { lat: 37.1386, lng: -8.5377 }, // [[confirmar lat/long exatos]]
  // [[CONFIRMAR dias — perfis online indicam Seg–Sex 9h–18h30]]
  hours: [{ days: ["Mo", "Tu", "We", "Th", "Fr"] as const, opens: "09:00", closes: "19:00" }],
  googleRating: null as number | null, // [[nota Google]]
  googleReviewCount: null as number | null, // [[nº avaliações Google]]
  yearsExperience: 16, // experiência do Mário (confirmado)
  gymArea: 100,
  social: {
    instagram: "[[URL Instagram]]",
    facebook: "https://www.facebook.com/fisio4youportimao/",
    google: "[[URL do perfil Google]]",
  },
  gtmId: "[[GTM-XXXXXXX]]",
  complaintsBook: "https://www.livroreclamacoes.pt",
  agency: { name: "AlphaScale AI", url: "https://alphascaleai.com" },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `Fisio4you, ${fullAddress}`,
)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  `Fisio4you, ${fullAddress}`,
)}&output=embed`;

export const isPending = (v: string | null | undefined) => !v || v.startsWith("[[");
