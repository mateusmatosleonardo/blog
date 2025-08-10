export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export const postsMeta: PostMeta[] = [
  {
    slug: "inversao-de-dependencia",
    title: "Inversão de Dependência",
    excerpt: "O Impacto da Inversão de Dependência na Arquitetura de Software.",
    date: "2024-07-10",
    readTime: "5 min",
  },
  {
    slug: "minimalismo-digital",
    title: "Minimalismo Digital",
    excerpt: "Como reduzir o ruído digital e focar no que realmente importa.",
    date: "2025-07-31",
    readTime: "3 min",
  },
];
