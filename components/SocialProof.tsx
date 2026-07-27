"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-pyxis-fg/10 bg-pyxis-panel py-6">
      <RevealOnScroll>
        <p className="text-center text-sm tracking-wide text-pyxis-fg/70">
          {t.socialProof.text}
        </p>
      </RevealOnScroll>
    </section>
  );
}
