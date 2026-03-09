"use client";

import React, { createContext, useContext, useState } from "react";
import type { Lang } from "@/types/";

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (fr: string, en: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "fr",
  toggleLang: () => {},
  t: (fr) => fr,
});

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  const toggleLang = () => setLang((l) => (l === "fr" ? "en" : "fr"));
  const t = (fr: string, en: string) => (lang === "fr" ? fr : en);
  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
