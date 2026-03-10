"use client";

import React, { createContext, useContext, useState } from "react";
import type { Lang } from "@/types/";

type TranslationKey =
  | "blog.title"
  | "blog.sub"
  | "blog.empty"
  | "blog.read"
  | "blog.back"
  | "admin.title"
  | "nav.blog"
  | "admin.title_field"
  | "admin.slug_field"
  | "admin.category"
  | "admin.author"
  | "admin.date"
  | "admin.excerpt"
  | "admin.content"
  | "admin.success"
  | "admin.submit"
  | "admin.list"
  | "admin.delete"
  | "admin.access_title"
  | "admin.access_prompt"
  | "admin.access_submit"
  | "admin.access_error";

const translations: Record<Lang, Record<TranslationKey, string>> = {
  fr: {
    "blog.title": "Le blog",
    "blog.sub":
      "Des articles, études de cas et conseils pour accélérer votre croissance.",
    "blog.empty": "Aucun article pour le moment. Revenez bientôt !",
    "blog.read": "Lire",
    "blog.back": "← Retour",

    "admin.title": "Administration du blog",
    "nav.blog": "Blog",
    "admin.title_field": "Titre",
    "admin.slug_field": "Slug",
    "admin.category": "Catégorie",
    "admin.author": "Auteur",
    "admin.date": "Date",
    "admin.excerpt": "Extrait",
    "admin.content": "Contenu",
    "admin.success": "Article ajouté !",
    "admin.submit": "Enregistrer",
    "admin.list": "Articles existants",
    "admin.delete": "Supprimer",
    "admin.access_title": "Accès administrateur",
    "admin.access_prompt": "Entrez le code d'accès (10 chiffres)",
    "admin.access_submit": "Valider",
    "admin.access_error": "Code incorrect, réessayez.",
  },
  en: {
    "blog.title": "Blog",
    "blog.sub": "Articles, case studies and tips to accelerate your growth.",
    "blog.empty": "No articles yet. Check back soon!",
    "blog.read": "Read",
    "blog.back": "← Back",

    "admin.title": "Blog administration",
    "nav.blog": "Blog",
    "admin.title_field": "Title",
    "admin.slug_field": "Slug",
    "admin.category": "Category",
    "admin.author": "Author",
    "admin.date": "Date",
    "admin.excerpt": "Excerpt",
    "admin.content": "Content",
    "admin.success": "Article added!",
    "admin.submit": "Save",
    "admin.list": "Existing articles",
    "admin.delete": "Delete",
    "admin.access_title": "Admin access",
    "admin.access_prompt": "Enter access code (10 digits)",
    "admin.access_submit": "Submit",
    "admin.access_error": "Wrong code, try again.",
  },
};

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (frOrKey: string, en?: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "fr",
  toggleLang: () => {},
  t: (frOrKey) => frOrKey,
});

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  const toggleLang = () => setLang((l) => (l === "fr" ? "en" : "fr"));
  const t = (frOrKey: string, en?: string) => {
    if (en !== undefined) return lang === "fr" ? frOrKey : en;

    return translations[lang][frOrKey as TranslationKey] ?? frOrKey;
  };
  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
