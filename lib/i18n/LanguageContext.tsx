"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { dictionaries, type Lang, type Dictionary } from "./dictionary";

type LanguageContextValue = {
  lang: Lang;
  t: Dictionary;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
