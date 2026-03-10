"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { BilingualText } from "@/types/";

export interface Article {
  id: string;
  title: BilingualText;
  slug: string;
  excerpt: BilingualText;
  content: BilingualText;
  category: BilingualText;
  author: BilingualText;
  date: string;
  readTime?: string;
}

const defaultArticles: Article[] = [
  {
    id: "1",
    title: {
      fr: "Comment transformer votre site en machine à prospects",
      en: "How to turn your website into a lead-generating machine",
    },
    slug: "site-machine-prospects",
    excerpt: {
      fr: "Découvrez les 5 leviers essentiels pour convertir vos visiteurs en prospects qualifiés.",
      en: "Discover the 5 key levers to turn your visitors into qualified leads.",
    },
    content: {
      fr: `## Introduction\n\nTrop d'entreprises ont un site vitrine qui n'attire aucun prospect. Voici comment changer ça.\n\n## Les 5 leviers essentiels\n\n**1. Un message clair et percutant**\nVotre visiteur doit comprendre en 5 secondes ce que vous faites et pour qui.\n\n**2. Une offre irrésistible**\nProposez quelque chose de valeur en échange d'un email.\n\n**3. Des preuves sociales**\nTémoignages, chiffres, logos clients.\n\n**4. Des appels à l'action visibles**\nBoutons clairs, positionnés stratégiquement.\n\n**5. Un suivi automatisé**\nUne séquence email pour nurture les prospects.`,
      en: `## Introduction\n\nToo many companies have a brochure website that attracts no leads. Here's how to change that.\n\n## The 5 essential levers\n\n**1. A clear and compelling message**\nYour visitor must understand in 5 seconds what you do and who it's for.\n\n**2. An irresistible offer**\nOffer something of value in exchange for an email.\n\n**3. Social proof**\nTestimonials, numbers, customer logos.\n\n**4. Visible calls to action**\nClear buttons positioned strategically.\n\n**5. Automated follow-up**\nAn email sequence to nurture leads.`,
    },
    category: { fr: "Stratégie", en: "Strategy" },
    author: { fr: "Nexus Growth", en: "Nexus Growth" },
    date: "2026-02-15",
    readTime: "5 min",
  },
  {
    id: "2",
    title: {
      fr: "SaaS et croissance : pourquoi l'automatisation change tout",
      en: "SaaS & growth: why automation changes everything",
    },
    slug: "saas-croissance-automatisation",
    excerpt: {
      fr: "Les entreprises qui automatisent leur acquisition grandissent 3x plus vite. Voici pourquoi.",
      en: "Companies that automate acquisition grow 3x faster. Here's why.",
    },
    content: {
      fr: `## L'automatisation, pas un luxe mais une nécessité\n\nDans un marché compétitif, les entreprises qui automatisent leur croissance prennent un avantage décisif.\n\n## Ce que l'automatisation permet\n\n- Capturer des prospects 24h/24\n- Qualifier automatiquement les leads\n- Nourrir les prospects avec du contenu pertinent\n- Mesurer chaque étape du tunnel\n\n## Les outils indispensables\n\nCRM, automation email, analytics, chatbots — un écosystème bien configuré multiplie vos résultats sans multiplier vos efforts.`,
      en: `## Automation: not a luxury, but a necessity\n\nIn a competitive market, companies that automate their growth gain a decisive edge.\n\n## What automation enables\n\n- Capture leads 24/7\n- Qualify leads automatically\n- Nurture leads with relevant content\n- Measure every step of the funnel\n\n## Essential tools\n\nCRM, email automation, analytics, chatbots — a well-configured ecosystem multiplies results without multiplying effort.`,
    },
    category: { fr: "SaaS", en: "SaaS" },
    author: { fr: "Nexus Growth", en: "Nexus Growth" },
    date: "2026-01-28",
    readTime: "7 min",
  },
];

interface BlogContextType {
  articles: Article[];
  addArticle: (a: Omit<Article, "id">) => void;
  deleteArticle: (id: string) => void;
  getArticle: (slug: string) => Article | undefined;
}

const BlogContext = createContext<BlogContextType>({
  articles: [],
  addArticle: () => {},
  deleteArticle: () => {},
  getArticle: () => undefined,
});

export function BlogProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);

  const addArticle = (a: Omit<Article, "id">) => {
    const newArticle: Article = { ...a, id: Date.now().toString() };
    setArticles((prev) => [newArticle, ...prev]);
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

  return (
    <BlogContext.Provider
      value={{ articles, addArticle, deleteArticle, getArticle }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
