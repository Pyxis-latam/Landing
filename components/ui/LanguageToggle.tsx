"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Toggle language"
      className="font-mono-label text-xs tracking-widest text-pyxis-fg/70 hover:text-pyxis-accent"
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
