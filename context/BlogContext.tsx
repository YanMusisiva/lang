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
      fr: "Pourquoi les applications de langues ne suffisent pas pour parler",
      en: "Why Language Apps Alone Aren't Enough to Speak",
    },
    slug: "apps-langues-pas-suffisant",
    excerpt: {
      fr: "Découvrez pourquoi les applications populaires n'apprennent pas à parler et comment apprendre naturellement.",
      en: "Learn why popular apps don't teach you to speak and how to learn naturally.",
    },
    content: {
      fr: `## Introduction

De nombreuses personnes utilisent des applications pour apprendre une langue, mais elles se retrouvent incapables de parler couramment. Pourquoi ?

## Les limites des applications

**1. Pas assez d'écoute réelle**  
Les applications proposent souvent des exercices de vocabulaire ou de traduction, mais très peu d'écoute naturelle et répétée.

**2. Traduction constante**  
Vous êtes encouragé à traduire les phrases dans votre langue maternelle, ce qui ralentit la fluidité.

**3. Manque d'interaction réelle**  
Parler nécessite une réponse immédiate et naturelle, ce que les applications ne peuvent pas fournir.

**4. Pas de contexte concret**  
Les phrases hors contexte ne restent pas dans votre mémoire à long terme.

## Que faire à la place

**1. Écouter la langue en contexte**  
Conversations, podcasts, vidéos ou audios adaptés.

**2. Répéter et imiter**  
Répéter les sons et phrases comme les enfants le font naturellement.

**3. Pratiquer avec un interlocuteur réel**  
Même 10 minutes par jour avec un teacher ou un partenaire linguistique a un impact énorme.

**4. Penser directement dans la langue**  
Éviter de traduire, associez les sons directement aux idées.

## Conclusion

Les applications sont utiles pour mémoriser du vocabulaire ou comprendre la grammaire, mais **elles ne remplacent pas l'écoute naturelle et la pratique orale**. Pour vraiment parler, il faut s’exposer à la langue et interagir activement.`,
      en: `## Introduction

Many people use apps to learn a language but still can't speak fluently. Why is that?

## The limitations of apps

**1. Not enough real listening**  
Apps often focus on vocabulary or translation exercises, but lack natural, repeated listening.

**2. Constant translation**  
You're encouraged to translate phrases into your native language, slowing fluency.

**3. Lack of real interaction**  
Speaking requires immediate, natural responses, which apps cannot provide.

**4. No concrete context**  
Out-of-context phrases do not stick in long-term memory.

## What to do instead

**1. Listen in context**  
Use conversations, podcasts, videos, or tailored audios.

**2. Repeat and imitate**  
Repeat sounds and phrases like children naturally do.

**3. Practice with a real interlocutor**  
Even 10 minutes per day with a teacher or language partner has huge impact.

**4. Think directly in the language**  
Avoid translating; associate sounds directly with ideas.

## Conclusion

Apps are useful for memorizing vocabulary or understanding grammar, but **they do not replace natural listening and speaking practice**. To truly speak, you need exposure and active interaction.`,
    },
    category: { fr: "Apprentissage", en: "Learning" },
    author: { fr: "Listen Method", en: "Listen Method" },
    date: "2026-03-10",
    readTime: "6 min",
  },

  {
    id: "2",
    title: {
      fr: "Pourquoi les adultes n'arrivent pas à apprendre une langue (et pourquoi les enfants y arrivent)",
      en: "Why Adults Struggle to Learn a Language (and Why Children Don't)",
    },
    slug: "adultes-vs-enfants-langues",
    excerpt: {
      fr: "Découvrez pourquoi les méthodes traditionnelles échouent chez les adultes et comment apprendre comme un enfant.",
      en: "Learn why traditional methods fail adults and how to learn like a child.",
    },
    content: {
      fr: `## Introduction

Beaucoup d'adultes ont du mal à apprendre une langue étrangère, alors que les enfants semblent absorber les mots naturellement. La différence n'est pas l'intelligence, mais la méthode et le fonctionnement du cerveau.

## Pourquoi les adultes échouent

**1. Trop de règles et de grammaire**  
Les adultes commencent souvent par étudier la grammaire et les listes de vocabulaire. Cela crée un blocage pour parler naturellement.

**2. Traduction constante**  
Les adultes traduisent chaque mot dans leur tête, ce qui ralentit la compréhension et la fluidité.

**3. Manque d'écoute réelle**  
Les enfants apprennent principalement en écoutant des phrases répétées dans différents contextes. Les adultes ne passent pas assez de temps à écouter activement.

**4. Peur de faire des erreurs**  
La peur de mal parler empêche de pratiquer. Les enfants, eux, imitent sans jugement.

## Pourquoi les enfants réussissent

**1. L'écoute répétée**  
Les enfants entendent des phrases dans leur contexte plusieurs fois avant de les reproduire.

**2. L'imitation naturelle**  
Ils répètent ce qu'ils entendent, même sans comprendre toutes les règles.

**3. L'absence de traduction**  
Ils associent directement les sons aux objets ou actions, sans passer par leur langue maternelle.

**4. La pratique constante**  
Ils sont exposés à la langue en continu, ce qui permet d'apprendre rapidement.

## Conclusion

Pour apprendre efficacement comme un enfant, les adultes doivent :

- écouter régulièrement  
- répéter dans le contexte  
- réduire la traduction  
- se concentrer sur la compréhension avant la perfection grammaticale

Avec la bonne méthode, apprendre une langue devient naturel et rapide.`,

      en: `## Introduction

Many adults struggle to learn a foreign language, while children seem to absorb words naturally. The difference isn't intelligence, but method and brain function.

## Why Adults Struggle

**1. Too many rules and grammar**  
Adults often start by studying grammar and vocabulary lists. This creates a block for speaking naturally.

**2. Constant translation**  
Adults translate every word in their heads, slowing understanding and fluency.

**3. Lack of real listening**  
Children learn mainly by hearing repeated phrases in context. Adults don't spend enough time actively listening.

**4. Fear of making mistakes**  
Fear of speaking incorrectly prevents practice. Children imitate without judgment.

## Why Children Succeed

**1. Repeated listening**  
Children hear phrases in context multiple times before reproducing them.

**2. Natural imitation**  
They repeat what they hear, even without understanding all rules.

**3. No translation**  
They associate sounds directly with objects or actions, without using their native language.

**4. Constant practice**  
They are exposed to the language continuously, allowing them to learn quickly.

## Conclusion

To learn effectively like a child, adults should:

- listen regularly  
- repeat in context  
- reduce translation  
- focus on comprehension before grammatical perfection

With the right method, learning a language becomes natural and fast.`,
    },
    category: { fr: "Apprentissage", en: "Learning" },
    author: { fr: "Listen Method", en: "Listen Method" },
    date: "2026-03-10",
    readTime: "6 min",
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
