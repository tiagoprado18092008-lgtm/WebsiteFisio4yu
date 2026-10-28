// Avaliações reais do perfil Google da Fisio4you (copiadas tal como estão escritas). Só entram as de 5 estrelas.
// Para acrescentar: copiar nome e texto do Google, sem editar o conteúdo.

export type Review = { name: string | null; text: string | null; service?: string; rating: number };

export const reviews: Review[] = [
  {
    name: "Tonidorock",
    text: "Excelente gabinete de fisioterapia. Profissionalismo, conhecimento e simpatia são os valores desta casa. Muito obrigado fisio4you Portimão",
    rating: 5,
  },
  {
    name: "Eugenia Almeida",
    text: "Muito boa .a fisioterapeuta profissional.ja me ajudou a resolver muitas dores.obrigada Ângela.Bem haja.",
    rating: 5,
  },
  {
    name: "Margarida Vieira",
    text: "A melhor clínica de fisioterapia de Portimão, excelentes profissionais.",
    rating: 5,
  },
  {
    name: "Archy Comyn",
    text: "Mario is the best physio I have ever been to !",
    rating: 5,
  },
];
